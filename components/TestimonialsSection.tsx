import { testimonials } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";

export default function TestimonialsSection() {
  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border">
      <FadeIn className="mb-14">
        <p className="font-mono text-xs text-muted tracking-widest uppercase">
          What clients say
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {testimonials.map((t, i) => (
          <FadeIn key={t.company} delay={i * 0.08}>
            <div className="bg-background p-8 md:p-10 flex flex-col justify-between h-full">
              <p className="font-display text-lg md:text-xl text-primary/85 leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-primary">{t.name}</p>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mt-1">
                  {t.company}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
