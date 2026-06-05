"use client";

import { usePathname } from "next/navigation";
import { testimonials } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";
import { localeFromPath } from "@/lib/i18n/config";

export default function TestimonialsSection() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname || "/");
  const label = locale === "nl" ? "Wat klanten zeggen" : "What clients say";

  return (
    <section className="relative px-6 md:px-12 py-24 border-t border-border">
      <FadeIn className="mb-14">
        <p className="font-mono text-xs text-muted tracking-widest uppercase">
          {label}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {testimonials.map((t, i) => (
          <FadeIn key={t.company} delay={i * 0.08}>
            <div className="bg-background p-8 md:p-10 flex flex-col justify-between h-full">
              <p className="text-secondary leading-relaxed text-sm mb-8">
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
