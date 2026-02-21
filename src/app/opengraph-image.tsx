import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LGTM — The AI briefing your team won't give you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F2ED",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "4px",
            borderRadius: "2px",
            background: "#8B3A2A",
            marginBottom: "32px",
          }}
        />
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#1A1A1A",
            letterSpacing: "-2px",
          }}
        >
          LGTM
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#525252",
            marginTop: "16px",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          The AI briefing your team won&apos;t give you
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#878787",
            marginTop: "24px",
            letterSpacing: "4px",
            textTransform: "uppercase" as const,
          }}
        >
          By Saheb Singh
        </div>
      </div>
    ),
    { ...size }
  );
}
