Feature: AdvancedSearch

    Scenario: User navigates to AdvancedSearch
        Given I am a User loading AdvancedSearch
        When I navigate to the AdvancedSearch
        Then AdvancedSearch will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors