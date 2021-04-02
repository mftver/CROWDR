export default class person {
  gridId;

  xPosition;

  yPosition;

  group = [];

  constructor(gridId, xPosition, yPosition) {
    this.gridId = gridId;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
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
