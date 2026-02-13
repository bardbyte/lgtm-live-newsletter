"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineStep {
  week: string;
  title: string;
  description: string;
  technical?: string;
  severity: "green" | "yellow" | "orange" | "red";
}

const timelineSteps: TimelineStep[] = [
  {
    week: "Week 1",
    title: "The Build",
    description:
      "Engineering team at a Series C fintech builds an 'AI agent' for customer support escalation. The system reads tickets, queries internal docs, and drafts responses. Leadership calls it their 'autonomous support agent' on the earnings call.",
    technical:
      "Architecture: RAG pipeline with GPT-4, vector DB for knowledge base, auto-send enabled on responses with >0.85 confidence score. No human-in-the-loop. No escalation triggers for out-of-distribution queries.",
    severity: "green",
  },
  {
    week: "Week 3",
    title: "The Green Light",
    description:
      "Internal testing shows 94% accuracy on historical tickets. The team celebrates. The VP of Product approves production deployment. \"We're ahead of every competitor on AI.\"",
    technical:
      "The test set was drawn from the same distribution as the training data — common ticket types with well-documented answers. Edge cases, policy changes, and novel scenarios were not represented. Classic evaluation bias.",
    severity: "green",
  },
  {
    week: "Week 6",
    title: "The First Crack",
    description:
      "The system encounters a ticket about a new fee structure not yet in the knowledge base. Instead of escalating to a human, it confidently drafts a response based on a similar-sounding but different policy. The customer receives a refund promise that doesn't exist.",
    technical:
      "The confidence score was 0.91 — above threshold. The model hallucinated a plausible-sounding policy by pattern-matching against similar fee structures in the vector DB. No semantic similarity threshold for 'close but different' scenarios.",
    severity: "yellow",
  },
  {
    week: "Week 8",
    title: "The Cascade",
    description:
      "23 customers have now received incorrect policy information. Three have been promised refunds the company can't honor. Legal is involved. The VP of Engineering gets a 2am Slack message from the CEO.",
    technical:
      "The failure was silent — no alerts, no anomaly detection on response patterns. The error was discovered when a customer service manager manually reviewed tickets and noticed responses that contradicted current policy.",
    severity: "orange",
  },
  {
    week: "Week 12",
    title: "The Bill",
    description:
      "Total exposure: $2.1M in potential refund obligations. The 'agent' is rolled back to a copilot pattern — same LLM, same knowledge base, but now a human reviews every response before it sends. Throughput drops 60%. Accuracy goes to 99.7%.",
    technical:
      "The fix was architectural, not model-level. Adding human-in-the-loop, confidence thresholds with escalation, knowledge base freshness checks, and an audit trail for all automated responses. The model was never the problem — the governance was.",
    severity: "red",
  },
];

const severityColors = {
  green: "#10B981",
  yellow: "#F59E0B",
  orange: "#F97316",
  red: "#EF4444",
};

export default function WarStoryTimeline({
  mode,
}: {
  mode: "executive" | "technical";
}) {
  const [activeStep, setActiveStep] = useState(0);
  const step = timelineSteps[activeStep];
  const color = severityColors[step.severity];

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-3">
        War Story
      </p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        The $2.1M &ldquo;Agent&rdquo; That Was Really a Chatbot
      </h2>
      <p className="mt-4 text-base text-muted leading-relaxed">
        A real scenario. Anonymized details, real architecture decisions, real
        consequences. This is what happens when you deploy agent-level autonomy
        with chatbot-level governance.
      </p>

      {/* Timeline progress */}
      <div className="mt-10 flex items-center gap-1">
        {timelineSteps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className="group flex-1 flex flex-col items-center gap-2"
          >
            <div
              className="h-1.5 w-full rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i <= activeStep ? severityColors[s.severity] : "#27272A",
                opacity: i <= activeStep ? 1 : 0.3,
              }}
            />
            <span
              className={`text-[10px] font-mono transition-colors ${
                i === activeStep ? "text-foreground" : "text-muted-dark"
              }`}
            >
              {s.week}
            </span>
          </button>
        ))}
      </div>

      {/* Active step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <div
            className="rounded-xl border p-6"
            style={{
              borderColor: `${color}30`,
              backgroundColor: `${color}08`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-mono text-sm" style={{ color }}>
                {step.week}
              </span>
              <span className="text-lg font-semibold text-foreground">
                {step.title}
              </span>
            </div>

            {/* Description */}
            <p className="text-base text-muted leading-relaxed">
              {step.description}
            </p>

            {/* Technical root cause */}
            <AnimatePresence>
              {mode === "technical" && step.technical && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-lg bg-background/50 border border-surface-light p-4">
                    <p className="font-mono text-xs text-muted-dark mb-2">
                      // Root Cause Analysis
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.technical}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="flex items-center gap-2 text-sm font-mono text-muted-dark hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-dark transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 4 L6 8 L10 12" />
          </svg>
          Previous
        </button>
        <span className="text-xs font-mono text-muted-dark">
          {activeStep + 1} / {timelineSteps.length}
        </span>
        <button
          onClick={() =>
            setActiveStep(
              Math.min(timelineSteps.length - 1, activeStep + 1)
            )
          }
          disabled={activeStep === timelineSteps.length - 1}
          className="flex items-center gap-2 text-sm font-mono text-muted-dark hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-dark transition-colors"
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 4 L10 8 L6 12" />
          </svg>
        </button>
      </div>

      {/* Post-mortem (visible after last step) */}
      <AnimatePresence>
        {activeStep === timelineSteps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 rounded-xl border border-surface-light bg-surface/50 p-6"
          >
            <p className="font-mono text-xs text-amber mb-3">
              // Post-Mortem
            </p>
            <p className="text-base text-muted leading-relaxed">
              The system had{" "}
              <strong className="text-foreground">
                agent-level autonomy
              </strong>{" "}
              (it could send responses without approval) but{" "}
              <strong className="text-foreground">
                chatbot-level governance
              </strong>{" "}
              (no confidence thresholds, no escalation triggers, no
              human-in-the-loop for edge cases, no audit trail).
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              The architecture diagram said &ldquo;agent.&rdquo; The governance
              model said &ldquo;chatbot.&rdquo; The $2.1M gap is what that
              mismatch costs.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
