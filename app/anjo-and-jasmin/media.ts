import { TimelineChurch, TimelinePhotos, TimelineCocktails, TimelineParty, TimelineDinner, TimelineProgram } from "./design-media";
import { photoCatalog as photos } from "./photo-catalog";

export const heroSlides = [
  { ...photos.BonfireDance, mobilePhoto: photos.BonfireDance, mobilePosition: "85% 45%" },
  { ...photos.SunlitEmbrace, mobilePhoto: photos.SunlitPortrait, mobilePosition: "65% 45%" },
  { ...photos.GardenLift, mobilePhoto: photos.GardenLift, mobilePosition: "33% 45%" },
  { ...photos.RainLift, mobilePhoto: photos.RainLift, mobilePosition: "55% 45%" },
  { ...photos.GardenDipAndLaughter, mobilePhoto: photos.GardenDipAndLaughter, mobilePosition: "68% 45%" },
  { ...photos.SunlitGardenLift, mobilePhoto: photos.SunlitGardenLift, mobilePosition: "30% 45%" },
  { ...photos.LaughingHug, alt: "Anjo and Jasmin sharing a playful back hug", mobilePhoto: photos.ShoulderHug, mobilePosition: "50% 45%" },
];

export const gallery = [
  photos.TreeDance, photos.SunlitPortrait, photos.CoupleWithDogs,
  photos.ShoulderHug, photos.IndoorCuddle, photos.BonfireKiss,
  photos.RainEmbrace, photos.RainDance, photos.SeatedCuddleOnWoodenTable,
  photos.CoupleWithTwoDogsSharingALook,
];

export const storyPhotos = [photos.UmbrellaWalk, photos.EngagementRingHoldingHands] as const;
export const storyQuotePhoto = photos.BonfireEmbrace;
export const preEntouragePhoto = photos.RowingBoatWithDucks;
export const afterGiftsPhoto = photos.IndoorKiss;
export const afterOtherDetailsPhoto = photos.RunningTogetherInGoldenRain;
export const rsvpPhoto = photos.BonfireDanceTwirl;

export const afterDressCodeSlides = [
  photos.BoatRide, photos.TableKiss, photos.BridgeWalk,
  photos.PlayfulBackHugIndoors, photos.RunningTogetherInGoldenRain,
  photos.BonfireEmbrace, photos.BoatKissPondWideView,
];

export const galleryBreakPhotos = [
  // The first ten form the preview: two portrait anchors and intimate details.
  photos.TreeDanceSepia, photos.PlayfulShoulderHugCloseUp,
  photos.WarmIndoorEmbraceCloseUp, photos.ForeheadTouchSepiaCloseUp,
  { ...photos.BonfireCuddle01, position: "70% 45%" }, photos.RingDetail,
  photos.IndoorCuddleWithBacklight,
  { ...photos.BoatKissWithDucksPortrait, position: "50% 30%" },
  { ...photos.BonfireDanceTwirl, position: "50% 25%" },
  { ...photos.BonfireCuddle02, position: "70% 45%" },
  // Remaining photos are available inside the viewer.
  photos.HandsReachingCloseUp, photos.BoatRideSmilingAndHoldingHands,
  photos.BoatKissWithDucksSepia, photos.BoatRidePondWideView,
  photos.RowingBoatWithDucks, photos.BoatRideDucksInForeground,
  photos.HoldingHandsInBoatDetail, photos.EngagementRingOutstretchedHand,
  photos.IndoorKiss, photos.JasminWarmLightCloseUp,
  photos.BonfireDanceTiltedView,
  photos.BoatPortrait, photos.JasminBacklitPortrait,
];

// Ceremony, photos, registration and cocktails, reception program, dinner, party.
export const timelineIllustrations = [
  TimelineChurch, TimelinePhotos, TimelineCocktails, TimelineProgram, TimelineDinner, TimelineParty,
] as const;
