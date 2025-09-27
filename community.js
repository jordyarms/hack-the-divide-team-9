import { html, render } from "https://cdn.jsdelivr.net/npm/lit-html@3.3.1/+esm";

export default class Community extends HTMLElement {
  static get template() {
    return html`
      <h3><slot name="title">Community</slot></h3>
      <ul>
        <slot name="member"></slot>
      </ul>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    render(Community.template, shadow);
  }
}

customElements.define("c-community", Community);
