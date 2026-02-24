"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FailureMode {
  id: number;
  mode: string;
  severity: "high" | "critical";
  stat?: string;
  warStory: string;
  technicalControl: string;
}

const failureModes: FailureMode[] = [
  {
    id: 1,
    mode: "Hallucination acts on itself",
    severity: "critical",
    stat: "95% per-step accuracy → 60% over 10 steps (compounding error)",
    warStory:
      "A research agent was tasked with finding supporting evidence for a procurement decision. It hallucinated a citation — a plausible-sounding paper from a real journal with a fabricated DOI — then used that fabricated source to justify a $500K vendor recommendation. The recommendation was approved because 'the AI found supporting evidence.' Three weeks later, a junior analyst tried to read the paper and discovered it didn't exist. The vendor contract had already been signed.",
    technicalControl:
      "Separate generation from verification. Never let the same model that produces a claim also verify it. Implement: (1) citation verification against real databases (Semantic Scholar, CrossRef), (2) a second model or retrieval step that fact-checks claims before they feed into downstream decisions, (3) mandatory source links for any claim above a cost threshold. Chain-of-verification prompting reduces hallucination rates by 30-50% in benchmarks.",
  },
  {
    id: 2,
    mode: "Tool called with wrong parameters",
    severity: "critical",
    stat: "43% of MCP implementations have command injection vulnerabilities",
    warStory:
      "Supabase's MCP server had a data leak vulnerability — agents could read data across tenant boundaries through the standard MCP tool interface. The agent didn't 'hack' anything. It used the tool exactly as the MCP spec allowed. The problem was that the tool's permission model was more permissive than anyone realized. The agent found data paths that human developers hadn't considered because humans don't systematically enumerate every possible query.",
    technicalControl:
      "Implement tool-level sandboxing independent of agent-level permissions. Every MCP tool call should be validated against: (1) parameter schema — reject malformed inputs before execution, (2) allowlisted operations — only permit explicitly approved actions, not everything the API supports, (3) output filtering — redact sensitive data from tool responses before they enter the agent's context. Rate-limit destructive operations (DELETE, UPDATE) to 1 per minute with confirmation.",
  },
  {
    id: 3,
    mode: "Agent solves the wrong problem",
    severity: "high",
    stat: "41-86.7% failure rate in multi-agent systems — depends on task complexity",
    warStory:
      "A multi-agent system for financial analysis was asked to 'evaluate the risk of expanding into the European market.' By step 8 of 12, the system had drifted to analyzing European regulatory compliance for a specific product that wasn't part of the original scope. The final report was thorough, well-structured, and answered a question nobody asked. The VP who requested it didn't notice the drift because the report looked professional and contained real data.",
    technicalControl:
      "Inject the original goal verbatim into every reasoning step — not just the first one. Implement goal-alignment checkpoints at step N/3 and 2N/3 that compare current working objective against the original specification. Use a separate 'judge' model that scores alignment between intermediate outputs and the original goal. Set maximum chain length (5-7 steps) — beyond this, goal drift becomes statistically likely. For longer tasks, decompose into sub-goals with explicit alignment checks between them.",
  },
  {
    id: 4,
    mode: "Corrupted memory poisons future decisions",
    severity: "high",
    stat: "Persistent memory = persistent errors. No TTL = no recovery.",
    warStory:
      "A customer support agent stored a misunderstood policy as 'verified fact' in its persistent memory after a single interaction. For the next 3 months, it referenced that incorrect policy in 847 subsequent conversations. Each conversation reinforced the error — the agent 'learned' that the wrong answer worked because customers didn't always push back. When the error was finally caught, the team had to audit 847 transcripts to assess damage and manually purge the corrupted memory entries.",
    technicalControl:
      "Never store LLM outputs as 'facts' in persistent memory without verification against a ground-truth source. Implement: (1) TTL (time-to-live) on all memory entries — force re-verification after N days, (2) confidence scores on memories with automatic expiration below threshold, (3) provenance tracking — every memory entry links to its source, (4) periodic memory audits that compare stored 'facts' against current knowledge base. Treat agent memory like a cache, not a database.",
  },
  {
    id: 5,
    mode: "High confidence on wrong answers",
    severity: "critical",
    stat: "Air Canada lost a lawsuit over a chatbot's 'confident' fabrication",
    warStory:
      "Air Canada's customer service chatbot confidently told a customer about a bereavement fare discount — a policy that didn't exist. When the customer booked at full price and later discovered the discount was fabricated, they sued. Air Canada argued 'the chatbot is a separate legal entity' responsible for its own accuracy. The tribunal ruled that Air Canada is responsible for all information on its website, including AI-generated content. The airline paid damages. The precedent: you own your agent's mistakes.",
    technicalControl:
      "Confidence calibration: track stated confidence vs. actual accuracy over time and adjust thresholds dynamically. Implement epistemic humility triggers: (1) if the query is about policies, prices, or time-sensitive data, force retrieval verification, (2) if confidence is high but retrieval similarity is low, flag for human review, (3) never auto-send responses about financial commitments, legal obligations, or medical advice. The legal principle is settled: you cannot disclaim liability by blaming the AI.",
  },
  {
    id: 6,
    mode: "One failure cascades across systems",
    severity: "critical",
    stat: "One agent's retry loop took down 3 production services",
    warStory:
      "An agent in a data pipeline hit a malformed API response and entered an exponential retry loop. 50,000 API calls in 2 hours. The third-party provider rate-limited the entire company account — not just the agent's requests, the whole account. Three other production services that shared the same API credentials went down simultaneously. A single agent's retry logic cascaded into a company-wide outage that lasted 4 hours and affected 12,000 users.",
    technicalControl:
      "Blast radius isolation: (1) separate API credentials per agent — never share credentials across services, (2) circuit breakers with exponential backoff and jitter, (3) per-agent resource quotas (API calls, compute, storage) that can't exceed a hard cap, (4) dead man's switch — if no healthy heartbeat in N minutes, auto-kill the agent and alert on-call, (5) chaos engineering: deliberately inject failures to test that circuit breakers work before production. The retry loop is the agent equivalent of a fork bomb.",
  },
];

