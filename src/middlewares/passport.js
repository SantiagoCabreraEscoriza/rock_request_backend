const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../api/models/User.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/v1/users/login/google/callback`,
      scope: ["profile"],
    },
    async function verify(accessToken, refreshToken, profile, cb) {
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
        console.log(err);

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
  console.log(req.isAuthenticated());
  
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json("Unauthorized");
};

module.exports = { isAuth };
