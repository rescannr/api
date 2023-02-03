const express = require("express");
const router = express.Router();
const passport = require("passport");
const passport_config = require("../middleware/passport/passportAuthConfig.js");

router.use(express.json({ extended: true }));

passport_config();

router.post(
  "/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "test@example.com",
                password: "example123"
            }
    } */
    res.json({
      user: req.user,
    });
  }
);

router.post("/login", passport.authenticate("local-login"), (req, res) => {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                email: "test@example.com",
                password: "example123"
            }
    } */
  res.json({
    status: "success",
  });
});

router.delete("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return err;
    }
    res.redirect("/");
  });
});
module.exports = router;
