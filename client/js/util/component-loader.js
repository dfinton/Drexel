const components = [];

const addComponent = (componentPath) => {
  components.push(componentPath);
}

const loadComponents = () => {
  window.addEventListener('WebComponentsReady', () => {
    components.forEach((component) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = `/js/app/components/${component}`;
      document.head.appendChild(scriptElement);
    });
  });
}

