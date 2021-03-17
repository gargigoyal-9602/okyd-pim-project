Feature: SalesReporting

    Scenario: User navigates to SalesReporting
        Given I am a User loading SalesReporting
        When I navigate to the SalesReporting
        Then SalesReporting will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors