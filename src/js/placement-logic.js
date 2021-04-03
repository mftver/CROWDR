import FieldObjects from './field-objects';

let placingType = null;
let table = null;

function closeTableCell(tableCell) {
  tableCell.classList.remove('selectable-cell');
  tableCell.classList.add('selected-cell');
  tableCell.classList.add(`cell-${placingType}`);
}

function canPlace(xCoordinate, yCoordinate) {
  const tablecell = table.querySelector(`[data-coord-x='${xCoordinate}'][data-coord-y='${yCoordinate}']`);

  if (xCoordinate < 0 || xCoordinate > 14 || yCoordinate < 0 || yCoordinate > 14) {
    return false;
  } if (tablecell.classList.contains('selected-cell')) {
    return false;
  }

  return true;
}

function placeObject(coordinates) {
  coordinates.forEach((element) => {
    closeTableCell(table.querySelector(`[data-coord-x='${element[0]}'][data-coord-y='${element[1]}']`));
  });

  return true;
}

function place3x3(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y') - 1;
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 1;

  const possitionsToBePlaced = new Array(0);

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (canPlace(xCoordinate + i, yCoordinate + j)) {
        possitionsToBePlaced.push([xCoordinate + i, yCoordinate + j]);
      }
    }
  }

  if (possitionsToBePlaced.length === 9) {
    return placeObject(possitionsToBePlaced);
  }
  return false;
}

function place1x1(tableCell) {
  if (canPlace(tableCell.getAttribute('data-coord-x'), tableCell.getAttribute('data-coord-y'))) {
    closeTableCell(tableCell);
    return true;
  }
  return false;
}

function place1x2(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y') - 0;
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 0;

  const possitionsToBePlaced = new Array(0);

  for (let i = 0; i < 2; i += 1) {
    if (canPlace(xCoordinate + i, yCoordinate)) {
      possitionsToBePlaced.push([xCoordinate + i, yCoordinate]);
    }
  }

  if (possitionsToBePlaced.length === 2) {
    return placeObject(possitionsToBePlaced);
  }
  return false;
}

function place2x1(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y') - 0;
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 0;

  const possitionsToBePlaced = new Array(0);

  for (let i = 0; i < 2; i += 1) {
    if (canPlace(xCoordinate, yCoordinate + i)) {
      possitionsToBePlaced.push([xCoordinate, yCoordinate + i]);
    }
  }

  if (possitionsToBePlaced.length === 2) {
    return placeObject(possitionsToBePlaced);
  }
  return false;
}

function place1x3(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y');
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 1;

  const possitionsToBePlaced = new Array(0);

  for (let i = 0; i < 3; i += 1) {
    if (canPlace(xCoordinate + i, yCoordinate)) {
      possitionsToBePlaced.push([xCoordinate + i, yCoordinate]);
    }
  }

  if (possitionsToBePlaced.length === 3) {
    return placeObject(possitionsToBePlaced);
  }
  return false;
}

export default function placeableMapper(draggedElement, tablecell, tableItem) {
  table = tableItem;
  let placed = false;
  placingType = null;
  if (draggedElement.classList.contains('Tent3x3')) {
    placingType = FieldObjects.Tent3x3;
    placed = place3x3(tablecell);
  } else if (draggedElement.classList.contains('Tent1x1')) {
    placingType = FieldObjects.Tent1x1;
    placed = place1x1(tablecell);
  } else if (draggedElement.classList.contains('Drinks')) {
    placingType = FieldObjects.Drinks;
    placed = place1x2(tablecell);
  } else if (draggedElement.classList.contains('HighTree')) {
    placingType = FieldObjects.HighTree;
    placed = place1x1(tablecell);
  } else if (draggedElement.classList.contains('WideTree')) {
    placingType = FieldObjects.WideTree;
    placed = place2x1(tablecell);
  } else if (draggedElement.classList.contains('ShadowTree')) {
    placingType = FieldObjects.ShadowTree;
    placed = place3x3(tablecell);
  } else if (draggedElement.classList.contains('Toilets')) {
    placingType = FieldObjects.Toilets;
    placed = place1x3(tablecell);
  }

  // return the placed type if item was placed
  return placed ? placingType : null;
}
