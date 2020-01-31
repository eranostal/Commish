//Connect to our router.
const express = require('express');
//Connect to our Database file
const connectDB = require('./config/db');

const app = express();

//This middleware is NEEDED to use req.body() data in our users.js file and other files.
app.use(express.json({extended: false}));

//Connect to our database.
connectDB();

//Route URI's
app.get('/', (req, res) => res.json({msg: 'Welcome to the Commish Test App'}));

//Define routes. When these paths are hit, then those files will be loaded.
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

//Use the environment variable for our port. If it doesn't exist choose "5000" as our port.
const PORT = process.env.PORT || 5000;

//app.listen() listens on the given port, if it succeeds, it will log the message to the console.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));