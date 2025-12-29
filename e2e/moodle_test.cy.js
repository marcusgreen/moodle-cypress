describe('Moodle Course Management', () => {
    beforeEach(() => {
      cy.loginAsAdmin(); // Uses the session we created earlier
    });
it('should create a gapfill question type', () => {
  //  cy.createNewCourse('cyQuiz');


  cy.visit('/question/edit.php?courseid=7');

  // 1. Create the question shell
  cy.createQuestionType('gapfill','CatMat');


  cy.typeInTinyMCE('id_questiontext', 'The [cat] sat on the [mat]');

  // 4. Save the question (optional step to complete the flow)
  cy.get('#id_submitbutton').click();

  // Verify success
  cy.contains('CatMat').should('exist');

});

});

