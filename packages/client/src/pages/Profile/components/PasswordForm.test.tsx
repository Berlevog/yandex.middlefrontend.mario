import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "../../../store";

import { handleError, handleSuccess } from "./mockDataForTest";
import PasswordForm from "./PasswordForm";

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
