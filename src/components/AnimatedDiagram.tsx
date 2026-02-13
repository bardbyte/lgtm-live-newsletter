"use client";

import { motion } from "framer-motion";

interface NodeProps {
  label: string;
  color?: string;
  delay?: number;
  sublabel?: string;
  mono?: boolean;
}

export function DiagramNode({
  label,
  color = "#3B82F6",
  delay = 0,
  sublabel,
  mono = false,
}: NodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col items-center gap-1"
    >
      <div
        className={`rounded-lg border px-4 py-2.5 text-sm ${mono ? "font-mono" : "font-sans"}`}
        style={{
          borderColor: `${color}40`,
          backgroundColor: `${color}10`,
          boxShadow: `0 0 20px ${color}15`,
        }}
      >
        <span style={{ color }}>{label}</span>
      </div>
      {sublabel && (
        <span className="text-xs text-muted-dark font-mono">{sublabel}</span>
      )}
    </motion.div>
  );
}

export function DiagramArrow({
  delay = 0,
  color = "#71717A",
  direction = "right",
}: {
  delay?: number;
  color?: string;
  direction?: "right" | "down";
}) {
  const isDown = direction === "down";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: "-40px" }}
      className={`flex items-center justify-center ${isDown ? "py-1" : "px-1"}`}
    >
      <svg
        width={isDown ? "16" : "32"}
        height={isDown ? "24" : "16"}
        viewBox={isDown ? "0 0 16 24" : "0 0 32 16"}
        fill="none"
      >
        {isDown ? (
          <path
            d="M8 0 L8 18 M3 14 L8 20 L13 14"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M0 8 L24 8 M20 4 L26 8 L20 12"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </motion.div>
  );
}

export function DiagramContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-surface-light bg-surface/50 p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
