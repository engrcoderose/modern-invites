type InvitationSocialPreviewProps = {
  announcement: string;
  background: string;
  border: string;
  date: string;
  foreground: string;
  names: string;
  muted: string;
};

export function InvitationSocialPreview({
  announcement,
  background,
  border,
  date,
  foreground,
  names,
  muted,
}: InvitationSocialPreviewProps) {
  return (
    <div
      style={{
        alignItems: "center",
        background,
        color: foreground,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "42px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          border: `2px solid ${border}`,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            color: muted,
            display: "flex",
            fontSize: 21,
            letterSpacing: "0.32em",
            marginBottom: 40,
            textTransform: "uppercase",
          }}
        >
          {announcement}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: names.length > 20 ? 82 : 96,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {names}
        </div>
        <div
          style={{
            background: border,
            display: "flex",
            height: 2,
            margin: "42px 0 32px",
            width: 110,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {date}
        </div>
        <div
          style={{
            bottom: 28,
            color: muted,
            display: "flex",
            fontSize: 17,
            letterSpacing: "0.2em",
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          Modern Invites
        </div>
      </div>
    </div>
  );
}
