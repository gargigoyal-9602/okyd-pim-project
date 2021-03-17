Feature: KeywordSearch

    Scenario: User navigates to KeywordSearch
        Given I am a User loading KeywordSearch
        When I navigate to the KeywordSearch
        Then KeywordSearch will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors