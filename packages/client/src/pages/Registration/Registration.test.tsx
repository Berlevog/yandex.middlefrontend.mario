import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import Registration from "./Registration";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../../store";
import { getInitialState } from "../../store/getInitialState";

describe("render registration", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    const { store } = configureStore(getInitialState());
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });
});
