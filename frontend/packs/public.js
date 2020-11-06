// Libraries
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { client } from "graphql/client";

// Components
import Home from "home/components/Home";
import ArticlesContainer from "articles/components/ArticlesContainer";

// Routes
const ROOT = "/";
const ARTICLES = "/articles";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route
            strict
            path={ARTICLES}
            render={(props) => <ArticlesContainer {...props} />}
          />
          <Route strict path={ROOT} render={(props) => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const rootElement = document.querySelector("#react-app");

render(<App />, rootElement);
