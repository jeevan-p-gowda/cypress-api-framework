class SignupResponseModel {
    constructor(response) {
        this.statusCode = response.status;
        this.accessToken = response.body.data["session"]["access_token"];
    }
}
export default SignupResponseModel;
