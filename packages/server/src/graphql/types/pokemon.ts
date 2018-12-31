import { gql } from "apollo-server";

const PokemonType = gql`
  type Pokemon {
    # Pokedex entry number
    number: Int!

    # The Pokemon's name
    name: String!

    # A list of the Pokemon's types
    types: [PokemonOrMoveType!]!

    # A list of suggested Pokemon/move types that are effective against this Pokemon
    suggestedTypes: [PokemonOrMoveType]
  }

  input PokemonInput {
    query: String!
  }

  type Query {
    pokemon(input: PokemonInput!): Pokemon
  }
`;

export default PokemonType;
