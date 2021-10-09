import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import Menu from "./Menu";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

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
