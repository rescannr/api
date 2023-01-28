const LocalStraregy = require("passport-local").Strategy;
const User = require("../../db/userModel.js");

module.exports = (passport) => {
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
};
