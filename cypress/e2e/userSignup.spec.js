/// <reference types="cypress" />

describe('User Signup Flow', () => {
    it("Successfully registers a user", () => {
        cy.request({
            method: "POST",
            url: "/api/auth/signup",
            body: {
                email: "testuser@gmail.com",
                password: "password123",
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.keys("user", "session");
        });
    });

    it("Validates deep properties with both notations", () => {
        // Generate a unique email for testing
        const uniqueEmail = `abc${Date.now()}@gmail.com`;

        cy.request({
            method: "POST",
            url: "/api/auth/signup",
            body: {
                email: uniqueEmail,
                password: "12345678",
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("data");
            expect(response.body.data).to.have.keys("user", "session");

            // Deep property assertions using dot notation
            expect(response.body.data.user.email).to.eq(uniqueEmail);
            expect(response.body.data.session.token_type).to.eq("bearer");

            // Deep property assertion using bracket notation
            expect(response["body"]["data"]["session"]["refresh_token"]).to.not.be.empty;
        });
    });

    it("Validates multiple data points in API response using aliases", () => {
        const uniqueEmail = `abc${Date.now()}@gmail.com`;

        cy.request({
            method: "POST",
            url: "/api/auth/signup",
            body: {
                email: uniqueEmail,
                password: "12345678",
            },
        }).as('signupRequest');

        cy.get('@signupRequest').then((response) => {
            const responseData = response.body.data;

            expect(responseData.user.id).to.eq(responseData.session.user.id);
            expect(responseData.user.aud).to.eq("authenticated");
            expect(responseData.user.role).to.eq("authenticated");
            expect(responseData.user.email).to.eq(uniqueEmail);
            expect(responseData.user.email).to.eq(responseData.session.user.email);
            expect(responseData.user.email).to.eq(responseData.user.identities[0].identity_data.email);
            expect(responseData.user.app_metadata.provider).to.eq("email");
            expect(responseData.user.identities[0].provider).to.eq("email");
            expect(responseData.session.expires_in).to.eq(3600);
            expect(responseData.user.created_at).to.not.be.empty;
            expect(responseData.user.updated_at).to.not.be.empty;
            expect(responseData.user.identities[0].created_at).to.not.be.empty;
            expect(responseData.user.identities[0].updated_at).to.not.be.empty;
        });
    });
});
