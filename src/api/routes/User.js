const passport = require("passport");

const usersRouter = require("express").Router();

usersRouter.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

usersRouter.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/prueba");
  }
);

module.exports = usersRouter;
