import WarningSound from '../../media/warning-sound.mp3';

export default class WarningElement extends HTMLElement {
  static get observedAttributes() { return ['data-warnings']; }

  connectedCallback() {
    this.style.visibility = 'none';
  }

  attributeChangedCallback() {
    const warnings = JSON.parse(this.getAttribute('data-warnings'));

    if (warnings === null || warnings.length === 0) {
      this.style.display = 'none';
      return;
    }

    this.style.display = '';
    new Audio(WarningSound).play();

    this.innerHTML = '';
    warnings.forEach((warning) => {
      const warningElement = document.createElement('p');
      warningElement.setAttribute('class', 'alert alert-danger');
      warningElement.innerHTML = warning;
      this.insertAdjacentElement('afterbegin', warningElement);
    });
  }
}
