describe("Retry and Status Code Handling", () => {
    it("should handle retries and status codes gracefully", {
        retries: {
            runMode: 3,
            openMode: 2,
        }
    }, () => {
        const uniqueEmail = `abc${Date.now()}@gmail.com`;
        cy.userSignUp("invalidemail", "password").then(({ statusCode }) => {
            expect(statusCode).to.eq(400);
        });
    });
});
