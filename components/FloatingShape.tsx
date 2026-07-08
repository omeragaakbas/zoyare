import Logo from "./Logo";

/**
 * Hero accent: oversized Zoyare cube as a faint watermark.
 * Organic circular drift + scale breath — pure CSS keyframes (globals.css),
 * so it costs zero main-thread work. Hidden on mobile.
 * `prefers-reduced-motion` is neutralized by the global reduced-motion block.
 */
export default function FloatingShape() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[8%] xl:right-[12%] top-[16%] hidden lg:block"
    >
      {/* Soft warm glow behind the mark */}
      <div
        className="float-glow absolute -inset-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.20) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* Cube — gentle entrance, then organic drift + scale breath */}
      <div className="float-entrance relative">
        <div className="float-drift">
          <Logo
            variant="mark"
            height={380}
            className="opacity-[0.20] xl:opacity-[0.24]"
          />
        </div>
      </div>
    </div>
  );
}
