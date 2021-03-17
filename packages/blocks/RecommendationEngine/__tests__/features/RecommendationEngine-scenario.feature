Feature: RecommendationEngine

    Scenario: User navigates to RecommendationEngine
        Given I am a User loading RecommendationEngine
        When I navigate to the RecommendationEngine
        Then RecommendationEngine will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors