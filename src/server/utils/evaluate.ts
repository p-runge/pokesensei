import { pokeApi } from "./api";
import { type QuestionWrapper } from "./question";

export type QuestionParams<T extends QuestionWrapper["type"]> = Extract<
  QuestionWrapper,
  { type: T }
>["params"];

export async function solveQuestion<T extends QuestionWrapper["type"]>(
  type: T,
  params: QuestionParams<T>,
): Promise<string[]> {
  return (
    {
      TYPE_OF_POKEMON: async (params) => await solveTypeOfPokemon(params.id),
      NAME_OF_POKEMON_BY_IMAGE: async (params) => [
        await solveNameOfPokemon(params.id),
      ],
      NATURE_BY_STATS: async (params) => [
        await solveNatureByStats(params.increasedStat, params.decreasedStat),
      ],
    } as {
      [K in QuestionWrapper["type"]]: (
        params: QuestionParams<K>,
      ) => Promise<string[]>;
    }
  )[type](params);
}

export const solveTypeOfPokemon = async (id: number) => {
  const pokemon = await pokeApi.getPokemonById(id);

  return pokemon.types.map((t) => t.type.name);
};

export const solveNameOfPokemon = async (id: number) => {
  const pokemon = await pokeApi.getPokemonById(id);

  return pokemon.name;
};

export const solveNatureByStats = async (
  increasedStat: string,
  decreasedStat: string,
) => {
  // TODO: find a way without fetching all natures for every evaluation
  const natures = await Promise.all(
    [...Array<void>(25)].map((_, i) => pokeApi.getNatureById(i + 1)),
  );

  return natures.find(
    (nature) =>
      increasedStat === nature.increased_stat?.name &&
      decreasedStat === nature.decreased_stat?.name,
  )!.name;
};
