import React from "react";
import PropTypes from "prop-types";
import { formatArticleDate } from "./formatArticleDate";
import { humanizeDate } from "./humanizeDate";

export const ArticleItem = ({
  id,
  imageUrl,
  title,
  introduction,
  createdAt,
  author,
}) => {
  return (
    <article role="contentinfo" aria-label="Article">
      <header>
        <h1>{title}</h1>
        <div>
          <p>
            {author.firstName} {author.lastName}
          </p>
          <p>
            <time dateTime={formatArticleDate(createdAt)}>
              {humanizeDate(createdAt)}
            </time>
          </p>
        </div>
      </header>
      <p>{introduction}</p>
      <footer>
        <a href={`/article/${id}`} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </footer>
    </article>
  );
};
ArticleItem.propTypes = {
  id: PropTypes.number.isRequired,
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
