import SuperJSON from "superjson";

export const formatData = (data: unknown) => {
  return JSON.stringify(
    SuperJSON.parse(SuperJSON.stringify(data)),
    undefined,
    2,
  );
};
