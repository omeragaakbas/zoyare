"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json();
        setErrorMsg(json.error || "Er is iets misgegaan.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Geen verbinding. Probeer het opnieuw.");
      setStatus("error");
    }
  }

  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      {/* Header */}
      <div className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Contact</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          Een project
          <br />
          bespreken?
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-border pt-16">
        {/* Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="py-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <p className="font-mono text-xs text-muted tracking-widest uppercase">Verstuurd</p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter text-primary mb-4">
                  Bericht ontvangen.
                </h2>
                <p className="text-secondary leading-relaxed max-w-md">
                  Ik neem binnen 24 uur contact met je op. Tot dan!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="font-mono text-xs text-muted tracking-widest uppercase">Naam</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="input-line"
                      placeholder="Jan de Vries"
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="font-mono text-xs text-muted tracking-widest uppercase">E-mail</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      className="input-line"
                      placeholder="jan@bedrijf.nl"
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-company" className="font-mono text-xs text-muted tracking-widest uppercase">Bedrijf</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    className="input-line"
                    placeholder="Bedrijf B.V. (optioneel)"
                    disabled={status === "loading"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="font-mono text-xs text-muted tracking-widest uppercase">Project</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="input-line resize-none"
                    style={{ borderBottom: "1px solid #D9D5CC" }}
                    placeholder="Wat wil je bouwen? Geef een korte omschrijving van het project of de uitdaging."
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xs text-red-400 tracking-wide"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                <div>
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium overflow-hidden hover:bg-accent hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-3.5 h-3.5 border border-background border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        Versturen…
                      </>
                    ) : (
                      <>
                        Verstuur bericht
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Direct</p>
            <a
              href="mailto:hello@zoyare.com"
              className="text-lg text-primary hover:text-accent transition-colors duration-200"
            >
              hello@zoyare.com
            </a>
          </div>

          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Reactietijd</p>
            <p className="text-sm text-secondary leading-relaxed">
              Binnen 24 uur. Voor urgente zaken, stuur een directe mail.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Beschikbaarheid</p>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-primary">Beschikbaar</span>
            </div>
            <p className="text-sm text-secondary leading-relaxed mb-6">
              Zowel kortlopende opdrachten als langdurige samenwerking.
            </p>
            <a
              href="https://cal.eu/zoyare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors duration-200 underline underline-offset-4"
            >
              Direct een gesprek inplannen →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
