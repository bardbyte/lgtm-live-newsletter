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
      type: "chatbot" | "copilot" | "agent" | "pipeline" | "process";
      recommendation: string;
      reasoning: string;
      risk: "Low" | "Medium" | "High";
      color: string;
    };
  }[];
}

const tree: Record<string, TreeNode> = {
  start: {
    id: "start",
    question: "What does your AI system need to do?",
    context:
      "Start with the problem, not the technology. The right architecture follows from the requirements.",
    options: [
      {
        label: "Answer questions from a knowledge base",
        nextId: "kb_stable",
      },
      {
        label: "Take actions in the real world",
        nextId: "action_reversible",
      },
      {
        label: "Multi-step reasoning across systems",
        nextId: "reasoning_deterministic",
      },
    ],
  },
  kb_stable: {
    id: "kb_stable",
    question: "Does the knowledge base change frequently?",
    context:
      "If your answers are stable (product docs, FAQs), a simpler architecture is more reliable and cheaper to maintain.",
    options: [
      {
        label: "No — stable content, rarely updated",
        nextId: null,
        result: {
          type: "chatbot",
          recommendation: "Chatbot with RAG",
          reasoning:
            "Stable knowledge + static retrieval = no need for planning or tool use. A RAG chatbot gives you 90% of the value at 10% of the complexity. Add a human escalation path for queries outside the knowledge base.",
          risk: "Low",
          color: "#22D3EE",
        },
      },
      {
        label: "Yes — policies, prices, or data change weekly+",
        nextId: null,
        result: {
          type: "copilot",
          recommendation: "Copilot with live retrieval",
          reasoning:
            "When the knowledge base is a moving target, you need a human validating answers before they reach customers. The copilot drafts, the human verifies against the latest source of truth. This catches stale-data hallucinations before they cause damage.",
          risk: "Medium",
          color: "#3B82F6",
        },
      },
    ],
  },
  action_reversible: {
    id: "action_reversible",
    question: "Can a wrong action be easily reversed?",
    context:
      "Sending an email can't be unsent. Updating a database record can be rolled back. The reversibility of actions determines your required level of human oversight.",
    options: [
      {
        label: "Yes — actions have undo/rollback",
        nextId: null,
        result: {
          type: "agent",
          recommendation: "Agent with rollback + audit trail",
          reasoning:
            "Reversible actions are your safest entry point for agent autonomy. Implement: (1) audit trail for every action, (2) automatic rollback triggers on anomaly detection, (3) rate limiting on action volume, (4) human review queue for actions above a cost threshold.",
          risk: "Medium",
          color: "#8B5CF6",
        },
      },
      {
        label: "No — actions are permanent or customer-facing",
        nextId: null,
        result: {
          type: "copilot",
          recommendation: "Copilot pattern — human approves every action",
          reasoning:
            "When you can't undo a mistake, you can't afford autonomous execution. Use the copilot pattern: the AI drafts the action, a human approves it. You still get 3-5x throughput improvement without the irreversible risk. Graduate to agent only after 6+ months of copilot data proves reliability.",
          risk: "Low",
          color: "#3B82F6",
        },
      },
    ],
  },
  reasoning_deterministic: {
    id: "reasoning_deterministic",
    question: "Is the process deterministic?",
    context:
      "If the same input always requires the same sequence of steps, you don't need an agent — you need a pipeline. Agents add value only when the path to the goal isn't known in advance.",
    options: [
      {
        label: "Yes — same steps every time, predictable",
        nextId: null,
        result: {
          type: "pipeline",
          recommendation: "Agentic workflow (pipeline), not an agent",
          reasoning:
            "If the steps are predetermined, you're building a pipeline with an LLM at one or two stages — not an agent. This is simpler, cheaper, more reliable, and easier to debug. Don't add agent overhead for a deterministic process. Call it what it is.",
          risk: "Low",
          color: "#71717A",
        },
      },
      {
        label: "No — requires adapting to novel situations",
        nextId: "reasoning_risk",
      },
    ],
  },
  reasoning_risk: {
    id: "reasoning_risk",
    question: "Can you tolerate occasional errors in the reasoning chain?",
    context:
      "Agents make mistakes. They take wrong turns, call the wrong tool, misinterpret results. The question is whether your domain can absorb that.",
    options: [
      {
        label: "Yes — errors are annoying but not catastrophic",
        nextId: null,
        result: {
          type: "agent",
          recommendation: "Agent with guardrails",
          reasoning:
            "You have a legitimate agent use case. Build with: (1) persistent memory, (2) tool access via MCP, (3) confidence thresholds, (4) maximum iteration limits, (5) comprehensive logging, (6) a kill switch. Start with narrow scope and widen gradually.",
          risk: "Medium",
          color: "#8B5CF6",
        },
      },
      {
        label: "No — errors have legal, financial, or safety consequences",
        nextId: null,
        result: {
          type: "copilot",
          recommendation: "Copilot with agent-assisted drafting",
          reasoning:
            "High-stakes reasoning still benefits from AI — but the final decision must be human. Use an agent architecture internally (multi-step reasoning, tool use) but gate every output with human review before it reaches production. Think of it as an agent that whispers to a human, not one that speaks to customers.",
          risk: "Low",
          color: "#3B82F6",
        },
      },
    ],
  },
};

export default function DecisionTree() {
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
        Decision Framework
      </p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        What should you actually build?
      </h2>
      <p className="mt-4 text-base text-muted leading-relaxed">
        The answer isn&apos;t always &ldquo;agents.&rdquo; Walk through these
        questions. Be honest — the right architecture is the simplest one that
        solves your actual problem.
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
                  i === path.length - 1
                    ? "text-foreground"
                    : "text-muted-dark"
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
                  Recommendation
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
