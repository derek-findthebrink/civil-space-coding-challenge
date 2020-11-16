// Libraries
import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { ArticleHeader } from "../ArticleHeader";

export const GET_ARTICLE_QUERY = gql`
  query Article($id: String!) {
    article(articleId: $id) {
      id
      imageUrl
      title
      introduction
      body
      createdAt
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

export const ArticleContainer = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useQuery(GET_ARTICLE_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const {
    article: { author, imageUrl, title, body, createdAt, introduction },
  } = data;

  return (
    <>
      <ArticleHeader author={author} createdAt={createdAt} title={title} />
      <img className="article__image" src={imageUrl} alt="This is best described by..." />
      <p>{introduction}</p>
      <p>{body}</p>
    </>
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
