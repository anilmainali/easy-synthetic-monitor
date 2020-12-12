const assert = require('assert')
const puppeteer = require('puppeteer')
var chakram = require('chakram');
global.chakram = chakram;
global.expect = chakram.expect;
const TESTNAME = process.env.TESTNAME
const URL = process.env.URL
const USER = process.env.USER
const PASS = process.env.PASS



let browser
let page
before(async () => {

  })

describe(TESTNAME, function () {
  it('verifies '+TESTNAME, function () {
    var chakram = require('chakram');
    var response = chakram.get(URL);
    expect(response).to.have.status(200);
    return chakram.wait();
  });
}); 

after(async () => {

  })
  