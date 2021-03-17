Feature: CustomForm

    Scenario: User navigates to CustomForm
        Given I am a User loading CustomForm
        When I navigate to the CustomForm
        Then CustomForm will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors