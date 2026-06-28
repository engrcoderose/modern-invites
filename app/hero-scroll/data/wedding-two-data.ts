import { EntourageData, FAQ, TimelineEvent, WeddingTwoData } from "../types";

export const weddingTwoData: WeddingTwoData = {
  bride: "Isabella Santos",
  groom: "Daniel Reyes",
  weddingDate: new Date("2027-03-14T15:00:00"),

  venue: {
    name: "The Glass Garden",
    address: "Riverside Drive, Antipolo City, Rizal, Philippines",
    mapUrl: "https://maps.google.com/?q=The+Glass+Garden+Antipolo",
    image: "/images/venues/glass-garden.jpg",
  },

  reception: {
    name: "The Glass Garden Reception Hall",
    address: "Riverside Drive, Antipolo City, Rizal, Philippines",
    mapUrl: "https://maps.google.com/?q=The+Glass+Garden+Reception",
    image: "/images/reception/glass-garden-reception.jpg",
  },

  ourStory: {
    title: "Our Story",
    content: [
      {
        title: "The First Meeting",
        date: "2016",
        description:
          "Isabella and Daniel first met at a college friend’s birthday dinner in Manila. What started as a simple introduction turned into hours of conversation about dreams, ambitions, and life over coffee.",
      },
      {
        title: "Officially Us",
        date: "2018",
        description:
          "After years of friendship and growing closeness, they finally became a couple. Life since then has been a journey of shared goals, support, and endless laughter.",
      },
      {
        title: "Growing Together",
        date: "2019 - 2025",
        description:
          "Through career changes, challenges, and personal growth, they built a strong foundation rooted in understanding, patience, and love.",
      },
      {
        title: "The Proposal",
        date: "2026",
        description:
          "During a sunset getaway in Tagaytay, Daniel proposed in an intimate and simple moment — just the way Isabella always dreamed it would be.",
      },
    ],
  },

  weddingHashtag: "#IsabellaFoundHerDaniel",
};

export const weddingProgram: TimelineEvent[] = [
  {
    time: "2:30 PM",
    title: "Guest Arrival",
    description: "Seating and welcome refreshments begin.",
  },
  {
    time: "3:00 PM",
    title: "Wedding Ceremony",
    description: "A heartfelt exchange of vows and rings.",
  },
  {
    time: "4:00 PM",
    title: "Photo Session",
    description: "Couple and family portraits.",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    description: "Light snacks and social time with guests.",
  },
  {
    time: "6:00 PM",
    title: "Reception Dinner",
    description: "Dinner, speeches, and celebration.",
  },
  {
    time: "8:00 PM",
    title: "Party & Dancing",
    description: "Let’s celebrate love all night long.",
  },
];

export const entourageData: EntourageData = {
    parents: [
      { name: "Mr. Roberto Santos" },
      { name: "Mrs. Elena Santos" },
      { name: "Mr. Eduardo Reyes" },
      { name: "Mrs. Carmela Reyes" },
    ],
  
    principalSponsors: [
      { name: "Dr. Miguel Torres" },
      { name: "Atty. Sofia Lim" },
      { name: "Mr. Vincent Dela Cruz" },
      { name: "Mrs. Angela Navarro" },
    ],
  
    bestMan: [{ name: "Mark Anthony Reyes" }],
  
    maidOfHonor: [{ name: "Camille Rivera" }],
  
    secondarySponsors: {
      veil: [{ name: "Jasmine Co" }, { name: "Nicole Garcia" }],
      cord: [{ name: "Paolo Ramos" }, { name: "Kevin Bautista" }],
      candle: [{ name: "Rhea Santos" }, { name: "Janine Cruz" }],
    },
  
    groomsman: [
      { name: "Luis Mendoza" },
      { name: "Patrick Lim" },
      { name: "Joshua Reyes" },
    ],
  
    bridesmaid: [
      { name: "Angelica Flores" },
      { name: "Bianca Cruz" },
      { name: "Hazel Domingo" },
    ],
  
    ringBearer: [{ name: "Ethan Reyes" }],
  
    coinBearer: [{ name: "Miguel Santos Jr." }],
  
    bibleBearer: [{ name: "Noah Cruz" }],
  
    flowerGirl: [{ name: "Sofia Reyes" }],
  };

  export const faqData: FAQ[] = [
    {
      question: "What is the dress code?",
      answer:
        "We kindly request semi-formal attire in beige, ivory, champagne, or earth tones to match our theme.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "We are keeping our celebration intimate. Only guests indicated in the invitation are expected.",
    },
    {
      question: "Is the wedding indoors or outdoors?",
      answer:
        "The ceremony will be held in a fully glass-covered garden venue with both indoor and outdoor elements.",
    },
    {
      question: "When should I arrive?",
      answer:
        "We recommend arriving at least 30 minutes before the ceremony starts at 3:00 PM.",
    },
    {
      question: "Will there be parking available?",
      answer:
        "Yes, the venue has dedicated parking spaces for all guests.",
    },
  ];
