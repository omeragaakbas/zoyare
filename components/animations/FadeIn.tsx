interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "none";
}

/**
 * Scroll reveal. A server component: it renders a plain element and the
 * styling lives in globals.css (`.reveal`). A single shared IntersectionObserver
 * (inline script in layout.tsx) adds `.is-in` when the element scrolls into
 * view — no per-element client component, no hydration, and the content is
 * visible without JavaScript. Reduced motion is handled globally.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const dir =
    direction === "left" ? " reveal-left" : direction === "none" ? " reveal-none" : "";
  return (
    <div
      className={`reveal${dir}${className ? ` ${className}` : ""}`}
      style={delay ? { ["--reveal-delay" as string]: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
