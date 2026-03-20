import { DebutData, ProgramSchedule, BirthdayProgram, AttireInfo, OtherDetails } from "../types";

export const debutData: DebutData = {
  celebrant: "Stephanie",
  eventDate: new Date("2023-09-09T17:00:00"),
  eventTime: "5:00 PM",
  venue: {
    name: "Rara, Yellow Polo Event Place",
    address: "Purok 6, Sta. Lucia, Sta. Ana, Pampanga",
    mapUrl: "https://maps.google.com",
  },
};

export const programSchedule: ProgramSchedule = {
  callTime: "4PM CALL TIME",
  programProper: "5PM PROGRAM PROPER",
  dinner: "7PM DINNER",
  afterParty: "9PM AFTER PARTY",
};

export const birthdayProgram: BirthdayProgram = {
  roses: {
    title: "18 ROSES",
    description: "The 18 Roses symbolize the 18 gentlemen who will be part of the debutante's life. Each rose represents a year of her life, and the dance signifies her journey into womanhood.",
    participants: [
      "Patrick Gana",
      "Sean Michael Macaraeg",
      "Aaron Paul Cruz",
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Sarah Williams",
      "David Brown",
      "Emily Davis",
      "Robert Miller",
      "Jessica Wilson",
      "Christopher Moore",
      "Amanda Taylor",
      "Daniel Anderson",
      "Lisa Thomas",
      "Matthew Jackson",
      "Michelle White",
      "James Harris",
    ],
  },
  blueBills: {
    title: "18 BLUE BILLS",
    description: "The 18 Blue Bills symbolize the 18 gentlemen who will give the debutante a gift of money. Each gift represents a wish for her prosperity and success in her future endeavors.",
    participants: [
      "Angelo Manalo",
      "J.R. Sanchez",
      "Markus de Guzman Carlos",
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Sarah Williams",
      "David Brown",
      "Emily Davis",
      "Robert Miller",
      "Jessica Wilson",
      "Christopher Moore",
      "Amanda Taylor",
      "Daniel Anderson",
      "Lisa Thomas",
      "Matthew Jackson",
      "Michelle White",
      "James Harris",
    ],
  },
  treasures: {
    title: "18 TREASURES",
    description: "The 18 Treasures symbolize the 18 ladies who will give the debutante a gift that represents a significant aspect of her life. Each gift holds a special meaning and serves as a reminder of their friendship and support.",
    participants: [
      "Rocelle Macaraeg",
      "Jermaine S. Bacani",
      "Kaira Mae Javier",
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Sarah Williams",
      "David Brown",
      "Emily Davis",
      "Robert Miller",
      "Jessica Wilson",
      "Christopher Moore",
      "Amanda Taylor",
      "Daniel Anderson",
      "Lisa Thomas",
      "Matthew Jackson",
      "Michelle White",
      "James Harris",
    ],
  },
  candles: {
    title: "18 CANDLES",
    description: "The 18 Candles symbolize the 18 ladies who will light a candle for the debutante. Each candle represents a wish for her future, and the light signifies their guidance and support as she embarks on a new chapter.",
    participants: [
      "Kristel Joy Macaraeg",
      "Samantha Policarpio",
      "Roseanne Jala",
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Sarah Williams",
      "David Brown",
      "Emily Davis",
      "Robert Miller",
      "Jessica Wilson",
      "Christopher Moore",
      "Amanda Taylor",
      "Daniel Anderson",
      "Lisa Thomas",
      "Matthew Jackson",
      "Michelle White",
      "James Harris",
    ],
  },
};

export const attireInfo: AttireInfo = {
  dresscode: "chic in any style you love — and make sure to wear something yellow to match the celebration's theme",
  colors: ["#F4D03F", "#F7DC6F", "#F9E79F"], // Yellow shades
  description: "Dress code: chic in any style you love — and make sure to wear something yellow to match the celebration's theme.",
};

export const otherDetails: OtherDetails = {
  giftMessage: "Your presence is the greatest gift you could ever give me. However, should you wish to honor me with a present, a monetary gift would be greatly appreciated as it will help me start my journey into adulthood. Thank you for your generosity!",
  unpluggedMessage: "We would love for you to be fully present with us during this special occasion. We kindly request that you put away your phones and cameras during the ceremony and program proper. We have professional photographers and videographers to capture every moment. Thank you for your understanding!",
  hashtag: "#StephGotHerEighteen",
};

export const receptionAddress = {
  name: "SWEET PLACE RENTAL",
  address: "Purok 6, Sta. Lucia, Sta. Ana, Pampanga",
  mapUrl: "https://maps.google.com",
};
