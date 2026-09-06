import { ImageResponse } from "next/og";

import { InvitationSocialPreview } from "@/components/social/InvitationSocialPreview";

export const alt = "Eric and Li's wedding invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <InvitationSocialPreview
      announcement="We are getting married"
      background="#f4f0e7"
      border="#b59a72"
      date="June 20, 2030"
      foreground="#27475a"
      names="Eric & Li"
      muted="#8a7355"
    />,
    size,
  );
}
