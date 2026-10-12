import Link from "next/link";
import { contact } from "@/lib/content";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import FloatingShape from "@/components/FloatingShape";
import Counter from "@/components/Counter";
import { dict } from "@/lib/dictionary";

/** CSS custom properties for the `.rise` / `.grow-x` entrance classes. */
function enter(delay: number, dur?: number, rise?: number): React.CSSProperties {
  return {
    ["--delay" as string]: `${delay}s`,
    ...(dur !== undefined && { ["--dur" as string]: `${dur}s` }),
    ...(rise !== undefined && { ["--rise" as string]: `${rise}px` }),
  } as React.CSSProperties;
}

/**
 * Server component. The entrance animations are CSS (see `.rise`, `.split-char`
 * and `.grow-x` in globals.css) so the hero is part of the first paint and
 * needs no hydration — on a phone the headline is readable as soon as the HTML
 * and CSS have arrived, not after the JS bundle has been downloaded and run.
 *
 * Keep the delays short: the subtitle is the largest text block above the fold,
 * i.e. the LCP element, and it only counts as painted once it starts fading in.
 */
export default function HeroSection() {
  const d = dict.home;

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden">
      <FloatingShape />

      <div className="relative max-w-5xl">
        <div
          className="rise inline-flex items-center gap-2 mb-10 border border-border bg-background/60 md:bg-background/40 md:backdrop-blur-sm px-3 py-1.5"
          style={enter(0, 0.4, -8)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            {d.badge}
          </span>
        </div>

        <div
          className="rise flex flex-wrap items-center gap-x-8 gap-y-3 mb-10"
          style={enter(0.05, 0.5, 10)}
        >
          <div className="flex items-baseline gap-2">
            <Counter
              to={4}
              pad={2}
              className="font-mono text-2xl text-primary tabular-nums"
            />
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              {d.activeProjects}
            </span>
          </div>
          <span className="w-px h-6 bg-border hidden md:block" />
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl text-primary tabular-nums">
              100%
            </span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              {d.custom}
            </span>
          </div>
          <span className="w-px h-6 bg-border hidden md:block" />
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl text-primary tabular-nums">
              {d.estimated}
            </span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              2024
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-primary leading-[0.95] mb-10">
          <span className="block">
            <SplitText delay={0}>{d.headlineLine1}</SplitText>
          </span>
          <span className="block">
            <SplitText delay={0.1}>{d.headlineLine2}</SplitText>
          </span>
          <span className="block">
            <SplitText
              delay={0.2}
              className="font-display italic text-accent"
            >
              {d.headlineLine3}
            </SplitText>
            <span className="hero-caret inline-block w-[3px] h-[0.78em] bg-accent ml-2 align-middle" />
          </span>
        </h1>

        <p
          className="rise text-secondary text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light"
          style={enter(0.15, 0.5, 16)}
        >
          {d.subtitle}
        </p>

        <div
          className="rise flex items-center gap-6 flex-wrap"
          style={enter(0.25, 0.5, 16)}
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              data-magnetic
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-background text-sm font-medium overflow-hidden"
            >
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {d.viewWork}
              </span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <a
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
            >
              {d.scheduleCall}
            </a>
          </MagneticButton>
        </div>
      </div>

      <div
        className="rise mt-24 flex items-center gap-3"
        style={enter(0.4, 0.5, 0)}
      >
        <div
          className="grow-x h-px w-12 bg-muted"
          style={enter(0.5)}
        />
        <span className="scroll-bob font-mono text-xs text-muted tracking-widest uppercase">
          {d.scroll}
        </span>
      </div>
    </section>
  );
}
