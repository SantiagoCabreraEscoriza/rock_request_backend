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
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = usersRouter;
