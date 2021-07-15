const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
const fs = require('fs')
const twofactor = require("node-2fa");


const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0];

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const getToken = async () => {
  let driver = new Builder().forBrowser('chrome')

    .build()

  await driver.get('https://discord.com/developers/applications/813400866131935263/bot')
  await driver.wait(until.titleIs('Discord'), 2000)
  await driver.findElement(By.name('email')).sendKeys('jcde0767@gmail.com')
  await driver.findElement(By.name('password')).sendKeys(fs.readFileSync('./key').toString(),Key.ENTER)
  await sleep(2000)


  await driver.findElement(By.xpath('//*[@id="app-mount"]/div[2]/div/div[2]/div/form/div/div[3]/div/div/input'))
    .sendKeys(twofactor.generateToken('KADS TKZQ QV2E DGXU').token, Key.ENTER)
  await driver.wait(until.titleIs('Discord Developer Portal'))
  await sleep(2000)
  await driver.findElement(
    By.xpath(
      '//*[@id="app-mount"]/div/div/div[1]/div[3]/div[2]/div/div[1]/div[2]/form/div[1]/div[1]/div[2]/div/div[2]/div/div/button[2]'
      )
    ).click()

  await driver.findElement(
    By.xpath(
      '/html/body/div[4]/div/footer/button[2]'
      )
    ).click()

  await sleep(2000)
  await driver.findElement(
    By.xpath(
      '//*[@id="app-mount"]/div/div/div[1]/div[3]/div[2]/div/div[1]/div[2]/form/div[1]/div[1]/div[2]/div/div[2]/div/button'
      )
    ).click()

    let token = await driver.findElement(
    By.xpath(
      '//*[@id="app-mount"]/div/div/div[1]/div[3]/div[2]/div/div[1]/div[2]/form/div[1]/div[1]/div[2]/div/div[2]/div'
      )
    ).getText().then(tkn => {return nthElement(tkn.split(/\r?\n/),1)})
    await driver.quit()
    return token
}


module.exports = {
  getToken
}
