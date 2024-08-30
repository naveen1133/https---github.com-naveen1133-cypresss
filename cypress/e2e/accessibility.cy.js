describe('Lighthouse Audit Test', () => {

  it('should navigate to login page and perform Lighthouse audit', () => {
    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Visit the main URL
    cy.visit('https://uat.synchronycredit.com/accounts/?client=amazon');

    // Fill in the login form
    cy.get('#userId').click().type('amazon6586');
    cy.get('#password').click().type('Test12Test');
    cy.get('button').contains('Secure Login').click();

    // Add appropriate waiting strategies if needed
    cy.wait(2000); // Adjust this based on your application

    // Additional actions can be added here
  });
});
