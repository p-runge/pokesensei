import { GENERATIONS } from "pokenode-ts";

import type { Filters } from "./question";
import { fillArrayWithNumbers } from "./common";
import { getRandomElement, POKEMON_TYPES_BY_GEN } from "./random";

export const getRandomPokemonTypeId = (
  filters: Filters,
  not: number[] = [],
): number => {
  const {
    generations = fillArrayWithNumbers(Object.values(GENERATIONS).length),
  } = filters;
  const highestGen = generations.reduce((a, b) => Math.max(a, b));

  const validTypes = POKEMON_TYPES_BY_GEN.filter(
    (_, i) => i + 1 <= highestGen,
  ).flat();

  return getRandomElement(
    validTypes.filter(
      // remove types from 'not'
      (id) => !not.includes(id),
    ),
  );
};

export const getRandomPokemonTypeIds = (
  amount: number,
  filters: Filters,
  not: number[] = [],
): number[] => {
  const ids: number[] = [];
  [...Array<void>(amount)].forEach(() => {
    ids.push(getRandomPokemonTypeId(filters, [...ids, ...not]));
  });

  return ids;
};
