class CreateCartResponseModel {
    constructor(response) {
        this.statusCode = response.status;
        this.cart_id = response.body.cart_id;
        this.user_id = response.body.user_id;
        this.created_at = response.body.created_at;
    }
}

export default CreateCartResponseModel;