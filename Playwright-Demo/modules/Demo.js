const { test, expect } = require('@playwright/test');


exports.Demo = class Demo{

  constructor(page,baseURL) 
  {
    this.page = page;
    this.baseURL = baseURL;
  }

  getElement(element){
    const elementDict ={
      //Input
      USERNAME:'input[name="username"]',
      PASSWORD:'input[type="password"]',
      AMOUNT:'#amount',

      //Label
      HOME_PAGE: 'ul.events',
      ACC_TABLE: '#accountTable',
      PAGE_TITLE: 'h1.title',

      // Buttons/Links
      LOGIN_BTN:'input[type="submit"]',
      LOGOUT_BTN:'a[href="/parabank/logout.htm"]',
      SUBMIT_BTN:'button[type="submit"]',
      OPEN_ACC: 'a[href="/parabank/openaccount.htm"]',
      TRANSFER_FUNDS: 'a[href="/parabank/transfer.htm"]',
      ACC_TYPE: '#type',
      OTHER_ACC: '#fromAccountId',
      TRANSFER_ACC:'#toAccountId',
      NEW_ACC: '#newAccountId',
      CREATE_ACC:'input[type="submit"]',
      TRANSFER_BTN:'input[value="Transfer"]',
    }
    return elementDict[element]
  }

  getElementLocator(name){
    return this.page.locator(this.getElement(name));
  }

  async isElementVisible(elementName,time){ //use this method to check element visible or not and return boolean
    try {
      if(time != undefined)
      { await this.page.focus(elementName, {timeout:time});
        await this.page.waitForSelector(elementName, {waitUntil:'visible', timeout:time});
      }
      else{  
        await this.page.waitForSelector(elementName, {waitUntil:'visible', timeout:10000});
      }
      //console.log(elementName+ ' found!');
      return true;
    } catch (err) {
      //console.log(elementName+ ' is not found!');
      return false;
    }
  }

  async login(userName,password) {
    console.log('Login url='+this.baseURL)
    await this.page.goto(this.baseURL);
    await this.page.fill(this.getElement('USERNAME'), userName);
    await this.page.fill(this.getElement('PASSWORD'), password);
    await this.getElementLocator('LOGIN_BTN').click();
    await this.page.waitForSelector(this.getElement('ACC_TABLE'),{waitUntil:'visible'});
  }

  async logout() {
    await this.getElementLocator('LOGOUT_BTN').click();
    await this.page.waitForSelector(this.getElement('HOME_PAGE'),{waitUntil:'visible'});
  }
  async openAccount(existingAccount) {
    await this.getElementLocator('OPEN_ACC').click();
    await this.page.waitForSelector(this.getElement('ACC_TYPE'),{waitUntil:'visible'});
    await this.getElementLocator('ACC_TYPE').selectOption({index: 1});
    await this.getElementLocator('OTHER_ACC').selectOption({index: existingAccount});
    await this.getElementLocator('CREATE_ACC').click();
    await this.page.waitForSelector(this.getElement('NEW_ACC'),{waitUntil:'visible'});
    await expect(this.getElementLocator('PAGE_TITLE')).toContainText('Account Opened');
  }

  async transferFunds(fromAccount,toAccount,amount){
    await this.getElementLocator('TRANSFER_FUNDS').click();
    await this.page.waitForSelector(this.getElement('TRANSFER_BTN'),{waitUntil:'visible'});
    await this.getElementLocator('OTHER_ACC').selectOption({index: fromAccount});
    await this.getElementLocator('TRANSFER_ACC').selectOption({index: toAccount});
    await this.page.fill(this.getElement('AMOUNT'), amount);
    await this.getElementLocator('TRANSFER_BTN').click();
    await this.page.waitForSelector(this.getElement('PAGE_TITLE'),{waitUntil:'visible'});
    await expect(this.getElementLocator('PAGE_TITLE')).toContainText('Transfer Complete');
  }
}