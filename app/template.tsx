/**
 * Re-mounts on every navigation, so the page eases in each time. Pure CSS
 * (`.page-enter` in globals.css): it is part of the server HTML and plays from
 * the first paint instead of waiting for the JS bundle to hydrate.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
