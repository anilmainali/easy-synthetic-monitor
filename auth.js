const assert = require('assert')
const puppeteer = require('puppeteer')
const TESTNAME = process.env.TESTNAME
const URL = process.env.URL
const LOCATOR = process.env.LOCATOR
const USER = process.env.USER
const PASS = process.env.PASS
let browser
let page
before(async () => {
   browser = await puppeteer.launch({headless: true, args:['--no-sandbox', '--proxy-server=squid.corp.redhat.com:3128']});
    page = await browser.newPage()
    console.log("Starting headless chromium")

  })
  describe(TESTNAME, () => {
    it('verifies '+TESTNAME, async () => {
        console.log("Navigating to "+URL)
        await page.goto(URL, { waitUntil: 'networkidle2' })
        await page.waitForSelector('input#username')
        await page.type('input#username',USER)
        await page.click('.button.centered.heavy-cta')
        await page.type('input#password',PASS)
        await page.click('input#kc-login')
        await page.waitForSelector(LOCATOR)
  }).timeout(30000).retries(2)
})

after(async () => {
    await browser.close()
  })
  