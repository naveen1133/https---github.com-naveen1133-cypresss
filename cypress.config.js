const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 200000,
    pageLoadTimeout: 200000,
  chromeWebSecurity: false,
  video: false,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  
  e2e: {
    // pageLoadTimeout: 120000,
    specPattern: 'cypress/e2e/**/*.cy.js',

    setupNodeEvents(on, config) {
        return require('./cypress/plugins/index.js')(on, config)
    },
  }
});