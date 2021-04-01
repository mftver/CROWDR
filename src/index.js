import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import generateTable from './js/table-factory';
import * as mouseEventHandlers from './js/mouse-event-handlers';
import FormStepOne from './components/form-step-1';
import Router from './js/router';

window.onload = () => {
  // Generate table
  // generateTable();
};

// Define custom HTML elements
customElements.define('form-step-one', FormStepOne);

// Setup router
const router = new Router();

function SetRouterOutput(htmlTag) {
  document.getElementsByTagName('router-output')[0].innerHTML = `<${htmlTag}></${htmlTag}>`;
}

router
  .add('link', () => {
    SetRouterOutput('div');
  })
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    SetRouterOutput('div');
  })
  .add('', () => {
    SetRouterOutput('form-step-one');
  });

// Assign event handlers
document.onmousedown = mouseEventHandlers.OnMouseDown;
document.onmouseup = mouseEventHandlers.OnMouseUp;
document.onmousemove = mouseEventHandlers.OnMouseMove;
document.addEventListener('formsubmit', (e) => localStorage.setItem('formValues', JSON.stringify(e.detail)));
