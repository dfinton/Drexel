(function() {
  class MyTitle extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({
        mode: 'open',
      });

      this.shadowRoot.innerHTML = `
        <h1>Hello Dave!</h1>
      `;
    }
  }

  window.customElements.define('my-title', MyTitle);
})();
