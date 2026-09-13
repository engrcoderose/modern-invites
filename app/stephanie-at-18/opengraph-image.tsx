import { ImageResponse } from "next/og";

import { InvitationSocialPreview } from "@/components/social/InvitationSocialPreview";

export const alt = "Stephanie's 18th birthday invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <InvitationSocialPreview
      announcement="You are invited to celebrate"
      background="#f8f3e8"
      border="#d0a85c"
      date="September 9, 2023"
      foreground="#8c1118"
      names="Stephanie at 18"
      muted="#ad7b38"
    />,
    size,
  );
}
