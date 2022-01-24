import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import * as ReactDOM from "react-dom";
import PostList from "./PostList";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../../../../store";
import { getInitialState } from "../../../../store/getInitialState";

describe("render postlist", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    const { store } = configureStore(getInitialState());
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <PostList threadId={0} />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });
});
