Feature: InventoryManagementIntegration

    Scenario: User navigates to InventoryManagementIntegration
        Given I am a User loading InventoryManagementIntegration
        When I navigate to the InventoryManagementIntegration
        Then InventoryManagementIntegration will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors