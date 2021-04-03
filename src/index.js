// Import Bootstrap & Bootstrap JS elements
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';

// Import custom CSS
import './css/main.css';

import FormStepOne from './components/forms/form-step-1';
import GridElement from './components/grid/grid';
import Router from './js/router';
import WarningElement from './components/warning/warning-element';
import WeatherShowcase from './components/weather-showcase/weather-showcase';
import SimulationGrid from './components/simulation/simulation';
import NavDropdownItem from './components/nav-dropdown-item/nav-dropdown-item';

// Instantiate weather API service
// eslint-disable-next-line no-unused-vars
import WeatherApiServce from './js/weather-api-service';

function createNavDropdownItems() {
  // Add created fields to navigation bar
  const dropdownList = document.getElementById('fields-dropdown');

  // Remove old items
  while (dropdownList.lastChild) {
    dropdownList.removeChild(dropdownList.lastChild);
  }

  // Loop through all fields and add configured ones to navigation
  for (let i = 0; i < 6; i += 1) {
    const fieldConfig = JSON.parse(localStorage.getItem(`fieldConfig:${i}`));
    if (fieldConfig !== null) {
      const navItem = document.createElement('nav-dropdown-item');
      dropdownList.appendChild(navItem);
      navItem.setAttribute('data-url', `/#/grid/${i}`);
      navItem.setAttribute('data-text', fieldConfig.name);
    }
  }
}

window.onload = () => {
  createNavDropdownItems();
};

// Define custom HTML elements
customElements.define('form-step-one', FormStepOne);
customElements.define('field-grid', GridElement);
customElements.define('warning-element', WarningElement);
customElements.define('weather-showcase', WeatherShowcase);
customElements.define('simulation-page', SimulationGrid);
customElements.define('nav-dropdown-item', NavDropdownItem);

// Setup router
function SetRouterOutput(htmlTag) {
  document.getElementById('router-output').innerHTML = `<${htmlTag}></${htmlTag}>`;
}

Router
  .add('link', () => {
    SetRouterOutput('div');
  })
  .add(/grid\/([1-6])/, (fieldId) => {
    const htmlTag = 'field-grid';
    document.getElementById('router-output').innerHTML = `<${htmlTag} data-field-id=${fieldId}></${htmlTag}>`;
  })
  .add('simulation', () => {
    SetRouterOutput('simulation-page');
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

document.addEventListener('savefieldconfig', (e) => {
  localStorage.setItem(`fieldConfig:${e.detail.id}`, JSON.stringify(e.detail.config));
  createNavDropdownItems();
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
