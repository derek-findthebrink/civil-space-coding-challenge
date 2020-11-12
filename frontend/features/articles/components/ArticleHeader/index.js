import React from "react";
import PropTypes from "prop-types";
import { formatArticleDate } from "./formatArticleDate";
import { humanizeDate } from "./humanizeDate";

export const ArticleHeader = ({
  title,
  author,
  createdAt,
}) => (
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
  );
ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleHeader
