const puppeteer = require("puppeteer")

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await  page.goto(url);
    const[el] = await page.$x('//*[@id="__APP"]/div/main/div[2]/div[2]')
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
    browser.close()
    return rawTxt;
 }
async function arrangingScrapeProduct() {
    let result = await scrapeProduct("https://www.binance.com/en/orderbook/BTC_USDT");
    const data = [];
    const sell_data = [];
    const arrayOfChunks = [];
    console.log(result);
    const rowPattern  = /Buy\s[0-9]{1,2}[0-9.,]+/
    let done = false;

    while (!done) {
        const isMatch = rowPattern.test(result);
        let currentMatch;
        if (isMatch) {
            currentMatch = rowPattern.exec(result);
            data.push(currentMatch[0]);
        }
        result = result.replace(currentMatch[0], '');
        done = rowPattern.test(result) ? false : true;
    }
    console.log(data);
    for (let i = 0; i <= data.length; i++){
        // let currentTestString = data[i]
        // let currentMatch
        // let chunk = { side: '' }
        // // secondPattern = /Buy\s[0-9]/
        // // doubleDigitSecondPattern = /Buy\s[0-9]{2}/
        // if (i < 9){
        //     currentMatch = secondPattern.exec(currentTestString)
        // }
        // else {
        //     currentMatch = doubleDigitSecondPattern.exec(currentTestString);
        // }

        // console.log({currentMatch })
        // let currentChunk = currentMatch[0]
        // chunk.side = currentChunk
        // currentTestString = currentTestString.replace(chunk.side, '');
        //    when done iterating over currentTestString
        //    arrayOfChunks.push(chunk);
        document.getElementById("#app").innerHTML = ""
        document.getElementById("#app")
        .insertAdjacentHTML('afterbegin',secondPattern.exec(data[i]));
    }
}
arrangingScrapeProduct();
