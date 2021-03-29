function closeTableCell(tableCell) {
  tableCell.classList.remove('selectable-cell');
  tableCell.classList.add('selected-cell');
}

function canPlace(xCoordinate, yCoordinate) {
  const tablecell = document.querySelector(`[data-coord-x='${xCoordinate}'][data-coord-y='${yCoordinate}']`);

  if (xCoordinate < 0 || xCoordinate > 14 || yCoordinate < 0 || yCoordinate > 14) {
    return false;
  } if (tablecell.classList.contains('selected-cell')) {
    return false;
  }

  return true;
}

function placeObject(coordinates) {
  coordinates.forEach((element) => {
    closeTableCell(document.querySelector(`[data-coord-x='${element[0]}'][data-coord-y='${element[1]}']`));
  });
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
    placeObject(possitionsToBePlaced);
  }
}

function place1x1(tableCell) {
  if (canPlace(tableCell.getAttribute('data-coord-x'), tableCell.getAttribute('data-coord-y'))) {
    closeTableCell(tableCell);
  }
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
    placeObject(possitionsToBePlaced);
  }
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
    placeObject(possitionsToBePlaced);
  }
}

function place1x3(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y');
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 1;

  const possitionsToBePlaced = new Array(0);

  for (let i = 0; i < 3; i += 1) {
    possitionsToBePlaced.push([xCoordinate + i, yCoordinate]);
  }

  if (possitionsToBePlaced.length === 3) {
    placeObject(possitionsToBePlaced);
  }
}

export default function placeableMapper(draggedElement, tablecell) {
  if (draggedElement.classList.contains('Tent3x3')) {
    place3x3(tablecell);
  } else if (draggedElement.classList.contains('Tent1x1')) {
    place1x1(tablecell);
  } else if (draggedElement.classList.contains('Drinks')) {
    place1x2(tablecell);
  } else if (draggedElement.classList.contains('HighTree')) {
    place1x1(tablecell);
  } else if (draggedElement.classList.contains('wideTree')) {
    place2x1(tablecell);
  } else if (draggedElement.classList.contains('ShadowTree')) {
    place3x3(tablecell);
  } else if (draggedElement.classList.contains('Toilets')) {
    place1x3(tablecell);
  }
}
