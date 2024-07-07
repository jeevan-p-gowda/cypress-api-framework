@signupService
Feature: Signup Service Validations
    Scenario: Validate if a new user can successfully register
        Given User creates a new account using the signup endpoint
        Then Validate the 201 status code
        And Validate the access token is returned