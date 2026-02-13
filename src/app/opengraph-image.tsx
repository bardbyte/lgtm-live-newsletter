import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LGTM — AI concepts, explained visually";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
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
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22D3EE",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#3B82F6",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#8B5CF6",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#FAFAFA",
            letterSpacing: "-2px",
          }}
        >
          LGTM
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#A1A1AA",
            marginTop: "16px",
          }}
        >
          AI concepts, explained visually
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#71717A",
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
