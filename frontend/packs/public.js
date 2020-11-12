/* eslint-disable react/jsx-props-no-spreading */
// Libraries
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
// eslint-disable-next-line import/no-unresolved
import { client } from "graphql/client";
// TODO: consider fixing the importing situation here -> webpacker has this in hand, can we patch the rule?

// Components
// eslint-disable-next-line import/no-unresolved
import Home from "home/components/Home";
// eslint-disable-next-line import/no-unresolved
import ArticlesContainer from "articles/components/ArticlesContainer";

// Routes
const ROOT = "/";
const ARTICLES = "/articles";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro&family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
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
