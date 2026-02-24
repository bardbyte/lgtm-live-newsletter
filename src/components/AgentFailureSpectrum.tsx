"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────── Diagram primitives ───────── */

function LoopNode({
  label,
  sublabel,
  color,
  failed = false,
  pulse = false,
}: {
  label: string;
  sublabel?: string;
  color: string;
  failed?: boolean;
  pulse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-1"
    >
      <motion.div
        animate={
          pulse
            ? {
                boxShadow: [
                  `0 0 0px ${color}00`,
                  `0 0 20px ${color}60`,
                  `0 0 0px ${color}00`,
                ],
              }
            : {}
        }
        transition={pulse ? { duration: 2, repeat: Infinity } : {}}
        className="rounded-lg border px-3 py-2 text-xs font-mono relative"
        style={{
          borderColor: failed ? "#EF444480" : `${color}40`,
          backgroundColor: failed ? "#EF444415" : `${color}10`,
        }}
      >
        <span style={{ color: failed ? "#EF4444" : color }}>{label}</span>
        {failed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-red-500 flex items-center justify-center"
          >
            <span className="text-[8px] text-white font-bold">!</span>
          </motion.div>
        )}
      </motion.div>
      {sublabel && (
        <span
          className="text-[10px] font-mono"
          style={{ color: failed ? "#EF444480" : "#71717A" }}
        >
          {sublabel}
        </span>
      )}
    </motion.div>
  );
}

function Arrow({
  color = "#71717A",
  failed = false,
}: {
  color?: string;
  failed?: boolean;
}) {
  const c = failed ? "#EF4444" : color;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: failed ? 0.9 : 0.7 }}
      className="px-0.5 flex items-center"
    >
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <path
          d="M0 6 L18 6 M15 3 L20 6 L15 9"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={failed ? "4 3" : "none"}
        />
      </svg>
    </motion.div>
  );
}

function DownArrow({
  color = "#71717A",
  failed = false,
}: {
  color?: string;
  failed?: boolean;
}) {
  const c = failed ? "#EF4444" : color;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      className="py-0.5 flex justify-center"
    >
      <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
        <path
          d="M6 0 L6 13 M2 10 L6 15 L10 10"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={failed ? "4 3" : "none"}
        />
      </svg>
    </motion.div>
  );
}

/* ───────── 4 Failure Diagrams ───────── */

function HallucinationDiagram() {
  return (
    <motion.div
      key="hallucination"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <LoopNode label="Goal" color="#8B5CF6" sublabel="well-defined" />
      <DownArrow color="#8B5CF6" />
      <div
        className="relative rounded-xl border p-5 w-full max-w-sm"
        style={{ borderColor: "#8B5CF640", backgroundColor: "#8B5CF608" }}
      >
        <span
          className="absolute -top-2.5 left-3 px-2 text-[10px] font-mono"
          style={{ color: "#8B5CF6", backgroundColor: "var(--surface)" }}
        >
          ReAct Loop
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <LoopNode label="Reason" color="#8B5CF6" sublabel="think" />
          <Arrow color="#8B5CF6" />
          <LoopNode label="Act" color="#8B5CF6" sublabel="tool call" />
          <Arrow color="#8B5CF6" failed />
          <LoopNode
            label="Observe"
            color="#EF4444"
            sublabel="hallucinated"
            failed
            pulse
          />
        </div>
      </div>
      <DownArrow color="#EF4444" failed />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border px-4 py-2.5 text-center"
        style={{ borderColor: "#EF444440", backgroundColor: "#EF444410" }}
      >
        <span className="text-xs font-mono" style={{ color: "#EF4444" }}>
          Agent acts on its own hallucination &middot; Confidence: 0.94
        </span>
      </motion.div>
    </motion.div>
  );
}

