class PaymentClient {
    static makePayment(accessToken) {
        return cy.fixture("resourceEndPoints.json").then((endpoints) => {
            const { method, url } = endpoints.payment.makePayment;
            cy.request({
                method: method,
                url: url,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });
    }
}

export default PaymentClient;