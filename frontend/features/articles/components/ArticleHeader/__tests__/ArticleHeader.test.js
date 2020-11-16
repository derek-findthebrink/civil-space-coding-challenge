import * as React from "react";
import { render, cleanup, screen } from "@testing-library/react";

import { ArticleHeader } from "..";
import { humanizeDate } from "../humanizeDate";

afterEach(cleanup);

describe("rendering", () => {
  let title;
  let author;
  let createdAt;

  beforeEach(() => {
    title = "My cool article";
    author = {
      firstName: "Todd",
      lastName: "McGavin",
    };
    createdAt = new Date("2010-08-16T12:30:00-08:00").toISOString();
    render(
      <ArticleHeader title={title} createdAt={createdAt} author={author} />
    );
  });

  it("displays the `title` in a heading", () => {
    expect(screen.getByRole("heading")).toHaveTextContent(title);
  });

  it("displays `author.firstName`", async () => {
    expect(screen.getByText(/Todd/)).toBeTruthy();
  });

  it("displays `author.lastName`", () => {
    expect(screen.getByText(/McGavin/)).toBeTruthy();
  });

  it("displays the `createdAt` date as expected", () => {
    // use the humanize function here to ensure output is always formatted as per testing locale
    expect(screen.getByText(humanizeDate(createdAt))).toBeTruthy();
  });
});
