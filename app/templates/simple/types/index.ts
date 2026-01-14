// Types for Simple Debut Template

export interface DebutData {
  celebrant: string;
  eventDate: Date;
  eventTime: string;
  venue: {
    name: string;
    address: string;
    mapUrl?: string;
  };
}

export interface ProgramSchedule {
  callTime: string;
  programProper: string;
  dinner: string;
  afterParty: string;
}

export interface BirthdayProgram {
  roses: {
    title: string;
    description: string;
    participants: string[];
  };
  blueBills: {
    title: string;
    description: string;
    participants: string[];
  };
  treasures: {
    title: string;
    description: string;
    participants: string[];
  };
  candles: {
    title: string;
    description: string;
    participants: string[];
  };
}

export interface AttireInfo {
  dresscode: string;
  colors: string[];
  description: string;
}

export interface OtherDetails {
  giftMessage: string;
  unpluggedMessage: string;
  hashtag: string;
}
