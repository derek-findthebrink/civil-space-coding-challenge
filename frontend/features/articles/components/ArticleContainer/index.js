// Libraries
import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";

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

  return <h2>Article!</h2>;
};
ArticleContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleContainer;
