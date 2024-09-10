# cypress-api-framework <img align="right" src="https://avatars.githubusercontent.com/u/8908513?s=200&v=4" width="auto" height="70" title='Cypress'/>

### 🧩Application
E-Commerce [Swagger](https://www.apicademy.dev/docs/)

[Postman publish](https://documenter.getpostman.com/view/31125524/2s9YXmWKgB)

[Postman collection](https://www.apicademy.dev/postman-collection-download). Import the downloaded JSON into Postman.

### 🏗️Pre-requisite
JavaScript foundation and beyond

### 🛠️Setup
1. Install [Git Bash](https://git-scm.com/downloads) - for Windows
2. Install [NodeJS](https://nodejs.org/en) - based on your platform
3. `git clone` the repo
4. Install [VS Code](https://code.visualstudio.com/) Editor and open the repo
5. Install Gherkin support VS code [plugin](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
6. `npm i` - installs all dependencies
7. Update your VSCode settings.json file
```json
{
    "cucumberautocomplete.syncfeatures": "**/*feature",
    "cucumberautocomplete.steps": ["cypress/support/stepDefinitions/*.spec.js"],
    "cucumberautocomplete.customParameters": [ "afterDelay" ]
}
```

### ⏯️Execution
1. `npx cypress run` - runs all the tests
2. `npx cypress run --spec "cypress/e2e/filename.js"` - runs the mentioned test/s
3. `npx cypress run --config-file config-file-path --spec test-file-path` - run with specific config
4. `npx cypress run --env TAGS=@productService` - run tagged test
> If using Windows, execute on Git Bash.


