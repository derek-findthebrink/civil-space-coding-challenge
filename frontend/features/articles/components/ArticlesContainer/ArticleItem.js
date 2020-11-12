import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatArticleDate } from "./formatArticleDate";
import { humanizeDate } from "./humanizeDate";

const Wrapper = styled.div`
  background-image: url("${(props) => props.imageUrl}");
`;

const HR = styled.hr`
  width: 52px;
  margin: 44px 0;
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
      <HR />
      <header>
        <h1>{title}</h1>
        <div>
          <p className="article-item__byline">
            <small>
              {author.firstName} {author.lastName}
              &nbsp;|&nbsp;
              <time dateTime={formatArticleDate(createdAt)}>
                {humanizeDate(createdAt)}
              </time>
            </small>
          </p>
        </div>
      </header>
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
