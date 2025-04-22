const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../api/models/User.js");
const { ApiError } = require("./error_middleware.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/v1/users/login/google/callback`,
      scope: ["profile"],
    },
    async function verify(accessToken, refreshToken, profile, cb) {
      if (!profile) throw new ApiError("profile not found", 400);
      if (!cb) throw new ApiError("callback not found", 400);
      try {
        const user = await User.findOne({
          federated: {
            $elemMatch: {
              provider: "google",
              subject: profile.id,
            },
          },
        });

        if (user) {
          return cb(null, user);
        }

        const newUser = new User({
          name: profile.displayName,
          federated: [
            {
              provider: "google",
              subject: profile.id,
            },
          ],
        });

        await newUser.save();
        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json("Unauthorized");
};

module.exports = { isAuth };
