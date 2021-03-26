import html from './form-step-1.html';

export default class FormStepOne extends HTMLElement {
  constructor() {
    super();

    this.regionName = '';
    this.maximumVisitors = 0;
    this.innerHTML = html;
  }
}
