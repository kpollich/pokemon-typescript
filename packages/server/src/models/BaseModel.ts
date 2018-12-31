import PokeAPI from "../data-sources/poke-api";

class BaseModel {
  pokeApi: InstanceType<typeof PokeAPI>;

  constructor(pokeApi: InstanceType<typeof PokeAPI>) {
    this.pokeApi = pokeApi;
  }
}

export default BaseModel;
