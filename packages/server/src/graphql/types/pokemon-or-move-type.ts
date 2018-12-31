import { gql } from "apollo-server";

const PokemonOrMoveType = gql`
  type PokemonOrMoveType {
    name: String!

    # List of move types that are super effective against this type
    doubleDamageFrom: [PokemonOrMoveType!]

    # List of types against which this type is super effective
    doubleDamageTo: [PokemonOrMoveType!]

    halfDamageFrom: [PokemonOrMoveType!]
    halfDamageTo: [PokemonOrMoveType!]
    noDamageFrom: [PokemonOrMoveType!]
    noDamageTo: [PokemonOrMoveType!]
  }
`;

export default PokemonOrMoveType;
