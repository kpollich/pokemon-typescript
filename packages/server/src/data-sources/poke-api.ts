import { RESTDataSource } from "apollo-datasource-rest";

export interface PokemonResponse {
  id: string;
  name: string;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
}

interface DamageRelations {
  [key: string]: [{ name: string }];

  double_damage_from: [
    {
      name: string;
    }
  ];
  double_damage_to: [
    {
      name: string;
    }
  ];
  half_damage_from: [
    {
      name: string;
    }
  ];
  half_damage_to: [
    {
      name: string;
    }
  ];
  no_damage_from: [
    {
      name: string;
    }
  ];
  no_damage_to: [
    {
      name: string;
    }
  ];
}

export interface TypeResponse {
  name: string;
  damage_relations: DamageRelations;
}

// TODO: Add a basic in memory cache for responses
class PokeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://pokeapi.co/api/v2/";
  }

  async getPokemon({ query }: { query: string }): Promise<PokemonResponse> {
    console.log("Requesting pokemon data for query", query);
    return this.get(`pokemon/${query.toLowerCase()}/`);
  }

  async getType(name: string): Promise<TypeResponse> {
    console.log("Requesting type data for type", name);
    return this.get(`type/${name}/`);
  }
}

export default PokeAPI;
