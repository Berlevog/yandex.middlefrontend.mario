import * as React from "react";
import * as ReactDOM from "react-dom";
import { Profile } from ".";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Profile />, div);
  ReactDOM.unmountComponentAtNode(div);
});
