import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";

Given(/^User creates a new account using the signup endpoint$/, () => {
    const uniqueEmail = `abc${Date.now()}@gmail.com`;
    // userSignUp is a custom command introduced in custom commands task
cy.userSignUp(uniqueEmail, "123456").as("successfulSignupResponse");

});

Then(/^Validate the 201 status code$/, () => {
    cy.get("@successfulSignupResponse").then((data) => {
        expect(data.statusCode).to.be.eq(201); // Validating the status code to be 201
    });
});

And(/^Validate the access token is returned$/, () => {
    cy.get("@successfulSignupResponse").then((data) => {
                expect(result.accessToken).to.exist; // Validating if the accessToken exists
    });
});
