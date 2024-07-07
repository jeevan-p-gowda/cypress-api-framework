@productService
Feature: Product Details API validations
    Scenario Outline: Validate the product name for a particular product ID - <productID>
        Given User creates a new account using signup endpoint - <signupEndpoint>
        When User fetches the product details for <productID> using access token
        Then Validate the status code is <statusCode>
        And Validate the product name <productName>
Examples:
    | signupEndpoint   | productID                            | statusCode | productName |
    | /api/auth/signup | 5e8d71e4-adfe-4dd8-ad9c-e8e845e03b21 | 200        | Smartphone  |
    | /api/auth/signup | 9296aaaf-3dbf-415f-8e42-d427b9c7c346 | 200        | Laptop      |
