/* eslint-disable import/prefer-default-export */
import { PokemonClient } from "pokenode-ts";
import { getIdOfNamedRes, getLocalizedName, shuffle } from "./common";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "./random";

interface I18nString {
  string: string;
  params?: Record<string, string | number | boolean>;
}

export interface QuestionParams {
  id: number;
}

interface QuestionWrapper {
  // used for validation
  type: QuestionType;
  params: QuestionParams;
  // used for output
  label: I18nString;
  imgSrc?: string;
}

interface AnswerWrapper {
  value: string;
  label: string;
}

export interface QuestionWithAnswers {
  question: QuestionWrapper;
  answers: AnswerWrapper[];
}

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
const AMOUNT_OF_ANSWERS = 4;

export const pokeApi = new PokemonClient({
  cacheOptions: { maxAge: ONE_YEAR, exclude: { query: false } },
});

export const getQuestionByType = async (
  questionType: QuestionType,
  lang: string
): Promise<QuestionWithAnswers> => {
  return questionTypeToDataMap[questionType](lang);
};

export const getTypeOfPokemon = async (
  lang: string
): Promise<QuestionWithAnswers> => {
  // question
  const id = getRandomPokemonId();
  const [pokemon, pokemonSpecies] = await Promise.all([
    pokeApi.getPokemonById(id),
    pokeApi.getPokemonSpeciesById(id),
  ]);
  const question: QuestionWrapper = {
    type: QuestionType.TYPE_OF_POKEMON,
    params: {
      id,
    },
    label: {
      string: "question_type_of_pokemon",
      params: {
        name: getLocalizedName(pokemonSpecies, lang),
      },
    },
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
  const types = await Promise.all(
    typeIds.map((tId) => pokeApi.getTypeById(tId))
  );
  const answers: AnswerWrapper[] = shuffle(types).map((t) => ({
    value: t.name,
    label: getLocalizedName(t, lang),
  }));

  return {
    question,
    answers,
  };
};

export const getNameOfPokemonByImage = async (
  lang: string
): Promise<QuestionWithAnswers> => {
  const pokemonId = getRandomPokemonId();
  const [pokemon, pokemonSpecies] = await Promise.all([
    pokeApi.getPokemonById(pokemonId),
    pokeApi.getPokemonSpeciesById(pokemonId),
  ]);

  const {
    sprites: { front_default: sprite },
  } = pokemon;

  if (!sprite) {
    throw new Error(`Sprite not found for pokemon: ${pokemon}`);
  }
  const question: QuestionWrapper = {
    type: QuestionType.NAME_OF_POKEMON_BY_IMAGE,
    params: {
      id: pokemonId,
    },
    label: {
      string: "question_name_of_pokemon",
    },
    imgSrc: sprite || undefined,
  };

  const pokemonIds: number[] = [];
  [...Array(AMOUNT_OF_ANSWERS - 1)].forEach(() => {
    pokemonIds.push(getRandomPokemonId([pokemonId, ...pokemonIds]));
  });

  const speciesList = await Promise.all(
    pokemonIds.map(async (id) => {
      return pokeApi.getPokemonSpeciesById(id);
    })
  );
  const answers: AnswerWrapper[] = shuffle([
    pokemonSpecies,
    ...speciesList,
  ]).map((s) => ({
    value: s.name,
    label: getLocalizedName(s, lang),
  }));

  return {
    question,
    answers,
  };
};

export enum QuestionType {
  TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
  NAME_OF_POKEMON_BY_IMAGE = "NAME_OF_POKEMON_BY_IMAGE",
}

const questionTypeToDataMap: Record<
  QuestionType,
  (lang: string) => Promise<QuestionWithAnswers>
> = {
  [QuestionType.TYPE_OF_POKEMON]: getTypeOfPokemon,
  [QuestionType.NAME_OF_POKEMON_BY_IMAGE]: getNameOfPokemonByImage,
};
