// Config for the static kit pages (public/home.html, public/p/*.html), which
// cannot read environment variables themselves. public/site-shell.js reads it.
export const dynamic = "force-static";

export function GET() {
  const config = { gaId: process.env.NEXT_PUBLIC_GA_ID ?? "" };
  return new Response(`window.__ZOYARE=${JSON.stringify(config)};`, {
    headers: { "Content-Type": "application/javascript; charset=utf-8" },
  });
}
