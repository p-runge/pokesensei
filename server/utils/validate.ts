/* eslint-disable import/prefer-default-export */
import { pokeApi } from "./question";

export const validateTypeOfPokemon = async (id: number, type: string) => {
  const pokemon = await pokeApi.getPokemonById(id);
  return pokemon.types.map((t) => t.type.name).includes(type);
};

export const validateNameOfPokemon = async (id: number, name: string) => {
  const pokemon = await pokeApi.getPokemonById(id);
  return pokemon.name === name;
};
