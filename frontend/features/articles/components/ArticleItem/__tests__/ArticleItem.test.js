import * as React from "react";
import { render, cleanup, screen } from "@testing-library/react";

import { ArticleItem } from "..";

jest.mock('../../ArticleHeader', () => (
  {
    __esModule: true,
    ArticleHeader: () => (<h1>I am the ArticleHeader</h1>)
  }
))

afterEach(() => {
  cleanup()
})

describe("rendering", () => {
  let fragment
  let id
  let imageUrl
  let title
  let introduction
  let createdAt
  let author;

  beforeEach(() => {
    id = "123";
    imageUrl = 'https://www.image.com/image'
    title = 'Article Title'
    introduction = 'This is the introduction!'
    createdAt = '2020-08-16T14:30:00-08:00'
    author = {
      firstName: 'Todd',
      lastName: 'McGavin',
    }

    const { asFragment } = render(
      <ArticleItem
        id={id}
        imageUrl={imageUrl}
        title={title}
        introduction={introduction}
        createdAt={createdAt}
        author={author}
      />
    );
    fragment = asFragment();
  });

  it("matches snapshot", () => {
    expect(fragment).toMatchSnapshot();
  });

  it("renders an ArticleHeader", () => {
    expect(screen.getByRole('heading')).toHaveTextContent('I am the ArticleHeader');
  });

  it("renders the `introduction`", () => {
    expect(screen.getByText(introduction)).toBeTruthy();
  });

  it("renders the a `Read More` button", () => {
    expect(screen.getByRole('link')).toHaveTextContent('Read More');
  });
});
