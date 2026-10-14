import { wedding } from "./wedding";

export const giftNote = "Your presence at our wedding is the greatest gift of all. Should you wish to bless us with a gift, a monetary contribution would be sincerely appreciated as we begin our journey together.";

export const faqs = [
  {
    question: "When should I RSVP?",
    answer: `Kindly RSVP by ${wedding.rsvp.deadline}. We look forward to celebrating our special day with you!`,
    note: "No RSVP means no attendance",
  },
  {
    question: "How can I RSVP?",
    answer: "Once RSVP opens, enter your full name (without the middle name/initial) on the RSVP page and click Find My Invitation. Once your details appear, complete the form to confirm your attendance.",
  },
  {
    question: "Can I bring my kids?",
    answer: "As much as we adore your little ones, we kindly ask that you make other arrangements for them on our special day. Thank you for understanding, and we can’t wait to celebrate with you!",
  },
  {
    question: "Can I bring a plus one?",
    answer: "We’re keeping our celebration intimate and limited to the guests named on the invitation. We appreciate your understanding and can’t wait to celebrate this special day with you!",
  },
  {
    question: "Can I bring my pet?",
    answer: "As much as we love our furry friends, we kindly ask that you leave your beloved pets at home for our special day. Thank you for understanding, and we can’t wait to celebrate with you!",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer: "Yes, you’re welcome to take photos from your seats. We kindly ask that you remain mindful of the solemnity of the ceremony and be considerate of our official photo and video team. Thank you for helping us keep this moment beautiful and meaningful!",
  },
  {
    question: "What time should I be there?",
    answer: "Kindly arrive by 3:00 PM. We’ve thoughtfully chosen the people we wish to share this special moment with, and it would mean the world to us to have you there to witness the beginning of our forever.",
  },
  {
    question: "Is parking available at the venue?",
    answer: "Yes, someone will be available to assist you with parking. We kindly encourage you to arrive early so you can settle in comfortably before the celebration begins.",
  },
] satisfies { question: string; answer: string; note?: string }[];
