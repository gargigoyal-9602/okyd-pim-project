Feature: LoyaltySystem

    Scenario: User navigates to LoyaltySystem
        Given I am a User loading LoyaltySystem
        When I navigate to the LoyaltySystem
        Then LoyaltySystem will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors