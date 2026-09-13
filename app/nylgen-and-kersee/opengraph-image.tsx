import { ImageResponse } from "next/og";

export const alt = "Nylgen and Kersee's wedding invitation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f5f0e5",
          color: "#263c32",
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
            border: "2px solid #a9aa8f",
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
              color: "#7b795d",
              display: "flex",
              fontSize: 21,
              letterSpacing: "0.32em",
              marginBottom: 40,
              textTransform: "uppercase",
            }}
          >
            We are getting married
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 96,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Nylgen &amp; Kersee
          </div>
          <div
            style={{
              background: "#a9aa8f",
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
            February 27, 2027
          </div>
          <div
            style={{
              bottom: 28,
              color: "#7b795d",
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
    ),
    size,
  );
}
