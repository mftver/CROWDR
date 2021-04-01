import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import generateTable from './js/table-factory';
import * as mouseEventHandlers from './js/mouse-event-handlers';
import FormStepOne from './components/forms/form-step-1';
import GridElement from './components/grid/grid';
import Router from './js/router';

window.onload = () => {
  // Generate table
  // generateTable();
};

// Define custom HTML elements
customElements.define('form-step-one', FormStepOne);
customElements.define('field-grid', GridElement);

// Setup router
const router = new Router();

function SetRouterOutput(htmlTag) {
  document.getElementsByTagName('router-output')[0].innerHTML = `<${htmlTag}></${htmlTag}>`;
}

router
  .add('link', () => {
    SetRouterOutput('div');
  })
  .add('grid', () => {
    SetRouterOutput('field-grid');
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
document.addEventListener('resetform', () => {
  SetRouterOutput('form-step-one');
  localStorage.removeItem('formValues');
});
