import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ArticleHeader } from "../ArticleHeader";

const Wrapper = styled.div`
  background-image: url("${(props) => props.imageUrl}");
`;

export const ArticleItem = ({
  id,
  imageUrl,
  title,
  introduction,
  createdAt,
  author,
}) => {
  return (
    <article className="article-item" role="contentinfo" aria-label="Article">
      <hr className="article-item__accent-hr" />
      <ArticleHeader
        title={title}
        createdAt={createdAt}
        author={author}
      />
      <Wrapper
        className="article-item__content-wrapper"
        imageUrl={`${imageUrl}?cid=${id}`}
      >
        <div className="article-item__content">
          <p className="article-item__intro">{introduction}</p>
          <footer>
            <a
              className="article-item__read-more"
              href={`/article/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </footer>
        </div>
      </Wrapper>
    </article>
  );
};
ArticleItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleItem;
