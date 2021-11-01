import * as React from "react";
import * as ReactDOM from "react-dom";
import CreateThread from "./CreateThread";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CreateThread />, div);
  ReactDOM.unmountComponentAtNode(div);
});
