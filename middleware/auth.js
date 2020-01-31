//Middleware is a function that has access to the request and response cycle.
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){

    //Get token from the header. 
    //HTTP headers are the name of value pairs that are displayed in the request and response messages of messages headers for Hypertext Transfer Protocol.
    //They're the code that transfers data between a web server and a browser.
    //WHAT IS AN X-AUTH-TOKEN???
    const token = req.header('x-auth-token');

    //Check if the token doesn't exist.
    if (!token) {
        //A status of 401 is "Unauthorized"
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        //.verify() will verify if there's a valid JSON Web Token. It decodes it using the "jwtSecret" variable we have in our "default.json" file in our "config" folder.
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //Once verified we're going to move the payload (the user) to the decoded payload.
        req.user = decoded.user;
        //Move on to the next piece of middleware when done.
        next();
    } catch(err) {
        //A status of 401 is "Unauthorized"
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

}