const severityConfig = {
  high: { label: "High", color: "#F97316" },
  critical: { label: "Critical", color: "#EF4444" },
};

export default function FailureTaxonomy({
  mode,
}: {
  mode: "executive" | "technical";
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-3">
        Failure Taxonomy
      </p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        6 ways your agent will break. And what to build before it does.
      </h2>
      <p className="mt-4 text-base text-muted leading-relaxed">
        Microsoft&rsquo;s research team cataloged these. Academic papers
        validated them. Your production system will encounter them. The question
        is whether you&rsquo;ve built the controls before or after the
        incident.
      </p>

      <div className="mt-10 space-y-3">
        {failureModes.map((fm) => {
          const isExpanded = expanded === fm.id;
          const sev = severityConfig[fm.severity];

          return (
            <div key={fm.id}>
              <button
                onClick={() => setExpanded(isExpanded ? null : fm.id)}
                className="w-full text-left rounded-xl border border-surface-light hover:border-muted-dark bg-surface/50 p-5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <span className="font-mono text-sm text-muted-dark flex-shrink-0 mt-0.5">
                    {String(fm.id).padStart(2, "0")}
                  </span>

                  {/* Mode */}
                  <div className="flex-1">
                    <span className="text-base font-medium text-foreground leading-snug block">
                      {fm.mode}
                    </span>
                    {fm.stat && (
                      <span className="text-xs text-muted-dark font-mono mt-1 block">
                        {fm.stat}
                      </span>
                    )}
                  </div>

                  {/* Severity + expand */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-mono"
                      style={{
                        color: sev.color,
                        backgroundColor: `${sev.color}15`,
                      }}
                    >
                      {sev.label}
                    </span>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#71717A"
                      strokeWidth="1.5"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M4 6 L8 10 L12 6" />
                    </motion.svg>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2 ml-9">
                      {/* War story */}
                      <div
                        className="rounded-lg border p-4"
                        style={{
                          borderColor: `${sev.color}20`,
                          backgroundColor: `${sev.color}06`,
                        }}
                      >
                        <p
                          className="font-mono text-xs mb-2"
                          style={{ color: sev.color }}
                        >
                          // What happened
                        </p>
                        <p className="text-sm text-muted leading-relaxed">
                          {fm.warStory}
                        </p>
                      </div>

                      {/* Technical control (shown in technical mode) */}
                      <AnimatePresence>
                        {mode === "technical" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 rounded-lg border border-surface-light bg-background/50 p-4">
                              <p className="font-mono text-xs text-emerald mb-2">
                                // How to prevent it
                              </p>
                              <p className="text-sm text-muted leading-relaxed">
                                {fm.technicalControl}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Summary callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mt-10 rounded-xl border border-red-500/20 bg-red-500/5 p-6"
      >
        <p className="text-base text-muted leading-relaxed">
          <strong className="text-foreground">
            The cross-silo insight:
          </strong>{" "}
          Aviation solved this 30 years ago. Crew Resource Management (CRM)
          reduced fatal accidents by 50% — not with better planes, but with
          better human-machine interaction protocols. Checklists. Structured
          handoffs. Graduated autonomy. Mandatory callouts before irreversible
          actions. The agentic AI industry is re-learning what aviation already
          knew: autonomy without structured oversight isn&rsquo;t innovation.
          It&rsquo;s negligence.
        </p>
      </motion.div>
    </section>
  );
}
