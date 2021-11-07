import * as React from "react";
import * as ReactDOM from "react-dom";

import { PostProps, UserProps } from "../types";
import Post from "./Post";

const user: UserProps = {
  name: "username",
};

const post: PostProps = {
  user,
  id: 0,
  threadId: 0,
  content: "post content",
  date: "01.01.1970 12:00",
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Post {...post} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
