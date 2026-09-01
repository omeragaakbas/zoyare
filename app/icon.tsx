import { ImageResponse } from "next/og";
import { OgLogoSquare } from "@/lib/og-elements";

/**
 * The favicon: the browser tab, and the circle Google shows beside zoyare.com.
 *
 * The mark is drawn on transparency so it sits on whatever ground it lands on —
 * a dark tab strip, or the light disc Google draws behind it — instead of
 * carrying its own pale square around. That only works because the mark is a
 * solid orange volume rather than thin line art: it holds up at 16px against
 * both. Google wants a square icon whose side is a multiple of 48; 192 is the
 * largest of those it caches.
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
        }}
      >
        <OgLogoSquare size={150} />
      </div>
    ),
    { ...size }
  );
}
