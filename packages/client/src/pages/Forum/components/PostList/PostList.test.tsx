import * as React from "react";
import * as ReactDOM from "react-dom";
import PostList from "./PostList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PostList threadId={0} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
