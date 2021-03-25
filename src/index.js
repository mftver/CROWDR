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
            cell.setAttribute("class", 'selectable-cell')
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

document.onmouseup = (e) => {


    let clickedElement = document.getElementById('draggable');
    // Return draggable element back to original position
    clickedElement.style.position = 'inherit';

    //check if the user is holding an item
    if (isDragging) {
        // Check on which table field the element was dropped
        let tableCell = document.elementFromPoint(e.pageX, e.pageY);
        if (tableCell.classList.contains('selectable-cell')) {
            tableCell.classList.remove('selectable-cell');
            tableCell.classList.add('selected-cell')
        }
        isDragging = false;
    }
}

// Event handler for moving item while in drag mode
document.onmousemove = (e) => {
    if (isDragging) {
        let clickedElement = document.getElementById('draggable');
        // Make element draggable
        clickedElement.style.position = 'fixed';
        // Make element follow cursor
        clickedElement.style.top = (e.pageY - (clickedElement.clientHeight / 2)) + "px";
        clickedElement.style.left = (e.pageX - (clickedElement.clientWidth / 2)) + "px";
    }
}