// Importing the step definition functions from the cypress-cucumber-preprocessor package
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Given step to create a new user account using a dynamic email and fixed password
Given(/^User creates a new account using signup endpoint - (.+)$/, (signupEndpoint) => {
    const uniqueEmail = `abc${Date.now()}@gmail.com`;  // Generate a unique email ID
    // Making a POST request to create a new user account
    cy.request({
        method: "POST",
        url: signupEndpoint,
        body: {
            email: uniqueEmail,
            password: "1234567890",
        },
    }).then((response) => {
        // Storing the access token for future steps
        cy.wrap(response.body.data["session"]["access_token"]).as("accessToken");
    });

});

// When step to fetch the product details for a specific product ID
When(/^User fetches the product details for (.+) using access token$/, (productID) => {
    // Retrieving the stored access token
    cy.get("@accessToken").then((accessToken) => {
        // Making a GET request to fetch the product details
        cy.request({
            method: "GET",
            url: `/api/products/${productID}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => {
            // Storing the response for validation in the Then steps
            cy.wrap({
                statusCode: response.status,
                productName: response.body.name,
            }).as("productEndpointResponse");
        });
    });
});

// Then step to validate the received status code
Then(/^Validate the status code is (.+)$/, (statusCode) => {
    // Fetching the stored response for validation
    cy.get("@productEndpointResponse").then((data) => {
        // Validating if the received status code matches the expected status code
        expect(data.statusCode).to.be.eq(parseInt(statusCode));
    });
});

// And step to validate the received product name
And(/^Validate the product name (.+)$/, (productName) => {
    // Fetching the stored response for validation
    cy.get("@productEndpointResponse").then((data) => {
        // Validating if the received product name matches the expected product name
        expect(data.productName).to.be.eq(productName);
    });
});
