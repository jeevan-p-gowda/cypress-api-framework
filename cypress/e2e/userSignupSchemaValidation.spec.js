describe("User Signup Schema Validation [Optional]", () => {
    it("should signup the user successfully and validate the response schema", () => {
        // Load schema file
        cy.fixture("SignupResponseSchema.json").then((signupResponseSchema) => {
            const uniqueEmail = `abc${Date.now()}@gmail.com`;
            // Make the API request
            cy.request({
                method: "POST",
                url: "/api/auth/signup",
                body: {
                    email: uniqueEmail,
                    password: "12345678",
                },
            }).then((response) => {
                // Check status code
                expect(response.status).to.eq(201);

                // Validate the schema
                cy.validateSchema(response, signupResponseSchema).then((isValidSchema) => {
                    expect(isValidSchema).to.be.eq(true);
                });
            });
        });
    });

});