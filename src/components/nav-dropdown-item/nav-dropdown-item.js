import html from './nav-dropdown-item.html';

export default class NavDropdownItem extends HTMLElement {
  static get observedAttributes() { return ['data-url', 'data-text']; }

  connectedCallback() {
    this.innerHTML = html;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const anchor = this.querySelector('a');

    if (name === 'data-url') {
      anchor.href = newValue;
    } else if (name === 'data-text') {
      anchor.innerHTML = newValue;
    }
  }
}
