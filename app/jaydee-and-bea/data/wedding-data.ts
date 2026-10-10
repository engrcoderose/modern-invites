import type { WeddingData } from "../types/wedding";

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
      description: "Seven years ago, Jaydee and Bea’s story began when they both swiped right. They soon found themselves talking every day, checking in on each other until they decided to meet at McDonald’s and Greenwich. Jaydee was so shy that he barely spoke during their first meeting, spending much of it looking at his phone. Bea even had to show him how to court her. Yet after that first meeting, Jaydee knew his feelings were real, and he continued pursuing their growing connection.",
    },
    {
      date: "August 25, 2019", title: "Choosing each other, every day.",
      description: "Bea eventually admitted that she had a crush on Jaydee. He confessed that he had liked her long before she said anything. On August 25, 2019, they officially became a couple. Their relationship was not always easy, but through the happy days and the difficult ones, they continued choosing to stay by each other’s side. Those seven years brought Jaydee a kind of happiness he had never imagined. People had often thought of him as unfeeling, but Bea brought out feelings he had never known how to express.",
    },
    {
      date: "February 1, 2026", title: "A yes at the altar.",
      description: "On February 1, 2026, Jaydee spoke with the church leadership at Barasoain Church, where he worked in the parish office, to arrange his proposal. After the 6:00 PM Mass, he proposed to Bea at the altar, surrounded by their family, friends, fellow members of the church community, and priests. It was the beginning of a new chapter in their story.",
    },
    {
      date: "January 16, 2027", title: "And now, forever.",
      description: "From a simple swipe right to a promise of forever, Jaydee and Bea are now preparing for their wedding day. On January 16, 2027, they will begin the next chapter together, surrounded by the people they love.",
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
    photos: [], placeholder: "[WEDDING PHOTOS — TO BE PROVIDED]",
    draftCaptions: ["Our story, in frames", "The little moments", "A lifetime of us"],
  },
  music: {
    src: "/jaydee-and-bea/music/until-i-found-you-db66ec5d.mp3",
    title: "Until I Found You — Stephen Sanchez",
  },
  hashtag: { value: null, placeholder: "[WEDDING HASHTAG — TO BE PROVIDED]" },
  pending: {
    map: "[LOCATION LINK — TO BE PROVIDED]", fonts: "[FONT PREFERENCES — TO BE PROVIDED]",
    fullNames: "[FULL-NAME ASSIGNMENTS — TO BE CONFIRMED]", color: "[ADDITIONAL PALETTE COLOR — TO BE CONFIRMED]",
  },
};
