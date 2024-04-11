import type { Filters } from "./question";
import { getRandomElement } from "./random";

const lastPokemonByGen = [151, 251, 386, 493, 649, 721, 809, 905];

export const POKEMON_BY_GEN = lastPokemonByGen.map((lastPokemonInGen, i) => ({
  first: i === 0 ? 1 : lastPokemonByGen[i - 1]! + 1,
  last: lastPokemonInGen,
}));

export const getRandomPokemonId = (
  filters: Filters,
  not: number[] = [],
): number => {
  const { generations = [1, 2, 3, 4, 5, 6, 7, 8, 9] } = filters;

  const validPokemon = POKEMON_BY_GEN.filter((_, i) =>
    generations.includes(i + 1),
  )
    .map(({ first, last }) =>
      [...Array<void>(last - first + 1)].map((_, i) => i + first),
    )
    .flat();

  const id = getRandomElement(validPokemon);
  if (not.includes(id)) {
    return getRandomPokemonId(filters, not);
  }
  return id;
};
