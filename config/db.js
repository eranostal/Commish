const mongoose = require('mongoose');
const config = require('config');
//Grab our global variable from default.json (using the config extension)
const db = config.get('mongoURI');

//Connect to the DB. Because mongoose.connect() We use .then and .catch
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            //These params must be used because the defaults will be deprecated in a future version.
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message);
        //The "1" in this case is used because it's an uncaught fatal exception??
        process.exit(1);
    }
};

module.exports = connectDB;