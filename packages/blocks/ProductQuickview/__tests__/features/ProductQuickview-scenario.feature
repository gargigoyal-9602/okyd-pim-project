Feature: ProductQuickview

    Scenario: User navigates to ProductQuickview
        Given I am a User loading ProductQuickview
        When I navigate to the ProductQuickview
        Then ProductQuickview will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors