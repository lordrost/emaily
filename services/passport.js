const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys"); // Don't have to write keys.js

// Pull out of Mongoose
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // Trust Proxy and use https
    },
    // done - Whenever we calling that, it tells Passport.js that we're done with OAuth
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // We already have a record of this profile.id
        return done(null, existingUser); //This is Done Function for Passport.JS
        // null shows that it was successfull
      }
      // New User.Need to make record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
