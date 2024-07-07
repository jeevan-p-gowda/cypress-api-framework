// placeSuccessfulOrder.spec.js
/// <reference types="cypress" />

// Importing UserClient
import UserClient from "../support/clients/UserClient";
import SignupResponseModel from "../support/models/user/SignupResponseModel";
import ProductsListModel from "../support/models/product/ProductsListModel";
import AddItemResponseModel from "../support/models/cart/AddItemResponseModel";
import MakePaymentResponseModel from "../support/models/payment/MakePaymentResponseModel";


describe("Place order successfully", () => {
    it("should place order successfully", async () => {
        // Generate a unique email for testing
        const uniqueEmail = `abc${Date.now()}@gmail.com`;
        const password = "1234567890";

        // Signup a new user
        UserClient.signup(uniqueEmail, password).then((response) => {
            const signupResponseModel = new SignupResponseModel(response);
            // Assertion to validate status code
            expect(signupResponseModel.statusCode).to.be.equal(201);

            // Aliasing the accessToken for future API calls with authentication
            cy.wrap(signupResponseModel.accessToken).as("accessToken");

            // Fetch the product list using the stored access token
            cy.get("@accessToken").then((accessToken) => {
                ProductClient.getProductsList(accessToken).then((response) => {
                    const productsListModel = new ProductsListModel(response);
                    expect(productsListModel.statusCode).to.be.eq(200);

                    // Store the first product for later use
                    cy.wrap(productsListModel.products[0]).as("product");
                });
            });

            // Creating the cart
            cy.get("@accessToken").then((accessToken) => {
                CartClient.createCart(accessToken).then((response) => {
                    const createCartModel = new CreateCartResponseModel(response);
                    expect(createCartModel.statusCode).to.be.eq(201);
                    cy.wrap(createCartModel.cart_id).as("cartID");
                });
            });

            // Creating a cart
            Cypress.Promise.all([cy.get("@accessToken"), cy.get("@product"), cy.get("@cartID")]).then(
                ([accessToken, product, cartID]) => {
                    CartClient.addCartItem(accessToken, product, cartID).then((response) => {
                        const addItemResponseModel = new AddItemResponseModel(response);
                        expect(addItemResponseModel.statusCode).to.be.eq(201);
                    });
                }
            );
            // Make Payment
            cy.get("@accessToken").then((accessToken) => {
                PaymentClient.makePayment(accessToken).then((response) => {
                    const makePaymentResponseModel = new MakePaymentResponseModel(response);
                    expect(makePaymentResponseModel.message).to.be.eq("payment success");
                });
            });
        });

    });
});
