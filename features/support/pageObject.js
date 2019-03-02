const webdriver = require('selenium-webdriver');
const until = webdriver.until;

    module.exports = {
        async searchDestination(browser, searchTerm) {
            const search = await browser.findElement(webdriver.By.className("search"))
            await search.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            await search.click();
            const searchbox = await browser.findElement(webdriver.By.className("autocomplete-field focus"))
            await searchbox.sendKeys(searchTerm);
            await searchbox.sendKeys(webdriver.Key.ENTER);
            await new Promise(resolve => setTimeout(resolve, 2000));
        },
        async verifySearchResult(browser) {
            return await browser.wait(until.elementLocated(webdriver.By.className('ais-infinite-hits ah-grid-row')), 3000)
            ;
        },
        async openRecord(browser) {
            browser.navigate().to('https://www.tourradar.com/t/101605');
            const element = await browser.wait(until.elementLocated(webdriver.By.className('but exp blue')), 10000);
            await element.click();
        },
        async checkAvailabilityDetails(browser) {
            return await browser.findElements(webdriver.By.className('el has-saving variant--hover'))
        },

        async bookTheEarliestTour(browser) {
            const cssSelector = "body > main > div:nth-child(2) > div.b.pad.avl.has-saving > ul > li:nth-child(1) > div.ce.btns > a"
            await browser.findElement(webdriver.By.css(cssSelector)).click()
        },
        async verifyBookingPage(browser) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return {
                tour: await browser.findElement(webdriver.By.className('fline')).getText(),
                TravellerDetails: await browser.findElement(webdriver.By.className('block details')),
                CostOfTour: await browser.findElement(webdriver.By.className('block blue')).getText()
            };
        },
        async userCredentials(browser, username, password) {
            await browser.findElement(webdriver.By.id('g_email')).sendKeys(username),
                await browser.findElement(webdriver.By.id('g_password')).sendKeys(password)
        },
        async login(browser) {
            await browser.findElement(webdriver.By.id('g_send')).click();

        },
        async verifyLoggedIn(browser) {
            const element = await browser.wait(until.elementLocated(webdriver.By.className('profile-link')), 10000);
            await element.click();

            return {
                accountsetting: await browser.findElement(webdriver.By.className('ao-profile-top__edit-link aa-text-link')).getText(),
                useremail: await browser.findElement(webdriver.By.className('ao-profile-top__profile-details-email')).getText()
            }
        },
        async userDetails(browser,newUser) {
            await browser.findElement(webdriver.By.id('g_name')).sendKeys(newUser.name);
            await browser.findElement(webdriver.By.id('g_email')).sendKeys(newUser.email);
            await browser.findElement(webdriver.By.id('g_password_1')).sendKeys(newUser.password);
            await browser.findElement(webdriver.By.id('g_password_2')).sendKeys(newUser.password);
            await new Promise(resolve => setTimeout(resolve, 1000));
        },
        async signup(browser) {
            await browser.findElement(webdriver.By.id('g_send')).click();
        },
        async setFilter(browser){
            await browser.findElement(webdriver.By.css('#params > div.b.op.b_age > div > ul > li:nth-child(5)')).click
        },
        async checkFilterResult(browser){
            const firstCssSelector = 'body > main > div.c > div.list > ul > li:nth-child(1) > div.bm > dl > dd:nth-child(6)';
            const lastCssSelector = 'body > main > div.c > div.list > ul > li:nth-child(15) > div.bm > dl > dd:nth-child(6)';
            return{
                firstRecord: await browser.findElement(webdriver.By.css(firstCssSelector)).getText(),
                lastRecord: await browser.findElement(webdriver.By.css(lastCssSelector)).getText(),
            };
            
        },

        async checkDateFilterResult(browser){
            const firstCssSelector = 'body > main > div.c > div.list > ul > li:nth-child(1) > div.br > div.js-br__availability-wrapper.br__availability-wrapper > table > tbody > tr > td > div.br__availability-wrapper-date'
            const lastCssSelector = 'body > main > div.c > div.list > ul > li:nth-child(15) > div.br > div.js-br__availability-wrapper.br__availability-wrapper > table > tbody > tr > td > div.br__availability-wrapper-date'
            await new Promise(resolve => setTimeout(resolve, 3000));
            return{
                firstRecord: await browser.findElement(webdriver.By.css(firstCssSelector)).getText(),
                lastRecord: await browser.findElement(webdriver.By.css(lastCssSelector)).getText(),
            };
        },
        async clickForgotPasswordLink(browser){
            await browser.findElement((webdriver.By.className('b-lnk forgot'))).click();
        },
        async verfyForgotPasswordPage(browser){
           return await browser.findElement((webdriver.By.className('form-title'))).getText();
        },
        async resetPassword(browser,email){
            await browser.findElement((webdriver.By.id('g_email'))).sendKeys(email);
            await browser.findElement((webdriver.By.id('g_send'))).click();
            await new Promise(resolve => setTimeout(resolve, 3000));
        },
        async verifyresetInstructions(browser){
           return await browser.wait(until.elementLocated(webdriver.By.id('reset-password')), 3000).getText();
        }
    };