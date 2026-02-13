"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GovernanceQuestion {
  id: number;
  question: string;
  severity: "high" | "critical";
  stat?: string;
  warStory: string;
  technicalControl: string;
}

const questions: GovernanceQuestion[] = [
  {
    id: 1,
    question: "Can your agent spend money?",
    severity: "critical",
    stat: "84% report AI costs hurt gross margins by 6+ pts — Menlo Ventures",
    warStory:
      "A marketing team's AI agent had permission to adjust ad spend based on performance signals. During a brief API latency spike, the agent interpreted slow response times as poor performance and tripled the daily budget on three campaigns simultaneously. $47,000 in 48 hours over a weekend. The team had no spending caps, no anomaly detection, and no weekend alerts.",
    technicalControl:
      "Implement: per-action spending limits, daily/weekly budget caps, anomaly detection on spend velocity (>2x normal rate triggers human review), mandatory cooling-off periods between budget increases, and real-time alerting with on-call escalation. The agentic cost multiplier is real: each ReAct step = another API call. Budget for 5-50 LLM calls per task, not one.",
  },
  {
    id: 2,
    question: "Can your agent access or generate PII?",
    severity: "critical",
    stat: "80%+ of unauthorized AI transactions are internal violations — Gartner",
    warStory:
      "A support agent stored full conversation transcripts — including customer SSNs, account numbers, and medical details — in an unencrypted vector database for 'context continuity.' It worked great for 6 months. Then the database was included in a staging environment backup that was accessible to third-party contractors. The biggest threat isn't hackers — it's your own systems leaking data by design.",
    technicalControl:
      "PII detection and redaction before storage. Encrypted vector stores with access controls. Data retention policies with automatic expiration. Separate memory stores for PII vs. non-PII context. Regular audit of what data the agent persists. GDPR/CCPA right-to-deletion must apply to agent memory stores — most don't.",
  },
  {
    id: 3,
    question: "Does your agent have a kill switch?",
    severity: "critical",
    stat: "Agents fail on multi-step tasks 70% of the time — ASAPP",
    warStory:
      "An agent in a data pipeline hit a malformed API response and entered a retry loop. 50,000 API calls in 2 hours before the team noticed. The third-party API provider rate-limited the entire company account, taking down three other production services that depended on the same provider. One agent's failure cascade took down the whole stack.",
    technicalControl:
      "Circuit breakers: max retries per action (3-5), exponential backoff, per-minute rate limits, and a global kill switch accessible from a dashboard. Dead man's switch: if the agent hasn't reported healthy status in N minutes, auto-pause. Blast radius isolation: separate API credentials per agent. Maximum iteration limits on ReAct loops.",
  },
  {
    id: 4,
    question: "Can every decision be audited?",
    severity: "high",
    stat: "89% have observability but only 37% run online evaluations — LangChain",
    warStory:
      "When the VP asked 'why did the system recommend this action?', the engineering team couldn't produce a trace. The agent had made 14 intermediate reasoning steps, called 3 tools, and referenced 2 memory snapshots. None of it was logged. The recommendation couldn't be explained, justified, or reproduced. Having monitoring is not the same as having auditability.",
    technicalControl:
      "Log every reasoning step, tool call, tool response, and memory access with timestamps. Store the full context window at each decision point. Implement trace IDs that link a final output back through every intermediate step. Build a 'replay' capability that can reproduce any decision given the same inputs. This is different from APM — AI observability is its own discipline.",
  },
  {
    id: 5,
    question: "What happens when the agent is wrong but confident?",
    severity: "critical",
    stat: "45% of AI-generated code fails security standards — Veracode",
    warStory:
      "Hallucination isn't just a chatbot problem. A research agent hallucinated a citation — a plausible-sounding paper that didn't exist — then used that fabricated source to justify a $500K procurement recommendation. The recommendation was approved because 'the AI found supporting evidence.' The evidence was fiction. Confidence ≠ correctness, but humans treat it that way.",
    technicalControl:
      "Confidence calibration: compare stated confidence against actual accuracy over time. Mandatory source verification for claims above a cost threshold. Separate 'generation' from 'verification' — use a second model or retrieval step to fact-check the agent's own outputs before they reach a human. Never let the same model grade its own work.",
  },
  {
    id: 6,
    question: "Does your agent know what it doesn't know?",
    severity: "high",
    stat: "Only 52.4% run offline evals on agent outputs — LangChain",
    warStory:
      "An agent trained on 2023 regulatory data was deployed in 2024. It answered questions about new regulations with fabricated confidence, citing policies that had been superseded 8 months earlier. No one had implemented a knowledge cutoff check because 'the model handles that.' The model doesn't handle that. It just makes things up with the same tone.",
    technicalControl:
      "Knowledge boundary detection: implement explicit cutoff dates, flag queries about topics newer than training data, and require retrieval-augmented answers for time-sensitive domains. Uncertainty quantification: train the agent to output 'I don't know' when retrieval confidence is below threshold. Monitor for semantic drift — answer quality degrades silently.",
  },
  {
    id: 7,
    question: "Who is accountable when the agent fails?",
    severity: "critical",
    stat: "2,000+ 'death by AI' legal claims expected by end of 2026 — Gartner",
    warStory:
      "'The AI did it' is not an answer your board, your regulator, or your customer will accept. A healthcare company deployed an agent that gave incorrect dosage guidance. The question from the FDA wasn't 'what did the AI do?' — it was 'who approved the deployment, what was the validation process, and where is the documentation?' Every agent needs a named human owner.",
    technicalControl:
      "Clear ownership chain: who approved the agent's deployment, who monitors its outputs, who is on-call when it fails. Documented validation: test cases, accuracy benchmarks, edge case analysis, signed off by a named human. Incident response playbook: what happens in the first 15 minutes after an agent failure is detected. Gartner's AI TRiSM framework is a starting point, not a checkbox.",
  },
];

