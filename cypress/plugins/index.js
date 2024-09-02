const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const fs = require("fs");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      // Specify the report file name. This will be overwritten on each test run.
      const filename = `lighthouse-report.html`;

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
