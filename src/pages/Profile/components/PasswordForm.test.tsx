import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import PasswordForm from "./PasswordForm";
import { configureStore } from "../../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { handleSuccess, handleError } from "./mockDataForTest";

describe("render avatar form", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const store = configureStore();
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <PasswordForm handleError={handleError} handleSuccess={handleSuccess} />
        </Provider>
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });
});
