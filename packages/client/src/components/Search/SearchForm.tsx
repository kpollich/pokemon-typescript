import React from "react";

interface SearchFormProps {
  onSubmit: Function;
}

interface SearchFormState {
  query: string;
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  state = {
    query: ""
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="query">Search for a Pokemon</label>
        <input
          name="query"
          value={this.state.query}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchForm;
