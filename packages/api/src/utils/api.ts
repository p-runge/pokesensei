import { LANGUAGES, PokemonClient } from "pokenode-ts";

import type { UnionToTuple, ValueOf } from "./common";

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

export const pokeApi = new PokemonClient({
  cacheOptions: { ttl: ONE_YEAR },
});

const languageIdToIsoMap = {
  [LANGUAGES.JA_HRKT]: "jp",
  [LANGUAGES.ROOMAJI]: "jp",
  [LANGUAGES.KO]: "kr",
  [LANGUAGES.ZH_HANT]: "cn",
  [LANGUAGES.FR]: "fr",
  [LANGUAGES.DE]: "de",
  [LANGUAGES.ES]: "es",
  [LANGUAGES.IT]: "it",
  [LANGUAGES.EN]: "en",
  [LANGUAGES.CS]: "cz",
  [LANGUAGES.JA]: "jp",
  [LANGUAGES.ZH_HANS]: "cn",
  [LANGUAGES.PT_BR]: "br",
} as const;
export type LanguageIso = ValueOf<typeof languageIdToIsoMap>;
export type LanguageIsos = UnionToTuple<LanguageIso>;

export const LANGUAGES_ISO = Object.values(LANGUAGES)
  .map((l) => languageIdToIsoMap[l])
  .reduce(
    (acc, iso) => ({ ...acc, [iso]: iso }),
    {} as Record<LanguageIso, LanguageIso>,
  );
