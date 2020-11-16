import * as React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { ArticleContainer, GET_ARTICLE_QUERY } from "..";

afterAll(() => {
  cleanup();
});

const generateMocks = ({
  type,
  id,
  props: {
    imageUrl,
    title,
    introduction,
    body,
    createdAt,
    authorFirstName,
    authorLastName,
  } = {},
}) => {
  const article = {
    id,
    imageUrl: imageUrl || "http://www.image.com/url",
    title: title || "Wow article title",
    introduction: introduction || "This is the introduction! Wwowowowow",
    body: body || "This is the article body. Isnt it great?",
    createdAt: createdAt || new Date().toISOString(),
    author: {
      id: "1",
      firstName: authorFirstName || "Todd",
      lastName: authorLastName || "Lemonberry",
    },
  };

  const request = {
    query: GET_ARTICLE_QUERY,
    variables: {
      id,
    },
  };

  if (type === "error") {
    return [
      {
        request,
        error: new Error("oh no!"),
      },
    ];
  }

  return [
    {
      request,
      result: {
        data: { article },
      },
    },
  ];
};

describe("rendering", () => {
  let fragment;
  let match;
  let mocks;

  let id;
  let imageUrl;
  let title;
  let introduction;
  let body;
  let createdAt;
  let authorFirstName;
  let authorLastName;

  beforeEach(async () => {
    id = "1";
    title = "Article title";
    authorFirstName = "Jenny";
    authorLastName = "Rhubarblee";
    createdAt = new Date("2018-01-16T18:00:00-08:00").toISOString();
    introduction = "Wow this is the article introduction!";
    body = "I am the body!!!";

    mocks = generateMocks({
      type: "success",
      id,
      props: {
        imageUrl,
        title,
        introduction,
        body,
        createdAt,
        authorFirstName,
        authorLastName,
      },
    });
    match = {
      params: {
        id,
      },
    };

    const { asFragment } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ArticleContainer match={match} />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText(body));
    fragment = asFragment();
  });

  it("matches snapshot", async () => {
    expect(fragment).toMatchSnapshot();
  });

  it("renders the article", () => {
    expect(() => {
      screen.getByText(title);
      screen.getByText(new RegExp(authorFirstName));
      screen.getByText(new RegExp(authorLastName));
      // TODO: test for article createdAt being rendered
      screen.getByText(introduction);
      screen.getByText(body);
    }).not.toThrowError();
  });
});

describe("states", () => {
  describe("when the data is still loading", () => {
    it("renders the loading UI", () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <ArticleContainer match={{ params: { id: "1" } }} />
        </MockedProvider>
      );
      expect(() => {
        screen.getByText(/Loading/);
      }).not.toThrowError();
    });
  });

  describe("when the endpoint returns an error", () => {
    it.todo("renders the error UI");
  });

  describe("when the article does not exist", () => {
    it.todo("renders the article 404 UI");
  });
});
