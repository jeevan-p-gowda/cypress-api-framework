/// <reference types="cypress" />

describe('Products Endpoint Validation Without Authorization', () => {
    it("Get products without auth header", () => {
        cy.request({
            method: "GET",
            url: "/api/products/",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body.message).to.eq("Authorization header is missing.");
        });
    });
});
