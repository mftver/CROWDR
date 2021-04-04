/// <reference types="cypress" />

context('Form validation', () => {
  beforeEach(() => {
    cy.visit('/');
  });


  it('Accepts default values', () => {
    for (let index = 0; index < 7; index += 1) {
      cy.get('button[type="submit"]').click()
    }
  });
});
