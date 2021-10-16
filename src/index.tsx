/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { ErrorHandler } from "./components/ErrorHandler";

import "./index.css";
import "./serviceWorker";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <ErrorHandler>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorHandler>
  </React.StrictMode>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js");
  });
}
