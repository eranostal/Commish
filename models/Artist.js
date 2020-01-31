const mongoose = require('mongoose');

//Create a model for the users
const ArtistSchema = mongoose.Schema({
    genres:{
        type: Array,
        required: true
    },
    listed:{
        type: Boolean,
        default: true,
    },
    featuredTokens:{
        type: Number,
        default: 0
    },
    featured:{
        type: Boolean,
        default: false
    },
});

//When you call mongoose.model() on a schema, Mongoose will compile a model for you.
//The first value of .model() is the singular name of the collection your model is for.
//Mongoose automatically looks for the plural lowercased version of your model name. Therefore in our example here, "users" is the referenced collection in our database.
module.exports = mongoose.model('user', ArtistSchema);