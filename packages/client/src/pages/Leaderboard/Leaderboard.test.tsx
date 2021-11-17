import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import Leaderboard from "./Leaderboard";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../../store";
import { getInitialState } from "../../store/getInitialState";

describe("render leaderboard", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    const { store } = configureStore(getInitialState());
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      </BrowserRouter>
    );
  });

  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("renders players list", () => {
    expect(wrapper.find("table")).toHaveLength(1);
  });
});
