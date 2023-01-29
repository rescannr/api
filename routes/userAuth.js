const express = require("express");
const router = express.Router();
const passport = require("passport");
const passport_config = require("../middleware/passport/passportConfig.js");

router.use(express.json({ extended: true }));

passport_config();

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/signup",
  }),
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/signup",
  }),
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);

router.post("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
