// Libraries
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { ArticleItem } from "../ArticleItem";
import { SearchBar } from "./SearchBar";
import { Layout } from "../../../../components/Layout";

const getArticlesListQuery = () => gql`
  query GetArticles($titleContains: String, $sortBy: ArticleSortEnum) {
    articles(order: $sortBy, filter: { titleContains: $titleContains }) {
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


const ArticlesContainer = ({ location: { search } }) => {
  const urlParams = new URLSearchParams(search);

  const [articleSearch, setArticleSearch] = useState({
    titleContains: urlParams.get("title_contains"),
    sortBy: urlParams.get("sort_by") || 'LATEST',
  });

  const { titleContains, sortBy } = articleSearch;

  const { loading, error, data } = useQuery(getArticlesListQuery(), {
    variables: {
      titleContains,
      sortBy
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const hasArticles = data.articles.length !== 0;

  return (
    <>
      <SearchBar
        titleContains={titleContains}
        sortBy={sortBy}
        onChangeArticleSearch={setArticleSearch}
      />
      {!hasArticles && <h2>Sorry, no articles were found!</h2>}
      {hasArticles && (
        <ul className="articles-container__ul">
          {data.articles.map(
            ({ id, imageUrl, title, introduction, createdAt, author }) => (
              <li className="articles-item__li" key={id}>
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
      )}
    </>
  );
};
ArticlesContainer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default ArticlesContainer;
