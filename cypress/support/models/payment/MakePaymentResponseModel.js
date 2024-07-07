class MakePaymentResponseModel {
    constructor(response) {
        this.statusCode = response.status;
        this.message = response.body.message;
        this.amount_paid = response.body.amount_paid;
    }
}

export default MakePaymentResponseModel;