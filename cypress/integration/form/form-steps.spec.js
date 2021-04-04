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

  it("Doesn't allow more than 3 food stands", () => {
    for (let index = 0; index < 6; index += 1) {
      cy.get('button[type="submit"]').click();
    }


    cy.get('[name="Tent1x1"]').type(4);
    cy.get('button[type="submit"]').click();

    cy.get('.alert').should('contain.text', 'Het aantal eetkraampjes mag niet meer dan 3 zijn');
  })
});
