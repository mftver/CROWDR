/// <reference types="cypress" />

context('Form validation', () => {
  beforeEach(() => {
    cy.visit('/');
  });


  it('Accepts default values', () => {
    for (let index = 0; index < 7; index += 1) {
      cy.get('button[type="submit"]').click();
    }

    cy.location('href').should('include', '/#/grid/1');
  });


  it("Reset button should reset form", () => {
    for (let index = 0; index < 5; index += 1) {
      cy.get('button[type="submit"]').click();
    }
    cy.get('#reset-form').click();
    cy.get('[name="NumberOfBins"]').should('not.exist');
    });
});
