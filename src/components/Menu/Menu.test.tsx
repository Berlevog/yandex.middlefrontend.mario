import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";
import Menu from "./Menu";

describe("render header", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<Menu open={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("props 'open' passed successfully", () => {
    const menu = mount(<Menu open={false} />);
    expect(menu.prop("open")).toEqual(false);
  });
});
