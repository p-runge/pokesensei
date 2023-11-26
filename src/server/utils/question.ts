import { QuestionType } from "@prisma/client";
import type { Stat } from "pokenode-ts";
import { getRandomPokemonId } from "./pokemon";
import { pokeApi } from "./api";
import {
  type Include,
  getIdOfNamedRes,
  getLocalizedName,
  shuffle,
} from "./common";
import { getRandomElement } from "./random";
import { getRandomPokemonTypeIds } from "./type";
import { getRandomNatureId, getRandomNatureIds } from "./nature";

const AMOUNT_OF_ANSWERS = 4;

export type Filters = {
  generations?: number[];
};

type I18nString = {
  string: string;
  params?: Record<string, string | number | boolean>;
};

export type QuestionParams = Record<string, unknown>;

/**
 * QuestionWrapperTypes
 */
type QuestionWrapperTypeNameOfPokemonByImage = {
  type: Include<QuestionType, "NAME_OF_POKEMON_BY_IMAGE">;
  params: {
    id: number;
  };
  label: I18nString;
  imgSrc: string;
};

type QuestionWrapperTypeOfPokemon = {
  type: Include<QuestionType, "TYPE_OF_POKEMON">;
  params: {
    id: number;
  };
  label: I18nString;
};

type QuestionWrapperNatureByStats = {
  type: Include<QuestionType, "NATURE_BY_STATS">;
  params: {
    increasedStat: string;
    decreasedStat: string;
  };
  label: I18nString;
};

type QuestionWrapper =
  | QuestionWrapperTypeNameOfPokemonByImage
  | QuestionWrapperTypeOfPokemon
  | QuestionWrapperNatureByStats;

type AnswerWrapper = {
  value: string;
  label: string;
};

export type QuestionWithAnswers = {
  question: QuestionWrapper;
  answers: AnswerWrapper[];
};

export const getNameOfPokemonByImage = async (
  lang: string,
  filters: Filters,
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
    throw new Error(`Sprite not found for pokemon: ${pokemon.name}`);
  }
  const question: QuestionWrapper = {
    type: QuestionType.NAME_OF_POKEMON_BY_IMAGE,
    params: {
      id: pokemonId,
    },
    label: {
      string: "question_name_of_pokemon",
    },
    imgSrc: sprite,
  };

  const pokemonIds: number[] = [];
  [...Array<void>(AMOUNT_OF_ANSWERS - 1)].forEach(() => {
    pokemonIds.push(getRandomPokemonId(filters, [pokemonId, ...pokemonIds]));
  });

  const speciesList = await Promise.all(
    pokemonIds.map(async (id) => {
      return pokeApi.getPokemonSpeciesById(id);
    }),
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
  filters: Filters,
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
    typeIds.map((tId) => pokeApi.getTypeById(tId)),
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
  filters: Filters,
): Promise<QuestionWithAnswers> => {
  // question
  const correctId = getRandomNatureId(filters, true);
  const nature = await pokeApi.getNatureById(correctId);

  const [increasedStat, decreasedStat] = (await Promise.all(
    [nature.increased_stat!.name, nature.decreased_stat!.name].map((name) =>
      pokeApi.getStatByName(name),
    ),
  )) as [Stat, Stat];

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
    })),
  );

  return {
    question,
    answers,
  };
};

const questionTypeToDataMap: Record<
  QuestionType,
  (lang: string, filters: Filters) => Promise<QuestionWithAnswers>
> = {
  [QuestionType.NAME_OF_POKEMON_BY_IMAGE]: getNameOfPokemonByImage,
  [QuestionType.TYPE_OF_POKEMON]: getTypeOfPokemon,
  [QuestionType.NATURE_BY_STATS]: getNatureByStats,
};

export const getQuestionByType = async (
  questionType: QuestionType,
  lang: string,
  filters: Filters,
) => {
  return questionTypeToDataMap[questionType](lang, filters);
};
