import { ImageResponse } from "next/og";
import { getArticle } from "@/config/articles";

export const runtime = "edge";
export const alt = "LGTM article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  const title = article?.title ?? "LGTM";
  const subtitle = article?.subtitle ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F2ED",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "4px",
            borderRadius: "2px",
            background: "#8B3A2A",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#1A1A1A",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: "24px",
              color: "#525252",
              marginTop: "24px",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {subtitle.length > 120
              ? subtitle.slice(0, 120) + "\u2026"
              : subtitle}
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#8B3A2A",
              letterSpacing: "6px",
              textTransform: "uppercase" as const,
            }}
          >
            LGTM
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#878787",
            }}
          >
            &middot; By Saheb Singh
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
