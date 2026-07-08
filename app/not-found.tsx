import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 min-h-[70vh] flex flex-col justify-center">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
        404
      </p>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-6">
        Page not
        <br />
        <span className="font-display">found.</span>
      </h1>
      <p className="text-secondary text-lg leading-relaxed max-w-md mb-12">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center gap-6 flex-wrap mb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
        >
          Back to home →
        </Link>
        <Link
          href="/contact"
          className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
        >
          Get in touch
        </Link>
      </div>

      <div className="border-t border-border pt-10 max-w-md">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-5">
          Perhaps you were looking for
        </p>
        <div className="flex flex-col gap-3">
          {[
            { href: "/portfolio", label: "Selected work" },
            { href: "/services/custom-software", label: "Custom software development" },
            { href: "/estimate", label: "Get a project estimate" },
            { href: "/blog", label: "Knowledge & insights" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex items-center gap-3 text-sm text-secondary hover:text-accent transition-colors duration-200"
            >
              <span className="text-accent" aria-hidden="true">→</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
