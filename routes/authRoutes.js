const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //GoogleStragey knows 'google'
      scope: ["profile", "email"], //user info we want from Google
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get('/app/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  })

};
