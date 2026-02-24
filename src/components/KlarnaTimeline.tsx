"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineStep {
  period: string;
  title: string;
  description: string;
  technical?: string;
  severity: "green" | "yellow" | "orange" | "red";
  stat?: string;
}

const timelineSteps: TimelineStep[] = [
  {
    period: "Dec 2023",
    title: "The Bet",
    description:
      "Klarna deploys an AI customer service agent powered by OpenAI. The ambition is massive: fully autonomous customer support at scale. The agent handles returns, refunds, FAQ, and complaint routing. No human-in-the-loop for routine queries. Leadership frames it as the future of customer service.",
    technical:
      "Architecture: OpenAI GPT-4 with custom fine-tuning on Klarna's support corpus. Direct integration with order management, refund, and escalation systems. Auto-resolution enabled for queries matching known patterns above a confidence threshold.",
    severity: "green",
    stat: "Launch",
  },
  {
    period: "Feb 2024",
    title: "The Victory Lap",
    description:
      "Klarna announces the AI agent handled 2.3 million conversations in its first month — the equivalent of 700 full-time agents. Resolution time drops from 11 minutes to 2 minutes. CEO Sebastian Siemiatkowski calls it 'a revolution in customer service.' Klarna stock discourse explodes. Every enterprise CTO takes notice.",
    technical:
      "Key metrics reported: 2/3 of all customer service chats handled autonomously. Average resolution time: 2 minutes (vs 11 minutes with humans). Customer satisfaction scores reported as 'on par' with human agents. No breakdown provided for edge cases, escalation rates, or false resolution rates.",
    severity: "green",
    stat: "2.3M conversations",
  },
  {
    period: "Mid 2024",
    title: "The Cracks",
    description:
      "Customer satisfaction scores quietly decline. The AI resolves queries fast but not always correctly. Refund disputes increase. Complex cases that need nuance get cookie-cutter responses. The 'on par with humans' claim starts looking like an average that hides a bimodal distribution — great on simple queries, terrible on anything ambiguous.",
    technical:
      "The bimodal problem: AI performance on FAQ-type queries (60% of volume) was genuinely excellent. But performance on edge cases, policy exceptions, emotionally charged interactions, and multi-issue tickets was significantly worse than human agents. The average masked the distribution.",
    severity: "yellow",
    stat: "CSAT declining",
  },
  {
    period: "Late 2024",
    title: "The Reversal",
    description:
      "Klarna begins quietly rehiring human agents. The company that cut 700 human positions starts rebuilding its support team. CEO acknowledges that AI quality 'isn't where it needs to be' for complex interactions. The market narrative shifts from 'AI replaces humans' to 'AI augments humans.'",
    technical:
      "The failure wasn't the model — it was the autonomy model. Full automation works for the predictable 60%. The other 40% needs human judgment, empathy, and policy flexibility that current models can't reliably provide. The fix: copilot architecture for complex queries, full automation only for pattern-matched simple requests.",
    severity: "orange",
    stat: "Rehiring humans",
  },
  {
    period: "2025",
    title: "The Lesson",
    description:
      "Klarna's story becomes the canonical example of the agent quality gap. The technology worked. The economics looked incredible on paper. But quality at the margins — the 30-40% of interactions that aren't simple pattern matches — is where autonomous AI breaks down. The companies that learned from Klarna deployed copilots first, then selectively automated.",
    technical:
      "The pattern that emerged: deploy agents for the 60% of queries that are deterministic (order status, return labels, FAQ). Deploy copilots for the 40% that require judgment (disputes, exceptions, complaints). Monitor the boundary continuously — it shifts as the model improves. Never set it and forget it.",
    severity: "red",
    stat: "Copilot > Agent (for now)",
  },
];

const severityColors = {
  green: "#10B981",
  yellow: "#F59E0B",
  orange: "#F97316",
  red: "#EF4444",
};

export default function KlarnaTimeline({
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
        Klarna&rsquo;s 700-Agent Bet &mdash; and What It Actually Proved
      </h2>
      <p className="mt-4 text-base text-muted leading-relaxed">
        The most-cited AI deployment success story of 2024 became the most
        instructive failure of 2025. Not because the AI was bad &mdash; because
        the autonomy boundary was wrong.
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
              {s.period}
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
                {step.period}
              </span>
              <span className="text-lg font-semibold text-foreground">
                {step.title}
              </span>
              {step.stat && (
                <span
                  className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-mono hidden sm:inline-block"
                  style={{
                    color,
                    backgroundColor: `${color}15`,
                  }}
                >
                  {step.stat}
                </span>
              )}
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
                      // Architecture Analysis
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

      {/* Post-mortem */}
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
              // The Pattern
            </p>
            <p className="text-base text-muted leading-relaxed">
              Klarna didn&rsquo;t fail because AI doesn&rsquo;t work. They
              failed because they set the{" "}
              <strong className="text-foreground">autonomy boundary</strong> at
              100% when the reliable boundary was 60%. The 40% gap between
              &ldquo;works in aggregate metrics&rdquo; and &ldquo;works on
              every query&rdquo; is where agent quality breaks down.
            </p>
            <p className="mt-3 text-base text-muted leading-relaxed">
              The playbook that emerged:{" "}
              <strong className="text-foreground">
                Copilot first, agent second.
              </strong>{" "}
              Earn the right to automate by proving where humans don&rsquo;t
              add value &mdash; then remove them surgically, not wholesale.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
