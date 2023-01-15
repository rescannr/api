const express = require("express");
const router = express.Router();

const url_checker = require("../middleware/url_checking/scraping_url_checker");

const return_receipt_data = require("../pptr/scan_receipt");

router.use(express.json({ extended: true }));

router.post("/", (req, res) => {
  // TODO: logging

  if (url_checker(req.body.url)) {
    let data = return_receipt_data(req.body.url).then((data) => {
      console.log(data);
    });
  } else {
    res.status(400).send("Bad request");
  }
});

module.exports = router;
