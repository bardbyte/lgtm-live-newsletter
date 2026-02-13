"use client";

import { motion } from "framer-motion";

interface ViewToggleProps {
  mode: "executive" | "technical";
  onToggle: (mode: "executive" | "technical") => void;
}

export default function ViewToggle({ mode, onToggle }: ViewToggleProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full bg-surface/80 backdrop-blur-md border border-surface-light p-1 font-mono text-xs shadow-lg shadow-black/20">
      <button
        onClick={() => onToggle("executive")}
        className={`relative rounded-full px-3 py-1.5 transition-colors ${
          mode === "executive" ? "text-foreground" : "text-muted-dark"
        }`}
      >
        {mode === "executive" && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 rounded-full bg-surface-light"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">Executive</span>
      </button>
      <button
        onClick={() => onToggle("technical")}
        className={`relative rounded-full px-3 py-1.5 transition-colors ${
          mode === "technical" ? "text-foreground" : "text-muted-dark"
        }`}
      >
        {mode === "technical" && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 rounded-full bg-surface-light"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">Technical</span>
      </button>
    </div>
  );
}
