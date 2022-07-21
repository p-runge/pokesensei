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

const questionTypeToSolvingMap: Record<
  QuestionType,
  (data: { id: number }) => Promise<string[]>
> = {
  [QuestionType.TYPE_OF_POKEMON]: (data) => solveTypeOfPokemon(data.id),
  [QuestionType.NAME_OF_POKEMON_BY_IMAGE]: async (data) => [
    await solveNameOfPokemon(data.id),
  ],
};
