import "server-only";

import { randomInt } from "node:crypto";

const ACCESS_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const RANDOM_CHARACTER_COUNT = 16;
const GROUP_SIZE = 4;

function createRandomCharacters(length: number) {
  return Array.from(
    { length },
    () =>
      ACCESS_CODE_ALPHABET[
        randomInt(0, ACCESS_CODE_ALPHABET.length)
      ],
  ).join("");
}

export function generateClientAccessCode() {
  const randomValue = createRandomCharacters(RANDOM_CHARACTER_COUNT);
  const groups = randomValue.match(
    new RegExp(`.{1,${GROUP_SIZE}}`, "g"),
  );

  if (!groups) {
    throw new Error("Unable to generate a client access code.");
  }

  return `MI-${groups.join("-")}`;
}
