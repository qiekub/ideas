const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('load', ()=>{
  	setTimeout(()=> {
  	  page.screenshot({path: 'example.png'});
  	  console.log(page)
  	  browser.close()
    }, 500)
  })
  await page.setViewport({
  	width: 1400,
  	height: 700,
  	deviceScaleFactor: 1,
  });
  await page.goto('https://twitter.com/qiekub/status/1270493076486840320');


})();