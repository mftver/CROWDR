import html from './grid.html';
import placeableMapper from '../../js/placement-logic';

export default class GridElement extends HTMLElement {
  isDragging = false;

  fieldId = -1;

  placedObjects = {};

  static get observedAttributes() { return ['data-show-placeables', 'data-field-id']; }

  constructor() {
    super();
    this.innerHTML = html;
    this.fieldId = this.GetFieldId();

    // Assign mouse event handlers
    this.onmousedown = (e) => this.OnMouseDown(e);
    this.onmouseup = (e) => this.OnMouseUp(e);
    this.onmousemove = (e) => this.OnMouseMove(e);

    this.querySelector('.grid-reset').onclick = () => this.resetGrid();
    this.querySelector('.grid-lock').onclick = () => this.lockGrid();

    // Generate table
    const table = document.createElement('table');
    this.appendChild(table);

    this.createField(table);

    this.GetStoredFieldData();
  }

  resetGrid() {
    this.querySelector('table').remove();
    localStorage.removeItem(`field:${this.GetFieldId()}`);
    this.placedObjects = {};
    this.querySelectorAll('.draggable-container > .draggable')
      .forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.style.display = '';
      });

    const newtable = document.createElement('table');
    this.appendChild(newtable);
    this.createField(newtable);
  }

  lockGrid() {
    this.setAttribute('data-show-placeables', false);
    const config = this.GetFieldConfig();
    config.locked = true;
    document.dispatchEvent(new CustomEvent('savefieldconfig', {
      detail: {
        id: this.GetFieldId(),
        config,
      },
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  createField(table) {
    for (let i = 0; i < 15; i += 1) {
      const row = table.insertRow();
      for (let j = 0; j < 15; j += 1) {
        const cell = row.insertCell();
        const text = document.createTextNode('');
        cell.setAttribute('data-coord-x', j);
        cell.setAttribute('data-coord-y', i);
        cell.setAttribute('class', 'selectable-cell');
        cell.appendChild(text);
      }
    }
  }

  attributeChangedCallback() {
    // Check if draggables should be visible
    const showPlaceables = this.getAttribute('data-show-placeables');
    if (showPlaceables === 'false') {
      this.querySelector('.interactables').style.display = 'none';
    } else {
      this.querySelector('.interactables').style.display = '';
    }

    // Check if field Id has changed
    if (this.fieldId !== this.GetFieldId()) {
      this.fieldId = this.GetFieldId();
      this.GetStoredFieldData();
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
        const x = tableCell.getAttribute('data-coord-x');
        const y = tableCell.getAttribute('data-coord-y');
        const placedType = placeableMapper(draggableElement, tableCell, this);

        // Check if object was placed
        if (placedType !== null) {
          this.EmitObjectPlaced(placedType, x, y);
          this.TrackPlacedObjects(placedType);
        }
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

  EmitObjectPlaced(objectType, x, y) {
    this.dispatchEvent(new CustomEvent('placefieldobject', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {
        fieldId: this.GetFieldId(),
        type: objectType,
        x,
        y,
      },
    }));
  }

  TrackPlacedObjects(objectType) {
    if (objectType === null) return;
    // Add item to placement counter
    if (this.placedObjects[objectType]) {
      this.placedObjects[objectType] += 1;
    } else {
      this.placedObjects[objectType] = 1;
    }

    if (this.placedObjects[objectType] >= this.GetFieldConfig()[objectType]) {
      this.querySelector(`.${objectType}`).style.display = 'none';
    }
  }

  /**
   * @returns ID of the current grid element
   */
  GetFieldId() {
    return this.getAttribute('data-field-id') - 0;
  }

  GetFieldConfig() {
    return JSON.parse(localStorage.getItem(`fieldConfig:${this.GetFieldId()}`));
  }

  /**
   * Retrieves stored field layout from previous sessions
   */
  GetStoredFieldData() {
    // Remove all previously assigned classes
    this.querySelectorAll('td').forEach((cell) => {
      cell.setAttribute('class', '');
      cell.classList.add('selectable-cell');
    });

    const fieldData = JSON.parse(localStorage.getItem(`field:${this.GetFieldId()}`));
    if (fieldData === null) return;

    fieldData.forEach((xArray, x) => {
      if (xArray === null) return;

      xArray.forEach((objectType, y) => {
        // Create element according to object type
        const fieldElement = document.createElement('div');
        fieldElement.setAttribute('data-coord-x', x);
        fieldElement.setAttribute('data-coord-y', y);
        fieldElement.setAttribute('class', objectType);

        // Find element that should be passed to placeable mapper
        // to change the corresponding fields around it
        const hoverElement = this.querySelector(`[data-coord-x='${x}'][data-coord-y='${y}']`);

        const placedObject = placeableMapper(fieldElement, hoverElement, this);
        this.TrackPlacedObjects(placedObject);
      });
    });
  }
}
