import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../public";

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(
    <App />
  );
  expect(asFragment()).toMatchSnapshot();
});
