/// <reference types="cypress" />

describe('Validate API Response Attributes', () => {
    it("Retrieve products and validate response attributes", () => {
        const uniqueEmail = `test${Date.now()}@gmail.com`;

        cy.request({
            method: "POST",
            url: "/api/auth/signup",
            body: {
                email: uniqueEmail,
                password: "12345678",
            },
        }).then((response) => {
            const accessToken = response.body.data["session"]["access_token"];
            cy.wrap(accessToken).as("accessToken");
        });

        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "GET",
                url: "/api/products/",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                // Validate the content type from response headers
                cy.wrap(response.headers).its("content-type").should("eq", "application/json; charset=utf-8");

                // Ensure the API response time is acceptable
                expect(response.duration).to.be.lessThan(3000);

                // Validate successful response status
                expect(response.isOkStatusCode).to.be.eq(true);
                expect(response.statusText).to.be.eq("OK");

                // Check the sent authorization token in request headers
                expect(response.requestHeaders["Authorization"]).to.be.eq(`Bearer ${accessToken}`);
            });
        });
    });
});
