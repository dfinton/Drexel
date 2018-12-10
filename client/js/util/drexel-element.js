import template from './template';

class DrexelElement extends HTMLElement {
  constructor(templateUri) {
    super();

    template(templateUri, (templateHtml) => {
      this.innerHTML = templateHtml;
    });

    this.$this = $(this);
    this.initElement();
  }

  initElement() {}
}

export default DrexelElement;
