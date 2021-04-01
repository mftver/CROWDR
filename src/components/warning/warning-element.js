export default class WarningElement extends HTMLElement {
  static get observedAttributes() { return ['data-warnings']; }

  connectedCallback() {
    this.style.visibility = 'hidden';
  }

  attributeChangedCallback() {
    const warnings = JSON.parse(this.getAttribute('data-warnings'));

    if (warnings === null) {
      this.style.visibility = 'hidden';
      return;
    }
    this.style.visibility = 'visible';

    this.innerHTML = '';
    warnings.forEach((warning) => {
      const warningElement = document.createElement('p');
      warningElement.setAttribute('class', 'alert alert-danger');
      warningElement.innerHTML = warning;
      this.insertAdjacentElement('afterbegin', warningElement);
    });
  }
}
