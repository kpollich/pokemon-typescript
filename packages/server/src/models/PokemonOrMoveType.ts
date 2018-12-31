import BaseModel from "./BaseModel";

export type PokemonOrMoveTypeName =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow";

export interface DamageRelations {
  [key: string]: PokemonOrMoveTypeDTO[] | undefined;

  doubleDamageFrom?: PokemonOrMoveTypeDTO[];
  doubleDamageTo?: PokemonOrMoveTypeDTO[];

  halfDamageFrom?: PokemonOrMoveTypeDTO[];
  halfDamageTo?: PokemonOrMoveTypeDTO[];

  noDamageFrom?: PokemonOrMoveTypeDTO[];
  noDamageTo?: PokemonOrMoveTypeDTO[];
}

export interface PokemonOrMoveTypeDTO {
  name: PokemonOrMoveTypeName;
  damageRelations?: DamageRelations;
}

class PokemonOrMoveType extends BaseModel {
  getDamageRelationsFromTypes(types: PokemonOrMoveTypeDTO[]): DamageRelations {
    return types.reduce(
      (acc: DamageRelations, current) => {
        const { damageRelations } = current;

        if (!damageRelations) {
          return acc;
        }

        Object.keys(damageRelations).forEach(key => {
          const relation = damageRelations[key];

          if (relation) {
            acc[key] = acc[key]!.concat(relation);
          }
        });

        return acc;
      },
      {
        doubleDamageFrom: [],
        doubleDamageTo: [],
        halfDamageFrom: [],
        halfDamageTo: [],
        noDamageFrom: [],
        noDamageTo: []
      }
    );
  }

  async find(name: string): Promise<PokemonOrMoveTypeDTO> {
    const typeData = await this.pokeApi.getType(name);

    return {
      name: typeData.name as PokemonOrMoveTypeName,

      damageRelations: {
        doubleDamageFrom: typeData.damage_relations.double_damage_from.map(
          relation => {
            return {
              name: relation.name as PokemonOrMoveTypeName
            };
          }
        ),
        doubleDamageTo: typeData.damage_relations.double_damage_to.map(
          relation => {
            return {
              name: relation.name as PokemonOrMoveTypeName
            };
          }
        ),
        halfDamageFrom: typeData.damage_relations.half_damage_from.map(
          relation => {
            return {
              name: relation.name as PokemonOrMoveTypeName
            };
          }
        ),
        halfDamageTo: typeData.damage_relations.half_damage_to.map(relation => {
          return {
            name: relation.name as PokemonOrMoveTypeName
          };
        }),
        noDamageFrom: typeData.damage_relations.no_damage_from.map(relation => {
          return {
            name: relation.name as PokemonOrMoveTypeName
          };
        }),
        noDamageTo: typeData.damage_relations.no_damage_to.map(relation => {
          return {
            name: relation.name as PokemonOrMoveTypeName
          };
        })
      }
    };
  }
}

export default PokemonOrMoveType;
