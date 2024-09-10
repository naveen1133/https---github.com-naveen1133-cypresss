describe('Lighthouse Audit for Page and MFE', () => {
  const thresholds = {
    "performance": 50,
    "accessibility": 50,
    "best-practices": 50,
    "seo": 50
  };

  const lighthouseOptions = {
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
  };

  const lighthouseConfig = {
    settings: { output: "html" },
    extends: "lighthouse:default",
  };

  it('should generate Lighthouse report for the main page', () => {
    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Visit the main URL
    cy.visit('https://uat.synchronycredit.com/accounts/?client=amazon');

    // Wait for the page to load
    cy.wait(10000);

    // Fill in the login form
    cy.get('#userId').type('amazon6586');
    cy.get('#password').type('Test12Test');
    cy.get('button').contains('Secure Login').click();

    // Wait for navigation and any necessary requests
    cy.wait(20000);

    // Click on "GOT IT" button to dismiss any pop-ups
    cy.get('button').contains('GOT IT').click();

    cy.wait(20000);

    // Run Lighthouse audit for the entire page
    cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig);
  });
});