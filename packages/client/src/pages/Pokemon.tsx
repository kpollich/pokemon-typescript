import React from "react";
import { RouteComponentProps } from "@reach/router";

import FindPokemonQuery, {
  FIND_POKEMON
} from "../components/graphql/queries/FindPokemon";

interface Props {
  name: string;
  state: {
    data: {
      pokemon: any;
    };
  };
}

const PokemonPage: React.SFC<RouteComponentProps<Props>> = props => {
  // If we're coming from a search submission, we'll have data available to us in the
  // route's `state` object so we don't have to refetch
  if (props.state) {
    const { data } = props.state;

    return <pre>{JSON.stringify(data.pokemon, null, 2)}</pre>;
  }

  if (!props.name) {
    return null;
  }

  // If we're just laoding this URL without doing a search first, we have to fetch the fresh data
  return (
    <FindPokemonQuery query={FIND_POKEMON} variables={{ query: props.name }}>
      {({ error, loading, data }) => {
        if (error || !data) {
          return null;
        }

        if (loading) {
          return <div>Loading...</div>;
        }

        return <pre>{JSON.stringify(data.pokemon, null, 2)}</pre>;
      }}
    </FindPokemonQuery>
  );
};

export default (props: RouteComponentProps) => <PokemonPage {...props} />;
