class AddItemRequestModel {
    constructor(product) {
        this.product_id = product.id;
        this.quantity = parseInt(product.quantity);
    }
}

export default AddItemRequestModel;