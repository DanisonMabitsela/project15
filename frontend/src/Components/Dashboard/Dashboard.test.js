import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "./Dashboard";

test("Dashboard component renders correctly", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
