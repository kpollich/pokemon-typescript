import { IResolverObject } from "apollo-server";
import { Context } from "../../server";
import { PokemonDTO } from "../../models/Pokemon";

const PokemonResolver: IResolverObject<any, Context> = {
  Query: {
    async pokemon(_, { input }, { models }): Promise<PokemonDTO> {
      const pokemonData = await models.Pokemon.find(
        input.query,
        models.PokemonOrMoveType
      );

      return pokemonData;
    }
  }
};

export default PokemonResolver;
