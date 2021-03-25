export default function generateTable(table) {
  let table = document.createElement("table");
  document.body.appendChild(table);
  
  for (let i = 0; i < 15; i++) {
      let row = table.insertRow();
      for (let j = 0; j < 15; j++) {
          let cell = row.insertCell();
          let text = document.createTextNode(`${i}, ${j}`);
          cell.setAttribute("data-coord-x", j);
          cell.setAttribute("data-coord-y", i);
          cell.setAttribute("class", 'selectable-cell')
          cell.appendChild(text);
      }
  }
}
