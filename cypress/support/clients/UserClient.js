// Importing SignupRequestModel
import SignupRequestModel from "../models/user/SignupRequestModel";

// UserClient Class Definition
class UserClient {
    static signup(email, password) {
        const requestModel = new SignupRequestModel({ email, password });

        // Load the fixture and make a request
        return cy.fixture("resourceEndPoints.json").then((endpoints) => {
            cy.request({
                method: endpoints.auth.signUp.method,
                url: endpoints.auth.signUp.url,
                body: {
                    email: requestModel.email,
                    password: requestModel.password,
                },
            });
        });
    }
}

export default UserClient;
