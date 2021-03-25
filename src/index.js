import 'bootstrap/dist/css/bootstrap.min.css';
import  './css/main.css';

import { Tooltip, Toast, Popover } from 'bootstrap';


let table = document.querySelector("table");
generateTable(table);

function generateTable(table) {
    for (let index = 0; index < 15; index++) {
        let row = table.insertRow();
        for (let index = 0; index < 15; index++) {
            let cell = row.insertCell();
            let text = document.createTextNode("hello world");
            cell.appendChild(text);
        }
    }
}