function ToolMisfireDiagram() {
  return (
    <motion.div
      key="tool-misfire"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <LoopNode label="Goal" color="#8B5CF6" sublabel="well-defined" />
      <DownArrow color="#8B5CF6" />
      <div
        className="relative rounded-xl border p-5 w-full max-w-sm"
        style={{ borderColor: "#8B5CF640", backgroundColor: "#8B5CF608" }}
      >
        <span
          className="absolute -top-2.5 left-3 px-2 text-[10px] font-mono"
          style={{ color: "#8B5CF6", backgroundColor: "var(--surface)" }}
        >
          ReAct Loop
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <LoopNode label="Reason" color="#8B5CF6" sublabel="correct" />
          <Arrow color="#8B5CF6" />
          <LoopNode
            label="Act"
            color="#EF4444"
            sublabel="wrong params"
            failed
            pulse
          />
          <Arrow color="#EF4444" failed />
          <LoopNode label="Observe" color="#F97316" sublabel="bad data" />
        </div>
      </div>
      <DownArrow color="#F97316" />
      <div className="flex gap-3 flex-wrap justify-center">
        <div
          className="rounded-lg border px-3 py-2 text-center"
          style={{ borderColor: "#EF444440", backgroundColor: "#EF444410" }}
        >
          <span className="text-xs font-mono" style={{ color: "#EF4444" }}>
            DELETE instead of GET
          </span>
        </div>
        <div
          className="rounded-lg border px-3 py-2 text-center"
          style={{ borderColor: "#F9731640", backgroundColor: "#F9731610" }}
        >
          <span className="text-xs font-mono" style={{ color: "#F97316" }}>
            43% of MCP have injection flaws
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function GoalDriftDiagram() {
  return (
    <motion.div
      key="goal-drift"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-4">
        <LoopNode label="Original Goal" color="#8B5CF6" sublabel="intended" />
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-dark font-mono text-xs"
        >
          ...drifts...
        </motion.div>
        <LoopNode
          label="Mutated Goal"
          color="#EF4444"
          sublabel="step 7 of 12"
          failed
          pulse
        />
      </div>
      <DownArrow color="#EF4444" failed />
      <div
        className="relative rounded-xl border p-5 w-full max-w-sm"
        style={{ borderColor: "#EF444430", backgroundColor: "#EF444408" }}
      >
        <span
          className="absolute -top-2.5 left-3 px-2 text-[10px] font-mono"
          style={{ color: "#EF4444", backgroundColor: "var(--surface)" }}
        >
          Corrupted Loop
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <LoopNode label="Reason" color="#F97316" sublabel="off-track" />
          <Arrow color="#F97316" />
          <LoopNode label="Act" color="#F97316" sublabel="wrong tool" />
          <Arrow color="#F97316" />
          <LoopNode label="Observe" color="#F97316" sublabel="irrelevant" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg border px-4 py-2.5 text-center"
        style={{ borderColor: "#EF444430", backgroundColor: "#EF444408" }}
      >
        <span className="text-xs font-mono" style={{ color: "#EF4444" }}>
          Multi-agent systems: 14 failure modes identified
        </span>
      </motion.div>
    </motion.div>
  );
}

function SilentFailureDiagram() {
  return (
    <motion.div
      key="silent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <LoopNode label="Goal" color="#8B5CF6" sublabel="defined" />
      <DownArrow color="#8B5CF6" />
      <div
        className="relative rounded-xl border p-5 w-full max-w-sm"
        style={{ borderColor: "#8B5CF640", backgroundColor: "#8B5CF608" }}
      >
        <span
          className="absolute -top-2.5 left-3 px-2 text-[10px] font-mono"
          style={{ color: "#10B981", backgroundColor: "var(--surface)" }}
        >
          Looks healthy
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <LoopNode label="Reason" color="#10B981" sublabel="✓" />
          <Arrow color="#10B981" />
          <LoopNode label="Act" color="#10B981" sublabel="✓" />
          <Arrow color="#10B981" />
          <LoopNode label="Observe" color="#10B981" sublabel="✓" />
        </div>
      </div>
      <DownArrow color="#10B981" />
      <LoopNode label="Output" color="#10B981" sublabel="looks correct" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border-2 border-dashed px-5 py-3 text-center"
        style={{ borderColor: "#EF444460" }}
      >
        <p className="text-xs font-mono" style={{ color: "#EF4444" }}>
          No monitoring &middot; No eval &middot; No human check
        </p>
        <p
          className="text-[10px] font-mono mt-1"
          style={{ color: "#EF444480" }}
        >
          Only 37% run online evaluations &mdash; LangChain 2025
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ───────── Step content ───────── */

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
    id: "hallucination",
    badge: "Failure Mode 1",
    badgeColor: "#EF4444",
    title: "The Hallucination Cascade",
    executive: [
      "Chatbots hallucinate and a human catches it. Agents hallucinate and then act on it. This is the fundamental difference: when an autonomous system generates false information at step 3 of a 12-step chain, every subsequent step builds on fiction.",
      "Gemini's code agent generated 693 lines of fabricated code that looked syntactically perfect, passed its own internal checks, and would have shipped to production. The agent was confident. The code was fiction. No alarm fired.",
      "This isn't a model problem — it's an architecture problem. Single-pass chatbot hallucinations are annoying. Multi-step agent hallucinations are compounding errors with real-world consequences.",
    ],
    technical: [
      "The mathematical reality: if each step has 95% accuracy and you chain 10 steps, end-to-end accuracy drops to 60%. At 90% per step: 35%. The compounding error rate of autonomous multi-step systems makes single-step accuracy metrics meaningless.",
      "Mitigation: separate generation from verification. Use a second model (or retrieval step) to fact-check each intermediate output before it feeds into the next step. Never let the same model grade its own work. Implement output validators between every tool call.",
    ],
  },
  {
    id: "tool-misfire",
    badge: "Failure Mode 2",
    badgeColor: "#F97316",
    title: "The Tool Misfire",
    executive: [
      "MCP (Model Context Protocol) hit 97 million monthly SDK downloads. It's the USB-C of AI — a universal standard for connecting agents to tools. But 43% of MCP implementations have command injection vulnerabilities.",
      "Supabase's MCP server had a flaw that let agents read data they shouldn't have access to. Not a theoretical risk — a shipping product with a data leak built into the tool interface. The agent didn't hack anything. It used the tool exactly as designed. The design was broken.",
      "Tool misuse isn't always a security flaw. Sometimes the agent calls the right tool with wrong parameters. DELETE instead of GET. Production database instead of staging. The tool works perfectly — on the wrong target.",
    ],
    technical: [
      "Three categories of tool failure: (1) Parameter injection — the model generates malicious or incorrect parameters. 43% of MCP servers vulnerable. (2) Scope violation — the tool has broader permissions than the agent should have. (3) Sequence errors — correct tools called in wrong order.",
      "Fix: implement tool-level permissions separate from agent-level permissions. Validate every parameter against a schema before execution. Use allowlists, not denylists. Rate-limit destructive operations. Log every tool invocation with full parameter traces.",
    ],
  },
  {
    id: "goal-drift",
    badge: "Failure Mode 3",
    badgeColor: "#F59E0B",
    title: "Goal Drift",
    executive: [
      "Academic research identified 14 distinct failure modes in multi-agent systems. The subtlest: goal drift. Over 7-12 steps, the agent's working objective subtly mutates from what you asked for. Not wrong — adjacent. Close enough to look right, far enough to be useless.",
      "In a real-world test, multi-agent systems failed 41-86.7% of the time depending on task complexity. The failures weren't dramatic crashes. They were quiet deviations — the agent solving a slightly different problem than the one it was given.",
      "This is why Gartner predicts 40%+ of agentic AI projects will be canceled by 2027. Not because agents can't work — because the gap between 'works in demos' and 'works reliably at scale' is larger than most organizations expect.",
    ],
    technical: [
      "Goal drift happens because each reasoning step reinterprets the objective through the lens of the most recent context. After 7+ steps, the original intent signal is diluted by accumulated context from intermediate steps.",
      "Mitigation: inject the original goal into every reasoning step (not just step 1). Implement goal-alignment checks at step N/2 and step N-1. Use a separate 'judge' model that compares intermediate outputs against the original specification. Set maximum chain length limits — most reliable agents cap at 5-7 steps.",
    ],
  },
  {
    id: "silent",
    badge: "Failure Mode 4",
    badgeColor: "#DC2626",
    title: "The Silent Failure",
    executive: [
      "89% of teams with agents in production have observability. Only 37% run online evaluations. Only 52% run offline evals. Translation: most teams can see their agent running but can't tell if it's running correctly.",
      "The LangChain 2025 survey of 1,300 AI professionals found quality is the #1 barrier to production — cited by 32% of respondents. Not cost. Not latency. Not security. Quality. The agent works, ships output, and nobody knows if the output is right until a customer complains.",
      "Air Canada learned this when their chatbot promised a bereavement discount that didn't exist. The system ran for months. No monitoring caught the fabricated policy. A customer sued. The airline lost.",
    ],
    technical: [
      "The observability gap: teams instrument for uptime (is the agent responding?) but not for correctness (is the response right?). LLM-as-judge evaluations, automated regression testing on agent outputs, and continuous accuracy benchmarking are the missing layer.",
      "Build: (1) trace IDs linking every output to its full reasoning chain, (2) automated eval suites that run on a sample of live outputs, (3) drift detection that alerts when output distributions shift, (4) human review queues for outputs above a risk threshold. Cleanlab's output validation approach cuts failure rates ~50%.",
    ],
  },
];

const diagrams = [
  HallucinationDiagram,
  ToolMisfireDiagram,
  GoalDriftDiagram,
  SilentFailureDiagram,
];

/* ───────── Main component ───────── */

export default function AgentFailureSpectrum({
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
          The Failure Spectrum
        </p>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Four ways agents fail &mdash; and why you won&rsquo;t see it coming.
        </h2>
        <p className="mt-3 text-sm text-muted-dark">
          LangChain 2025: Quality is the #1 barrier. 32% of teams cite it. Not
          cost. Not latency. Quality.
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
                  {i === 0 && <HallucinationDiagram />}
                  {i === 1 && <ToolMisfireDiagram />}
                  {i === 2 && <GoalDriftDiagram />}
                  {i === 3 && <SilentFailureDiagram />}
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
