import type { WeddingData } from "../types/wedding";
import { galleries } from "./photo-layout";

export const wedding: WeddingData = {
  couple: { names: ["Jaydee", "Bea"], display: "Jaydee & Bea", initials: "J & B", fullNames: null },
  date: {
    iso: "2027-01-16T15:00:00+08:00",
    display: "January 16, 2027",
    weekday: "Saturday",
    short: "16 · 01 · 2027",
    timezone: "Asia/Manila",
  },
  palette: [
    { name: "Sage", hex: "#C9E4CA" },
    { name: "Blush", hex: "#F7D6E0" },
    { name: "Butter", hex: "#FFF3B0" },
    { name: "Lavender", hex: "#D6C9F0" },
    { name: "Peach", hex: "#F7E4D6" },
    { name: "Sky", hex: "#C9E0F7" },
  ],
  venues: [
    {
      id: "ceremony", label: "The ceremony",
      name: "Nuestra Señora Del Carmen - Barasoain Church",
      address: "Paseo del Congreso corner Don Antonio Bautista Street, San Gabriel, Malolos, Bulacan",
      time: "3:00 PM", timeLabel: "Ceremony begins",
      note: "Guest / Entourage Call Time: 2:00 PM", mapUrl: null,
    },
    {
      id: "reception", label: "The reception", name: "Casa Remedios",
      address: "9008 Mabolo-Sto. Cristo Diversion Road, Purok 4, Malolos, 3000 Bulacan, Philippines",
      time: "6:00 PM", timeLabel: "Couple arrives", mapUrl: null,
    },
    {
      id: "after-party", label: "The after party", name: "Villa Alejandra Resort",
      address: "Block 5, Lot 6, Phase 1, Alejandra Subdivision, Malolos, Bulacan",
      time: "10:00 PM", timeLabel: "After party starts", mapUrl: null,
    },
  ],
  timeline: [
    { time: "2:00 PM", title: "Guest & entourage call time" },
    { time: "2:10 PM", title: "Barasoain Church history video" },
    { time: "2:30 PM", title: "Entourage assembly" },
    { time: "3:00 PM", title: "Wedding ceremony" },
    { time: "6:00 PM", title: "Couple’s reception arrival" },
    { time: "10:00 PM", title: "Villa Alejandra after-party" },
  ],
  story: [
    {
      date: "It started with a swipe", title: "One little swipe.\nA whole new world.",
      description: "Jaydee and Bea met on Tinder. At first, neither of them believed that a real relationship could begin on a dating app. They had created their accounts simply to talk to strangers about their lives and everyday frustrations. Then Bea swiped right, and they matched. Neither sent a message that day; a few days passed before Bea finally said “hello.” Their conversations began with friendly chats and playful teasing, but Jaydee once took a joke too far by calling Bea lazy. Since they barely knew each other, Bea felt judged and thought he was acting too familiar. Hurt and annoyed, she stopped replying for a few days. Jaydee thought he would never hear from her again, until she unexpectedly sent another message. They talked things through and forgave each other.",
    },
    {
      date: "Their first meeting", title: "An unexpected first impression.",
      description: "Their first meeting came about because of a playful bet: whoever won would treat the other to a meal. They met at a fast-food restaurant, but Bea was not immediately drawn to Jaydee. He was younger and looked like a high school student. He was also quiet in person, and to Bea, he did not seem particularly gentlemanly.",
    },
    {
      date: "Two different perspectives", title: "A shy beginning.",
      description: "When they left McDonald’s, Jaydee walked out first without holding the door open for Bea, and she ended up bumping her head. That annoyed her, as did the way he walked ahead of her. She began to think that perhaps he was not interested in her at all. From Jaydee’s point of view, however, it was the complete opposite. He was simply shy and unaccustomed to talking to women in person. He liked Bea when they met and even told her that he hoped they would see each other again.",
    },
    {
      date: "August 25, 2019", title: "Choosing each other.",
      description: "As they continued talking, their feelings for each other grew. Bea was the first to admit that she liked Jaydee and had a crush on him. Knowing how shy he was, she took a chance and hoped that her honesty would encourage him to share his feelings too. She was right: Jaydee had only been waiting for her to make the first move because he was afraid of being rejected. On August 25, 2019, they officially became a couple.",
    },
  ],
  entourage: [
    { title: "Our parents", roles: [
      { title: "Parents of the Bride", members: ["Arlene L. Montalan", "Bernan M. Montalan"] },
      { title: "Parents of the Groom", members: ["Nelda I. Rabon", "Wilfredo M. Rabon"] },
    ] },
    { title: "Our honor attendants", roles: [
      { title: "Maid of Honor", members: ["Ma. Ricca Laine I. Francisco", "Wenjina Carillo"] },
      { title: "Best Man", members: ["Dave Dionisio", "Arben L. Montalan"] },
    ] },
    { title: "Principal Sponsors", memberColumns: [[
      "Mr. Han Benzen Buenaventura", "Engr. Jayver Domingo", "Mr. Henry Rabon", "Mr. Jayson Lamarca",
      "Mr. Gerard Pulumbarit", "Mr. Edwin Faustino", "Mr. Joey Prieto", "Mr. Sammy Panganiban",
      "Mr. Allen Camacho", "Arch. Aaron Solis", "Mr. Renato Dela Cruz", "Mr. Gabriel Capili",
    ], [
      "Mrs. Minnie Reyes", "Mrs. Elizabeth Buergo", "Mrs. Josefina Lamarca", "Mrs. Julie Santiago",
      "Mrs. Marissa Lagores", "Mrs. Violeta Urap", "Mrs. Maricel Solidum", "Mrs. Rina Cruz",
      "Mrs. Corazon Azur", "Mrs. Aileen Liwanag", "Mrs. Jocelyn Mapa",
    ]] },
    { title: "Secondary Sponsors", roles: [
      { title: "Veil On", members: ["Mr. Agustin Jade Clemente", "Ms. Marianne Timbol"] },
      { title: "Veil Out", members: ["Mr. Michael Bryan Magaling", "Ms. Rence Rina Membreve"] },
      { title: "Candle On", members: ["Mr. Jhon Nicol Cruz", "Ms. Yssabel Lamarca"] },
      { title: "Candle Out", members: ["Mr. Michael Angelo Montalan"] },
      { title: "Cord On", members: ["Ms. Kim Lamarca", "Mr. Aldrin Aguilar"] },
      { title: "Cord Out", members: ["Ms. Lorraine Bernardino"] },
    ] },
    { title: "Our little entourage", roles: [
      { title: "Flower Girls", members: ["Jade Ledesma", "Kate Louise Labilles", "Maria Azur"] },
      { title: "Ring Bearer", members: ["Austin Majaba"] },
      { title: "Bible Bearer", members: ["David Rohi I. Clemente"] },
      { title: "Coin Bearer", members: ["Zion Mabunga"] },
      { title: "Crucifix Bearer", members: ["Jeriza Althea Martinez"] },
    ] },
    { title: "Bridesmaids", members: ["[Bridesmaid Name 1]", "[Bridesmaid Name 2]", "[Bridesmaid Name 3]"], pending: true },
    { title: "Groomsmen", members: ["[Groomsman Name 1]", "[Groomsman Name 2]", "[Groomsman Name 3]"], pending: true },
  ],
  dressCode: {
    title: "FORMAL DRESS", description: "In Floral or in Shades of Nude", restriction: "No shorts, T-shirts, or slippers.",
    palette: [
      { name: "Ivory", hex: "#F3EADF" },
      { name: "Champagne", hex: "#E6D5BF" },
      { name: "Beige", hex: "#D1B99F" },
      { name: "Taupe", hex: "#B29A87" },
      { name: "Mocha", hex: "#8C6F5C" },
    ],
  },
  rsvp: {
    deadline: null, deadlinePlaceholder: "[RSVP DEADLINE — TO BE CONFIRMED]", url: null,
    eventSlug: null,
    pendingMessage: "RSVP opens soon.",
  },
  gallery: {
    photos: galleries[0], placeholder: "",
    draftCaptions: ["Our story, in frames", "The little moments", "A lifetime of us"],
  },
  music: {
    src: "/jaydee-and-bea/music/could-i-love-you-any-more-2a7f2771.mp3",
    title: "Could I Love You Any More — Renée Dominique feat. Jason Mraz",
  },
  hashtag: { value: null, placeholder: "[WEDDING HASHTAG — TO BE PROVIDED]" },
  pending: {
    map: "[LOCATION LINK — TO BE PROVIDED]", fonts: "[FONT PREFERENCES — TO BE PROVIDED]",
    fullNames: "[FULL-NAME ASSIGNMENTS — TO BE CONFIRMED]", color: "[ADDITIONAL PALETTE COLOR — TO BE CONFIRMED]",
  },
};
