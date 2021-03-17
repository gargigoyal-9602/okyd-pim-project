Feature: CustomFormBuilder

    Scenario: User navigates to CustomFormBuilder
        Given I am a User loading CustomFormBuilder
        When I navigate to the CustomFormBuilder
        Then CustomFormBuilder will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors