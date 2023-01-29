const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../db/userModel.js");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
          return done(null, false);
        }
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user) return done(null, false);

        const isMatch = await user.matchPassword(password);

        if (!isMatch) return done(null, false);

        return done(null, user);
      } catch (error) {
        console.log(error);

        return done(error, false);
      }
    }
  )
);

module.exports = () => passport;
