import html from './grid.html';

export default class GridElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = html;
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
}
