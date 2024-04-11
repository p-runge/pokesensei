import { TYPES } from "pokenode-ts";

export const getRandomInt = (max: number, min = 0): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// an empty array return undefined
export const getRandomElement: <T = unknown>(array: T[]) => T = (array) => {
  if (array.length === 0) {
    throw new Error("Can't get a random element of an empty array");
  }
  return array[getRandomInt(array.length - 1)]!;
};

export const POKEMON_TYPES_BY_GEN = [
  [
    TYPES.NORMAL,
    TYPES.FIGHTING,
    TYPES.FLYING,
    TYPES.POISON,
    TYPES.GROUND,
    TYPES.ROCK,
    TYPES.BUG,
    TYPES.GHOST,
    TYPES.FIRE,
    TYPES.WATER,
    TYPES.GRASS,
    TYPES.ELECTRIC,
    TYPES.PSYCHIC,
    TYPES.ICE,
    TYPES.DRAGON,
  ],
  [TYPES.STEEL, TYPES.DARK],
  [],
  [],
  [],
  [TYPES.FAIRY],
  [],
  [],
];
