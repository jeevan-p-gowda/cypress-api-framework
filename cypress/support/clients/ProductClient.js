class ProductClient {
    static getProductsList(accessToken) {
        return cy.fixture("resourceEndPoints.json").then((endpoints) => {
            const { method, url } = endpoints.product.getProductsList;

            return cy.request({
                method: method,
                url: url,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        });
    }
}

export default ProductClient;