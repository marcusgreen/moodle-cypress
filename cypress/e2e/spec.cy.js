context('Actions', () => {
  beforeEach(() => {
    cy.visit('/login/index.php')
  })
  it('is true', () => {

  cy.get('#username')
  .type('admin');

  cy.get('#password')
  .type('password');
  cy.get('#loginbtn').click();
  cy.visit('https://master.localhost/course/management.php');


  if(cy.contains('Cypress test course 101')) {
    pause();
  }
  cy.get('a').contains('Create new course').click();
  cy.get('#id_fullname')
  .type('Cypress test course 101');
  cy.get('#id_shortname')
  .type('CYTC101');
  cy.get('#id_saveanddisplay').click();
  // cy.get('button').contains('More').click();
})
  // TODO: Fix the More button issue - it may need similar handling as the dropdown

})
