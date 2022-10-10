const { test, expect } = require('@playwright/test');
const { FiverrDemo } = require(process.cwd()+'/modules/FiverrDemo.js');

test.describe('Tests to check different functionalities of a Fiverr demo', () => {
  let page= null;
  let context= null;
  let fiverrdemo = null;
  let userName = null;
  let password = null;

  test.beforeAll(async ({ browser,baseURL }, testInfo) => {
  
    userName = testInfo.project.use.userName;
    password = testInfo.project.use.password;
    context = await browser.newContext();
    page = await context.newPage();
    fiverrdemo = new FiverrDemo(page,baseURL);
    await fiverrdemo.login(userName,password);                               
  });

  test.afterAll(async ({ browser }) => { 
    await context.close();
    await browser.close();
  });

  test('Verify pop-up message', async ()=>{
    await fiverrdemo.clickOk(); 
  });

});
