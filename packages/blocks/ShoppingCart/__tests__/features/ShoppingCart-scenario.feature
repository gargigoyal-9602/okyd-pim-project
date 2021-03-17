Feature: ShoppingCart

    Scenario: User navigates to ShoppingCart
        Given I am a User loading ShoppingCart
        When I navigate to the ShoppingCart
        Then ShoppingCart will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors