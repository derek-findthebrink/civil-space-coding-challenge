// Libraries
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { ArticleItem } from "./ArticleItem";

const getArticlesListQuery = () => gql`
  query GetArticles {
    articles {
      id
      imageUrl
      title
      introduction
      createdAt
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

const ArticlesContainer = () => {
  const { loading, error, data } = useQuery(getArticlesListQuery());

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.articles.map(
        ({ id, imageUrl, title, introduction, createdAt, author }) => (
          <li key={id}>
            <ArticleItem
              id={id}
              imageUrl={imageUrl}
              title={title}
              introduction={introduction}
              createdAt={createdAt}
              author={author}
            />
          </li>
        )
      )}
    </ul>
  );
};

export default ArticlesContainer;
