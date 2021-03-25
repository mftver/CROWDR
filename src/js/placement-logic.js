function closeTableCell(tableCell) {
  tableCell.classList.remove('selectable-cell');
  tableCell.classList.add('selected-cell');
}

function placePartyTent(tableCell) {
  closeTableCell(tableCell);
}

function placeFoodTent(tableCell) {
  const yCoordinate = tableCell.getAtribute('data-coord-y') - 1;
  const xCoordinate = tableCell.getAtribute('data-coord-x') - 1;

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      closeTableCell(document.querySelector(`[data-coord-x='${xCoordinate + i}'][data-coord-y='${yCoordinate + j}']`));
    }
  }
}

export default function placeableMapper(draggedElement, tablecell) {
  if (draggedElement.classList.contains('Tent3x3')) {
    placePartyTent(tablecell);
  } else if (draggedElement.classList.contains('Tent1x1')) {
    placeFoodTent(tablecell);
  }
}
