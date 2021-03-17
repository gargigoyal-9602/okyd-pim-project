Feature: OrderDetailView

    Scenario: User navigates to OrderDetailView
        Given I am a User loading OrderDetailView
        When I navigate to the OrderDetailView
        Then OrderDetailView will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors