Feature: BarcodeSettings

    Scenario: User navigates to BarcodeSettings
        Given I am a User loading BarcodeSettings
        When I navigate to the BarcodeSettings
        Then BarcodeSettings will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors