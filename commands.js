Cypress.Commands.add('loginAsAdmin', () => {
  cy.session(
    'admin-session',
    () => {
      cy.visit('/login/index.php');
      
      // Wait for page to fully stabilize
      cy.get('form#login', { timeout: 10000 }).should('be.visible');
      cy.wait(1000); // Give JavaScript time to initialize

      // Wait for fields to be ready
      cy.get('#username', { timeout: 10000 }).should('not.be.disabled');
      cy.get('#password', { timeout: 10000 }).should('not.be.disabled');

      // Type with delay to simulate human typing
      cy.get('#username').type('admin', { delay: 100 });
      cy.wait(500); // Pause between fields like a human would

      cy.get('#password').type(Cypress.env('MOODLE_ADMIN_PASSWORD'), { delay: 100, log: false });
      cy.wait(500); // Pause before clicking

      cy.get('#loginbtn').should('not.be.disabled').click();

      cy.url({ timeout: 15000 }).should('include', '/my/');
      cy.get('a#user-menu, .usermenu', { timeout: 10000 }).should('exist');
    },
    {
      validate() {
        cy.visit('/my/', { failOnStatusCode: false });
        cy.url().should('not.include', 'login');
      }
    }
  );
});

Cypress.Commands.add('createQuestionType', (qtype, questionName) => {
  // Click the "Create a new question" button
  cy.contains('button', 'Create a new question', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Wait for the question chooser dialog to appear
  cy.get('.chooserdialogue-questionchooser', { timeout: 10000 }).should('be.visible').within(() => {
    // Select the question type
    cy.get('#item_qtype_' + qtype).scrollIntoView().should('be.visible').check();
    cy.get('input[value="Add"]').should('be.visible').click();
  });

  // Wait for the question creation form to load
  cy.url().should('include', '/question/bank/editquestion');

  // Fill in the question name if provided
  if (questionName) {
      cy.get('#id_name')
       .should('be.visible')
       .clear()
        .type(questionName);
  }
});
Cypress.Commands.add('typeInTinyMCE', (elementId, content) => {
  // 1. Wait for the TinyMCE iframe to exist and be loaded
  cy.get(`#${elementId}_ifr`)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .as('tinymceBody');

  // 2. Clear and type into the body of the iframe
  cy.get('@tinymceBody')
    .clear()
    .type(content);
});

