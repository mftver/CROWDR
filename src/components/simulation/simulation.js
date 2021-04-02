import simulation from './simulation.html';

export default class simulationGrid extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = simulation;
    this.placeAllGrids();
  }

  placeAllGrids() {
    for (let index = 0; index < 6; index += 1) {
      const field = localStorage.getItem(`field:${index}`);
      if (field !== null) {
        const grid = this.createElement('field-grid');
        grid.setAtribute('data-grid-id', index);
        grid.setAtribute('data-show-placeables', false);
        this.appendChild(grid);
      }
    }
  }
}
