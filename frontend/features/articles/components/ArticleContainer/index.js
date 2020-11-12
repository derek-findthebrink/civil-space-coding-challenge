// Libraries
import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { ArticleItem } from "../ArticleItem";

const getArticleQuery = () => gql`
  query Article($id: String!) {
    article(articleId: $id) {
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

const ArticleContainer = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useQuery(getArticleQuery(), {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const {
    article: { author, imageUrl, title, introduction, createdAt },
  } = data;

  return (
    <ArticleItem
      id={id}
      author={author}
      createdAt={createdAt}
      title={title}
      imageUrl={imageUrl}
      introduction={introduction}
    />
  );
};
ArticleContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleContainer;
