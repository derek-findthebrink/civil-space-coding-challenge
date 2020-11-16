/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import { client } from "../graphql/client";

// Components
import Home from "../features/home/components/Home";
import ArticlesContainer from "../features/articles/components/ArticlesContainer";
import ArticleContainer from "../features/articles/components/ArticleContainer";
import { Layout } from "./Layout";

// Routes
const ROOT = "/";
const ARTICLES = "/articles";
const ARTICLE = "/article/:id";

export const Routes = () => (
  <ApolloProvider client={client}>
    <Switch>
      <Route
        strict
        path={ARTICLE}
        render={(props) => <ArticleContainer {...props} />}
      />
      <Route
        strict
        path={ARTICLES}
        render={(props) => <ArticlesContainer {...props} />}
      />
      <Route strict path={ROOT} render={(props) => <Home {...props} />} />
    </Switch>
  </ApolloProvider>
);

export const App = () => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro&family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Layout>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Layout>
    </>
  );
};

export default App;
