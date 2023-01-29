const url = require("url");

let checker = (website_link) => {
  let request_url = url.parse(website_link).host;
  let request_protocol = url.parse(website_link).protocol;

  if (request_url === "suf.purs.gov.rs" && request_protocol === "https:") {
    return true;
  } else {
    return false;
  }
};

module.exports = checker;
