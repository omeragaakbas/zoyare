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
        found.
      </h1>
      <p className="text-secondary text-lg leading-relaxed max-w-md mb-12">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center gap-6 flex-wrap">
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
    </div>
  );
}
