import { ImageResponse } from "next/og";
import { projects } from "@/lib/content";
import { og, OgLogoMark } from "@/lib/og-elements";

export const alt = "Zoyare case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  const title = project?.title ?? "Zoyare — selected work";
  const client = project ? `${project.client} — ${project.category}` : "Portfolio";
  const stack = project?.stack.slice(0, 4) ?? [];

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
          backgroundColor: og.ink,
          color: og.bg,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <OgLogoMark size={48} />
            <span
              style={{
                fontSize: "22px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#B8B4AC",
                fontWeight: 500,
              }}
            >
              Zoyare — Case study
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              fontSize: "22px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: og.accent,
              fontWeight: 500,
            }}
          >
            {client}
          </span>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 40 ? "62px" : "76px",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: og.bg,
              maxWidth: "1020px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #3A3833",
            paddingTop: "28px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8A8680",
            }}
          >
            zoyare.com/portfolio
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            {stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "18px",
                  color: "#B8B4AC",
                  border: "1px solid #3A3833",
                  padding: "6px 14px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
