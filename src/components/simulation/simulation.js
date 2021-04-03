import simulation from './simulation.html';

export default class simulationGrid extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = simulation;
    this.placeAllGrids();
  }

  placeAllGrids() {
    for (let index = 1; index < 7; index += 1) {
      const field = localStorage.getItem(`field:${index}`);
      if (field !== null) {
        const grid = document.createElement('field-grid');
        grid.setAttribute('data-grid-id', index);
        grid.setAttribute('data-show-placeables', false);
        this.appendChild(grid);
      } else {
        break;
      }
    }
  }
}
