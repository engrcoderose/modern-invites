import { ImageResponse } from "next/og";

import { InvitationSocialPreview } from "@/components/social/InvitationSocialPreview";

export const alt = "Claudia's 18th birthday invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <InvitationSocialPreview
      announcement="You are invited to celebrate"
      background="#fff7fb"
      border="#e7b61d"
      date="A debut celebration"
      foreground="#151515"
      names="Claudia at 18"
      muted="#d12c91"
    />,
    size,
  );
}
