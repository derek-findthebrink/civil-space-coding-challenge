// Libraries
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { DateTime } from "luxon";

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

const formatArticleDate = (date) => {
  const dt = DateTime.fromISO(date);
  return dt.toFormat("yyyy-mm-dd HH:mm");
};

const humanizeDate = (date) => {
  const dt = DateTime.fromISO(date);
  return dt.toLocaleString(DateTime.DATETIME_MED);
};

const ArticleItem = ({
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
        <a href={`/article/${id}`} target="_blank">
          Read more
        </a>
      </footer>
    </article>
  );
};

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
