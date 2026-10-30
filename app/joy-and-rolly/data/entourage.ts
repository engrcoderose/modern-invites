export interface EntourageGroup { role: string; names: readonly string[] }

// Incomplete sponsor #6 and bridesmaid #6 are intentionally omitted pending names.
export const families: readonly EntourageGroup[] = [
  { role: "Parents of the bride", names: ["Aurora Traya", "Eduardo Traya †"] },
  { role: "Parents of the groom", names: ["Josephine Peña", "Rolando Peña †"] },
];

export const principalSponsors = [
  "Mr and Mrs Joseph Calolot", "Mr and Mrs Michael Pamilar", "Mr and Mrs Jose Jumawid",
  "Mr and Mrs Raul Parantar", "Mr and Mrs Kristogil Gador",
  "Mr Major Parantar and Ms Cristina Villarta", "Mr Jerry Parantar and Ms Agnecia Templa",
  "Mr and Mrs Fortune Manogura", "Mr and Mrs Pedro Borla",
] as const;

export const weddingParty: readonly EntourageGroup[] = [
  { role: "Maid of honor", names: ["Katrina Traya"] },
  { role: "Best man", names: ["Rony Cabuenas"] },
  { role: "Bridesmaids", names: ["Miaflor Lim", "Ethelyn Arbiol", "Girlie Dacalos", "Janette Parantar", "Pernella Guerra"] },
  { role: "Groomsmen", names: ["Ernest Lim", "Denver Templa", "John Carlo Traya", "Raymund Zurita", "Christian Guerra", "Ken Francis Eguia"] },
];

export const secondarySponsors: readonly EntourageGroup[] = [
  { role: "Veil", names: ["Mr and Mrs. Rex Sienes"] },
  { role: "Candle", names: ["Mr and Mrs. Cernel Sumbiling"] },
  { role: "Cord", names: ["Mr and Mrs Jake Vender"] },
];

export const flowerGirls: EntourageGroup = {
  role: "Flower girls", names: ["Erina Buenavides", "Eumie Buenavides", "Bella Vender", "Lia Cabuenas"],
};

export const bearers: readonly EntourageGroup[] = [
  { role: "Ring bearer", names: ["Ymmanuel Kai Peña"] },
  { role: "Bible bearer", names: ["Angelo Cervas"] },
  { role: "Coin bearer", names: ["Elijah Arbiol"] },
];
