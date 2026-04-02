"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog",      label: "Blog" },
  { href: "/about",     label: "Over" },
  { href: "/contact",   label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <Link
        href="/"
        className="text-primary hover:text-accent transition-colors duration-200"
        aria-label="Zoyare home"
      >
        <Logo variant="full" height={20} animate />
      </Link>

      <ul className="flex items-center gap-8">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href} className="relative flex flex-col items-center gap-1.5">
              <Link
                href={href}
                className={`text-sm transition-colors duration-200 ${
                  active ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                {label}
              </Link>
              {active && (
                <span className="absolute -bottom-[22px] w-1 h-1 rounded-full bg-accent" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
