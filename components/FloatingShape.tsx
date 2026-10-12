import Logo from "./Logo";

/**
 * Hero accent: oversized Zoyare cube as a faint watermark.
 * A gentle entrance, then it rests: the endless drift/breathing it used to have
 * kept the browser rendering 60 frames a second (see "KEEP THE PAGE IDLE" in
 * globals.css). Hidden below lg.
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
        className="absolute -inset-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.20) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* Cube — gentle entrance, then it stays put */}
      <div className="float-entrance relative">
        <Logo
          variant="mark"
          height={380}
          className="opacity-[0.20] xl:opacity-[0.24]"
        />
      </div>
    </div>
  );
}
