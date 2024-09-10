const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const fs = require('fs');
const path = require('path');
// const merge = require('mochawesome-merge'); // Use correct import
// const reporter = require('mochawesome-report-generator');

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

  // Mochawesome Report Setup
//   on('after:run', async () => {
//     try {
//       // Merge reports
//       const report = await merge({ files: ['cypress/reports/*.json'] });
//       // Generate the final report
//       await reporter.create(report, { reportDir: 'cypress-report' });
//       console.log('Mochawesome report generated successfully.');
//     } catch (err) {
//       console.error('Error generating Mochawesome report:', err);
//     }
//   });
};
