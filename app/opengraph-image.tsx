import { ImageResponse } from "next/og";
import { OgFullLogo } from "@/lib/og-elements";

export const alt = "Zoyare — software built to scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F8F6F2",
          color: "#1A1916",
          fontFamily: "sans-serif",
        }}
      >
        <OgFullLogo height={64} />

        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "108px",
              lineHeight: 1.0,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#1A1916",
            }}
          >
            <span>Software built to&nbsp;</span>
            <span style={{ color: "#F15F0E", fontStyle: "italic", fontWeight: 500 }}>
              scale.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#5C5854",
              fontWeight: 300,
              maxWidth: "900px",
            }}
          >
            Custom software, API integrations and mobile apps for businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8A8680",
          }}
        >
          <span>zoyare.com</span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                display: "flex",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#34D399",
              }}
            />
            Available for projects
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
