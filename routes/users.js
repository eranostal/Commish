//Users routing file
//CHANGE LATER: this route will be unavailable to the general public and is strictly for the backend.
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//This imports our express validator. We use express-validator to limit what can be sent and make sure certain things are sent.
const {check, validationResult} = require('express-validator/check')

//Link the database model to your users.js file to be used within' our routes.
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    //These three check's are used for validation. The first parameter checks the field, the second includes an error message, and the methods after are validation fields.
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({min: 6})
], async (req, res) => {
    //Next after we've set our validation requirement, this section grabs any errors and sets them to a json object with the array of errors.
    //validationResult() extracts the validation errors from a request and makes them available.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //We're returning a 400 error here because it's a "bad" request
        return res.status(400).json({errors: errors.array()});
    }

    //Destructure the data
    const {name, email, password} = req.body;

    try {
        //Find a user based on any field (can also use email: email).
        let user = await User.findOne({email});

        //Since we're registering a user here, if we find one then the user already exists.
        if(user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        //Create a new user (using the User model). This hasn't been saved to the database yet
        user = new User({
            name,
            email,
            password
        });

        //A "salt" is used to encrypt the password (10 is default).
        const salt = await bcrypt.genSalt(10);

        //This gives us a hash version of the password.
        user.password = await bcrypt.hash(password, salt);

        //Save to the database. The password being saved will be encrypted now.
        await user.save();

        //The payload is the object you want to send in the JSON Web Token. We only want to send the ID because we can use that to get specific data based off that.
        //A JSON Web Token allows for secret transmission between a client and a server. It does this as a JSON object.
        const payload = {
            user: {
                id: user.id
            }
        }

        //In order for JSON Web Tokens to work, they require a payload and a signature to work.
        //The first parameter her is the payload in question (we're sending the user ID), we also need a "secret", which we're pulling from our config file as a global variable.
        //The final parameter is an expiration (optional) that will expire the user after a certain period of time (in seconds).
        //You can test tokens by going to jwt.io
        //.sign() also sends the token as well and is done so via a function
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            //If there's an error throw an error
            if (err) throw err;
            //If there's no error pass an object with just the token.
            res.json({token});
        })

    } catch (err) {
        console.error(err.message);
        //We use 500 here because it's an internal server error.
        res.status(500).send('Server error')
    }

});

module.exports = router;