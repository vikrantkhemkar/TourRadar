const {Given,Then,When} = require('cucumber');
const config = require('../helpers/config');
const pageObjects = require('../support/pageObject');
const should = require('chai').should();

When(/^I launch TourRadar EU home page$/,async function () {
    await this.browser.get(config.baseUrl);
});
When(/^I search for "(.*)" destination$/,async function (searchTerm) {
    await pageObjects.searchDestination(this.browser, searchTerm);
});

Then(/^I should see the search result$/, async function () {
    const result = await pageObjects.verifySearchResult(this.browser);
    result.should.be.a('object');
});

When(/^I click to open the second record$/,async function () {
    pageObjects.openRecord(this.browser);
});

When(/^I should see the tour availability details$/, async function () {
    const availabilityDetails = await pageObjects.checkAvailabilityDetails(this.browser);
    await availabilityDetails.length.should.be.above(1);
    should.exist(availabilityDetails);
});
When(/^I click to book the earliest tour$/,async function () {
    await pageObjects.bookTheEarliestTour(this.browser);
});
Then(/^I should get redirected to the booking page$/, async function () {
    const bookingPageDetails = await pageObjects.verifyBookingPage(this.browser);
    await bookingPageDetails['tour'].should.contain('Malta Highlights');
    //await bookingPageDetails['costOfTour'].should.contain('Amount due');
    await bookingPageDetails['TravellerDetails'].should.be.a('object');
});
When(/^I navigate to sign in page$/,async function () {
    await this.browser.get(config.login);
});
When(/^I enter valid email or username and password$/,async function () {
   await pageObjects.userCredentials(this.browser, config.username, config.password);
});
When(/^I click on Log in button$/,async function () {
    await pageObjects.login(this.browser);
});
Then(/^I should get logged in$/, async function () {
    const details = await pageObjects.verifyLoggedIn(this.browser);
    details['accountsetting'].should.equal('Edit Account Settings');
    details['useremail'].should.equal(config.username);
});
When(/^I launch TourRadar signup page$/,async function(){
    await this.browser.get(config.signup);
});
When(/^I enter the mandatory fields$/,async function(){
    await pageObjects.userDetails(this.browser,config.newUser);
});
When(/^I click to sign up$/,async function(){
    await pageObjects.signup(this.browser);
});
Then(/^I should get signedin to tourradar$/, async function(){
    const details = await pageObjects.verifyLoggedIn(this.browser);
    details['accountsetting'].should.equal('Edit Account Settings');
    details['useremail'].should.equal(config.newUser.email);
});
When('I click on forgot your password link',async function () {
    await pageObjects.clickForgotPasswordLink(this.browser);
});
Then(/^I should see the results fall on that criteria$/,async function(){
    const recordDetails = await pageObjects.checkFilterResult(this.browser);
    recordDetails['firstRecord'].should.equal('10 to 90 year olds'||'15 to 99 year olds')
    recordDetails['lastRecord'].should.equal('15 to 99 year olds')
});
Then(/^I should get redirected to the forgot password page$/,async function(){
    const linkDetails= await pageObjects.verfyForgotPasswordPage(this.browser);
    linkDetails.should.equal('Forgot your password?');
});
When(/^I enter valid email address and click submit$/,async function(){
    await pageObjects.resetPassword(this.browser,config.resetEmail);
});
Then(/^I should see password resetting instructions on screen$/, async function(){
    const pageDetails=await pageObjects.verifyresetInstructions(this.browser)
    pageDetails.should.contain("We've sent you a reset password email");
    pageDetails.should.contain("Please, check your email and click the link to reset your password");
});