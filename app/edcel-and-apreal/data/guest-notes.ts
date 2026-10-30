import { wedding } from "./wedding";

export const guestReminders = [
  {
    id: "adults-only",
    title: "Adults only",
    paragraphs: ["To give all our guests the opportunity to celebrate, dance, and drink without having to worry about little eyes and ears, we politely request no children except for the entourage."],
  },
  {
    id: "unplugged-ceremony",
    title: "Unplugged ceremony",
    paragraphs: ["Our amazing and talented official photographers will capture every aspect of our ceremony. We request your joyful smiles without the distraction of electronic devices or cameras. Our vows may be unplugged, but the celebration is not."],
  },
];

export const rsvpContacts = [
  { name: "Apreal", display: "0935 078 8397", href: "tel:+639350788397" },
  { name: "Edcel", display: "0956 135 8697", href: "tel:+639561358697" },
];

type GuestQuestion = { question: string; paragraphs: string[]; contacts?: typeof rsvpContacts };

export const guestQuestions: GuestQuestion[] = [
  {
    question: "Can I bring a plus one?",
    paragraphs: ["We sincerely hope for your kind understanding and respectfully ask that you refrain from bringing a plus-one unless they are specifically named on the invitation."],
  },
  { question: "What time should I arrive?", paragraphs: [`Please arrive at the church by ${wedding.ceremony.arrival}. The ceremony begins at ${wedding.ceremony.time}.`] },
  { question: "What should I wear?", paragraphs: [`${wedding.attire.title}. ${wedding.attire.note}`] },
  { question: "Where will the reception be held?", paragraphs: [`${wedding.reception.name}, ${wedding.reception.address}. Cocktails begin at ${wedding.reception.cocktails}, with the program starting at ${wedding.reception.time}.`] },
  {
    question: "When should I RSVP?",
    paragraphs: [
      "As this is an intimate wedding celebration, seats are reserved for the guests named on your invitation.",
      `The favor of your response is requested on or before ${wedding.rsvp.deadline}.`,
      "Find your invitation in the RSVP section below to confirm attendance for your invited party. For assistance, contact Apreal or Edcel.",
    ],
    contacts: rsvpContacts,
  },
];
