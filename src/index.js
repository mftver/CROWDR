import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";

let isDragging = false;

window.onload = () => {
  // Generate table
  let table = document.createElement("table");
  document.body.appendChild(table);
  generateTable(table);

  // Generate draggable element
  let draggableElement = document.createElement('div');
  draggableElement.setAttribute('id', 'draggable');
  draggableElement.textContent = 'Drag me!';
  document.body.appendChild(draggableElement);
};

function generateTable(table) {
  for (let i = 0; i < 15; i++) {
    let row = table.insertRow();
    for (let j = 0; j < 15; j++) {
      let cell = row.insertCell();
      let text = document.createTextNode(`${i}, ${j}`);
      cell.setAttribute("data-coord-x", j);
      cell.setAttribute("data-coord-y", i);
      cell.appendChild(text);
    }
  }
}

// Check if user clicks on draggable item
document.onmousedown = (e) => {
  let clickedElement = e.target;
  if (clickedElement.id === "draggable") {
    isDragging = true;
  }
};
document.onmouseup = () => {
  isDragging = false;
}

// Event handler for moving item while in drag mode
document.onmousemove = (e) => {
  if(isDragging) {
    let clickedElement = document.getElementById('draggable');
    
    clickedElement.style.position = 'fixed';
    clickedElement.style.top = (e.pageY - (clickedElement.clientHeight/2)) +"px";
    clickedElement.style.left = (e.pageX - (clickedElement.clientWidth/2)) +"px";
  }
}