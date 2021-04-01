import htmlStep1 from './form-step-1.html';
import htmlStep2 from './form-step-2.html';
import htmlStep3 from './form-step-3.html';
import htmlStep4 from './form-step-4.html';
import htmlStep5 from './form-step-5.html';
import htmlStep6 from './form-step-6.html';
import htmlStep7 from './form-step-7.html';
import TimesFormSubmitted from '../js/timesSubmittedForm';

export default class FormStepOne extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = htmlStep1;
    this.querySelector('form').addEventListener('submit', (e) => this.submitForm(e));
    this.querySelector('#reset-form').addEventListener('click', () => this.resetForm());
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

    TimesFormSubmitted.addTimes();
    this.addNextStepToForm(e.target);
  }

  addNextStepToForm(form) {
    const htmlToAdd = this.decideWhatStepToAdd();
    if (htmlToAdd !== null) {
      // Remove button from form to append it at bottom later
      const submitButton = form.querySelector('button[type=submit]');
      submitButton.parentNode.removeChild(submitButton);
      // eslint-disable-next-line no-param-reassign
      form.insertAdjacentHTML('beforeend', htmlToAdd);
      form.appendChild(submitButton);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  decideWhatStepToAdd() {
    const timesSubmitted = TimesFormSubmitted.getTimes();
    switch (timesSubmitted) {
      case 2:
        return htmlStep2;

      case 3:
        return htmlStep3;

      case 4:
        return htmlStep4;

      case 5:
        return htmlStep5;

      case 6:
        return htmlStep6;

      case 7:
        return htmlStep7;

      default:
        return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  resetForm() {
    TimesFormSubmitted.resetTimesSubmitted();

    this.dispatchEvent(new CustomEvent('resetform', {
      // These 3 parameters make sure the event is actually emitted https://stackoverflow.com/a/53804106/10557332
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }
}
