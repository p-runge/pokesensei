/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/prefer-default-export */
import { PokemonClient } from "pokenode-ts";
import { getIdOfNamedRes, getLocalizedName, shuffle } from "./common";
import {
  getRandomElement,
  getRandomNatureId,
  getRandomNatureIds,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "./random";

interface I18nString {
  string: string;
  params?: Record<string, string | number | boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QuestionParams = Record<string, any>;

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

export interface Filters {
  generations?: number[];
}

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
const AMOUNT_OF_ANSWERS = 4;

export const pokeApi = new PokemonClient({
  cacheOptions: { maxAge: ONE_YEAR, exclude: { query: false } },
});

export const getQuestionByType = async (
  questionType: QuestionType,
  lang: string,
  filters: Filters
): Promise<QuestionWithAnswers> => {
  return questionTypeToDataMap[questionType](lang, filters);
};

export const getNameOfPokemonByImage = async (
  lang: string,
  filters: Filters
): Promise<QuestionWithAnswers> => {
  const pokemonId = getRandomPokemonId(filters, []);
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
    pokemonIds.push(getRandomPokemonId(filters, [pokemonId, ...pokemonIds]));
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

export const getTypeOfPokemon = async (
  lang: string,
  filters: Filters
): Promise<QuestionWithAnswers> => {
  // question
  const id = getRandomPokemonId(filters);
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
    ...getRandomPokemonTypeIds(AMOUNT_OF_ANSWERS - 1, filters, [
      typeId,
      ...typeIdNots,
    ]),
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

export const getNatureByStats = async (
  lang: string,
  filters: Filters
): Promise<QuestionWithAnswers> => {
  // question
  const correctId = getRandomNatureId(filters, true);
  const nature = await pokeApi.getNatureById(correctId);

  const [increasedStat, decreasedStat] = await Promise.all(
    [nature.increased_stat!.name, nature.decreased_stat!.name].map((name) =>
      pokeApi.getStatByName(name)
    )
  );

  const question: QuestionWrapper = {
    type: QuestionType.NATURE_BY_STATS,
    params: {
      increasedStat: increasedStat.name,
      decreasedStat: decreasedStat.name,
    },
    label: {
      string: "question_nature_by_stats",
      params: {
        increasedStat: getLocalizedName(increasedStat, lang),
        decreasedStat: getLocalizedName(decreasedStat, lang),
      },
    },
  };

  // answers
  const wrongIds = [
    ...getRandomNatureIds(AMOUNT_OF_ANSWERS - 1, filters, true, [correctId]),
  ];
  const natures = [
    nature,
    ...(await Promise.all(wrongIds.map((id) => pokeApi.getNatureById(id)))),
  ];
  const answers = shuffle(
    natures.map((n) => ({
      value: n.name,
      label: getLocalizedName(n, lang),
    }))
  );

  return {
    question,
    answers,
  };
};

export enum QuestionType {
  NAME_OF_POKEMON_BY_IMAGE = "NAME_OF_POKEMON_BY_IMAGE",
  TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
  NATURE_BY_STATS = "NATURE_BY_STATS",
}

const questionTypeToDataMap: Record<
  QuestionType,
  (lang: string, filters: Filters) => Promise<QuestionWithAnswers>
> = {
  [QuestionType.NAME_OF_POKEMON_BY_IMAGE]: getNameOfPokemonByImage,
  [QuestionType.TYPE_OF_POKEMON]: getTypeOfPokemon,
  [QuestionType.NATURE_BY_STATS]: getNatureByStats,
};
