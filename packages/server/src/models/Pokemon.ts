import BaseModel from "./BaseModel";
import PokemonOrMoveType, { PokemonOrMoveTypeDTO } from "./PokemonOrMoveType";

export interface PokemonDTO {
  number: number;
  name: string;
  types: PokemonOrMoveTypeDTO[];
  suggestedTypes?: PokemonOrMoveTypeDTO[];
}

class Pokemon extends BaseModel {
  /**
   * Returns a list of pokemon types that would be effective in battle against a
   * Pokemon with the provided types.
   */
  getSuggestedTypes(
    types: PokemonOrMoveTypeDTO[],
    PokemonOrMoveTypeModel: InstanceType<typeof PokemonOrMoveType>
  ) {
    const damageRelations = PokemonOrMoveTypeModel.getDamageRelationsFromTypes(
      types
    );

    // Intersect the set of double damage and half damage types in the provided
    // set of types. Some type relationships offset each other. e.g. a steel/fire
    // type Pokemon takes neutral damage from fire attacks.
    const doubleDamageFromTypes = damageRelations.doubleDamageFrom!.filter(
      doubleDamageType =>
        !damageRelations.halfDamageFrom!.some(
          halfDamageType => halfDamageType.name === doubleDamageType.name
        )
    );

    const { noDamageTo = [], halfDamageTo = [] } = damageRelations;

    // Suggested types = types that are effective against this Pokemon and types that are likely
    // to resist this Pokemon's moves
    const suggestedTypes = [
      ...doubleDamageFromTypes,
      ...halfDamageTo,
      ...noDamageTo
    ];

    return suggestedTypes;
  }

  /**
   * Fetches a pokemon based on the provided `query` object - this object is passed through
   * to PokeAPI and can be a pokedex number or name.
   */
  async find(
    query: string,
    PokemonOrMoveTypeModel: InstanceType<typeof PokemonOrMoveType>
  ): Promise<PokemonDTO> {
    const pokemonData = await this.pokeApi.getPokemon({ query });

    const types = await Promise.all(
      pokemonData.types.map(({ type }) => {
        return PokemonOrMoveTypeModel.find(type.name);
      })
    );

    const suggestedTypes = this.getSuggestedTypes(
      types,
      PokemonOrMoveTypeModel
    );

    return {
      name: pokemonData.name,
      number: Number(pokemonData.id),
      types,
      suggestedTypes
    };
  }
}

export default Pokemon;
