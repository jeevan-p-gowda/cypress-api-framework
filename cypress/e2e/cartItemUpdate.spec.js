/// <reference types="cypress" />

describe('Cart Operations - Add and Update Cart Item', () => {
    it("Adds an item to the cart and updates it", () => {
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

        // Step 2: List Products
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "GET",
                url: "/api/products/",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                cy.wrap(response.body).as("products");
            });
        });

        // Step 3: Create Cart
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

        // Step 4: Add Item to Cart and Update It
        Cypress.Promise.all([cy.get("@accessToken"), cy.get("@products"), cy.get("@cartId")]).then(
            ([accessToken, products, cartId]) => {
                // Create cart item
                cy.request({
                    method: "POST",
                    url: `/api/cart/${cartId}/items`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: {
                        product_id: products[0].id, // Here initially we are going to create the cart item with first product in the array
                        quantity: 10,
                    },
                }).then((response) => {
                    expect(response.body.quantity).to.be.eq(10);

                    const cartItemId = response.body.cart_item_id;

                    // Update cart item
                                        // PUT API call to update the quantity to 20 or any such number
                    cy.request({
                        method: "PUT",
                        url: `/api/cart/${cartId}/items/${cartItemId}`,
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: {
                            product_id: products[1].id, // New product ID update
                            quantity: 20,
                        },
                    }).then((response) => {
                                                // Validating the updating of product itself ( present at index - 1 of products array )
                        expect(response.body.product_id).to.be.eq(products[1].id);
                                                // Validating the updating quantity to 20 products
                        expect(response.body.quantity).to.be.eq(20);
                    });
                });
            }
        );
    });
});
