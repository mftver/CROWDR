import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import generateTable from './js/table-factory';
import * as mouseEventHandlers from './js/mouse-event-handlers';
import FormStepOne from './components/form-step-1';

window.onload = () => {
  // Generate table
  generateTable();

  customElements.define('form-step-one', FormStepOne);
};

// Assign event handlers
document.onmousedown = mouseEventHandlers.OnMouseDown;
document.onmouseup = mouseEventHandlers.OnMouseUp;
document.onmousemove = mouseEventHandlers.OnMouseMove;
