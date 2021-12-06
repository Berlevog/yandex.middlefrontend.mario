import * as React from "react";
import * as ReactDOM from "react-dom";
import CreateThread from "./CreateThread";
import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../../../../store";
import { getInitialState } from "../../../../store/getInitialState";

describe("render CreateThread", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    const { store } = configureStore(getInitialState());
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <CreateThread />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });
});
