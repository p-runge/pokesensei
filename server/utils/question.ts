/* eslint-disable import/prefer-default-export */
import { PokemonClient } from "pokenode-ts";
import { capitalize, getIdOfNamedRes, shuffle } from "./common";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "./random";

interface I18nString {
  string: string;
  params?: Record<string, string | number | boolean>;
}

interface QuestionWrapper {
  // used for validation
  type: QuestionType;
  additionalData: {
    id: number;
  };
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

export const getTypeOfPokemon = async (): Promise<QuestionWithAnswers> => {
  // question
  const id = getRandomPokemonId();
  const pokemon = await pokeApi.getPokemonById(id);
  const question: QuestionWrapper = {
    type: QuestionType.TYPE_OF_POKEMON,
    additionalData: {
      id,
    },
    label: {
      string: "question_type_of_pokemon",
      params: {
        name: capitalize(pokemon.name),
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
    label: capitalize(t.name),
  }));

  return {
    question,
    answers,
  };
};

export const getNameOfPokemonByImage =
  async (): Promise<QuestionWithAnswers> => {
    const pokemonId = getRandomPokemonId();
    const pokemon = await pokeApi.getPokemonById(pokemonId);

    const {
      name,
      sprites: { front_default: sprite },
    } = pokemon;

    if (!sprite) {
      throw new Error(`Sprite not found for pokemon: ${pokemon}`);
    }
    const question: QuestionWrapper = {
      type: QuestionType.NAME_OF_POKEMON_BY_IMAGE,
      additionalData: {
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

    const names = await Promise.all(
      pokemonIds.map(async (id) => {
        const { name: pokemonName } = await pokeApi.getPokemonById(id);
        return pokemonName;
      })
    );
    const answers: AnswerWrapper[] = shuffle([name, ...names]).map((n) => ({
      value: n,
      label: capitalize(n),
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

export const questionTypeToDataMap: Record<
  QuestionType,
  () => Promise<QuestionWithAnswers>
> = {
  [QuestionType.TYPE_OF_POKEMON]: getTypeOfPokemon,
  [QuestionType.NAME_OF_POKEMON_BY_IMAGE]: getNameOfPokemonByImage,
};
