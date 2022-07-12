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
  imgSrc?: string;
}

interface QuestionWithAnswers {
  question: I18nString;
  answers: string[];
}

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
const AMOUNT_OF_ANSWERS = 4;

const api = new PokemonClient({
  cacheOptions: { maxAge: ONE_YEAR, exclude: { query: false } },
});

export const getTypeOfPokemon = async (): Promise<QuestionWithAnswers> => {
  const question: I18nString = {
    string: "",
    params: {},
  };
  const answers: string[] = [];

  // question
  const id = getRandomPokemonId();
  const pokemon = await api.getPokemonById(id);
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

export const getNameOfPokemonByImage =
  async (): Promise<QuestionWithAnswers> => {
    const pokemonId = getRandomPokemonId();
    const pokemon = await api.getPokemonById(pokemonId);

    const {
      name,
      sprites: { front_default: sprite },
    } = pokemon;

    if (!sprite) {
      throw new Error(`Sprite not found for pokemon: ${pokemon}`);
    }
    const question: I18nString = {
      string: "question_name_of_pokemon",
      imgSrc: sprite || undefined,
    };

    const pokemonIds: number[] = [];
    [...Array(AMOUNT_OF_ANSWERS - 1)].forEach(() => {
      pokemonIds.push(getRandomPokemonId([pokemonId, ...pokemonIds]));
    });

    const names = await Promise.all(
      pokemonIds.map(async (id) => {
        const { name: pokemonName } = await api.getPokemonById(id);
        return capitalize(pokemonName);
      })
    );

    return {
      question,
      answers: shuffle([capitalize(name), ...names]),
    };
  };
