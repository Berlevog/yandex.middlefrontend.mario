import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { getInitialState } from "./store/getInitialState";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const { store } = configureStore(getInitialState());
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
