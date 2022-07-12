/* eslint-disable import/prefer-default-export */
import { PokemonClient, Pokemon } from "pokenode-ts";
import { capitalize, getIdOfNamedRes, shuffle } from "./common";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "./random";

interface I18nString {
  string: string;
  params: Record<string, string | number | boolean>;
}

interface QuestionWithAnswers {
  question: I18nString;
  answers: string[];
}

const ONE_DAY = 1000 * 60 * 60 * 24;
const AMOUNT_OF_ANSWERS = 4;

const api = new PokemonClient({
  cacheOptions: { maxAge: ONE_DAY, exclude: { query: false } },
});

export const getTypeOfPokemon = async (): Promise<QuestionWithAnswers> => {
  const question: I18nString = {
    string: "",
    params: {},
  };
  const answers: string[] = [];

  // question
  const id = getRandomPokemonId();
  const pokemon: Pokemon = await api.getPokemonById(id);
  question.string = "question_type_of_pokemon";
  question.params = {
    name: capitalize(pokemon.name),
  };

  // answers
  const typeId = getIdOfNamedRes(getRandomElement(pokemon.types).type);
  const typeIdNots =
    pokemon.types
      .map((t) => getIdOfNamedRes(t.type))
      .filter((t) => t !== typeId) ?? [];
  const typeIds = [
    typeId,
    ...getRandomPokemonTypeIds(AMOUNT_OF_ANSWERS - 1, [typeId, ...typeIdNots]),
  ];
  const types = await Promise.all(typeIds.map((tId) => api.getTypeById(tId)));
  shuffle(types).forEach((t) => answers.push(capitalize(t.name)));

  return {
    question,
    answers,
  };
};
