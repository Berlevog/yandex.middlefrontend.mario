import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";
import Leaderboard from "./Leaderboard";
import store from "../../store";
import { Provider } from "react-redux";

describe("render leaderboard", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders players list", () => {
    const leaderboard = mount(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );
    expect(leaderboard.find("table")).toHaveLength(1);
  });
});
