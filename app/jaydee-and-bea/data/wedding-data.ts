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
      description: `Bea and JD met on a dating app called Tinder. At first, neither of them believed that people could find genuine love through the app. They had only created their accounts to meet strangers, share stories about their lives, and talk about their everyday rants.

Eventually, they matched after swiping right on each other. On their first day of matching, neither of them sent a message. A few days passed before Bea finally decided to break the ice with a simple “Hello.” And just like that, their conversation began.

Their early conversations were filled with friendly banter and playful teasing. However, JD eventually took the teasing a little too far when he called Bea “lazy.” Since they weren't that close yet, Bea felt judged and thought JD was acting too familiar. This led to a misunderstanding, and Bea stopped replying for a few days. JD thought he would never hear from her again, but to his surprise, Bea eventually reached out. They talked things through, forgave each other, and continued getting to know one another.`,
    },
    {
      date: "Their first meeting", title: "An unexpected first impression.",
      description: `Their first meeting happened because of a little bet they made: whoever won would treat the other to a meal. They decided to meet at McDonald's.

Unfortunately, their first meeting didn't go quite as smoothly as expected. Bea wasn't immediately impressed with JD. He looked like a high school student, seemed younger than her, and was rather quiet and not very gentlemanly.`,
    },
    {
      date: "Two different perspectives", title: "A shy beginning.",
      description: `One particular incident made her impression even worse. As they were leaving McDonald's, JD walked ahead without holding the door open for her. Bea ended up bumping her head against the door, which naturally annoyed her. She was also bothered by the way he walked ahead without waiting for her. At that moment, Bea thought JD probably wasn't interested in her anyway.

What Bea didn't know was that JD was simply shy and nervous. He wasn't used to talking to girls in person, which explained why he seemed so quiet and awkward that day. Despite his nervousness, he had already found Bea attractive and was secretly hoping they would get another chance to meet.`,
    },
    {
      date: "August 25, 2019", title: "Choosing each other.",
      description: `As the days went by, their conversations became more frequent, and their feelings for each other slowly grew. Bea eventually gathered the courage to admit that she liked JD and had a crush on him. Since JD was too shy to confess his feelings first, Bea decided to take the chance.

As it turned out, her feelings were mutual. JD liked Bea just as much but had been waiting for the right moment to tell her, afraid that she might reject him.

And after all the playful teasing, unexpected misunderstandings, and countless conversations, their story eventually led them to become a couple on **August 25, 2019**. What started as a simple swipe right on a dating app turned into a love story neither of them had expected.`,
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
      { title: "Veil On", members: ["Mr. Agustin Jade Clemente", "Ar. Marianne F. Timbol"] },
      { title: "Veil Out", members: ["Mr. Michael Bryan Magaling", "Ms. Rence Rina B. Membreve"] },
      { title: "Candle On/Out", members: ["Mr. Jhon Nicol Cruz", "Ms. Yssabel Lamarca"] },
      { title: "Cord On", members: ["Mr. Michael Angelo Montalan", "Ms. Kim Jayzel Lamarca"] },
      { title: "Cord Out", members: ["Mr. Aldrin Aguilar", "Ar. Loraine Bernardino"] },
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
    deadline: "December 16, 2027", deadlinePlaceholder: "[RSVP DEADLINE — TO BE CONFIRMED]", url: null,
    eventSlug: "jaydee-and-bea",
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
