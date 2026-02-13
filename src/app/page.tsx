"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import ViewToggle from "@/components/ViewToggle";
import ScrollySection from "@/components/ScrollySection";
import WarStoryTimeline from "@/components/WarStoryTimeline";
import DecisionTree from "@/components/DecisionTree";
import GovernanceAudit from "@/components/GovernanceAudit";

export default function Home() {
  const [mode, setMode] = useState<"executive" | "technical">("executive");

  return (
    <main className="relative min-h-screen">
      <ViewToggle mode={mode} onToggle={setMode} />

      {/* ──────────── HERO ──────────── */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <FadeIn delay={0.1} direction="none">
          <p className="mb-6 font-mono text-xs tracking-widest text-muted-dark uppercase">
            LGTM &middot; Week 1
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Most &ldquo;AI Agents&rdquo; in Production
            <br />
            <span className="text-muted-dark">
              Are Just Chatbots with Extra Steps
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            Gartner predicts 40%+ of agentic AI projects will be canceled by
            2027. Only 16% of deployed &ldquo;agents&rdquo; are truly agentic.
            Here&apos;s why the distinction matters — and what to build instead.
          </p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted-dark">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-chatbot" />
              Chatbot
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-copilot" />
              Copilot
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-agent" />
              Agent
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.7}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mt-16 text-muted-dark"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 3 L10 17 M5 12 L10 17 L15 12" />
            </svg>
          </motion.div>
        </FadeIn>
      </section>

      {/* ──────────── THE HOOK ──────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <FadeIn>
          <p className="text-2xl font-semibold leading-snug md:text-3xl">
            88% of AI pilots never reach production.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-2 text-2xl font-semibold leading-snug md:text-3xl">
            95% deliver{" "}
            <span className="text-amber">no measurable ROI.</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mt-2 text-2xl font-semibold leading-snug md:text-3xl">
            42% were{" "}
            <span className="text-muted-dark">abandoned in 2025.</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <p className="mt-10 text-lg text-muted leading-relaxed">
            The #1 cause isn&apos;t bad models. It&apos;s wrong architecture.
            Teams deploy agent-level complexity for chatbot-level problems,
            copilot-level governance for agent-level autonomy, and wonder why
            production breaks.
          </p>
        </FadeIn>
        <FadeIn delay={0.6}>
          <p className="mt-4 text-base text-muted-dark leading-relaxed font-mono">
            Sources: MIT Project NANDA, CIO Magazine, S&P Global 2025
          </p>
        </FadeIn>
      </section>

      {/* ──────────── ARCHITECTURE SPECTRUM (Scrollytelling) ──────────── */}
      <ScrollySection mode={mode} />

      {/* ──────────── WAR STORY ──────────── */}
      <WarStoryTimeline mode={mode} />

      {/* ──────────── DECISION FRAMEWORK ──────────── */}
      <DecisionTree />

      {/* ──────────── GOVERNANCE AUDIT ──────────── */}
      <GovernanceAudit mode={mode} />

      {/* ──────────── CTA ──────────── */}
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <FadeIn>
          <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-6">
            LGTM
          </p>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            One visual explainer. Every two weeks.
          </h2>
          <p className="mt-4 text-muted text-lg leading-relaxed max-w-lg mx-auto">
            What the consulting decks don&apos;t tell you. First-principles
            explainers on the architecture, cost, and governance decisions
            shaping enterprise AI in 2026.
          </p>
        </FadeIn>

        {/* Next topic teaser */}
        <FadeIn delay={0.15}>
          <div className="mt-8 rounded-xl border border-surface-light bg-surface/30 p-5 max-w-md mx-auto">
            <p className="font-mono text-[10px] tracking-widest text-muted-dark uppercase mb-2">
              Coming in 2 weeks
            </p>
            <p className="text-base font-semibold text-foreground">
              The 95% Failure Rate
            </p>
            <p className="mt-1 text-sm text-muted">
              Why AI pilots don&apos;t become products — and the 5 structural
              gaps nobody budgets for.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://www.linkedin.com/in/ssg"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Follow on LinkedIn
            </a>
            <a
              href="https://learn.lgtm.live"
              className="rounded-lg border border-surface-light px-6 py-3 text-sm font-medium text-muted hover:text-foreground hover:border-muted-dark transition-colors"
            >
              Explore LGTM Learn
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-16 pt-8 border-t border-surface-light">
            <p className="text-sm text-muted">
              By <strong className="text-foreground">Saheb Singh</strong>
            </p>
            <p className="mt-1 text-xs text-muted-dark">
              Data Architect &amp; AI/ML Engineer &middot; Building in the
              trenches, not the boardroom
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
