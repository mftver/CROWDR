/* eslint-disable class-methods-use-this */
import Person from './person';
import simulation from './simulation.html';
import FieldObjects from '../../js/field-objects';

export default class SimulationGrid extends HTMLElement {
  visitorsOutside = [];

  visitorsInsideUnplaced = [];

  visitorsInsidePlaced = [];

  ticketScanners = [];

  connectedCallback() {
    this.innerHTML = simulation;
    this.placeAllGrids();
    this.createPeople();
    this.formGroups();
  }

  placeAllGrids() {
    for (let index = 1; index < 7; index += 1) {
      const field = localStorage.getItem(`fieldConfig:${index}`);
      if (field !== null) {
        this.innerHTML += `<field-grid data-field-id="${index}" data-show-placeables="false"></field-grid>`;
      } else {
        break;
      }
    }
  }

  createPeople() {
    for (let index = 0; index < this.getMaxVisitors(); index += 1) {
      this.visitorsOutside.push(new Person());
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

  formGroups() {
    for (let i = 0; i < this.visitorsOutside.length; i += 1) {
      const groupOfVisitors = [];

      // decide the size of the group
      let groupsize = this.ticketScanners.push(Math.floor(Math.random() * 4) + 1);

      // if the random group size is too high lower the groupsize to the maximum
      if (groupsize + i > this.visitorsOutside.length) {
        groupsize = this.visitorsOutside.length - i - 1;
      }

      // get the persons to add
      for (let j = 0; j < groupsize; j += 1) {
        groupOfVisitors.push(this.visitorsOutside[i + j]);
      }

      // add them to eachothers group
      groupOfVisitors.forEach((visitor) => {
        groupOfVisitors.forEach((visitorToAdd) => {
          if (visitor !== visitorToAdd) {
            visitor.addToGroup(visitorToAdd);
          }
        });
      });

      // skip the next people since they already ar in a group
      i += groupsize - 1;
    }
  }

  positionPeople() {
    this.visitorsInsideUnplaced = this.visitorsInsidePlaced;
    this.visitorsInsidePlaced = [];

    this.visitorsInsideUnplaced.forEach((visitor) => {
      this.placeVisitorWithGroup(visitor);
      visitor.reprioritize();
    });
  }

  createTicketScanners(number) {
    for (let index = 0; index < number; index += 1) {
      this.ticketScanners.push(Math.floor(Math.random() * 3) + 1);
    }
  }

  letPeopleEnter(timeBetweenScansInSeconds) {
    this.ticketScanners.forEach((ticketscanner) => {
      const numberOfPeopleToLetIn = timeBetweenScansInSeconds / ticketscanner;

      for (let index = 0; index < numberOfPeopleToLetIn; index += 1) {
        this.visitorsInsidePlaced.push(this.visitorsOutside[index]);

        this.visitorsOutside[index].getGroup().forEach((groupmember) => {
          this.visitorsInsidePlaced.push(groupmember);
        });

        // eslint-disable-next-line max-len
        this.visitorsOutside = this.visitorsOutside.splice(index, this.visitorsOutside[index].getGroup().length);
      }
    });
  }

  placeVisitorWithGroup(visitor) {
    for (let index = 0; index < visitor.getPriorities().length; index += 1) {
      if (this.placeVisitorWithGroupOnPriority(visitor, visitor.getPriorities()[index])) {
        return;
      }
    }
    this.placeVisitorDefault(visitor);
  }

  placeVisitorWithGroupOnPriority(visitor, priority) {
    const prefferedFieldObjects = this.getFieldObjects(priority);

    if (prefferedFieldObjects === null) {
      return false;
    }

    switch (priority) {
      case FieldObjects.Tent3x3:
        return this.placeVisitorWithGroupIn3x3(visitor, prefferedFieldObjects);
      case FieldObjects.Tent1x1:
        return this.placeVisitorWithGroupIn1x1(visitor, prefferedFieldObjects);
      case FieldObjects.Drinks:
        return this.placeVisitorWithGrouprInDrink(visitor, prefferedFieldObjects);
      case FieldObjects.HighTree:
        return this.placeVisitorWithGroupIn1x1(visitor, prefferedFieldObjects);
      case FieldObjects.WideTree:
        return this.placeVisitorWithGroupInWideTree(visitor, prefferedFieldObjects);
      case FieldObjects.ShadowTree:
        return this.placeVisitorWithGrouprIn3x3(visitor, prefferedFieldObjects);
      default:
        return this.placeVisitorWithGroupInToilet(visitor, prefferedFieldObjects);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getFieldObjects(priority) {
    const fieldObjectscoordinates = [];

    for (let i = 1; i < 7; i += 1) {
      for (let x = 0; x < 15; x += 1) {
        for (let y = 0; y < 15; y += 1) {
          const field = JSON.parse(localStorage.getItem(`field:${i}`));
          if (field === null) {
            return fieldObjectscoordinates;
          }

          if (field[x][y] === priority) {
            fieldObjectscoordinates.push({ id: i, xcoordinate: x, ycoordinate: y });
          }
        }
      }
    }
    return fieldObjectscoordinates;
  }

  placeVisitorWithGroupIn3x3(visitor, prefferedFieldObjects) {
    // check all the preffered objects if there is a spot
    // eslint-disable-next-line consistent-return
    prefferedFieldObjects.forEach((fieldObject) => {
      // determine the coordinate of the fieldObject
      // eslint-disable-next-line max-len
      const coordinate = { id: fieldObject[0], xcoordinate: fieldObject[1] - 1, ycoordinate: fieldObject[2] - 1 };

      // check all the coordinates of the fieldObject
      for (let x = 0; x < 3; x += 1) {
        for (let y = 0; y < 3; y += 1) {
          // eslint-disable-next-line max-len
          if (this.doMoreVisitorsFit(coordinate[0], coordinate[1] + x, coordinate[2] + y, visitor.getGroup().length + 1)) {
            // eslint-disable-next-line max-len
            this.placeVisitorWithGroupOnCoordinate(visitor, { id: coordinate[0], xcoordinate: coordinate[1] + x, ycoordinate: coordinate[2] + y });

            return true;
          }
        }
      }
    });
    return false;
  }

  placeVisitorWithGroupIn1x1(visitor, prefferedFieldObjects) {
    // check all the preffered objects if there is a spot
    // eslint-disable-next-line consistent-return
    prefferedFieldObjects.forEach((fieldObject) => {
      // determine the coordinate of the fieldObject
      // eslint-disable-next-line max-len
      const coordinate = { id: fieldObject[0], xcoordinate: fieldObject[1], ycoordinate: fieldObject[2] };

      // check if the persons group can be placed on the coordinate
      // eslint-disable-next-line max-len
      if (this.doMoreVisitorsFit(coordinate[0], coordinate[1], coordinate[2], visitor.getGroup().length + 1)) {
        this.placeVisitorWithGroupOnCoordinate(visitor, coordinate);

        return true;
      }
    });
    return false;
  }

  placeVisitorWithGroupInDrink(visitor, prefferedFieldObjects) {
    // check all the preffered objects if there is a spot
    // eslint-disable-next-line consistent-return
    prefferedFieldObjects.forEach((fieldObject) => {
      // determine the coordinate of the fieldObject
      // eslint-disable-next-line max-len
      const coordinate = { id: fieldObject[0], xcoordinate: fieldObject[1], ycoordinate: fieldObject[2] };

      // check all the coordinates of the fieldObject
      for (let x = 0; x < 2; x += 1) {
        // eslint-disable-next-line max-len
        if (this.doMoreVisitorsFit(coordinate[0], coordinate[1] + x, coordinate[2], visitor.getGroup().length + 1)) {
          // eslint-disable-next-line max-len
          this.placeVisitorWithGroupOnCoordinate(visitor, { id: coordinate[0], xcoordinate: coordinate[1] + x, ycoordinate: coordinate[2] });

          return true;
        }
      }
    });
    return false;
  }

  placeVisitorWithGroupInWideTree(visitor, prefferedFieldObjects) {
    // check all the preffered objects if there is a spot
    // eslint-disable-next-line consistent-return
    prefferedFieldObjects.forEach((fieldObject) => {
      // determine the coordinate of the fieldObject
      // eslint-disable-next-line max-len
      const coordinate = { id: fieldObject[0], xcoordinate: fieldObject[1], ycoordinate: fieldObject[2] };

      // check all the coordinates of the fieldObject
      for (let y = 0; y < 2; y += 1) {
        // eslint-disable-next-line max-len
        if (this.doMoreVisitorsFit(coordinate[0], coordinate[1], coordinate[2] + y, visitor.getGroup().length + 1)) {
          // eslint-disable-next-line max-len
          this.placeVisitorWithGroupOnCoordinate(visitor, { id: coordinate[0], xcoordinate: coordinate[1], ycoordinate: coordinate[2] + y });

          return true;
        }
      }
    });
    return false;
  }

  placeVisitorWithGroupInToilet(visitor, prefferedFieldObjects) {
    // check all the preffered objects if there is a spot
    // eslint-disable-next-line consistent-return
    prefferedFieldObjects.forEach((fieldObject) => {
      // determine the coordinate of the fieldObject
      // eslint-disable-next-line max-len
      const coordinate = { id: fieldObject[0], xcoordinate: fieldObject[1] - 1, ycoordinate: fieldObject[2] };

      // check all the coordinates of the fieldObject
      for (let x = 0; x < 3; x += 1) {
        // eslint-disable-next-line max-len
        if (this.doMoreVisitorsFit(coordinate[0], coordinate[1] + x, coordinate[2], visitor.getGroup().length + 1)) {
          // eslint-disable-next-line max-len
          this.placeVisitorWithGroupOnCoordinate(visitor, { id: coordinate[0], xcoordinate: coordinate[1] + x, ycoordinate: coordinate[2] });

          return true;
        }
      }
    });
    return false;
  }

  placeVisitorWithGroupDefault(visitor) {
    // check all the grid elements
    for (let i = 1; i < 7; i += 1) {
      for (let x = 0; x < 15; x += 1) {
        for (let y = 0; y < 15; y += 1) {
          // eslint-disable-next-line max-len
          if (this.doMoreVisitorsFit(i, x, y, visitor.getGroup().length + 1)) {
            // eslint-disable-next-line max-len
            this.placeVisitorWithGroupOnCoordinate(visitor, { id: i, xcoordinate: x, ycoordinate: y });

            return true;
          }
        }
      }
    }
    return false;
  }

  placeVisitorWithGroupOnCoordinate(visitor, coordinate) {
    visitor.setGrid(coordinate[0]);
    visitor.setCoordinate(coordinate[1], coordinate[2]);
    this.visitorsInsidePlaced.push(visitor);

    visitor.getGroup().forEach((friend) => {
      friend.setGrid(coordinate[0]);
      friend.setCoordinate(coordinate[1], coordinate[2]);
      this.visitorsInsidePlaced.push(friend);
    });
  }

  doMoreVisitorsFit(fieldid, xcoordinate, ycoordinate, numberOfVisitors) {
    let visitorsOnCoordinate = 0;

    this.visitorsInsidePlaced.forEach((visitor) => {
      // eslint-disable-next-line max-len
      if (visitor.getGridId() === fieldid && visitor.getxCoordinate() === xcoordinate && visitor.getyCoordinate() === ycoordinate) {
        visitorsOnCoordinate += 1;
      }
    });

    return (visitorsOnCoordinate + numberOfVisitors) <= 7;
  }
}
