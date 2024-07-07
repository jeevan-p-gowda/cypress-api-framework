import AddItemRequestModel from "../models/cart/AddItemRequestModel";

class CartClient {
    static createCart(accessToken) {
        return cy.fixture("resourceEndPoints.json").then((endpoints) => {
            const { method, url } = endpoints.cart.createCart;
            cy.request({
                method: method,
                url: url,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });
    }

    static addCartItem(accessToken, product, cartID) {
        const addItemRequestModel = new AddItemRequestModel(product);

        return cy.fixture("resourceEndPoints.json").then((endpoints) => {
            const { method, url } = endpoints.cart.addCartItem;

            cy.request({
                method: method,
                url: url.replace("{CART_ID}", cartID),
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: {
                    product_id: addItemRequestModel.product_id,
                    quantity: addItemRequestModel.quantity,
                },
            });
        });
    }
}

export default CartClient;