import * as React from "react";
import * as ReactDOM from "react-dom";
import ThemeToggler from "./ThemeToggler";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ThemeToggler />, div);
  ReactDOM.unmountComponentAtNode(div);
});
