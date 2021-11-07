import { mount } from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Header from "./Header";

describe("render header", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Header open={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("props 'open' passed successfully", () => {
    const header = mount(<Header open={false} />);
    expect(header.prop("open")).toEqual(false);
  });
});
