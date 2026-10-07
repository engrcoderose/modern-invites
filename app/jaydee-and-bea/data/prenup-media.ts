import { remoteImage } from "../utils/remote-image";

const prenupBasePath = "placeholder-images/prenups";

// Verified public R2 uploads; preserve dimensions for responsive sizing and layout.
function prenupImage(filename: string, width: number, height: number) {
  return remoteImage(`${prenupBasePath}/${filename}`, width, height);
}

export const main1 = prenupImage("Main1-1.webp", 2560, 1708);
export const main2 = prenupImage("Main1-2.webp", 1708, 2560);
export const main3 = prenupImage("Main1-3.webp", 1708, 2560);
export const main4 = prenupImage("Main1-4.webp", 1708, 2560);
export const main5 = prenupImage("Main1-5.webp", 2560, 1708);
export const group1 = prenupImage("Group1-1.webp", 2560, 1708);
export const group2 = prenupImage("Group1-2.webp", 2560, 1708);
export const group3 = prenupImage("Group1-3.webp", 2560, 1708);
export const group4 = prenupImage("Group1-4.webp", 2560, 1708);
export const group5 = prenupImage("Group1-5.webp", 2560, 1708);
