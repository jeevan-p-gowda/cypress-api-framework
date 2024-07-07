describe("Dev API Environment", () => {
    it("Gets the status code", () => {
        cy.request("/").then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
