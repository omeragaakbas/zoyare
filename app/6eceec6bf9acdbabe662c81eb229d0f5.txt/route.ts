import { INDEXNOW_KEY } from "@/lib/indexnow";

// IndexNow ownership proof. The file name must equal the key, so this folder name and
// INDEXNOW_KEY have to stay in sync — changing one without the other silently breaks
// every submission with a 403.
export const dynamic = "force-static";

export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
