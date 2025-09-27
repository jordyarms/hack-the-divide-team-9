import { html, render } from "https://cdn.jsdelivr.net/npm/lit-html@3.3.1/+esm";

export default class Community extends HTMLElement {
  static get template() {
    return html`
      <h3><slot name="title">Community</slot></h3>
      <ul id="members">
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

  get members() {
    return Array.from(this.childNodes.values()
      .filter(child => child.attributes.slot.value === "member")
      .map(child => child.textContent));
  }
}

customElements.define("c-community", Community);
