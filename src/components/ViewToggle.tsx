"use client";

import { motion } from "framer-motion";

interface ViewToggleProps {
  mode: "executive" | "technical";
  onToggle: (mode: "executive" | "technical") => void;
}

export default function ViewToggle({ mode, onToggle }: ViewToggleProps) {
  return (
    <div className="fixed top-14 left-0 right-0 z-40 border-b border-surface-light/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex items-center gap-1 py-2 font-mono text-xs">
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
            <span className="relative z-10 ml-1 text-muted-dark/50">5-min read</span>
          </button>
          <span className="text-surface-light">|</span>
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
            <span className="relative z-10 ml-1 text-muted-dark/50">deep dive</span>
          </button>
        </div>
      </div>
    </div>
  );
}
