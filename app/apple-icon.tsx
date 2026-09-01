import { ImageResponse } from "next/og";
import { og, OgLogoSquare } from "@/lib/og-elements";

/**
 * The iOS home-screen icon.
 *
 * This one keeps a solid ground on purpose, unlike the favicon: iOS composites
 * a transparent touch icon onto black, which the orange mark cannot carry.
 * The geometry comes from OgLogoSquare so there is one source for it.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: og.bg,
        }}
      >
        <OgLogoSquare size={132} />
      </div>
    ),
    { ...size }
  );
}
