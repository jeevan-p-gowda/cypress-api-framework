const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());

      on("before:run", (details) => {
        console.log("Before API Test Run:");
        console.log(details);
      });
      on("after:run", (results) => {
        console.log("After API Test Run:");
        console.log(results);
      });

      on("before:spec", (spec) => {
        console.log("Before API Spec:");
        console.log(spec);
      });

      on("after:spec", (spec, results) => {
        console.log("After API Spec:");
        console.log(spec);
        console.log(results);
      });
    },
    specPattern: ["cypress/e2e/**.spec.{js,jsx,ts,tsx}", "cypress/e2e/features/*.feature"],
    baseUrl: "https://www.apicademy.dev/",
  },

});
