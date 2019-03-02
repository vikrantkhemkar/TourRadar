Feature: Functional test scenarios

  @search
  Scenario: Search for destination and book the tour
    When I launch TourRadar EU home page
    And I search for "malta" destination
    Then I should see the search result
    When I click to open the second record
    Then I should see the tour availability details
    When I click to book the earliest tour
    Then I should get redirected to the booking page

  @login
  Scenario: Login to tourradar
  When I navigate to sign in page
  And I enter valid email or username and password
  And I click on Log in button
  Then I should get logged in

  @signup
  Scenario: Signup using google
  When I launch TourRadar signup page
  And I enter the mandatory fields
  And I click to sign up
  Then I should get signedin to tourradar

  @filter
  Scenario: Filter results
  When I launch TourRadar EU home page
  And I set the Age filter to 60+
  Then I should see the results fall on that criteria

  @forgotPassword
  Scenario: Filter result using date
  When I navigate to sign in page
  And I click on forgot your password link
  Then I should get redirected to the forgot password page
  When I enter valid email address and click submit
  Then I should see password resetting instructions on screen



