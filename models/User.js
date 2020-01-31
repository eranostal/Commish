const mongoose = require('mongoose');

//Create a model for the users
const UserSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        displayed: false,
    },
    lastName:{
        type: String,
        displayed: false,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    artist:{
        type: Object,
        ref: 'Artist',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

//When you call mongoose.model() on a schema, Mongoose will compile a model for you.
//The first value of .model() is the singular name of the collection your model is for.
//Mongoose automatically looks for the plural lowercased version of your model name. Therefore in our example here, "users" is the referenced collection in our database.
module.exports = mongoose.model('user', UserSchema);