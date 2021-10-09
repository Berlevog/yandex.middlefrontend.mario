import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import Registration from "./Registration";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("render registration", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
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
