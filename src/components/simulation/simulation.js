import Person from './person';
import simulation from './simulation.html';
import FieldObjects from '../../js/field-objects';
import WeatherApiService from '../../js/weather-api-service';

// TODO: make people visible
// TODO: make people placed every 6 seconds

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
    this.createTicketScanners(3);

    setInterval(() => {
      this.letPeopleEnter(6);
      this.positionPeople(WeatherApiService.weatherType);
    }, 6000);

    // this.visitorsInsideUnplaced = this.visitorsOutside;
    // this.positionPeople();
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

  positionPeople(weather) {
    if (this.visitorsInsidePlaced.length > 0) {
      this.visitorsInsideUnplaced = this.visitorsInsidePlaced;
      this.visitorsInsidePlaced = [];
    }

    const visitorsToBePlaced = this.visitorsInsideUnplaced.length;

    for (let index = 0; index < visitorsToBePlaced; index += 1) {
      this.placeVisitorWithGroup(this.visitorsInsideUnplaced[index]);
      this.visitorsInsideUnplaced[index].reprioritize(weather);

      this.visitorsInsideUnplaced[index].getGroup().forEach((friend) => {
        friend.reprioritize(weather);
      });

      index += this.visitorsInsideUnplaced[index].getGroup().length;
    }
  }

  createTicketScanners(number) {
    for (let index = 0; index < number; index += 1) {
      this.ticketScanners.push(Math.floor(Math.random() * 3) + 1);
    }
  }

  letPeopleEnter(timeBetweenScansInSeconds) {
    this.ticketScanners.forEach((ticketscanner) => {
      const numberOfPeopleToLetIn = timeBetweenScansInSeconds / ticketscanner;
      let peopleAlreadyLetIn = 0;

      for (let index = 0; index < numberOfPeopleToLetIn; index += 1) {
        if (this.visitorsOutside[index] !== undefined) {
          this.visitorsInsidePlaced.push(this.visitorsOutside[index - peopleAlreadyLetIn]);

          this.visitorsOutside[index - peopleAlreadyLetIn].getGroup().forEach((groupmember) => {
            this.visitorsInsidePlaced.push(groupmember);
          });
          // eslint-disable-next-line max-len
          this.visitorsOutside = this.visitorsOutside.splice(index, this.visitorsOutside[index - peopleAlreadyLetIn].getGroup().length);
          peopleAlreadyLetIn += 1;
        }
      }
    });
  }

  placeVisitorWithGroup(visitor) {
    for (let index = 0; index < visitor.getPriorities().length; index += 1) {
      const priority = visitor.getPriorities()[index];

      if (this.placeVisitorWithGroupOnPriority(visitor, priority)) {
        return;
      }
    }
    this.placeVisitorWithGroupDefault(visitor);
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
        return this.placeVisitorWithGroupInDrink(visitor, prefferedFieldObjects);
      case FieldObjects.HighTree:
        return this.placeVisitorWithGroupIn1x1(visitor, prefferedFieldObjects);
      case FieldObjects.WideTree:
        return this.placeVisitorWithGroupInWideTree(visitor, prefferedFieldObjects);
      case FieldObjects.ShadowTree:
        return this.placeVisitorWithGroupIn3x3(visitor, prefferedFieldObjects);
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

          if (field[x] !== null
            && field[x] !== undefined
            && field[x][y] !== null
            && field[x][y] !== undefined) {
            if (field[x][y] === priority) {
              fieldObjectscoordinates.push({ id: i, xcoordinate: x, ycoordinate: y });
            }
          }
        }
      }
    }
    return fieldObjectscoordinates;
  }

  placeVisitorWithGroupIn3x3(visitor, prefferedFieldObjects) {
    let isPlaced = false;

    // check all the preffered objects if there is a spot
    prefferedFieldObjects.every((fieldObject) => {
      const coordinate = fieldObject;
      coordinate.xcoordinate -= 1;
      coordinate.ycoordinate -= 1;

      // check all the coordinates of the fieldObject
      for (let x = 0; x < 3; x += 1) {
        for (let y = 0; y < 3; y += 1) {
          const clonedCoordinate = JSON.parse(JSON.stringify(coordinate));
          clonedCoordinate.xcoordinate += x;
          clonedCoordinate.ycoordinate += y;

          if (this.doMoreVisitorsFit(clonedCoordinate, visitor.getGroup().length + 1)) {
            this.placeVisitorWithGroupOnCoordinate(visitor, clonedCoordinate);

            isPlaced = true;
            return false;
          }
        }
      }
      return true;
    });

    return isPlaced;
  }

  placeVisitorWithGroupIn1x1(visitor, prefferedFieldObjects) {
    let isPlaced = false;

    // check all the preffered objects if there is a spot
    prefferedFieldObjects.every((fieldObject) => {
      // check if the persons group can be placed on the coordinate
      if (this.doMoreVisitorsFit(fieldObject, visitor.getGroup().length + 1)) {
        this.placeVisitorWithGroupOnCoordinate(visitor, fieldObject);

        isPlaced = true;
        return false;
      }
      return true;
    });

    return isPlaced;
  }

  placeVisitorWithGroupInDrink(visitor, prefferedFieldObjects) {
    let isPlaced = false;

    // check all the preffered objects if there is a spot
    prefferedFieldObjects.every((fieldObject) => {
      // check all the coordinates of the fieldObject
      for (let x = 0; x < 2; x += 1) {
        const clonedCoordinate = JSON.parse(JSON.stringify(fieldObject));
        clonedCoordinate.xcoordinate += x;

        if (this.doMoreVisitorsFit(clonedCoordinate, visitor.getGroup().length + 1)) {
          this.placeVisitorWithGroupOnCoordinate(visitor, clonedCoordinate);

          isPlaced = true;
          return false;
        }
      }
      return true;
    });

    return isPlaced;
  }

  placeVisitorWithGroupInWideTree(visitor, prefferedFieldObjects) {
    let isPlaced = false;

    // check all the preffered objects if there is a spot
    prefferedFieldObjects.every((fieldObject) => {
      // check all the coordinates of the fieldObject
      for (let y = 0; y < 2; y += 1) {
        const clonedCoordinate = JSON.parse(JSON.stringify(fieldObject));
        clonedCoordinate.ycoordinate += y;

        if (this.doMoreVisitorsFit(clonedCoordinate, visitor.getGroup().length + 1)) {
          this.placeVisitorWithGroupOnCoordinate(visitor, clonedCoordinate);

          isPlaced = true;
          return false;
        }
      }
      return true;
    });

    return isPlaced;
  }

  placeVisitorWithGroupInToilet(visitor, prefferedFieldObjects) {
    let isPlaced = false;

    // check all the preffered objects if there is a spot
    prefferedFieldObjects.every((fieldObject) => {
      const coordinate = fieldObject;
      coordinate.xcoordinate -= 1;

      // check all the coordinates of the fieldObject
      for (let x = 0; x < 3; x += 1) {
        const clonedCoordinate = JSON.parse(JSON.stringify(fieldObject));
        clonedCoordinate.xcoordinate += x;
        if (this.doMoreVisitorsFit(clonedCoordinate, visitor.getGroup().length + 1)) {
          this.placeVisitorWithGroupOnCoordinate(visitor, clonedCoordinate);

          isPlaced = true;
          return false;
        }
      }
      return true;
    });
    return isPlaced;
  }

  placeVisitorWithGroupDefault(visitor) {
    // check all the grid elements
    for (let i = 1; i < 7; i += 1) {
      for (let x = 0; x < 15; x += 1) {
        for (let y = 0; y < 15; y += 1) {
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
    visitor.setGrid(coordinate.id);
    visitor.setCoordinate(coordinate.xcoordinate, coordinate.ycoordinate);
    this.visitorsInsidePlaced.push(visitor);

    visitor.getGroup().forEach((friend) => {
      friend.setGrid(coordinate.id);
      friend.setCoordinate(coordinate.xcoordinate, coordinate.ycoordinate);
      this.visitorsInsidePlaced.push(friend);
    });
  }

  doMoreVisitorsFit(coordinate, numberOfVisitors) {
    const peopleOnCoordinate = this.getPeopleOnCoordinate(coordinate);
    return (peopleOnCoordinate + numberOfVisitors) <= 7;
  }

  getPeopleOnCoordinate(coordinate) {
    let visitorsOnCoordinate = 0;

    this.visitorsInsidePlaced.forEach((visitor) => {
      // eslint-disable-next-line max-len
      if (visitor.getGridId() === coordinate.id && visitor.getxCoordinate() === coordinate.xcoordinate && visitor.getyCoordinate() === coordinate.ycoordinate) {
        visitorsOnCoordinate += 1;
      }
    });
    return visitorsOnCoordinate;
  }
}
