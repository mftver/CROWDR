import html from './form-step-1.html';

export default class FormStepOne extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = html;
    this.querySelector('form').addEventListener('submit', this.submitForm);
  }

  submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const form = Array.from(data.entries());
    const formObject = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of form) {
      formObject[name] = value;
    }

    // Emit event with form data
    this.dispatchEvent(new CustomEvent('formsubmit', {
      // These 3 parameters make sure the event is actually emitted https://stackoverflow.com/a/53804106/10557332
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: formObject,
    }));
  }
}
