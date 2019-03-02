const cucumber = require('cucumber');
const webdriver = require('selenium-webdriver');

const browser = new webdriver.Builder()
.withCapabilities({'browserName': 'chrome' })
.build()


cucumber.AfterAll(function () {
    return browser.close();
});
cucumber.setWorldConstructor(function World() {
    this.browser = browser;
    this.browser.manage().window().maximize() 
}); 