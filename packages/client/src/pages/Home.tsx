import React from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import styled from "styled-components";

import SearchForm from "../components/Search/SearchForm";
import FindPokemonQuery, {
  FIND_POKEMON
} from "../components/graphql/queries/FindPokemon";

const Wrapper = styled.div``;

interface HomeState {
  searchQuery: string | null;
}

class Home extends React.Component<RouteComponentProps, HomeState> {
  state = {
    searchQuery: null
  };

  handleSearchSubmit = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    if (!searchQuery) {
      return (
        <Wrapper>
          <SearchForm onSubmit={this.handleSearchSubmit} />
        </Wrapper>
      );
    }

    return (
      <FindPokemonQuery query={FIND_POKEMON} variables={{ query: searchQuery }}>
        {({ error, loading, data }) => {
          if (error || !data) {
            return (
              <Wrapper>
                {error && <span>Pokemon not found</span>}
                <SearchForm onSubmit={this.handleSearchSubmit} />
              </Wrapper>
            );
          }

          if (loading) {
            return <Wrapper>Loading...</Wrapper>;
          }

          navigate(`/pokemon/${data.pokemon.name}`, { state: { data } });

          return null;
        }}
      </FindPokemonQuery>
    );
  }
}

export default Home;
