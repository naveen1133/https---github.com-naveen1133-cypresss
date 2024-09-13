const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const fs = require('fs');
const path = require('path');


module.exports = (on, config) => {
  // Lighthouse Report Setup
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });
  require('cypress-mochawesome-reporter/plugin')(on);

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
};
