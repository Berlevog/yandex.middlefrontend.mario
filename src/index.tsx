/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ErrorHandler } from "./components/ErrorHandler";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import startServiceWorker from "./serviceWorker";

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

startServiceWorker();
