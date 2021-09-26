/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ErrorHandler } from "./components/ErrorHandler";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorHandler>
      <App />
    </ErrorHandler>
  </React.StrictMode>,
  document.getElementById("root")
);
