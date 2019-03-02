Feature: Non-Functional test scenario

  @xss 
  #test is failing for right reason, as application not handling html script tag
  Scenario: XSS vulnerability tests
    When I launch TourRadar EU home page
    And I search for "<script>alert(“Hello World”)</script>" destination
    Then I should see the search result



