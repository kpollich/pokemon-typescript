import { ApolloServer, makeExecutableSchema } from "apollo-server";
import PokeApi from "./data-sources/poke-api";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";
import Pokemon from "./models/Pokemon";
import PokemonOrMoveType from "./models/PokemonOrMoveType";

export interface Context {
  dataSources: {
    pokeApi: InstanceType<typeof PokeApi>;
  };
  models: {
    Pokemon: InstanceType<typeof Pokemon>;
    PokemonOrMoveType: InstanceType<typeof PokemonOrMoveType>;
  };
}

const pokeApi = new PokeApi();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  dataSources: () => ({ pokeApi }),
  context: () => {
    const pokemonInstance = new Pokemon(pokeApi);
    const pokemonOrMoveTypeInstance = new PokemonOrMoveType(pokeApi);

    return {
      models: {
        Pokemon: pokemonInstance,
        PokemonOrMoveType: pokemonOrMoveTypeInstance
      }
    };
  }
});

export default server;
