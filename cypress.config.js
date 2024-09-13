const { defineConfig } = require('cypress');
const lighthouse = require('cypress-audit').lighthouse;
const prepareAudit = require('cypress-audit').prepareAudit;
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    // pageLoadTimeout: 120000,
    specPattern: 'cypress/e2e/**/*.cy.js',

    setupNodeEvents(on, config) {
      // Configure mochawesome for reporting
      require('cypress-mochawesome-reporter/plugin')(on);

      // Add Lighthouse integration
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        lighthouse: lighthouse((lighthouseReport) => {
          const folderPath = 'reports'; // Define the folder where Lighthouse reports will be saved
          const filename = path.join(folderPath, 'lighthouse-report.html');

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
          }

          fs.writeFile(filename, lighthouseReport.report, (error) => {
            if (error) {
              console.error('Error writing Lighthouse report:', error);
            } else {
              console.log(`Lighthouse report saved as ${filename}`);
            }
          });
        }),
      });
    },


    // Add any other required configuration settings here
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  }
});
