/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import { ConnectedRouter } from "connected-react-router";
// import "core-js/stable";
import React, { FC, useEffect } from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { getUser } from "services/auth";
import { autorize } from "services/oauth";
import { useAppDispatch } from "store/hooks";
// import "regenerator-runtime/runtime";
import App from "./App";
import { ErrorHandler } from "./components/ErrorHandler";
import "./index.css";
import "./serviceWorker";
import { configureStore, State } from "./store/rootStore";

declare global {
  interface Window {
    // __INITIAL_STATE__: State;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    devMode: Boolean;
  }
}

const initialData = document.getElementById("initial-data")
  ? JSON.parse(document.getElementById("initial-data")!.getAttribute("data-json")!)
  : {};

const { store, history } = configureStore(initialData);

const Client: FC<any> = () => {
  return (
    <React.StrictMode>
      <ErrorHandler>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </ErrorHandler>
    </React.StrictMode>
  );
};

hydrate(<Client />, document.getElementById("root"));
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((registration) => {
        console.log("Registration succeeded.");
        if (process.env.NODE_ENV !== "development") {
          registration.unregister().then((boolean) => {
            console.log("Unregister succeeded!");
          });
        }
      })
      .catch((e) => {
        //nothing to do
      });
  });
}
