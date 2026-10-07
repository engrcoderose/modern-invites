import type { StaticImageData } from "next/image";

const prenupBaseUrl =
  "https://assets.moderninvites.com/placeholder-images/joshua-and-bea/prenups";

// Shared uploaded originals; each section controls its own crop and captions.
// Dimensions were verified against R2 (see docs/media/r2-prenup-verification.json).
function prenupImage(filename: string, width: number, height: number): StaticImageData {
  return { src: `${prenupBaseUrl}/${filename}`, width, height };
}

export const Walking = prenupImage("pexels-king-caplis-471600979-36396110.jpg", 5184, 3456);
export const Together = prenupImage("pexels-king-caplis-471600979-36266073.jpg", 5184, 3456);
export const Garden = prenupImage("pexels-king-caplis-471600979-36266077.jpg", 5184, 3456);
export const Sitting = prenupImage("pexels-king-caplis-471600979-36396114.jpg", 5184, 3456);
export const Embrace = prenupImage("pexels-king-caplis-471600979-36266135.jpg", 5184, 3456);
export const Portrait = prenupImage("pexels-king-caplis-471600979-36266064.jpg", 5184, 3456);
export const PrenupMoment = prenupImage("pexels-king-caplis-471600979-36266137.jpg", 5184, 3456);
export const WelcomePhoto = prenupImage("pexels-king-caplis-471600979-36396174.jpg", 4768, 3247);
export const ChurchImage = prenupImage("church-image.jpg", 1195, 896);
