describe("Exploring Plugin API in API Testing", () => {
    it("API Test with Lifecycle Events", () => {
        const uniqueEmail = `abc${Date.now()}@gmail.com`;
        cy.userSignUp(uniqueEmail, "123456").then((data) => {
            expect(data.statusCode).to.be.eq(201); // Validating the status code to be 201
            expect(data.accessToken).to.not.be.eq(""); // Validating if the accessToken is not empty
        });
    });

});
