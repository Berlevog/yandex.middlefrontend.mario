import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import AvatarForm from "./AvatarForm";
import { configureStore } from "../../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { user, handleSuccess, handleError } from "./mockDataForTest";

describe("render avatar form", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const store = configureStore();
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <AvatarForm handleError={handleError} handleSuccess={handleSuccess} user={user} />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });
});
