import { Name, NamedAPIResource } from "pokenode-ts";

export const getIdOfNamedRes: (res: NamedAPIResource) => number = (res) => {
  const arr = res.url.split("/");

  return parseInt(arr[arr.length - 2], 10);
};

// impure!
export const shuffle = <T>(a: T[]): T[] => {
  let j;
  let x;
  for (let i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    // eslint-disable-next-line no-param-reassign
    a[i] = a[j];
    // eslint-disable-next-line no-param-reassign
    a[j] = x;
  }

  return a;
};

export const sleep = async (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// pass any resource having names and name
export const getLocalizedName = (
  {
    names,
    name,
  }: {
    names: Name[];
    name: string;
  },
  lang: string
) => {
  // TODO: use selected locale instead
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return names.find((n) => n.language.name === lang)?.name || name;
};

export const fillArrayWithNumbers = (number: number): number[] => {
  return [...Array(number)].map((_, i) => i + 1);
};
