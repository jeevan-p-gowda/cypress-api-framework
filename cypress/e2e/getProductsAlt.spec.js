/// <reference types="cypress" />

describe('Retrieve Products List (Alternative Approach)', () => {
    it("Get products after successful signup", () => {
        const uniqueEmail = `test${Date.now()}@gmail.com`;

        cy.request({
            method: "POST",
            url: "/api/auth/signup",
            body: {
                email: uniqueEmail,
                password: "password123",
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
                expect(response.status).to.eq(200);
                expect(response.body[0]).to.have.all.keys("created_at", "name", "description", "price", "quantity", "id", "category_id");
            });
        });
    });
});
