const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.binance.com/en/orderbook/BTC_USDT")
    await page.screenshot({path: "mywebsite.png"})
    await browser.close()
})();