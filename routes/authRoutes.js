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

// Logout Function takes and kill cookie. Required Passport Library
app.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});
};
