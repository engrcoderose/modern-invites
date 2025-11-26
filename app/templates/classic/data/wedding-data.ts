import { WeddingData, EntourageMember, TimelineEvent, FAQ } from "../types";

export const weddingData: WeddingData = {
  bride: "Emily Rose",
  groom: "James Anderson",
  weddingDate: new Date("2026-06-20T16:00:00"),
  venue: {
    name: "St. Mary's Cathedral",
    address: "123 Church Street, Downtown, NY 10001",
    mapUrl: "https://maps.google.com",
  },
  reception: {
    name: "Grand Ballroom at The Plaza",
    address: "456 Plaza Avenue, Downtown, NY 10002",
    mapUrl: "https://maps.google.com",
  },
};

export const ourStory = {
  title: "Our Love Story",
  content: [
    {
      title: "How We Met",
      date: "Summer 2018",
      description:
        "We first crossed paths at a mutual friend's summer barbecue. What started as a casual conversation about our shared love for hiking turned into hours of talking under the stars.",
    },
    {
      title: "The First Date",
      date: "August 2018",
      description:
        "Our first official date was a scenic hike followed by a picnic at the summit. James surprised Emily with her favorite chocolates, and we watched the sunset together.",
    },
    {
      title: "The Proposal",
      date: "December 2024",
      description:
        "James proposed during a winter getaway to the mountains, at the very same spot where we had our first date. With snow gently falling and a beautiful ring, he asked the most important question.",
    },
  ],
};

export const weddingProgram: TimelineEvent[] = [
  {
    time: "2:00 PM",
    title: "Guest Arrival",
    description: "Guests begin to arrive and are seated",
  },
  {
    time: "3:00 PM",
    title: "Ceremony Begins",
    description: "The wedding ceremony commences",
  },
  {
    time: "3:45 PM",
    title: "Ceremony Conclusion",
    description: "Recessional and congratulations",
  },
  {
    time: "4:30 PM",
    title: "Cocktail Hour",
    description: "Light refreshments and mingling at the reception venue",
  },
  {
    time: "6:00 PM",
    title: "Reception Dinner",
    description: "Dinner service begins",
  },
  {
    time: "7:30 PM",
    title: "First Dance & Toasts",
    description: "Special dances and speeches",
  },
  {
    time: "8:00 PM",
    title: "Dance Party",
    description: "Let's celebrate on the dance floor!",
  },
  {
    time: "11:00 PM",
    title: "Grand Exit",
    description: "Sparkler send-off",
  },
];

export const entourage: {
  bridalParty: EntourageMember[];
  groomsmen: EntourageMember[];
} = {
  bridalParty: [
    { name: "Sarah Johnson", role: "Maid of Honor" },
    { name: "Jessica Chen", role: "Bridesmaid" },
    { name: "Amanda Roberts", role: "Bridesmaid" },
    { name: "Lily Martinez", role: "Bridesmaid" },
  ],
  groomsmen: [
    { name: "Michael Thompson", role: "Best Man" },
    { name: "David Lee", role: "Groomsman" },
    { name: "Ryan Wilson", role: "Groomsman" },
    { name: "Chris Davis", role: "Groomsman" },
  ],
};

export const attireInfo = {
  dresscode: "Formal / Black Tie Optional",
  colors: ["Navy Blue", "Dusty Rose", "Gold"],
  description:
    "We kindly request that our guests wear formal attire. Ladies, feel free to wear floor-length gowns or cocktail dresses. Gentlemen, we suggest suits or tuxedos. Our wedding colors are Navy Blue, Dusty Rose, and Gold, but please wear what makes you feel comfortable and confident!",
};

export const faqs: FAQ[] = [
  {
    question: "What time should I arrive?",
    answer:
      "We recommend arriving at least 30 minutes before the ceremony starts to allow time for parking and seating. The ceremony begins promptly at 3:00 PM.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, both the ceremony venue and reception location have ample parking. Valet parking will be available at the reception venue.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Due to venue capacity, we can only accommodate guests formally invited on your invitation. If you received a plus one, it will be indicated on your invitation.",
  },
  {
    question: "Are children welcome?",
    answer:
      "While we love your little ones, we have decided to make our wedding an adults-only celebration. We hope this gives you a chance to relax and enjoy the evening!",
  },
  {
    question: "What will the weather be like?",
    answer:
      "June in New York is typically warm and pleasant, with temperatures ranging from 70-80°F. We recommend bringing a light jacket for the evening.",
  },
  {
    question: "Is the venue wheelchair accessible?",
    answer:
      "Yes, both venues are fully wheelchair accessible. Please let us know if you have any specific accessibility needs.",
  },
  {
    question: "Will there be food and drinks?",
    answer:
      "Yes! A full dinner service will be provided, along with an open bar throughout the reception. Please indicate any dietary restrictions in your RSVP.",
  },
];

export const usefulInfo = [
  {
    title: "Hotel Accommodations",
    description:
      "We have reserved room blocks at The Grand Hotel (555-0100) and Riverside Inn (555-0200). Please mention our wedding when booking to receive the group rate.",
  },
  {
    title: "Transportation",
    description:
      "Complimentary shuttle service will be provided between the ceremony and reception venues. Shuttles will run continuously from 4:00 PM to midnight.",
  },
  {
    title: "Gift Registry",
    description:
      "Your presence is the greatest gift of all! If you wish to honor us with a gift, we have registered at Amazon and Bed Bath & Beyond.",
  },
  {
    title: "Photography",
    description:
      "We have hired a professional photographer to capture our special day. We kindly request an unplugged ceremony - please keep phones and cameras away during the ceremony.",
  },
];

