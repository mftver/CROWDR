import Person from './person';
import simulation from './simulation.html';

export default class simulationGrid extends HTMLElement {
  visitors = [];

  visitorsInside = [];

  constructor() {
    super();
    this.innerHTML = simulation;
    this.createPeople();
  }

  connectedCallback() {
    this.placeAllGrids();
  }

  placeAllGrids() {
    for (let index = 1; index < 7; index += 1) {
      const field = localStorage.getItem(`field:${index}`);
      if (field !== null) {
        this.innerHTML += `<field-grid data-field-id="${index}" data-show-placeables="false"></field-grid>`;
        // This doesn't seem to work
        // const grid = document.createElement('field-grid');
        // grid.setAttribute('data-grid-id', index);
        // grid.setAttribute('data-show-placeables', false);
        // this.appendChild(grid);
      } else {
        break;
      }
    }
  }

  createPeople() {
    for (let index = 0; index < this.getMaxVisitors(); index += 1) {
      this.visitors.push(new Person());
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getMaxVisitors() {
    let numberOfPeople = 0;
    for (let index = 1; index < 7; index += 1) {
      const localstorageItem = localStorage.getItem(`fieldConfig:${index}`);
      if (localstorageItem !== null) {
        numberOfPeople = +JSON.parse(localstorageItem).MaxNumberofVisitors;
      } else {
        break;
      }
    }
    return numberOfPeople;
  }

  positionPeople() {
    this.visitorsInside.forEach((visitor) => {
      this.placeVisitor(visitor);
      visitor.reprioritize();
    });
  }

  placeVisitor(visitor){

  }
}
