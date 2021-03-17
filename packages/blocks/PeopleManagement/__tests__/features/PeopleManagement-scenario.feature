Feature: PeopleManagement

    Scenario: User navigates to PeopleManagement
        Given I am a User loading PeopleManagement
        When I navigate to the PeopleManagement
        Then PeopleManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors