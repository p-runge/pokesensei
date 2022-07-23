/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { pokeApi, QuestionParams, QuestionType } from "./question";

export const solveQuestionByType = async (
  questionType: QuestionType,
  params: QuestionParams
): Promise<string[]> => {
  return questionTypeToSolvingMap[questionType](params);
};

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
  decreasedStat: string
) => {
  // TODO: find a way without fetching all natures for every evaluation
  const natures = await Promise.all(
    [...Array(25)].map((_, i) => pokeApi.getNatureById(i + 1))
  );

  return natures.find(
    (nature) =>
      increasedStat === nature.increased_stat?.name &&
      decreasedStat === nature.decreased_stat?.name
  )!.name;
};

const questionTypeToSolvingMap: Record<
  QuestionType,
  (data: QuestionParams) => Promise<string[]>
> = {
  [QuestionType.TYPE_OF_POKEMON]: (data) => solveTypeOfPokemon(data.id),
  [QuestionType.NAME_OF_POKEMON_BY_IMAGE]: async (data) => [
    await solveNameOfPokemon(data.id),
  ],
  [QuestionType.NATURE_BY_STATS]: async (data) => [
    await solveNatureByStats(data.increasedStat, data.decreasedStat),
  ],
};
