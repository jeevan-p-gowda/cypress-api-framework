// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import Ajv from 'ajv';

// Custom command for user signup
Cypress.Commands.add("userSignUp", (email, password) => {
    cy.fixture("resourceEndPoints.json").then((endpoints) => {
        const { method, url } = endpoints.auth.signUp;
        cy.request({
            method: method,
            url: url,
            body: {
                email: email,
                password: password,
            },
            failOnStatusCode: false,
        }).then((response) => {
            if (response.status === 201) {
                const accessToken = response.body.data["session"]["access_token"];
                return {
                    statusCode: response.status,
                    accessToken: accessToken,
                };
            }
            if (response.status === 401) {
                return {
                    statusCode: response.status,
                    message: response.body.error,
                };
            }
        });
    });
});

// Custom command to validate JSON schema
Cypress.Commands.add("validateSchema", (response, schema) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(response.body);
    return valid;
});
