import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";
import Leaderboard from "./Leaderboard";

describe("render leaderboard", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Leaderboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders players list", () => {
    const leaderboard = mount(<Leaderboard />);
    expect(leaderboard.find("table")).toHaveLength(1);
  });
});
