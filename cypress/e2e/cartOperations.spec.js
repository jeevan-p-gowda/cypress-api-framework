/// <reference types="cypress" />

describe('Cart Operations - Creation and Deletion', () => {
    it("Creates a cart for a user and then deletes it", () => {
        const uniqueEmail = `test${Date.now()}@gmail.com`;

        // Step 1: User Signup
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

        // Step 2: Cart Creation
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "POST",
                url: "/api/cart",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                const cartId = response.body["cart_id"];
                cy.wrap(cartId).as("cartId");
            });
        });

        // Step 3: Delete the Created Cart
        Cypress.Promise.all([cy.get("@accessToken"), cy.get("@cartId")]).then(([accessToken, cartId]) => {
            cy.request({
                method: "DELETE",
                url: `/api/cart/${cartId}`,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                // Validating the status code - 204 for deletion of cart
                expect(response.status).to.be.eq(204);
            });
        });
    });
    // ... Previous code

    // Step 4: Check for Idempotency with DELETE request
    Cypress.Promise.all([cy.get("@accessToken"), cy.get("@cartId")]).then(([accessToken, cartId]) => {

        // ... Previous code

        // Making the delete request again to check for idempotency principle
        cy.request({
            method: "DELETE",
            url: `/api/cart/${cartId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => {
            // Validating the status code to be 204 after performing the DELETE operation again
            expect(response.status).to.be.eq(204);
        });

        // Step 5: Verify the Cart is Deleted
        cy.request({
            method: "GET",
            url: "/api/cart",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => {
            // Validating the "No cart found" message in the response indicates that the cart is deleted
            expect(response.body.message).to.be.eq("No cart found");
        });
    });
});
