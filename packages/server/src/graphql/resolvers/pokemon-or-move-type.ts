import { IResolverObject } from "apollo-server";
import { Context } from "../../server";
import PokemonMoveOrType from "../../models/PokemonOrMoveType";

interface GraphQLParent {
  name: string;
}

const PokemonOrMoveTypeResolver: IResolverObject<GraphQLParent, Context> = {
  PokemonOrMoveType: {
    doubleDamageTo(parent, _, { models }) {
      return getDamageRelations(
        parent.name,
        "doubleDamageTo",
        models.PokemonOrMoveType
      );
    },

    doubleDamageFrom(parent, _, { models }) {
      return getDamageRelations(
        parent.name,
        "doubleDamageFrom",
        models.PokemonOrMoveType
      );
    },

    halfDamageFrom(parent, _, { models }) {
      return getDamageRelations(
        parent.name,
        "halfDamageFrom",
        models.PokemonOrMoveType
      );
    },

    halfDamageTo(parent, _, { models }) {
      return getDamageRelations(
        parent.name,
        "halfDamageTo",
        models.PokemonOrMoveType
      );
    },

    async noDamageTo(parent, _, { models }) {
      return getDamageRelations(
        parent.name,
        "noDamageTo",
        models.PokemonOrMoveType
      );
    },

    async noDamageFrom(parent, _, { models }) {
      return getDamageRelations(
        parent.name,
        "noDamageFrom",
        models.PokemonOrMoveType
      );
    }
  }
};

async function getDamageRelations(
  name: string,
  key: string,
  pokemonMoveOrType: InstanceType<typeof PokemonMoveOrType>
) {
  const type = await pokemonMoveOrType.find(name);

  const relations = type.damageRelations && type.damageRelations[key];

  return relations;
}

export default PokemonOrMoveTypeResolver;
