class ProductsListModel {
    constructor(response) {
        this.statusCode = response.status;
        this.products = response.body.map((product) => new ProductModel(product));
    }
}

class ProductModel {
    constructor(product) {
        this.createdAt = product.created_at;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.quantity = product.quantity;
        this.id = product.id;
        this.category_id = product.category_id;
    }
}

export default ProductsListModel;