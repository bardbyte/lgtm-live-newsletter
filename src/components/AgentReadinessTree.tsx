"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  id: string;
  question: string;
  context?: string;
  options: {
    label: string;
    nextId: string | null;
    result?: {
      verdict: string;
      recommendation: string;
      reasoning: string;
      risk: "Low" | "Medium" | "High" | "Critical";
      color: string;
    };
  }[];
}

const tree: Record<string, TreeNode> = {
  start: {
    id: "start",
    question: "Can you trace every agent decision back to its reasoning chain?",
    context:
      "89% of teams have observability. Only 37% can actually evaluate if outputs are correct. Monitoring uptime is not the same as monitoring quality.",
    options: [
      {
        label: "Yes — full trace IDs, reasoning logs, tool call records",
        nextId: "eval",
      },
      {
        label: "We have basic logging but can't replay decisions",
        nextId: "observability_first",
      },
      {
        label: "No — we monitor uptime, not decision quality",
        nextId: null,
        result: {
          verdict: "Not Ready",
          recommendation: "Build observability before deploying agents",
          reasoning:
            "You cannot govern what you cannot see. Before any agent deployment, implement: trace IDs linking outputs to full reasoning chains, tool call logging with parameters, and a replay capability that can reproduce any decision. This is not optional infrastructure — it's the foundation everything else depends on. 63% of teams skip this and regret it.",
          risk: "Critical",
          color: "#EF4444",
        },
      },
    ],
  },
  observability_first: {
    id: "observability_first",
    question: "Can you afford 2-4 weeks to build proper observability first?",
    context:
      "Deploying an agent without decision tracing is like shipping code without error logging. You'll only discover problems when customers report them.",
    options: [
      {
        label: "Yes — we can invest in infrastructure first",
        nextId: null,
        result: {
          verdict: "Ready After Infrastructure",
          recommendation:
            "Build observability layer, then deploy with copilot guardrails",
          reasoning:
            "Good call. Build: (1) structured logging for every reasoning step, (2) trace IDs that link final outputs to intermediate steps, (3) a dashboard showing decision distributions and anomalies, (4) automated eval suites that spot-check live outputs. Then deploy in copilot mode first — AI drafts, human approves. Graduate to full agent only after 30 days of clean copilot data.",
          risk: "Medium",
          color: "#3B82F6",
        },
      },
      {
        label: "No — there's pressure to ship now",
        nextId: null,
        result: {
          verdict: "Deploy as Copilot Only",
          recommendation:
            "Ship with human-in-the-loop — it's faster than debugging a blind agent",
          reasoning:
            "Shipping an unobservable agent under time pressure is how you get Klarna's reversal in 6 months. Deploy as a copilot instead: the AI drafts outputs, a human reviews before execution. You still get 3-5x throughput gains, you build the dataset you need for future automation, and you avoid the silent failures that take months to discover. Counter-intuitively, copilot-first is often faster to production value than agent-first.",
          risk: "Low",
          color: "#10B981",
        },
      },
    ],
  },
  eval: {
    id: "eval",
    question:
      "Do you have circuit breakers for runaway loops and cost explosions?",
    context:
      "An agent in a retry loop made 50,000 API calls in 2 hours. Without rate limits, one agent's failure can cascade across your entire infrastructure.",
    options: [
      {
        label: "Yes — rate limits, max iterations, cost caps, kill switch",
        nextId: "human_loop",
      },
      {
        label: "We have some limits but no automated kill switch",
        nextId: null,
        result: {
          verdict: "Almost Ready",
          recommendation:
            "Add circuit breakers and a kill switch before production",
          reasoning:
            "You're close. Add: (1) per-agent rate limits on API calls (hard cap, not soft), (2) maximum iteration count on ReAct loops (5-7 steps is the reliability sweet spot), (3) per-task cost ceiling with automatic termination, (4) a single-click kill switch accessible from a dashboard — not buried in code. (5) Dead man's switch: if the agent doesn't report healthy in N minutes, auto-pause. This takes 1-2 days to implement and prevents the most catastrophic failure mode.",
          risk: "Medium",
          color: "#F59E0B",
        },
      },
    ],
  },
  human_loop: {
    id: "human_loop",
    question: "Is there a human checkpoint for irreversible actions?",
    context:
      "Sending an email can't be unsent. Deleting a record may not be recoverable. Publishing content is permanent. The reversibility of the action determines the required level of human oversight.",
    options: [
      {
        label: "Yes — irreversible actions require human approval",
        nextId: "eval_pipeline",
      },
      {
        label: "No — the agent has full autonomy on all actions",
        nextId: null,
        result: {
          verdict: "Ready With Restrictions",
          recommendation:
            "Gate irreversible actions behind human review immediately",
          reasoning:
            "Full autonomy on irreversible actions is how Air Canada got sued over a chatbot's fabricated bereavement discount. Implement a tiered autonomy model: (1) Reversible, low-cost actions → full automation, (2) Reversible, high-cost actions → automated with audit trail, (3) Irreversible or customer-facing actions → human-in-the-loop. 69% of enterprise agent decisions already include human verification. There's a reason.",
          risk: "High",
          color: "#F97316",
        },
      },
    ],
  },
  eval_pipeline: {
    id: "eval_pipeline",
    question:
      "Do you run automated quality evaluations on live agent outputs?",
    context:
      "Only 37% of teams with agents in production run online evals. The rest discover quality issues from customer complaints, not monitoring.",
    options: [
      {
        label: "Yes — LLM-as-judge, regression tests, drift detection",
        nextId: null,
        result: {
          verdict: "Production Ready",
          recommendation:
            "Deploy with graduated autonomy — you've earned the right to automate",
          reasoning:
            "You have the rare combination: observability, circuit breakers, human oversight on irreversible actions, and automated quality evaluation. Deploy with graduated autonomy: start at 20% automated resolution, monitor quality metrics for 2 weeks, then increase by 10% increments. The companies that deploy agents successfully don't flip a switch — they turn a dial. Your infrastructure supports the dial approach. Use it.",
          risk: "Low",
          color: "#10B981",
        },
      },
      {
        label: "No — we check quality manually or not at all",
        nextId: null,
        result: {
          verdict: "Ready With Eval Gap",
          recommendation:
            "Add automated eval before scaling past pilot — manual review doesn't scale",
          reasoning:
            "You have strong infrastructure but a blind spot on output quality. Manual review works at pilot scale (100 queries/day) but breaks at production scale (10,000+). Build: (1) LLM-as-judge pipeline that evaluates a random sample of outputs against quality criteria, (2) automated regression suite that re-runs edge cases weekly, (3) distribution drift alerts that flag when output patterns shift. Cleanlab's approach to output validation cuts failure rates ~50%. This is the difference between 'agent works' and 'agent works reliably.'",
          risk: "Medium",
          color: "#3B82F6",
        },
      },
    ],
  },
};

