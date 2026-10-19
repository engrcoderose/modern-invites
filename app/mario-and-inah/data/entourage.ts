export const parents = [
  { title: "Parents of the bride", members: ["Hilario Orense", "Primitiva Orense"] },
  { title: "Parent of the groom", members: ["Consuelo Osorio"] },
] as const;

export const entourage = [
  { title: "Maid of honor", members: ["Jonaleen Orense"] },
  { title: "Best man", members: ["Robert Jones Quebec"] },
  { title: "Principal sponsors", members: ["Mr. Ricardo Orense", "Ms. Merle Orense", "Mr. Vergil Gapac", "Mrs. Maridol Galvez", "Mr. Achilles Dane Mangoba", "Ms. Maricar Cristofani"] },
  { title: "Bridesmaids", members: ["Mary Ceñidoza", "Grace Ceñidoza", "Nicole Mallari", "Alexandra Feliciano"] },
  { title: "Groomsmen", members: ["Zandrex Osorio", "Jhune Villarete", "Elloyd Cruz", "Isaac Tajolosa"] },
  { title: "Flower girl", members: ["Julia Perleen Reyes"] },
  { title: "Bible bearer", members: ["Hikaru Benedict Cortes"] },
  { title: "Coin bearer", members: ["Blessy Calli Orense"] },
  { title: "Little bride", members: ["Umi Serin O. Shimizu"] },
] as const;

// Veil, candle and cord sponsors are unnamed in the questionnaire.
// The ring bearer is one of the groomsmen; the individual is unconfirmed.
export const pendingEntourage = ["Veil sponsors", "Candle sponsors", "Cord sponsors", "Ring bearer"] as const;
