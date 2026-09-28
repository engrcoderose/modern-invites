import { attireDetails, wedding } from "./wedding";

export const faqs: { question: string; answer: string }[] = [
  {
    question: "When should I RSVP?",
    answer: wedding.rsvpDeadline
      ? `Please RSVP by ${wedding.rsvpDeadline}. We can't wait to see you at the wedding.`
      : "The RSVP deadline will be announced soon. We can't wait to see you at the wedding.",
  },
  {
    question: "How can I RSVP?",
    answer:
      `${wedding.rsvpEnabled ? "Please enter" : "Once RSVP opens, enter"} your full name on the RSVP page and click Find my Invitation. Once your details appear, complete the form to confirm your attendance.`,
  },
  {
    question: "Are children invited?",
    answer:
      "We’ve decided to keep the wedding adults-only. We hope you can still join us for a well-earned night off!",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Our numbers are really tight so we’re only able to accommodate the guests listed on the invite. Thank you for understanding.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "Please keep phones and cameras away during the ceremony. Our photographers will capture every moment with us.",
  },
  { question: "Can I wear white?", answer: "No." },
  {
    question: "What is the dress code?",
    answer: `We kindly request ${attireDetails.formality}. ${attireDetails.colorRequest}`,
  },
];
