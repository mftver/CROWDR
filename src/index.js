import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import FormStepOne from './components/forms/form-step-1';
import GridElement from './components/grid/grid';
import Router from './js/router';
import WarningElement from './components/warning/warning-element';
// import WeatherApiServce from './js/weather-api-service';

window.onload = () => {
  // console.log(WeatherApiServce);
};

// Define custom HTML elements
customElements.define('form-step-one', FormStepOne);
customElements.define('field-grid', GridElement);
customElements.define('warning-element', WarningElement);

// Setup router
function SetRouterOutput(htmlTag) {
  document.getElementById('router-output').innerHTML = `<${htmlTag}></${htmlTag}>`;
}

Router
  .add('link', () => {
    SetRouterOutput('div');
  })
  .add(/grid\/(\d+)/, (fieldId) => {
    const htmlTag = 'field-grid';
    document.getElementById('router-output').innerHTML = `<${htmlTag} data-field-id=${fieldId}></${htmlTag}>`;
  })
  .add('', () => {
    SetRouterOutput('form-step-one');
  });

// Assign event handlers
document.addEventListener('formsubmit', (e) => localStorage.setItem('formValues', JSON.stringify(e.detail)));
document.addEventListener('resetform', () => {
  SetRouterOutput('form-step-one');
  localStorage.removeItem('formValues');
});

document.addEventListener('placefieldobject', (e) => {
  let field = JSON.parse(localStorage.getItem(`field:${e.detail.fieldId}`));
  // Instantiate object if not yet used
  if (field === null) {
    field = [];
  }
  const { x, y } = e.detail;

  if (field[x] === undefined || field[x] === null) {
    field[x] = [];
  }
  field[x][y] = e.detail.type;
  localStorage.setItem(`field:${e.detail.fieldId}`, JSON.stringify(field));
});
