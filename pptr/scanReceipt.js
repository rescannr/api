const puppeteer = require("puppeteer");

let return_receipt_data = async (url) => {
  // Launch a new browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  // Go to the URL
  await page.goto(url);

  // Select the div that has receipt data
  const receipt_data = await page.evaluate(() => {
    const parentDiv = document.querySelector("#collapse1");
    const childDiv = parentDiv.querySelector(".panel-body");
    const data = childDiv.querySelector("pre").textContent;

    return data;
  });

  await browser.close();

  return receipt_data;
};

module.exports = return_receipt_data;