export default function AgentReadinessTree() {
  const [path, setPath] = useState<string[]>(["start"]);
  const currentId = path[path.length - 1];
  const currentNode = tree[currentId];
  const [selectedResult, setSelectedResult] = useState<
    (typeof tree.start.options)[0]["result"] | null
  >(null);

  function selectOption(option: (typeof currentNode.options)[0]) {
    if (option.nextId) {
      setPath([...path, option.nextId]);
      setSelectedResult(null);
    } else if (option.result) {
      setSelectedResult(option.result);
    }
  }

  function reset() {
    setPath(["start"]);
    setSelectedResult(null);
  }

  function goBack() {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
      setSelectedResult(null);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-3">
        Readiness Assessment
      </p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        Is your agent actually ready for production?
      </h2>
      <p className="mt-4 text-base text-muted leading-relaxed">
        57% of teams have agents in production. Most shipped without answering
        these questions. Walk through honestly &mdash; the right answer might
        be &ldquo;not yet.&rdquo;
      </p>

      {/* Breadcrumb */}
      {path.length > 1 && (
        <div className="mt-8 flex items-center gap-2 flex-wrap">
          {path.map((nodeId, i) => (
            <span key={nodeId} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="#71717A"
                  strokeWidth="1.5"
                >
                  <path d="M4 2 L8 6 L4 10" />
                </svg>
              )}
              <span
                className={`text-xs font-mono ${
                  i === path.length - 1 ? "text-foreground" : "text-muted-dark"
                }`}
              >
                Q{i + 1}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Question card */}
      <AnimatePresence mode="wait">
        {!selectedResult ? (
          <motion.div
            key={currentId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <div className="rounded-xl border border-surface-light bg-surface/50 p-6">
              <p className="text-xl font-semibold text-foreground leading-snug">
                {currentNode.question}
              </p>
              {currentNode.context && (
                <p className="mt-3 text-sm text-muted-dark leading-relaxed">
                  {currentNode.context}
                </p>
              )}

              <div className="mt-6 space-y-3">
                {currentNode.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(option)}
                    className="w-full text-left rounded-lg border border-surface-light hover:border-muted-dark bg-background/50 hover:bg-surface-light/30 p-4 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full border border-muted-dark group-hover:border-foreground flex items-center justify-center flex-shrink-0 transition-colors">
                        <span className="text-[10px] font-mono text-muted-dark group-hover:text-foreground transition-colors">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                      <span className="text-sm text-muted group-hover:text-foreground transition-colors leading-relaxed">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Back button */}
            {path.length > 1 && (
              <button
                onClick={goBack}
                className="mt-4 flex items-center gap-2 text-sm font-mono text-muted-dark hover:text-foreground transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 3 L5 7 L9 11" />
                </svg>
                Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            {/* Result card */}
            <div
              className="rounded-xl border p-6"
              style={{
                borderColor: `${selectedResult.color}30`,
                backgroundColor: `${selectedResult.color}08`,
              }}
            >
              {/* Result header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: selectedResult.color }}
                />
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: selectedResult.color }}
                >
                  {selectedResult.verdict}
                </span>
                <span
                  className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-mono"
                  style={{
                    color: selectedResult.color,
                    backgroundColor: `${selectedResult.color}15`,
                  }}
                >
                  Risk: {selectedResult.risk}
                </span>
              </div>

              <p className="text-xl font-semibold text-foreground">
                {selectedResult.recommendation}
              </p>

              <p className="mt-4 text-base text-muted leading-relaxed">
                {selectedResult.reasoning}
              </p>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="mt-6 flex items-center gap-2 text-sm font-mono text-muted-dark hover:text-foreground transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 7 C2 4.2 4.2 2 7 2 C9.8 2 12 4.2 12 7 C12 9.8 9.8 12 7 12" />
                <path d="M2 4 L2 7 L5 7" />
              </svg>
              Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
