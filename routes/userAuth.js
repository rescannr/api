const express = require("express");
const router = express.Router();
const passport = require("passport");
const passport_config = require("../middleware/passport/passportConfig.js");

router.use(passport.initialize());
router.use(express.json({ extended: true }));

passport_config(passport);

router.post(
  "/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

module.exports = router;
