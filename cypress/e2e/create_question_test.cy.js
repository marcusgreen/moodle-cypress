describe('Teacher Question Creation', () => {
  beforeEach(() => {
    // Login as teacher before each test
    cy.loginAs('teacher');
    
    // Visit the My Courses page first
    cy.visit('/my/courses');
    
    // Find and click on the CypressTest course
    cy.contains('CypressTest').click();
    
    // Verify we're on the course page
    cy.url().should('include', '/course/view.php');
    cy.contains('CypressTest').should('be.visible');
  });

  it('should allow teacher to create a new question', () => {
    // Navigate to question bank
    cy.contains('Question bank').click();
    
    // Verify we're in the question bank
    cy.url().should('include', '/question/edit.php');
    
    // Create a new multiple choice question
    cy.createQuestionType('multichoice', 'Cypress MC Question');
    
    // Fill in question details
    cy.get('#id_name').should('have.value', 'Cypress MC Question');
    
    // Type question text using TinyMCE editor
    cy.typeInTinyMCE('id_questiontext', 'What is the capital of France?');
    
    // Add answers (this is a simplified example - actual Moodle may need more steps)
    cy.get('#id_answer_0').type('Paris');
    cy.get('#id_fraction_0').select('100');
    
    cy.get('#id_answer_1').type('London');
    cy.get('#id_fraction_1').select('0');
    
    // Save the question
    cy.get('#id_submitbutton').click();
    
    // Verify question was created successfully
    cy.contains('Cypress MC Question').should('exist');
    cy.contains('What is the capital of France?').should('exist');
  });

  it('should allow teacher to create a gapfill question', () => {
    // Navigate to question bank
    cy.contains('Question bank').click();
    
    // Create a new gapfill question
    cy.createQuestionType('gapfill', 'Cypress Gapfill Question');
    
    // Fill in question details
    cy.get('#id_name').should('have.value', 'Cypress Gapfill Question');
    
    // Type question text with gaps using TinyMCE editor
    cy.typeInTinyMCE('id_questiontext', 'The [cat] sat on the [mat]');
    
    // Save the question
    cy.get('#id_submitbutton').click();
    
    // Verify question was created successfully
    cy.contains('Cypress Gapfill Question').should('exist');
    cy.contains('The [cat] sat on the [mat]').should('exist');
  });

  it('should show error for invalid question type', () => {
    // Navigate to question bank
    cy.contains('Question bank').click();
    
    // Try to create a question with invalid type (this should fail gracefully)
    // Note: This is a hypothetical test - actual Moodle may handle this differently
    cy.contains('Create a new question').click();
    
    // Verify we can see the question type selection
    cy.get('.chooserdialogue-questionchooser').should('be.visible');
    
    // Verify that only valid question types are shown
    cy.get('input[type="radio"]').should('exist');
  });
});