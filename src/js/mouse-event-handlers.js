import placeableMapper from './js/placementLogic';

let isDragging = false;

// Event handler for moving item while in drag mode
export function OnMouseMove(e) {
  if (isDragging) {
      let clickedElement = document.getElementById('dragging');
      // Make element draggable
      clickedElement.style.position = 'fixed';
      // Make element follow cursor
      clickedElement.style.top = (e.pageY - (clickedElement.clientHeight / 2)) + "px";
      clickedElement.style.left = (e.pageX - (clickedElement.clientWidth / 2)) + "px";
  }
}

export function OnMouseUp(e) {
  let draggedElement = document.getElementById('dragging');
  // Return draggable element back to original position
  draggedElement.style.position = 'inherit';

  //check if the user is holding an item
  if (isDragging) {
      // Check on which table field the element was dropped
      let tableCell = document.elementFromPoint(e.pageX, e.pageY);
      if (tableCell.classList.contains('selectable-cell')) {
        placeableMapper(draggedElement,tableCell);
          //tableCell.classList.remove('selectable-cell');
          //tableCell.classList.add('selected-cell')
      }
      draggedElement.removeAttribute('id');
      isDragging = false;
  }
}

// Check if user clicks on draggable item
export function OnMouseDown(e) {
  let clickedElement = e.target;
  if (clickedElement.classList.contains("draggable")) {
      isDragging = true;
      clickedElement.id = "dragging";
  }
};