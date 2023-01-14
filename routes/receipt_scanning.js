const express = require("express");
const router = express.Router();

const return_receipt_data = require("../pptr/scan_receipt");

router.use(express.json({ extended: true }));

router.post("/", (req, res) => {
  // TODO: logging

  let data = return_receipt_data(req.body.url).then((data) => {
    console.log(data);
  });
});

module.exports = router;
