"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

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
        setErrorMsg(json.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("No connection. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <div className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Contact</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          Discuss a
          <br />
          <span className="font-display">project?</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-border pt-16">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <m.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="py-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <p className="font-mono text-xs text-muted tracking-widest uppercase">Sent</p>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter text-primary mb-4">
                  Message received.
                </h2>
                <p className="text-secondary leading-relaxed max-w-md">
                  I&apos;ll get back to you within 24 hours. Talk soon!
                </p>
              </m.div>
            ) : (
              <m.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="font-mono text-xs text-muted tracking-widest uppercase">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="input-line"
                      placeholder="John Smith"
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="font-mono text-xs text-muted tracking-widest uppercase">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      className="input-line"
                      placeholder="john@company.com"
                      disabled={status === "loading"}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-company" className="font-mono text-xs text-muted tracking-widest uppercase">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    className="input-line"
                    placeholder="Company Ltd. (optional)"
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
                    placeholder="What do you want to build? Give a short description of the project or challenge."
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <m.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xs text-red-400 tracking-wide"
                  >
                    {errorMsg}
                  </m.p>
                )}

                <div>
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium overflow-hidden hover:bg-accent hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-3.5 h-3.5 border border-background border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </div>
              </m.form>
            )}
          </AnimatePresence>
        </div>

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
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Response time</p>
            <p className="text-sm text-secondary leading-relaxed">
              Within 24 hours. For urgent matters, send a direct email.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Availability</p>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-primary">Available</span>
            </div>
            <p className="text-sm text-secondary leading-relaxed mb-6">
              Both short-term projects and long-term collaboration.
            </p>
            <a
              href="https://cal.eu/zoyare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors duration-200 underline underline-offset-4"
            >
              Schedule a call directly →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
