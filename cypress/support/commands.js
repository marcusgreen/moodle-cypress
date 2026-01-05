// Consolidated Cypress commands for Moodle testing
// This file contains all custom commands used across the test suite

/**
 * Log in as a specific Moodle user type using session caching for performance
 * @param {string} userType - The type of user to log in as (admin, teacher, or student)
 * Uses environment variables for credentials to avoid hardcoding
 */
Cypress.Commands.add('loginAs', (userType = 'admin') => {
  // Validate user type
  if (!['admin', 'teacher', 'student'].includes(userType)) {
    throw new Error(`Invalid user type: ${userType}. Must be one of: admin, teacher, student`);
  }

  const sessionName = `${userType}-session`;
  
  // Get credentials based on user type
  let username, password;
  switch (userType) {
    case 'admin':
      username = 'admin';
      password = Cypress.env('MOODLE_ADMIN_PASSWORD');
      if (!password) {
        throw new Error('MOODLE_ADMIN_PASSWORD environment variable is not defined');
      }
      break;
    case 'teacher':
      username = Cypress.env('MOODLE_TEACHER_USERNAME');
      password = Cypress.env('MOODLE_TEACHER_PASSWORD');
      if (!username || !password) {
        throw new Error('MOODLE_TEACHER_USERNAME or MOODLE_TEACHER_PASSWORD environment variable is not defined');
      }
      break;
    case 'student':
      username = Cypress.env('MOODLE_STUDENT_USERNAME');
      password = Cypress.env('MOODLE_STUDENT_PASSWORD');
      if (!username || !password) {
        throw new Error('MOODLE_STUDENT_USERNAME or MOODLE_STUDENT_PASSWORD environment variable is not defined');
      }
      break;
  }

  // Final validation to ensure we have valid credentials
  if (!username || !password) {
    throw new Error(`Failed to get credentials for user type: ${userType}`);
  }

  cy.session(
    sessionName,
    () => {
      cy.visit('/login/index.php');
      
      // Wait for page to fully stabilize
      cy.get('form#login', { timeout: 10000 }).should('be.visible');
      cy.wait(1000); // Give JavaScript time to initialize

      // Wait for fields to be ready
      cy.get('#username', { timeout: 10000 }).should('not.be.disabled');
      cy.get('#password', { timeout: 10000 }).should('not.be.disabled');

      // Type with delay to simulate human typing
      cy.get('#username').type(username, { delay: 100 });
      cy.wait(500); // Pause between fields like a human would

      cy.get('#password').type(password, { delay: 100, log: false });
      cy.wait(500); // Pause before clicking

      cy.get('#loginbtn').should('not.be.disabled').click();

      // Verify successful login
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

/**
 * Create a new Moodle course
 * @param {string} courseName - The name for the new course
 */
Cypress.Commands.add('createNewCourse', (courseName) => {
  // 1. Navigate directly to course management page
  cy.visit('/course/management.php');

  // 2. Click on Create new course button
  cy.contains('a', 'Create new course').click();

  // 3. Fill in the Course Full Name
  cy.get('input#id_fullname, input[name="fullname"]')
    .clear()
    .type(courseName);

  // 4. Fill in a Short Name
  cy.get('input#id_shortname, input[name="shortname"]')
    .clear()
    .type(courseName + '-short');

  // 5. Submit the form - try multiple possible selectors
  cy.get('input[type="submit"][value="Save and display"], input[type="submit"][value="Save changes"], button:contains("Save")').first()
    .scrollIntoView()
    .click();

  // 6. Verify creation
  cy.contains(courseName).should('be.visible');
});

/**
 * Create a new question of specified type
 * @param {string} qtype - The question type (e.g., 'gapfill')
 * @param {string} [questionName] - Optional name for the question
 */
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

/**
 * Type content into a TinyMCE editor iframe
 * @param {string} elementId - The ID of the TinyMCE editor element
 * @param {string} content - The content to type into the editor
 */
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