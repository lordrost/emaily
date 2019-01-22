//npm install --save nodemon - Automatically Restart Node Server
//Passport.JS used for authontification

const express = require("express");
const mongoose = require('mongoose');
const keys = require("./config/keys"); // Don't have to write keys.js

require('./models/User.js');
require('./services/passport');

//Connect to MongoDB
mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT);
