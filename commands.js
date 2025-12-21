Cypress.Commands.add('loginAsAdmin', () => {
  cy.session('admin-session', () => {
    cy.visit('/login/index.php');
    cy.screenshot('debug-login-page');

    // Wait for the page to load and target visible elements
    cy.get('#username:visible').should('be.visible').type('admin');
    cy.get('#password:visible').should('be.visible').type('Password1!', { log: false });
    cy.get('#loginbtn:visible').should('be.visible').click();

    // Verify login success - should redirect to dashboard, not stay on login page
   // cy.url().should('not.include', '/login/index.php');
    cy.url().should('include', '/my/'); // or whatever your post-login URL is

    // Additional verification that user is logged in
    cy.get('.usermenu, .user-menu', { timeout: 10000 }).should('exist');
  });
});

Cypress.Commands.add('createQuestionType', (qtype) => {
  // Click the "Create a new question" button
  cy.contains('button', 'Create a new question', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Wait for the question chooser dialog to appear
  cy.get('.chooserdialogue-questionchooser', { timeout: 10000 }).should('be.visible').within(() => {
    // Use template literal correctly to build the selector
    cy.get(`#item_qtype_${qtype}`).scrollIntoView().should('be.visible').check();
    cy.get('input[value="Add"]').should('be.visible').click();
  });

  // Wait for the question creation form to load
  cy.url().should('include', '/question/bank/editquestion');
});
