Feature: DragDropInterface

    Scenario: User navigates to DragDropInterface
        Given I am a User loading DragDropInterface
        When I navigate to the DragDropInterface
        Then DragDropInterface will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors