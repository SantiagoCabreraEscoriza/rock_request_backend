const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../api/models/User.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/login/google/callback`,
      scope: ["profile"],
    },
    async function verify(issuer, profile, cb) {
      try {
        const user = await User.findOne({
          federated: {
            $elemMatch: {
              provider: issuer,
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
              provider: issuer,
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
