/// <reference types="cypress" />

describe('Retrieve Paginated Products List', () => {
    it("Get paginated products after successful signup", () => {
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
                qs: {
                    page: 1,
                    limit: 2,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.eq(2);
            });
        });
    });
});
