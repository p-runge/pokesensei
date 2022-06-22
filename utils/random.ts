/* eslint-disable import/prefer-default-export */
import { Types } from "pokenode-ts";

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

export const getRandomPokemonId = (): number => {
  return getRandomInt(151, 1);
  // return getRandomInt(898, 1);
};

export const getRandomPokemonTypeId = (not: number[] = []): number => {
  return getRandomElement<number>(
    Object.values(Types)
      .filter((value) => typeof value === "string")
      .map((value) => (Types as any)[value])
      .filter(
        // ignore special types
        (id) => id !== Types.UNKNOWN && id !== Types.SHADOW
      )
      .filter(
        // remove types from 'not'
        (id) => !not.includes(id)
      )
  );
};

export const getRandomPokemonTypeIds = (
  amount: number,
  not: number[] = []
): number[] => {
  const ids: number[] = [];
  [...Array(amount)].forEach(() => {
    ids.push(getRandomPokemonTypeId([...ids, ...not]));
  });

  return ids;
};
