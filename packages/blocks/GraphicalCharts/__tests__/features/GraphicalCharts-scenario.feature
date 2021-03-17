Feature: GraphicalCharts

    Scenario: User navigates to GraphicalCharts
        Given I am a User loading GraphicalCharts
        When I navigate to the GraphicalCharts
        Then GraphicalCharts will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors