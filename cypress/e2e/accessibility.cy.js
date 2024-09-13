describe('report for Vista dash board', () => {
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

  it('should generate report for vista dash board', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    
    // Visit the login page
    cy.visit('https://uat.synchronycredit.com/accounts/?client=amazon');

    cy.wait(20000);
    
    // Wait for specific elements to be present
    cy.get('#userId').should('be.visible');
    cy.get('#password').should('be.visible');
    
    // Fill in the login form
    cy.get('#userId').type('amazon6586');
    cy.get('#password').type('Test12Test');
    cy.get('button').contains('Secure Login').click();

    cy.wait(20000);
    
    // Wait for navigation
    cy.get('button').contains('GOT IT').click();

    cy.wait(20000);
    
    

  });
});
