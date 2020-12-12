const assert = require('assert')
const puppeteer = require('puppeteer')
const TESTNAME = process.env.TESTNAME
const URL = process.env.URL
const LOCATOR = process.env.LOCATOR
var api = true
var ui = true



let browser
let page
before(async () => {
   browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
    page = await browser.newPage()
    console.log("Starting headless chromium...")
  })

  describe('Verifying the healthcheck for the application: ' + TESTNAME, () => {
    it('Verifying the healthcheck for the application: ' + TESTNAME, async () => {
        console.log("Navigating to the URL:  " + URL)
        try {
            await page.goto(URL, { waitUntil: 'networkidle2' });
            await page.waitForSelector(LOCATOR);
            console.log("Health locator found, your application seems to be running successfully.")
        } catch (e) {
            console.log('Health locator could not be found, your application seems to be down.' + e);
            throw new Error('Locator could not be found: ' + e);
         }

  }).timeout(30000).retries(2)
})

after(async () => {
    await page.screenshot({ path: 'page_state_now.png' })
    await browser.close()
  })
  
