import { ImageResponse } from "next/og";
import { og, OgLogoSquare } from "@/lib/og-elements";

/**
 * The favicon Google shows beside zoyare.com in search results.
 *
 * A bare SVG mark on transparency renders as a thin orange squiggle inside
 * Google's circle — hard to read at 16px and invisible against a dark theme.
 * This gives the mark a solid brand ground and room to breathe, which is what
 * makes a favicon legible at that size. Google wants a square icon whose side
 * is a multiple of 48; 192 is the largest of those it caches.
 */
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
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
        <OgLogoSquare size={112} />
      </div>
    ),
    { ...size }
  );
}
