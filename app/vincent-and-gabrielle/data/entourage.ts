import type { EntourageName } from "./wedding";

const names = (...values: string[]): EntourageName[] =>
  values.map((name) => ({ name }));

// Confirmed pairs retain the template's women-left, men-right presentation.
export const entourage = {
  groomParents: names("Maribel Reyes", "Gregorio Reyes"),
  brideParents: names("Rosario Santos", "Fernando Santos"),
  principal: [
    names("Elena Reyes", "Roberto Reyes"),
    names("Marissa Santos", "Antonio Santos"),
    names("Teresa Navarro", "Miguel Navarro"),
    names("Patricia Villanueva", "Daniel Villanueva"),
    names("Monica Bautista", "Carlos Bautista"),
    names("Lorna Mendoza", "Eduardo Mendoza"),
    names("Regina Cruz", "Francis Cruz"),
    names("Andrea Garcia", "Joseph Garcia"),
  ],
  bestMan: names("Rafael Miguel Reyes"),
  maidOfHonor: names("Camille Andrea Santos"),
  secondary: [
    { role: "Candle", names: names("Maria Lopez", "Enzo Lopez") },
    { role: "Veil", names: names("Hannah Rivera", "Christian Rivera") },
    { role: "Cord", names: names("Katrina Mendoza", "Luis Mendoza") },
  ],
  groomsmen: names(
    "Adrian Luis Reyes",
    "Marco Vincent Dela Cruz",
    "Nathaniel James Flores",
    "Paolo Miguel Navarro",
  ),
  bridesmaids: names(
    "Isabelle Marie Santos",
    "Bianca Louise Garcia",
    "Sophia Claire Villanueva",
    "Nicole Andrea Cruz",
  ),
  bearers: [
    { role: "Ring", names: names("Elliot James Santos") },
    { role: "Bible", names: names("Lucas Gabriel Reyes") },
    { role: "Coin", names: names("Mateo Luis Reyes") },
  ],
  flowers: names(
    "Ava Elise Santos",
    "Chloe Marie Reyes",
    "Luna Isabelle Garcia",
    "Mia Gabrielle Cruz",
  ),
};
