const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/passport/checkAuth.js");

const url_checker = require("../middleware/urlChecking/scrapingUrlChecker.js");

const return_receipt_data = require("../pptr/scanReceipt.js");

router.use(express.json({ extended: true }));

router.post("/scan_receipt", isAuthenticated, (req, res) => {
  // TODO: logging

  if (url_checker(req.body.url)) {
    let data = return_receipt_data(req.body.url).then((data) => {
      res.status(200).send(data);
    });
  } else {
    res.status(400).send("Bad request");
  }
});

module.exports = router;
