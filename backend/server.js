const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer")
const app = express();

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// utils
const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x('//*[@id="__APP"]/div/main/div[2]/div[2]');
  const txt = await el.getProperty("textContent");
  const rawTxt = await txt.jsonValue();
  browser.close();
  return rawTxt;
};

async function arrangingScrapeProduct() {
  let result = await scrapeProduct(
    "https://www.binance.com/en/orderbook/BTC_USDT"
  );
  const data = [];
  const rowPattern = /Buy\s[0-9]{1,2}[0-9.,]+/;
  let done = false;

  while (!done) {
    const isMatch = rowPattern.test(result);
    let currentMatch;
    if (isMatch) {
      currentMatch = rowPattern.exec(result);
      data.push(currentMatch[0]);
    }
    result = result.replace(currentMatch[0], "");
    done = rowPattern.test(result) ? false : true;
  }
  return data;
}

// routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Binance Web-Scraping Backend" });
});

app.get("/buy-data", async (req, res) => {
  const data = await arrangingScrapeProduct();
  res.send(data);
});

// server
app.listen(PORT, () =>
  console.log(`web-scraping api running on port ${PORT} :)`)
);
