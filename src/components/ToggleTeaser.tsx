"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const preview = {
  executive: {
    label: "Executive",
    sublabel: "5-min read",
    text: "AI agents act autonomously. Copilots assist. Chatbots respond. Most enterprises are building the wrong one — here's how to decide in 5 minutes.",
  },
  technical: {
    label: "Technical",
    sublabel: "deep dive",
    text: "Agents use ReAct loops with tool-calling APIs and retry budgets. Copilots embed via LSP with context-window constraints. Your architecture choice determines latency SLAs, error propagation, and infra cost at scale.",
  },
};

export default function ToggleTeaser() {
  const [mode, setMode] = useState<"executive" | "technical">("executive");
  const [hasInteracted, setHasInteracted] = useState(false);
  const current = preview[mode];
  const other = mode === "executive" ? "technical" : "executive";

  function toggle(m: "executive" | "technical") {
    setMode(m);
    if (!hasInteracted) setHasInteracted(true);
  }

  return (
    <div className="mt-6">
      {/* Pill + hint */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5 rounded-full bg-surface/80 border border-surface-light p-0.5 font-mono text-[11px] cursor-pointer select-none">
          <button
            onClick={() => toggle("executive")}
            className={`relative rounded-full px-2.5 py-1 transition-colors ${
              mode === "executive" ? "text-foreground" : "text-muted-dark hover:text-muted"
            }`}
          >
            {mode === "executive" && (
              <motion.div
                layoutId="teaser-pill"
                className="absolute inset-0 rounded-full bg-surface-light"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            )}
            <span className="relative z-10">Executive</span>
          </button>
          <button
            onClick={() => toggle("technical")}
            className={`relative rounded-full px-2.5 py-1 transition-colors ${
              mode === "technical" ? "text-foreground" : "text-muted-dark hover:text-muted"
            }`}
          >
            {mode === "technical" && (
              <motion.div
                layoutId="teaser-pill"
                className="absolute inset-0 rounded-full bg-surface-light"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            )}
            <span className="relative z-10">Technical</span>
          </button>
        </div>

        {/* Hint — disappears after first click */}
        <AnimatePresence>
          {!hasInteracted && (
            <motion.p
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] text-muted-dark/60 font-mono"
            >
              &larr; try it
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Live preview card */}
      <motion.div
        initial={false}
        animate={{
          height: "auto",
          borderColor: hasInteracted
            ? "var(--accent)"
            : "var(--surface-light)",
        }}
        transition={{ duration: 0.4 }}
        className="mt-3 rounded-lg border bg-surface/30 overflow-hidden"
      >
        <div className="px-4 py-3">
          {/* Mode label */}
          <div className="flex items-center gap-2 mb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase"
              >
                {current.label} mode &middot; {current.sublabel}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Morphing text */}
          <div className="relative min-h-[3.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={mode}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className={`text-sm leading-relaxed ${
                  mode === "executive"
                    ? "text-muted"
                    : "text-muted font-mono text-[13px]"
                }`}
              >
                {current.text}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Nudge to try the other mode */}
          {hasInteracted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => toggle(other)}
              className="mt-2 font-mono text-[10px] text-accent/50 hover:text-accent transition-colors"
            >
              now try {preview[other].label.toLowerCase()} &rarr;
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Tagline */}
      <p className="mt-2 text-xs text-muted-dark/70">
        Every article in two modes. Same insight, your depth.
      </p>
    </div>
  );
}
