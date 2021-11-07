import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import Menu from "./Menu";

describe("render menu", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Menu open={false} />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });
});
