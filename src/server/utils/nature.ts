import type { Filters } from "./question";
import { getRandomElement, getRandomInt } from "./random";

export const getRandomNatureId = (
  filters: Filters,
  hasStatInfluence = false,
  not: number[] = []
): number => {
  let id: number;
  if (hasStatInfluence) {
    // every first nature in a group of 6 has no stat influence, that's a fix order by pokeapi
    const idsOfNaturesWithStatInfluece = [...Array<void>(25)]
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
  [...Array<void>(amount)].forEach(() => {
    ids.push(getRandomNatureId(filters, hasStatInfluence, [...ids, ...not]));
  });

  return ids;
};
