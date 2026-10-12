interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div";
}

/**
 * Character-level reveal: each letter slides up and fades in.
 * Whitespace is preserved by splitting on words first, then chars.
 *
 * Server component, pure CSS (`.split-char` in globals.css): no hydration, and
 * only transform + opacity are animated so it stays on the compositor. The
 * previous version also animated a blur filter per letter, which repaints
 * every frame and was a major cost on phones. `prefers-reduced-motion` is
 * handled globally in globals.css.
 */
export default function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const words = children.split(" ");
  let charIndex = 0;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wi) => (
        <span
          key={`w-${wi}`}
          className="inline-block whitespace-nowrap"
          style={{ paddingBottom: "0.05em" }}
        >
          {word.split("").map((char, ci) => {
            const i = charIndex++;
            return (
              <span
                key={`c-${ci}`}
                className="split-char"
                style={{ ["--delay" as string]: `${(delay + i * stagger).toFixed(3)}s` }}
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
