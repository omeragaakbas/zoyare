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
        <footer className="border-t border-border px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Logo variant="mark" height={16} className="text-primary opacity-40" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              © {new Date().getFullYear()}
            </span>
          </div>
          <a
            href="mailto:hello@zoyare.com"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200"
          >
            hello@zoyare.com
          </a>
        </footer>
      </body>
    </html>
  );
}
