import { storyMedia } from "./photo-media";
const firstHello = storyMedia["first-hello.webp"];
const adventures = storyMedia["shared-adventures.webp"];
const beachPhoto = storyMedia["a-beautiful-yes.webp"];
const studioPortrait = storyMedia["next-chapter.webp"];
const saveTheDate = storyMedia["save-the-date.webp"];

export const storyChapters = [
  {
    id: "first-hello",
    chapter: "Chapter I",
    date: "June 2017",
    dateTime: "2017-06",
    paragraphs: [
      "On an ordinary afternoon in June 2017, fate brought Edcel and Apreal together through an unexpected online encounter. What began as a simple \"Hi\" slowly became a beautiful connection, leading two hearts to a love neither had imagined.",
    ],
    photo: { src: firstHello, alt: "Edcel and Apreal together at a celebration with flowers and balloons." },
  },
  {
    id: "choosing-each-other",
    chapter: "Chapter II",
    date: "August 6, 2017",
    dateTime: "2017-08-06",
    paragraphs: [
      "Their first meeting took place at Apreal’s uncle’s funeral wake, where Edcel came to offer comfort and condolences. Little did they know that this humble beginning would lead to a lifetime of love. On August 6, 2017, they officially began their journey as a couple.",
    ],
    photo: { src: adventures, alt: "Edcel and Apreal in riding gear, holding their helmets outside Kaybiang Tunnel." },
  },
  {
    id: "growing-in-love",
    chapter: "Chapter III",
    date: "Through the years",
    dateTime: null,
    paragraphs: [
      "Through nine years of shared laughter, unforgettable travels, and countless treasured memories, their love grew deeper with every passing season.",
    ],
    photo: { src: studioPortrait, alt: "Edcel and Apreal reaching toward each other with a bouquet against a pink studio backdrop.", framing: "landscape" as const },
  },
  {
    id: "a-beautiful-yes",
    chapter: "Chapter IV",
    date: "August 24, 2025",
    dateTime: "2025-08-24",
    paragraphs: [
      "Then, on August 24, 2025, amidst the breathtaking shores of Seven Commandos Beach in El Nido, Edcel asked Apreal the most beautiful question of all — to be his forever.",
    ],
    photo: { src: beachPhoto, alt: "Edcel and Apreal smiling together on the beach, with Apreal showing her ring." },
  },
  {
    id: "into-our-forever",
    chapter: "Chapter V",
    date: "December 4, 2026",
    dateTime: "2026-12-04",
    paragraphs: [
      "From a chance encounter to a love that stood the test of time, their story now leads them to the promise of forever, where two hearts will become one and love will be their greatest adventure yet.",
    ],
    photo: { src: saveTheDate, alt: "Edcel and Apreal holding save-the-date newspapers announcing their December 4, 2026 wedding." },
  },
];
