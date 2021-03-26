function closeTableCell(tableCell) {
  tableCell.classList.remove('selectable-cell');
  tableCell.classList.add('selected-cell');
}

function place3x3(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y') - 1;
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 1;

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      closeTableCell(document.querySelector(`[data-coord-x='${xCoordinate + i}'][data-coord-y='${yCoordinate + j}']`));
    }
  }
}

function place1x1(tableCell) {
  closeTableCell(tableCell);
}

function place1x2(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y') - 0;
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 0;

  for (let i = 0; i < 2; i += 1) {
    closeTableCell(document.querySelector(`[data-coord-x='${xCoordinate + i}'][data-coord-y='${yCoordinate}']`));
  }
}

function place2x1(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y') - 0;
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 0;

  for (let i = 0; i < 2; i += 1) {
    closeTableCell(document.querySelector(`[data-coord-x='${xCoordinate}'][data-coord-y='${yCoordinate + i}']`));
  }
}

function place1x3(tableCell) {
  const yCoordinate = tableCell.getAttribute('data-coord-y');
  const xCoordinate = tableCell.getAttribute('data-coord-x') - 1;

  for (let i = 0; i < 3; i += 1) {
    closeTableCell(document.querySelector(`[data-coord-x='${xCoordinate + i}'][data-coord-y='${yCoordinate}']`));
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
