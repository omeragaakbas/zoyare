/**
 * Living background — server-rendered, pure CSS animations.
 *  - dot grid (CSS, geen paint cost)
 *  - 2 langzaam drijvende warm-orange blobs (GPU-composited)
 *  - SVG film grain via een 200×200 tile pattern
 *
 * `prefers-reduced-motion` wordt globaal afgevangen in globals.css.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1916 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated gradient blobs — CSS keyframes, GPU-composited */}
      <div
        className="zoyare-blob-1 absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.20) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="zoyare-blob-2 absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.14) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Film grain overlay — small tiled pattern (cheap to paint) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="zoyare-noise" x="0" y="0" width="200" height="200">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id="zoyare-grain"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <rect width="200" height="200" filter="url(#zoyare-noise)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zoyare-grain)" />
      </svg>
    </div>
  );
}
