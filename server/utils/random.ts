import { Types } from "pokenode-ts";
import { fillArrayWithNumbers } from "./common";
import { Filters } from "./question";

export const getRandomInt = (max: number, min = 0): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// an empty array return undefined
export const getRandomElement: <T = unknown>(array: T[]) => T = (array) => {
  if (array.length === 0) {
    throw new Error("Can't get a random element of an empty array");
  }
  return array[getRandomInt(array.length - 1)];
};

const lastPokemonByGen = [151, 251, 386, 493, 649, 721, 809, 905];

export const POKEMON_BY_GEN = lastPokemonByGen.map((lastPokemonInGen, i) => ({
  first: i === 0 ? 1 : lastPokemonByGen[i - 1] + 1,
  last: lastPokemonInGen,
}));

export const getRandomPokemonId = (
  filters: Filters,
  not: number[] = []
): number => {
  const { generations = fillArrayWithNumbers(8) } = filters;

  const validPokemon = POKEMON_BY_GEN.filter((_, i) =>
    generations.includes(i + 1)
  )
    .map(({ first, last }) =>
      [...Array(last - first + 1)].map((_, i) => i + first)
    )
    .flat();

  const id = getRandomElement(validPokemon);
  if (not.includes(id)) {
    return getRandomPokemonId(filters, not);
  }
  return id;
};

export const POKEMON_TYPES_BY_GEN = [
  [
    Types.NORMAL,
    Types.FIGHTING,
    Types.FLYING,
    Types.POISON,
    Types.GROUND,
    Types.ROCK,
    Types.BUG,
    Types.GHOST,
    Types.FIRE,
    Types.WATER,
    Types.GRASS,
    Types.ELECTRIC,
    Types.PSYCHIC,
    Types.ICE,
    Types.DRAGON,
  ],
  [Types.STEEL, Types.DARK],
  [],
  [],
  [],
  [Types.FAIRY],
  [],
  [],
];

export const getRandomPokemonTypeId = (
  filters: Filters,
  not: number[] = []
): number => {
  const { generations = fillArrayWithNumbers(8) } = filters;
  const highestGen = generations.reduce((a, b) => Math.max(a, b));

  const validTypes = POKEMON_TYPES_BY_GEN.filter(
    (_, i) => i + 1 <= highestGen
  ).flat();

  return getRandomElement(
    validTypes.filter(
      // remove types from 'not'
      (id) => !not.includes(id)
    )
  );
};

export const getRandomPokemonTypeIds = (
  amount: number,
  filters: Filters,
  not: number[] = []
): number[] => {
  const ids: number[] = [];
  [...Array(amount)].forEach(() => {
    ids.push(getRandomPokemonTypeId(filters, [...ids, ...not]));
  });

  return ids;
};

export const getRandomNatureId = (
  filters: Filters,
  hasStatInfluence = false,
  not: number[] = []
): number => {
  let id: number;
  if (hasStatInfluence) {
    // every first nature in a group of 6 has no stat influence, that's a fix order by pokeapi
    const idsOfNaturesWithStatInfluece = [...Array(25)]
      .map((_, i) => i + 1)
      .filter((n) => n % 6 !== 1);

    id = getRandomElement(idsOfNaturesWithStatInfluece);
  } else {
    id = getRandomInt(25, 1);
  }

  if (not.includes(id)) {
    return getRandomNatureId(filters, hasStatInfluence, not);
  }
  return id;
};

export const getRandomNatureIds = (
  amount: number,
  filters: Filters,
  hasStatInfluence = false,
  not: number[] = []
): number[] => {
  const ids: number[] = [];
  [...Array(amount)].forEach(() => {
    ids.push(getRandomNatureId(filters, hasStatInfluence, [...ids, ...not]));
  });

  return ids;
};
