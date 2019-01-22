//npm install --save nodemon - Automatically Restart Node Server
//Passport.JS used for authontification

const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require("passport");
const keys = require("./config/keys"); // Don't have to write keys.js

require('./models/User.js');
require('./services/passport');

//Connect to MongoDB
mongoose.connect(keys.mongoURI);


const app = express();

app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      keys: [keys.cookieKey]// key used to encrypted cookie
  })
);

app.use (passport.initialize());
app.use (passport.session());

require('./routes/authRoutes')(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT);
