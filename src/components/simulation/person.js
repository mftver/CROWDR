import FieldObjects from '../../js/field-objects';

export default class Person {
  priorities = [];

  gridId;

  xPosition;

  yPosition;

  group = [];

  constructor() {
    Object.entries(FieldObjects).forEach((element) => {
      this.priorities.push(element[0]);
    });
    this.reprioritize();
  }

  addToGroup(friend) {
    this.group.push(friend);
  }

  setCoordinate(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }

  setGrid(gridId) {
    this.gridId = gridId;
  }

  getGridId() {
    return this.gridId;
  }

  getxCoordinate() {
    return this.xPosition;
  }

  getyCoordinate() {
    return this.yPosition;
  }

  getGroup() {
    return this.group;
  }

  getPriorities() {
    return this.priorities;
  }

  reprioritize(weather) {
    const newPriorities = [];

    let priorityLength = Object.entries(FieldObjects).length;

    switch (weather) {
      case 'sunny':
        newPriorities.push(FieldObjects.Drinks);
        this.priorities = this.arrayRemove(this.priorities, FieldObjects.Drinks);

        newPriorities.push(FieldObjects.HighTree);
        this.priorities = this.arrayRemove(this.priorities, FieldObjects.HighTree);

        newPriorities.push(FieldObjects.WideTree);
        this.priorities = this.arrayRemove(this.priorities, FieldObjects.WideTree);

        newPriorities.push(FieldObjects.ShadowTree);
        this.priorities = this.arrayRemove(this.priorities, FieldObjects.ShadowTree);

        priorityLength -= 4;
        break;

      case 'rainy':
        newPriorities.push(FieldObjects.Tent3x3);
        this.priorities = this.arrayRemove(this.priorities, FieldObjects.Tent3x3);
        priorityLength -= 1;
        break;

      default:
        break;
    }

    // add items to the newPriorities array with items that are randomly
    // selected from the original priorities array
    for (let index = 0; index < priorityLength; index += 1) {
      const moveindex = Math.floor(Math.random() * this.priorities.length);
      newPriorities.push(this.priorities[moveindex]);
      this.priorities = this.arrayRemove(this.priorities, this.priorities[moveindex]);
    }

    this.priorities = newPriorities;
  }

  // eslint-disable-next-line class-methods-use-this
  arrayRemove(arr, value) {
    return arr.filter((ele) => ele !== value);
  }
}
