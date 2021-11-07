import * as React from "react";
import * as ReactDOM from "react-dom";

import { ThreadProps, UserProps } from "../types";
import Thread from "./Thread";

const user: UserProps = {
  name: "username",
};

const thread: ThreadProps = {
  user,
  id: 0,
  title: "thread title",
  content: "thread content",
  date: "01.01.1970 12:00",
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Thread {...thread} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
