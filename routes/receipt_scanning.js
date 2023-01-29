const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/passport/checkAuth.js");

const url_checker = require("../middleware/url_checking/scraping_url_checker");

const return_receipt_data = require("../pptr/scan_receipt");

router.use(express.json({ extended: true }));

router.post("/inv_scn", isAuthenticated, (req, res) => {
  /*
    #swagger.tags = ['Receipt scanning']
    #swagger.description = 'Endpoint for scanning receipts data (WITHOUT QR CODE)'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Object containing url from the receipt's QR code',
      required: true,
      type: 'object'
    }
    #swagger.responses[200] = {
      description: 'Receipt data'
    }
    #swagger.responses[400] = {
      description: 'Bad request'
    }
  */
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
