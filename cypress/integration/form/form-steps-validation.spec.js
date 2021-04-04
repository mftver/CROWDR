/// <reference types="cypress" />

context('Form validation', () => {
  beforeEach(() => {
    cy.visit('/');

    for (let index = 0; index < 6; index += 1) {
      cy.get('button[type="submit"]').click();
    }
  });

  it("Should not allow more than 3 food stands", () => {
    // Food stands
    cy.get('[name="Tent1x1"]').clear().type(4);
    cy.get('button[type="submit"]').click();
    cy.get('.alert').should('contain.text', 'Het aantal eetkraampjes mag niet meer dan 3 zijn');
  })

  it("Should not allow more party tents than there is field space", () => {
    // Party tents
    cy.get('[name="Tent3x3"]').clear().type(30);
    cy.get('button[type="submit"]').click();
    cy.get('.alert').should('contain.text', 'Het aantal tenten past niet');
  });

  it("Should not have more than 3 food stands in field with tents", () => {
    // Food stands
    cy.get('[name="Tent3x3"]').clear().type(1);
    cy.get('[name="Tent1x1"]').clear().type(4);
    cy.get('button[type="submit"]').click();
    cy.get('.alert').should('contain.text', 'Het aantal eetkraampjes mag niet meer dan 3 zijn');
  });

  it("Should not have more than 6 food stands in field with tents", () => {
    // Food stands
    cy.get('[name="Tent3x3"]').clear().type(0);
    cy.get('[name="Tent1x1"]').clear().type(7);
    cy.get('button[type="submit"]').click();
    cy.get('.alert').should('contain.text', 'Het aantal eetkraampjes mag niet meer dan 6 zijn');
  });

  it('Should not allow more than 2 drink stands in field with tents', () => {
    // Drink stands
    cy.get('[name="Tent3x3"]').clear().type(1);
    cy.get('[name="Drinks"]').clear().type(3);
    cy.get('button[type="submit"]').click();

    cy.get('.alert').should('contain.text', 'Het aantal drankkraampjes mag niet meer dan 2 zijn');
  });

  it('Should not allow more than 4 drink stands in field without', () => {
    // Drink stands
    cy.get('[name="Tent3x3"]').clear().type(0);
    cy.get('[name="Drinks"]').clear().type(5);
    cy.get('button[type="submit"]').click();

    cy.get('.alert').should('contain.text', 'Het aantal drankkraampjes mag niet meer dan 4 zijn');
  });

  it('Should not have more than 5 toilet buildings', () => {
    // Toilet buildingds
    cy.get('[name="Toilets"]').clear().type(6);
    cy.get('button[type="submit"]').click();

    cy.get('.alert').should('contain.text', 'Het aantal toiletten mag niet meer dan 5 zijn');
  });

  it('Bins cannot occupy more than 5% of field space', () => {
    // Bins
    cy.get('input').each((el) => cy.wrap(el).clear().type(0));
    cy.get('[name="MaxNumberofVisitors"]').type(1);

    const maxNumberOfBinsPlusOne = Math.floor((15*15/100)*5)+1;
    cy.get('[name="NumberOfBins"]').clear().type(maxNumberOfBinsPlusOne)

    cy.get('button[type="submit"]').click();

    cy.get('.alert').should('contain.text', 'Het aantal prullenbakken mag niet meer dan 5% van de overige ruimte zijn');
  });

  it('Can occupy exactly 5% of field space', () => {
    // Bins
    cy.get('input').each((el) => cy.wrap(el).clear().type(0));
    cy.get('[name="MaxNumberofVisitors"]').type(1);

    const maxNumberOfBins = Math.floor((15*15/100)*5);
    cy.get('[name="NumberOfBins"]').clear().type(maxNumberOfBins)

    cy.get('button[type="submit"]').click();

    cy.location('href').should('include', '/#/grid/1');
  });
});
