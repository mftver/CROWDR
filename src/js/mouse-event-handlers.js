import placeableMapper from './placement-logic';

let isDragging = false;

// Event handler for moving item while in drag mode
export function OnMouseMove(e) {
  if (isDragging) {
    const clickedElement = document.getElementById('dragging');
    // Make element draggable
    clickedElement.style.position = 'fixed';
    // Make element follow cursor
    clickedElement.style.top = `${e.pageY - (clickedElement.clientHeight / 2)}px`;
    clickedElement.style.left = `${e.pageX - (clickedElement.clientWidth / 2)}px`;
  }
}

export function OnMouseUp(e) {
  const draggableElement = document.getElementById('dragging');
  // check if the user is holding an item
  if (isDragging) {
    // Return draggable element back to original position
    draggableElement.style.position = 'inherit';

    // Check on which table field the element was dropped
    const tableCell = document.elementFromPoint(e.pageX, e.pageY);
    if (tableCell.classList.contains('selectable-cell')) {
      placeableMapper(draggableElement, tableCell);
    }
    draggableElement.removeAttribute('id');
    isDragging = false;
  }
}

// Check if user clicks on draggable item
export function OnMouseDown(e) {
  const clickedElement = e.target;
  if (clickedElement.classList.contains('draggable')) {
    isDragging = true;
    clickedElement.id = 'dragging';
  }
}
