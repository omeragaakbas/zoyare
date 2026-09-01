import { ImageResponse } from "next/og";
import { getPost, getAllPosts } from "@/lib/blog";
import { og, ogFont, ogFonts, OgFullLogo } from "@/lib/og-elements";

export const alt = "Zoyare blog article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Zoyare — field notes on software";
  const category = post?.category ?? "Blog";
  const readTime = post ? `${post.readTime} min read` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: og.bg,
          color: og.ink,
          fontFamily: ogFont.sans,
          borderLeft: `16px solid ${og.accent}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <OgFullLogo height={44} />
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: ogFont.mono,
              color: og.accent,
              fontWeight: 500,
            }}
          >
            {category}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? "54px" : "66px",
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: og.ink,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: ogFont.mono,
            color: og.muted,
            borderTop: `1px solid ${og.border}`,
            paddingTop: "28px",
          }}
        >
          <span>zoyare.com/blog</span>
          <span>{readTime}</span>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts }
  );
}
