const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys"); // Don't have to write keys.js

// Pull out of Mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done (null, user.id);
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    // done - Whenever we calling that, it tells Passport.js that we're done with OAuth
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then ((existingUser) => {
            if (existingUser){
              // We already have a record of this profile.id
              done(null, existingUser); //This is Done Function for Passport.JS
              // null shows that it was successfull
            }
            else {
              // New User.Need to make record
              new User ({ googleId: profile.id })
              .save()
              .then (user => done(null, user));
            }
          })

    }
  )
);
