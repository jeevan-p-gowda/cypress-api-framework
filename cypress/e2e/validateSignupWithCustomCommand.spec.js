describe('Signup Validation using Custom Command', () => {
    it('Validates the signup process', () => {
      // Utilizing the custom command
      cy.userSignUp('example@test.com', 'testPassword123').then((result) => {
        expect(result.statusCode).to.eq(201); // Validating the status code to be 201
        expect(result.accessToken).to.exist; // Validating if the accessToken exists
      });
    });
  });
  