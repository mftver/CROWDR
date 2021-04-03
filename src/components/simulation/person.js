import FieldObjects from '../../js/field-objects';

export default class person {
  priorities = [];

  gridId;

  xPosition;

  yPosition;

  group = [];

  constructor(gridId, xPosition, yPosition) {
    this.gridId = gridId;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    FieldObjects.forEach((element) => {
      this.priorities.push(element);
    });
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
}