const severityConfig = {
  high: { label: "High", color: "#F97316" },
  critical: { label: "Critical", color: "#EF4444" },
};

export default function GovernanceAudit({
  mode,
}: {
  mode: "executive" | "technical";
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-3">
        Governance Audit
      </p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        7 questions before you deploy an agent.
      </h2>
      <p className="mt-4 text-base text-muted leading-relaxed">
        Gartner expects 80%+ of unauthorized AI transactions to be internal
        violations — not external attacks. The risk is already inside the
        building. If you can&apos;t answer all seven, you&apos;re not ready.
      </p>

      <div className="mt-10 space-y-3">
        {questions.map((q) => {
          const isExpanded = expanded === q.id;
          const sev = severityConfig[q.severity];

          return (
            <div key={q.id}>
              <button
                onClick={() => setExpanded(isExpanded ? null : q.id)}
                className="w-full text-left rounded-xl border border-surface-light hover:border-muted-dark bg-surface/50 p-5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <span className="font-mono text-sm text-muted-dark flex-shrink-0 mt-0.5">
                    {String(q.id).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <div className="flex-1">
                    <span className="text-base font-medium text-foreground leading-snug block">
                      {q.question}
                    </span>
                    {q.stat && (
                      <span className="text-xs text-muted-dark font-mono mt-1 block">
                        {q.stat}
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
                          {q.warStory}
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
                                {q.technicalControl}
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
        className="mt-10 rounded-xl border border-agent/20 bg-agent/5 p-6"
      >
        <p className="text-base text-muted leading-relaxed">
          <strong className="text-foreground">
            The uncomfortable truth:
          </strong>{" "}
          Most organizations jumping to agents don&apos;t have the governance
          infrastructure to handle autonomous AI. The companies that deploy
          agents successfully started with copilots, learned where humans add
          value and where they don&apos;t, and gradually widened the autonomy
          boundary. They earned the right to automate. McKinsey calls it the
          &ldquo;Gen AI Paradox&rdquo; — 80% of companies with agents see no
          EBIT impact. The ones that do spent 70% of their effort on
          people and process, not model selection.
        </p>
      </motion.div>
    </section>
  );
}
