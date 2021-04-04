import htmlStep1 from './form-step-1.html';
import htmlStep2 from './form-step-2.html';
import htmlStep3 from './form-step-3.html';
import htmlStep4 from './form-step-4.html';
import htmlStep5 from './form-step-5.html';
import htmlStep6 from './form-step-6.html';
import htmlStep7 from './form-step-7.html';
import FormValidation from './form-validation';
import TimesFormSubmitted from '../../js/timesSubmittedForm';
import Router from '../../js/router';
import SubmitAudio from '../../media/form-submit.mp3';

export default class FormStepLogic extends HTMLElement {
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

    const warnings = FormValidation.isFormCorrect(formObject);

    if (warnings.length === 0) {
      // Emit event with form data
      this.dispatchEvent(new CustomEvent('formsubmit', {
        // These 3 parameters make sure the event is actually emitted https://stackoverflow.com/a/53804106/10557332
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: formObject,
      }));

      TimesFormSubmitted.addTimes();

      if (!this.addNextStepToForm(e.target)) {
        new Audio(SubmitAudio).play();

        this.saveForm(formObject);
        Router.navigate(`/grid/${this.getId() - 1}`);
      }
    }
    this.showWarnings(warnings);
  }

  addNextStepToForm(form) {
    const htmlToAdd = this.decideWhatStepIsNext();
    if (htmlToAdd !== null) {
      // Remove button from form to append it at bottom later
      const submitButton = form.querySelector('button[type=submit]');
      submitButton.parentNode.removeChild(submitButton);
      form.insertAdjacentHTML('beforeend', htmlToAdd);
      form.appendChild(submitButton);
      return true;
    }
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  decideWhatStepIsNext() {
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

  resetForm() {
    TimesFormSubmitted.resetTimesSubmitted();

    this.dispatchEvent(new CustomEvent('resetform', {
      // These 3 parameters make sure the event is actually emitted https://stackoverflow.com/a/53804106/10557332
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  saveForm(formObject) {
    const config = {
      id: this.getId(),
      config: formObject,
    };

    this.dispatchEvent(new CustomEvent('savefieldconfig', {
      detail: config,
      bubbles: true,
      cancelable: false,
      composed: true,
    }));

    this.resetForm();
  }

  // eslint-disable-next-line class-methods-use-this
  getId() {
    let returnvalue = null;

    for (let index = 1; index < 7; index += 1) {
      const region = localStorage.getItem(`fieldConfig:${index}`);
      if (region === null) {
        returnvalue = index;
        break;
      }
    }
    return returnvalue;
  }

  showWarnings(warnings) {
    const element = this.getElementsByTagName('warning-element')[0];
    element.setAttribute('data-warnings', JSON.stringify(warnings));
  }
}
