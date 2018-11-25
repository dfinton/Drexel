window.addEventListener('WebComponentsReady', () => {
  const scriptElement = document.createElement('script');
  scriptElement.src = '/js/component.js';
  document.head.appendChild(scriptElement);
});
