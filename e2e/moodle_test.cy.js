describe('Moodle Course Management', () => {
    beforeEach(() => {
      cy.loginAsAdmin(); // Uses the session we created earlier
    });
it('should create a gapfill question type', () => {
    cy.createNewCourse('cyQuiz');


  // cy.visit('/question/edit.php?courseid=7');

  // // 1. Create the question shell
  // cy.createQuestionType('gapfill');

  // // 2. Fill standard text fields
  // cy.get('#id_name')
  //   .should('be.visible')
  //   .clear()
  //   .type('CatMat');

  // // 3. Use the new command for the TinyMCE field
  // // Moodle's "Question Text" field ID is usually 'id_questiontext'
  // cy.typeInTinyMCE('id_questiontext', 'The [cat] sat on the [mat]');

  // // 4. Save the question (optional step to complete the flow)
  // cy.get('#id_submitbutton').click();

  // // Verify success
  // cy.contains('CatMat').should('exist');

});

  });

