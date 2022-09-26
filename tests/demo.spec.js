const { test, expect } = require('@playwright/test');
const { Demo } = require(process.cwd()+'/modules/Demo.js');

test.describe('Tests to check different functionalities of a demo WebApp', () => {
  let page= null;
  let context= null;
  let demo = null;
  let userName = null;
  let password = null;

  test.beforeAll(async ({ browser,baseURL }, testInfo) => {
  
    userName = testInfo.project.use.userName;
    password = testInfo.project.use.password;
    context = await browser.newContext();
    page = await context.newPage();
    demo = new Demo(page,baseURL);
    await demo.login(userName,password);                               
  });


  test.afterAll(async ({ browser }) => {
    await demo.logout(); 
    await context.close();
    await browser.close();
  });

  test('Verify functionality for opening a new account', async ()=>{
    const existingAccount = Math.floor(Math.random() * 10) + 1;
    await demo.openAccount(existingAccount); 
  });

  test('Verify functionality for transfering funds between accounts', async ()=>{
    const fromAccount = Math.floor(Math.random() * 5) + 1;
    const toAccount = Math.floor(Math.random() * 10) + 5;
    const amount = (Math.floor(Math.random() * 10000) + 1).toString()
    await demo.transferFunds(fromAccount,toAccount,amount); 
  });

});
