import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import generateTable from './js/table-factory';
import * as mouseEventHandlers from './js/mouse-event-handlers';
import FormStepOne from './components/form-step-1/form-step-1';
import Router from './js/router';

window.onload = () => {
  // Generate table
  // generateTable();
};

// Define custom HTML elements
customElements.define('form-step-one', FormStepOne);

// Setup router
const router = new Router({
  mode: 'hash',
  root: '/',
});

router
  .add(/link/, () => {
    alert('welcome in about page');
  })
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    alert(`products: ${id} specification: ${specification}`);
  })
  .add('', () => {
    // general controller
    console.log('welcome in catch all controller');
  });

// Assign event handlers
document.onmousedown = mouseEventHandlers.OnMouseDown;
document.onmouseup = mouseEventHandlers.OnMouseUp;
document.onmousemove = mouseEventHandlers.OnMouseMove;
document.querySelector('form-step-one')
  .addEventListener('formsubmit', (e) => localStorage.setItem('formValues', JSON.stringify(e.detail)));
