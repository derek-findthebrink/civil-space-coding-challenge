import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Layout } from "../Layout";

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(
    <Layout>
      <h1>Hello!</h1>
    </Layout>
  );
  expect(asFragment()).toMatchSnapshot();
});
