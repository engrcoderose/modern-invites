// Types for Classic Wedding Template

export interface WeddingData {
  bride: string;
  groom: string;
  weddingDate: Date;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  reception: {
    name: string;
    address: string;
    mapUrl: string;
  };
}

export interface EntourageMember {
  name: string;
  role: string;
  image?: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

