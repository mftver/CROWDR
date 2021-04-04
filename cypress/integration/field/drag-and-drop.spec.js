context('Drag and drop testing', () => {
  beforeEach(() => {
    cy.visit('/');

    for (let index = 0; index < 7; index += 1) {
      cy.get('button[type="submit"]').click();
    }
  });


  it('Cannot drag party tent to field 0,0', () => {
    cy.get('.draggable-container .Tent3x3').trigger('mousedown');
    cy.get('[data-coord-x="1"][data-coord-y="0"]').trigger('mousemove');
    cy.get('#dragging').trigger('mouseup');

    cy.get('[data-coord-x="1"][data-coord-y="0"]').should('not.have.class', 'selected-cell')
  });

  it('Can drag party tent to field 0,1', () => {
    cy.get('.draggable-container .Tent3x3').trigger('mousedown');
    cy.get('[data-coord-x="1"][data-coord-y="1"]').trigger('mousemove');
    cy.get('#dragging').trigger('mouseup');

    cy.get('[data-coord-x="1"][data-coord-y="1"]').should('have.class', 'selected-cell')
  });

  it('Cannot place more than configured number of tents', () => {
    for (let i = 1; i <= 6; i += 3) {
      cy.get('.draggable-container .Tent3x3').trigger('mousedown');
      cy.get(`[data-coord-x="1"][data-coord-y="${i}"]`).trigger('mousemove');
      cy.get('#dragging').trigger('mouseup');
    }
    cy.get('.draggable-container .Tent3x3').should('not.be.visible')
  });
});
