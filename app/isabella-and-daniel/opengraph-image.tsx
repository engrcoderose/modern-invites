import { ImageResponse } from "next/og";

import { InvitationSocialPreview } from "@/components/social/InvitationSocialPreview";

export const alt = "Isabella and Daniel's wedding invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <InvitationSocialPreview
      announcement="We are getting married"
      background="#f5efe6"
      border="#d4b483"
      date="March 14, 2027"
      foreground="#6d172d"
      names="Isabella & Daniel"
      muted="#9c7754"
    />,
    size,
  );
}
