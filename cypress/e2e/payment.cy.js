describe('report for Payment Page', () => {
  const thresholds = {
    "performance": 0,
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
  it('should generate report for the Payment page', () => {

      Cypress.on('uncaught:exception', (err, runnable) => {
          return false;
        });

      // Visit the login page
      cy.visit('https://uat.synchronycredit.com/accounts/?client=amazon');
    
      // Wait for specific elements to be present
      cy.get('#userId').should('be.visible');
      cy.get('#password').should('be.visible');
      
      // Fill in the login form
      cy.get('#userId').type('amazon6586');
      cy.get('#password').type('Test12Test');
      cy.get('button').contains('Secure Login').click();
      
      // Wait for navigation and any necessary requests
      cy.wait(20000); // Adjust based on your application
      
      // Click on "GOT IT" button to dismiss any pop-ups
      cy.get('button').contains('GOT IT').click();
      
      // Wait again for the page to stabilize
      cy.wait(20000);
      
      // cy.contains('Available to spend').should('exist');
      cy.get('button').contains('Make a Payment').click();
    
      // Run the Lighthouse audit for the fully-loaded page
      // cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig).then((results) => {
      //   console.log('Lighthouse results:', results);
      // });
    });
    

});