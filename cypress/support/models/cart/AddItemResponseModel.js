class AddItemResponseModel {
    constructor(response) {
        this.statusCode = response.status;
        this.cart_item_id = response.body.cart_item_id;
        this.cart_id = response.body.cart_id;
        this.product_id = response.body.product_id;
        this.quantity = response.body.quantity;
        this.price = response.body.price;
    }
}

export default AddItemResponseModel;