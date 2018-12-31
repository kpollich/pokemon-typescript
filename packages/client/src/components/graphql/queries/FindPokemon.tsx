import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const FIND_POKEMON = gql`
  query FindPokemon($query: String!) {
    pokemon(input: { query: $query }) {
      name
      number
      suggestedTypes {
        name
      }
      types {
        name
      }
    }
  }
`;

export interface FindPokemonData {
  pokemon: {
    name: string;
    number: number;
    suggestedTypes: Array<{ name: string }>;
    types: Array<{ name: string }>;
  };
}

export interface FindPokemonVariables {
  query: string;
}

class FindPokemonQuery extends Query<FindPokemonData, FindPokemonVariables> {}

export default FindPokemonQuery;
