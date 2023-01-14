const express = require("express");
const router = express.Router();

router.use(express.json({ extended: true }));

router.post("/", (req, res) => {
  // TODO: logging

  console.log(req.body);
});

module.exports = router;
