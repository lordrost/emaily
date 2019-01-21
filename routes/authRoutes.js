const passport = require('passport'); // require original npm module
// app.get is Express node Object

module.exports = app => {

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", passport.authenticate('google'));
};
