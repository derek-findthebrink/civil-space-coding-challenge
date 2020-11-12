// Libraries
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { ArticleItem } from "../ArticleItem";

const getArticlesListQuery = () => gql`
  query GetArticles($titleContains: String) {
    articles(filter:{titleContains: $titleContains}) {
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
    };
    this.handleChangeTitleContains = this.handleChangeTitleContains.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeTitleContains(e) {
    this.setState({ titleContains: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    // TODO: navigate to new route
    // this.setState({
    //   redirect: `/articles?title_contains=${this.state.titleContains}`,
    // })
    this.props.onChangeTitleValue(this.state.titleContains)
  }

  render() {
    const {
      titleContains,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search something..." value={titleContains} onChange={this.handleChangeTitleContains} />
        {/* <label>
          Sort By
          <select>
            <option>Latest</option>
            <option>Date</option>
            <option>Title</option>
          </select>
        </label> */}
        <input type="submit" value="Go" />
      </form>
    );
  }
}

const ArticlesContainer = ({ location: { search } }) => {
  const urlParams = new URLSearchParams(search);

  const [titleContains, setTitleContains] = useState(
    urlParams.get("title_contains") || ""
  );

  const { loading, error, data } = useQuery(getArticlesListQuery(), {
    variables: {
      titleContains,
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const hasArticles = data.articles.length !== 0;

  return (
    <Layout>
      <SearchBar titleContains={titleContains} onChangeTitleValue={setTitleContains} />
      {!hasArticles && (<h2>Sorry, no articles were found!</h2>)}
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
}

export default ArticlesContainer;
