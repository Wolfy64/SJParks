const puppeteer = require('puppeteer');
let broswer, page;

/* Starts Broswer and goes to localhost to test if page renders headless argument false= will show broswer true =show broswer */
beforeEach(async () => {
  broswer = await puppeteer.launch({
    headless: false
  });
  page = await broswer.newPage();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await broswer.close();
});

/* test server is running and responding to request  */
test('Test for response from server', async () => {
  const response = await page.goto('http://localhost:3000');
  expect(response.status()).not.toBe(500);
});

/* test header of web page */

test('the header has the correct text', async () => {
  const text = await page.$eval('title', el => el.innerHTML);
  expect(text).toEqual('SJParks');
});

test('Testing Login ', async () => {
  await page.goto('http://localhost:3000/login');

  let email = await page.$eval('input#email', el => (el.value = 'leongaban'));
  expect(email).toBe('leongaban');

  let password = await page.$eval(
    'input#password',
    el => (el.value = 'testpass')
  );
  expect(password).toBe('testpass');

  await page.click('button.sc-fjdhpX.kSzkgy');
});
