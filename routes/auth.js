//Authentication routing file
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//This is our auth middleware.
const auth = require('../middleware/auth');
//This imports our express validator. We use express-validator to limit what can be sent and make sure certain things are sent.
const {check, validationResult} = require('express-validator/check');

//Link the database model to your users.js file to be used within' our routes.
const User = require('../models/User');

// This is private because we're getting a user that's logged in so it should be private. We also need to use our middleware to stay protected*
// The second param in this case is going to be our middleware
// @route   GET api/auth
// @desc    Get current logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    
    try { 
        //Get the user from the database based off their ID. .select('-password') means it will not include the password even though it's encrypted.
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        //500 is a server error.
        res.status(500).send('Server Error');
    }

});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //We're returning a 400 error here because it's a "bad" request
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        //In this case if we DON'T find a user, then we want to return an error
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        //This method is used to compare the encrypted password from the DB we extracted from the body, versus the password found in the database.
        //This returns either true or false
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid password'});
        }

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
        res.status(500).send('Server error');
    }

});


module.exports = router;