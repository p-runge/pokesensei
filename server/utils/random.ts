import { Types } from "pokenode-ts";

// export const POKEMON_AMOUNT = 898;
export const POKEMON_AMOUNT = 151;

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

export const getRandomPokemonId = (not: number[] = []): number => {
  const id = getRandomInt(POKEMON_AMOUNT, 1);
  if (not.includes(id)) {
    return getRandomPokemonId(not);
  }
  return id;
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
