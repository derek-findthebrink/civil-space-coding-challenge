import React from "react";
import PropTypes from "prop-types";

export class SearchBar extends React.Component {
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
    });
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
          onChange={this.handleChangeTitleContains} />
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

export default SearchBar;
