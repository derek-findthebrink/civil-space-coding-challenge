import * as React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { Routes, App } from "../App";


jest.mock("../../features/home/components/Home", () => {
  return {
    __esModule: true,
    default: () => {
      return <h1>I am Home</h1>;
    },
  };
});

jest.mock('../../features/articles/components/ArticlesContainer', () => {
  return {
    __esModule: true,
    default: () => {
      return (<h1>I am ArticlesContainer</h1>)
    }
  }
})

jest.mock("../../features/articles/components/ArticleContainer", () => {
  return {
    __esModule: true,
    default: () => {
      return <h1>I am ArticleContainer</h1>;
    },
  };
});


afterEach(() => {
  cleanup()
});

describe("App", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("Pages", () => {
  let fragment;
  let route;

  beforeEach(() => {
    const history = createMemoryHistory();
    history.push(route);
    const { asFragment } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );
    fragment = asFragment()
  });

  describe("Home", () => {
    beforeEach(() => {
      route = '/'
    })

    it("matches snapshot", () => {
      expect(fragment).toMatchSnapshot();
    });

    it('renders the Home component', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('I am Home')
    })
  });

  describe("Articles", () => {
    beforeAll(() => {
      route = "/articles";
    });

    it("matches snapshot", () => {
      expect(fragment).toMatchSnapshot();
    });

    it("renders the Articles component", () => {
      expect(screen.getByRole('heading')).toHaveTextContent('I am ArticlesContainer')
    });
  });

  describe("Article", () => {
    beforeAll(() => {
      route = "/article/1";
    });

    it("matches snapshot", () => {
      expect(fragment).toMatchSnapshot();
    });

    it("renders the Article component", () => {
      expect(screen.getByRole('heading')).toHaveTextContent('I am Article')
    });
  });
});
