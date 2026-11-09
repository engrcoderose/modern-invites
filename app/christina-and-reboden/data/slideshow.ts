import beachBackdrop from "../../../public/christina-and-reboden/photos/prenup/dsc06019.jpg";
import sunsetPortrait from "../../../public/christina-and-reboden/photos/prenup/dsc06605.jpg";
import blackAndWhitePortrait from "../../../public/christina-and-reboden/photos/prenup/dsc06116.jpg";
import seatedPortrait from "../../../public/christina-and-reboden/photos/prenup/dsc06236.jpg";
import beachCollage from "../../../public/christina-and-reboden/photos/prenup/dsc06519.jpg";
import matchingJerseyCollage from "../../../public/christina-and-reboden/photos/prenup/dsc06519-1.jpg";
import holdingHands from "../../../public/christina-and-reboden/photos/prenup/dsc06540.jpg";
import monochromeEmbrace from "../../../public/christina-and-reboden/photos/prenup/dsc05813.jpg";
import walkingTogether from "../../../public/christina-and-reboden/photos/prenup/dsc06147.jpg";
import seasideLaughter from "../../../public/christina-and-reboden/photos/prenup/dsc06567.jpg";
import matchingShirts from "../../../public/christina-and-reboden/photos/prenup/dsc06355.jpg";
import playfulPortraits from "../../../public/christina-and-reboden/photos/prenup/20261024-225227-collage.jpg";
import christinaByTheTree from "../../../public/christina-and-reboden/photos/prenup/dsc06057.jpg";
import rebodenByTheTree from "../../../public/christina-and-reboden/photos/prenup/dsc06069.jpg";
import seasideLift from "../../../public/christina-and-reboden/photos/prenup/dsc06623.jpg";

export const slideshowBackdrop = beachBackdrop;
export const slideshowPhotos = [
  { src: sunsetPortrait, alt: "Christina and Reboden smiling together on the beach at sunset" },
  { src: blackAndWhitePortrait, alt: "A black-and-white portrait of Christina and Reboden standing back to back beneath a beach umbrella" },
  { src: seatedPortrait, alt: "Christina and Reboden sitting side by side in their green and patterned outfits" },
  { src: beachCollage, alt: "Three beach photographs of Christina and Reboden smiling at each other and showing their matching bracelets" },
  { src: matchingJerseyCollage, alt: "Three photographs of Christina and Reboden in matching jerseys, sitting on stairs and holding hands" },
  { src: playfulPortraits, alt: "Three playful portraits of Christina and Reboden in matching blue plaid shirts" },
];

export const togetherPhotos = [
  { src: holdingHands, alt: "Christina and Reboden holding hands as they face the sea" },
  { src: monochromeEmbrace, alt: "A black-and-white photograph of Christina and Reboden embracing on the beach" },
  { src: walkingTogether, alt: "Christina and Reboden smiling at each other in their matching black outfits" },
  { src: seasideLaughter, alt: "Christina and Reboden laughing together beside the shore" },
  { src: matchingShirts, alt: "Christina and Reboden wearing matching personalized shirts with their backs to the camera" },
  { src: christinaByTheTree, alt: "Christina smiling beside a tree with Reboden standing in the background, both wearing black" },
  { src: rebodenByTheTree, alt: "Reboden looking toward the sea beside a tree with Christina in the background, both wearing black" },
  { src: seasideLift, alt: "Reboden lifting Christina into his arms as they smile together by the shore" },
];

// Each photo starts its next transition after 3 seconds; the fade is included.
export const slideshowTiming = { interval: 3000, fade: 900 };
