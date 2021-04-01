import html from './grid.html';
import placeableMapper from '../../js/placement-logic';
import FieldObjects from '../../js/field-objects';

export default class GridElement extends HTMLElement {
  isDragging = false;

  constructor() {
    super();
    this.innerHTML = html;

    // Assign mouse event handlers
    this.onmousedown = (e) => this.OnMouseDown(e);
    this.onmouseup = (e) => this.OnMouseUp(e);
    this.onmousemove = (e) => this.OnMouseMove(e);

    // Generate table
    const table = document.createElement('table');
    this.appendChild(table);

    for (let i = 0; i < 15; i += 1) {
      const row = table.insertRow();
      for (let j = 0; j < 15; j += 1) {
        const cell = row.insertCell();
        const text = document.createTextNode(`${i}, ${j}`);
        cell.setAttribute('data-coord-x', j);
        cell.setAttribute('data-coord-y', i);
        cell.setAttribute('class', 'selectable-cell');
        cell.appendChild(text);
      }
    }
  }

  // Event handler for moving item while in drag mode
  OnMouseMove(e) {
    if (this.isDragging) {
      const clickedElement = document.getElementById('dragging');
      // Make element draggable
      clickedElement.style.position = 'fixed';
      // Make element follow cursor
      clickedElement.style.top = `${e.clientY - (clickedElement.clientHeight / 2.5)}px`;
      clickedElement.style.left = `${e.clientX - (clickedElement.clientWidth / 2.5)}px`;
    }
  }

  OnMouseUp(e) {
    const draggableElement = document.getElementById('dragging');
    // check if the user is holding an item
    if (this.isDragging) {
    // Return draggable element back to original position
      draggableElement.style.position = 'inherit';

      // Check on which table field the element was dropped
      const tableCell = document.elementFromPoint(e.clientX, e.clientY);
      if (tableCell.classList.contains('selectable-cell')) {
        const placedType = placeableMapper(draggableElement, tableCell);
        console.log(placedType);
      }
      draggableElement.removeAttribute('id');
      this.isDragging = false;
    }
  }

  // Check if user clicks on draggable item
  OnMouseDown(e) {
    const clickedElement = e.target;
    if (clickedElement.classList.contains('draggable')) {
      this.isDragging = true;
      clickedElement.id = 'dragging';
    }
  }
}
