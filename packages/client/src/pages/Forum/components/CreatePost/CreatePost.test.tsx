import * as React from "react";
import * as ReactDOM from "react-dom";
import CreatePost from "./CreatePost";

it("renders without crashing", () => {
  const div = document.createElement("div");
  // ReactDOM.render(<CreatePost />, div);
  ReactDOM.unmountComponentAtNode(div);
});
