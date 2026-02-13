"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────── Lightweight diagram primitives ───────── */

function Node({
  label,
  color,
  sublabel,
  mono = true,
}: {
  label: string;
  color: string;
  sublabel?: string;
  mono?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-1"
    >
      <div
        className={`rounded-lg border px-3 py-2 text-xs ${
          mono ? "font-mono" : "font-sans"
        }`}
        style={{
          borderColor: `${color}40`,
          backgroundColor: `${color}10`,
          boxShadow: `0 0 20px ${color}15`,
        }}
      >
        <span style={{ color }}>{label}</span>
      </div>
      {sublabel && (
        <span className="text-[10px] text-muted-dark font-mono">
          {sublabel}
        </span>
      )}
    </motion.div>
  );
}

function Arrow({
  color = "#71717A",
  direction = "right",
}: {
  color?: string;
  direction?: "right" | "down";
}) {
  const isDown = direction === "down";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center ${
        isDown ? "py-0.5" : "px-0.5"
      }`}
    >
      <svg
        width={isDown ? "12" : "24"}
        height={isDown ? "18" : "12"}
        viewBox={isDown ? "0 0 12 18" : "0 0 24 12"}
        fill="none"
      >
        {isDown ? (
          <path
            d="M6 0 L6 13 M2 10 L6 15 L10 10"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M0 6 L18 6 M15 3 L20 6 L15 9"
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

function LoopArrow({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1.5 text-xs font-mono"
      style={{ color }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      >
        <path
          d="M14 5 C15.5 7 15.5 11 14 13 L12 11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 13 C2.5 11 2.5 7 4 5 L6 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      loops until goal met
    </motion.div>
  );
}

/* ───────── 4 Diagrams ───────── */

function WorkflowDiagram() {
  return (
    <motion.div
      key="workflow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-5"
    >
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Node label="Input" color="#71717A" sublabel="fixed" />
        <Arrow color="#71717A" />
        <Node label="Step 1" color="#71717A" sublabel="fixed logic" />
        <Arrow color="#71717A" />
        <Node label="LLM" color="#F59E0B" sublabel="single pass" />
        <Arrow color="#71717A" />
        <Node label="Step 2" color="#71717A" sublabel="fixed logic" />
        <Arrow color="#71717A" />
        <Node label="Output" color="#71717A" sublabel="fixed" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border px-4 py-2.5 text-center"
        style={{
          borderColor: "#EF444440",
          backgroundColor: "#EF444410",
        }}
      >
        <span className="text-xs font-mono" style={{ color: "#EF4444" }}>
          No feedback loop · No planning · Not an agent
        </span>
      </motion.div>
      <p className="text-[10px] text-muted-dark font-mono text-center max-w-xs">
        An LLM in a pipeline ≠ an agent. Gartner: only ~130 of thousands of
        &ldquo;agent&rdquo; vendors are real.
      </p>
    </motion.div>
  );
}

function ChatbotDiagram() {
  return (
    <motion.div
      key="chatbot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-5"
    >
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Node label="Input" color="#22D3EE" sublabel="string" />
        <Arrow color="#22D3EE" />
        <Node label="LLM" color="#22D3EE" sublabel="single pass" />
        <Arrow color="#22D3EE" />
        <Node label="Output" color="#22D3EE" sublabel="string" />
      </div>
      <p className="font-mono text-xs text-muted-dark text-center">
        f(prompt) → response
      </p>
      <div className="flex gap-4 text-[10px] text-muted-dark font-mono flex-wrap justify-center">
        <span>○ Stateless</span>
        <span>○ No tools</span>
        <span>○ ~$0.001/query</span>
      </div>
    </motion.div>
  );
}

function CopilotDiagram() {
  return (
    <motion.div
      key="copilot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-4"
    >
      <Node
        label="Context Window"
        color="#3B82F6"
        sublabel="code, docs, data"
      />
      <Arrow color="#3B82F6" direction="down" />
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Node label="User Input" color="#3B82F6" />
        <Arrow color="#3B82F6" />
        <Node label="LLM" color="#3B82F6" sublabel="context-aware" />
        <Arrow color="#3B82F6" />
        <Node label="Suggestion" color="#3B82F6" />
      </div>
      <Arrow color="#F59E0B" direction="down" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 rounded-full border px-3 py-1.5"
        style={{
          borderColor: "#F59E0B40",
          backgroundColor: "#F59E0B10",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.5"
        >
          <circle cx="7" cy="7" r="6" />
          <path d="M5 7 L6.5 8.5 L9 5.5" />
        </svg>
        <span className="text-xs font-mono" style={{ color: "#F59E0B" }}>
          Human decides · ~$0.01/query
        </span>
      </motion.div>
    </motion.div>
  );
}

function AgentDiagram() {
  return (
    <motion.div
      key="agent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-4"
    >
      <Node label="Goal" color="#8B5CF6" sublabel="human-defined" />
      <Arrow color="#8B5CF6" direction="down" />
      <div
        className="relative rounded-xl border p-5 w-full max-w-sm"
        style={{
          borderColor: "#8B5CF640",
          backgroundColor: "#8B5CF608",
        }}
      >
        <span
          className="absolute -top-2.5 left-3 px-2 text-[10px] font-mono"
          style={{ color: "#8B5CF6", backgroundColor: "var(--surface)" }}
        >
          ReAct Loop
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Node label="Reason" color="#8B5CF6" sublabel="think" />
          <Arrow color="#8B5CF6" />
          <Node label="Act" color="#8B5CF6" sublabel="tool call" />
          <Arrow color="#8B5CF6" />
          <Node label="Observe" color="#8B5CF6" sublabel="result" />
        </div>
        <div className="mt-3 flex justify-center">
          <LoopArrow color="#8B5CF6" />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <div
          className="rounded-lg border px-3 py-2 text-center"
          style={{ borderColor: "#10B98140", backgroundColor: "#10B98110" }}
        >
          <span className="text-xs font-mono" style={{ color: "#10B981" }}>
            Tools / MCP
          </span>
        </div>
        <div
          className="rounded-lg border px-3 py-2 text-center"
          style={{ borderColor: "#F59E0B40", backgroundColor: "#F59E0B10" }}
        >
          <span className="text-xs font-mono" style={{ color: "#F59E0B" }}>
            Memory · ~$0.10-1.00/task
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────── Step content (REORDERED: Trap first) ───────── */

interface Step {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  executive: string[];
  technical: string[];
}

const steps: Step[] = [
  {
    id: "workflow",
    badge: "The Trap",
    badgeColor: "#EF4444",
    title: "Most 'AI Agents' Aren't Agents",
    executive: [
      "Let's start with the uncomfortable truth: most 'AI agents' in production today are agentic workflows — deterministic pipelines with an LLM at one or two steps. Gartner estimates only ~130 of thousands of 'agentic AI' vendors are real. The rest are agent-washing.",
      "They look like agents in demos. They're marketed as agents. But they can't adapt to novel situations, don't maintain state across sessions, and follow pre-defined orchestration paths. Deloitte found only 11% of enterprises have agents in production — and of those, Menlo Ventures found only 16% are truly agentic.",
      "This isn't pedantic. The distinction determines your architecture, your risk model, your governance requirements, and your cost structure. Get it wrong, and you'll build chatbot-level guardrails for agent-level autonomy — or agent-level overhead for a problem a simple pipeline could solve.",
    ],
    technical: [
      "The test: Can your system handle a goal it wasn't explicitly programmed for? Can it decide which tools to use and in what order? Can it recover from a failed step by trying an alternative approach? If the answer to all three is no, you have an agentic workflow, not an agent.",
      "This is fine — most problems don't need true agents. But your governance model needs to match your actual architecture, not your marketing. Gartner predicts 40%+ of agentic AI projects will be canceled by 2027 due to escalating costs, unclear value, or inadequate risk controls.",
    ],
  },
  {
    id: "chatbot",
    badge: "Chatbot",
    badgeColor: "#22D3EE",
    title: "A Stateless Function",
    executive: [
      "A chatbot is a pure function: input in, output out. No memory between calls. No tools. No planning. Gmail's Smart Reply, customer service FAQ bots, most 'AI-powered' support widgets — all chatbots. Used by billions.",
      "This isn't a criticism. The question is whether your problem requires more than a stateless text transformation. If not, you've found the cheapest, lowest-risk architecture. At ~$0.001/query, chatbots are 100-1000x cheaper than agents.",
    ],
    technical: [
      "Architecture: a single LLM.complete(system_prompt + input) call. No session state unless you manually prepend conversation history. The ceiling is what a single inference pass can produce. That's a known, bounded cost and a known, bounded risk.",
    ],
  },
  {
    id: "copilot",
    badge: "Copilot",
    badgeColor: "#3B82F6",
    title: "Human-in-the-Loop",
    executive: [
      "Add a context window and a human checkpoint. A copilot suggests, a human decides. GitHub Copilot doesn't push code — a developer hits Tab or Escape. The blast radius of a bad suggestion is zero until a human approves it.",
      "McKinsey reports ~70% of Fortune 500 use Microsoft 365 Copilot. But here's the Gen AI Paradox: horizontal copilots deliver diffuse, hard-to-measure gains. The real value is in vertical, domain-specific copilots — and 90% of those are stuck in pilot mode.",
    ],
    technical: [
      "Context-aware single-pass inference. The model receives the working state (file, cursor, recent edits, ~20 neighboring files). No execution loop — it produces output and stops. The feedback loop runs through the human. This is why copilots are safe to deploy aggressively: bounded autonomy.",
    ],
  },
  {
    id: "agent",
    badge: "Agent",
    badgeColor: "#8B5CF6",
    title: "Autonomous Reasoning Loop",
    executive: [
      "Remove the human from the loop. Give the system persistent memory, tool access via MCP (Model Context Protocol), and multi-step planning. It reasons about a goal, acts, observes results, adjusts — a ReAct loop.",
      "This is where things get powerful and dangerous. ASAPP found agents fail on multi-step tasks ~70% of the time. Inference costs multiply (5-50 LLM calls per task). And autonomous systems that can take real-world actions require fundamentally different governance than suggestion engines.",
      "The companies deploying agents successfully started with copilots, learned where humans add value and where they don't, and gradually widened the autonomy boundary. They earned the right to automate.",
    ],
    technical: [
      "ReAct pattern (Yao et al., 2022): interleave reasoning traces with actions. Each step: generate thought → select tool → invoke via MCP → receive output → update plan. Memory persists across steps and sessions. Tool access via Model Context Protocol — the USB-C of AI.",
      "Real agent frameworks: LangGraph for stateful graphs, CrewAI for multi-agent coordination, AutoGen for conversation-based workflows with human-in-the-loop. Real agent products: Claude Code, Cursor, Factory's Droids. Sequoia says capability doubles every ~7 months.",
    ],
  },
];

const diagrams = [
  WorkflowDiagram,
  ChatbotDiagram,
  CopilotDiagram,
  AgentDiagram,
];

/* ───────── Main component ───────── */

export default function ScrollySection({
  mode,
}: {
  mode: "executive" | "technical";
}) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) setActiveStep(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    stepRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const ActiveDiagram = diagrams[activeStep];

  return (
    <section>
      {/* Section header */}
      <div className="mx-auto max-w-3xl px-6 pb-12">
        <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-3">
          The Architecture Spectrum
        </p>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Four things that get called &ldquo;AI&rdquo; — only one is an agent.
        </h2>
        <p className="mt-3 text-sm text-muted-dark">
          Gartner, 2025: AI Agents at Peak of Inflated Expectations. GenAI
          already in the Trough of Disillusionment.
        </p>
      </div>

      {/* Scrollytelling layout */}
      <div className="lg:flex">
        {/* Sticky diagram */}
        <div className="hidden lg:flex lg:w-[42%] lg:sticky lg:top-0 lg:h-screen items-center justify-center px-8">
          <div className="w-full max-w-md rounded-xl border border-surface-light bg-surface/50 p-6">
            {/* Step indicator dots */}
            <div className="flex gap-2 mb-6 justify-center">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeStep === i ? "24px" : "6px",
                    backgroundColor:
                      activeStep === i ? s.badgeColor : "#27272A",
                  }}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <ActiveDiagram key={steps[activeStep].id} />
            </AnimatePresence>
          </div>
        </div>

        {/* Narrative steps */}
        <div className="lg:w-[58%]">
          {steps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="min-h-[70vh] lg:min-h-screen flex items-center px-6 lg:px-12 py-16"
            >
              <div
                className={`max-w-xl transition-opacity duration-500 ${
                  activeStep === i ? "opacity-100" : "opacity-20"
                }`}
              >
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: step.badgeColor }}
                  />
                  <span
                    className="font-mono text-xs tracking-widest uppercase"
                    style={{ color: step.badgeColor }}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl mb-6">
                  {step.title}
                </h3>

                {/* Mobile diagram */}
                <div className="lg:hidden mb-8 rounded-xl border border-surface-light bg-surface/50 p-5">
                  {i === 0 && <WorkflowDiagram />}
                  {i === 1 && <ChatbotDiagram />}
                  {i === 2 && <CopilotDiagram />}
                  {i === 3 && <AgentDiagram />}
                </div>

                {/* Executive content */}
                <div className="space-y-4">
                  {step.executive.map((para, j) => (
                    <p
                      key={j}
                      className="text-base text-muted leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Technical deep dive */}
                <AnimatePresence>
                  {mode === "technical" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-6 rounded-xl border p-5"
                        style={{
                          borderColor: `${step.badgeColor}20`,
                          backgroundColor: `${step.badgeColor}08`,
                        }}
                      >
                        <p
                          className="font-mono text-xs mb-3"
                          style={{ color: step.badgeColor }}
                        >
                          // Technical Detail
                        </p>
                        {step.technical.map((para, j) => (
                          <p
                            key={j}
                            className="text-sm text-muted leading-relaxed mt-2 first:mt-0"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
