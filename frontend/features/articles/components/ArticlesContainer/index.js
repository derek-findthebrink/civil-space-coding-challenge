// Libraries
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { ArticleItem } from "../ArticleItem";

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


const Layout = ({ children }) => <div>{children}</div>;
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleContains: props.titleContains || "",
      sortBy: props.sortBy || "LATEST",
    };
    this.handleChangeTitleContains = this.handleChangeTitleContains.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChangeTitleContains(e) {
    this.setState({ titleContains: e.target.value });
  }

  handleChangeSortBy(e) {
    this.setState({ sortBy: e.target.value });
  }

  handleReset() {
    this.setState({
      sortBy: 'LATEST',
      titleContains: '',
    })
  }

  handleSubmit(e) {
    const { onChangeArticleSearch } = this.props;

    e.preventDefault();
    onChangeArticleSearch(this.state);
  }

  render() {
    const { titleContains, sortBy } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search something..."
          value={titleContains}
          onChange={this.handleChangeTitleContains}
        />
        <label htmlFor="sortBy">
          Sort By
          <select id="sortBy" value={sortBy} onChange={this.handleChangeSortBy}>
            <option value="LATEST">Latest</option>
            <option value="TITLE">Title</option>
          </select>
        </label>
        <input type="submit" value="Go" />
        <button onClick={this.handleReset}>Reset</button>
      </form>
    );
  }
}
SearchBar.propTypes = {
  titleContains: PropTypes.string,
  sortBy: PropTypes.string,
  onChangeArticleSearch: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  titleContains: "",
  sortBy: "LATEST",
};


const ArticlesContainer = ({ location: { search } }) => {
  const urlParams = new URLSearchParams(search);

  // const [titleContains, setTitleContains] = useState(
  //   urlParams.get("title_contains") || ""
  // );
  // const [sortBy, setSortBy] = useState(urlParams.get("sort_by") || "");
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
    <Layout>
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
    </Layout>
  );
};
ArticlesContainer.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default ArticlesContainer;
