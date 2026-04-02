import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Zoyare — Software built to scale.",
  description:
    "Zoyare ontwikkelt maatwerk software en mobiele applicaties voor ondernemingen die verder willen dan standaard oplossingen.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Zoyare — Software built to scale.",
    description:
      "Maatwerk software, API-integraties en mobiele applicaties voor ondernemingen.",
    url: "https://zoyare.com",
    siteName: "Zoyare",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <Cursor />
        <ScrollProgress />
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-border px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <Logo variant="mark" height={16} className="text-primary opacity-30" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              Zoyare © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-muted tracking-widest uppercase">Beschikbaar</span>
            </div>
            <a
              href="mailto:hello@zoyare.com"
              className="text-sm text-secondary hover:text-accent transition-colors duration-200"
            >
              hello@zoyare.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
