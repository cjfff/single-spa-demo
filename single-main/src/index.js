require("@babel/polyfill");

import { registerApplication, start } from "single-spa";
import { importEntry } from "import-html-entry";

async function _loadApp(app) {
  const createElement = content => {
    const el = document.createElement("div");
    el.innerHTML = content;
    return el.firstChild;
  };

  const render = (container, element) => {
    const containerEl = document.querySelector(container);

    if (!containerEl.contains(element)) {
      if (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild);
      }
      containerEl.appendChild(element);
    }
  };
  const { entry } = app;

  const { template, execScripts } = await importEntry(entry, {
    prefetch: true,
  });

  const appContent = `<div id="qiankun-xxxx1234">${template}</div>`;

  const element = createElement(appContent);

  render(app.container, element);

  const scriptExports = await execScripts(window, false);
  console.log(window);
  window._scriptExports = scriptExports;

  return scriptExports;
}

registerApplication({
  name: "nuxt",
  app: () => {
    return _loadApp({
      name: "app",
      entry: "//localhost:7102",
      container: "#subapp-container",
    });
  },
  activeWhen: ["#/nuxt"],
});

start();
