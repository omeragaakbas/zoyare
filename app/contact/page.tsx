import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Zoyare",
  description: "Neem contact op voor een project of gesprek.",
};

export default function Contact() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      {/* Header */}
      <div className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Contact
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-tight">
          Een project
          <br />
          bespreken?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-border pt-16">
        {/* Form */}
        <div className="lg:col-span-7">
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted tracking-widest uppercase">
                  Naam
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="bg-surface border border-border text-primary text-sm px-4 py-3 focus:outline-none focus:border-muted transition-colors placeholder:text-muted"
                  placeholder="Jan de Vries"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted tracking-widest uppercase">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="bg-surface border border-border text-primary text-sm px-4 py-3 focus:outline-none focus:border-muted transition-colors placeholder:text-muted"
                  placeholder="jan@bedrijf.nl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted tracking-widest uppercase">
                Bedrijf
              </label>
              <input
                type="text"
                name="company"
                className="bg-surface border border-border text-primary text-sm px-4 py-3 focus:outline-none focus:border-muted transition-colors placeholder:text-muted"
                placeholder="Bedrijf B.V. (optioneel)"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-muted tracking-widest uppercase">
                Project
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="bg-surface border border-border text-primary text-sm px-4 py-3 focus:outline-none focus:border-muted transition-colors placeholder:text-muted resize-none"
                placeholder="Wat wil je bouwen? Geef een korte omschrijving van het project of de uitdaging."
              />
            </div>

            <button
              type="submit"
              className="self-start px-8 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-200"
            >
              Verstuur
            </button>
          </form>
        </div>

        {/* Direct contact */}
        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-10">
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
              Direct
            </p>
            <a
              href="mailto:hello@zoyare.com"
              className="text-lg text-primary hover:text-accent transition-colors duration-200"
            >
              hello@zoyare.com
            </a>
          </div>

          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
              Reactietijd
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Binnen 24 uur. Voor urgente zaken, stuur een directe mail.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
              Beschikbaarheid
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Beschikbaar voor nieuwe projecten.
              <br />
              Zowel kortlopende opdrachten als langdurige samenwerking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
