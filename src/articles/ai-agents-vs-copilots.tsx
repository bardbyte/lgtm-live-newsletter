"use client";

import FadeIn from "@/components/FadeIn";
import EmailCapture from "@/components/EmailCapture";
import ScrollySection from "@/components/ScrollySection";
import WarStoryTimeline from "@/components/WarStoryTimeline";
import DecisionTree from "@/components/DecisionTree";
import GovernanceAudit from "@/components/GovernanceAudit";

interface Props {
  mode: "executive" | "technical";
}

export default function AIAgentsVsCopilots({ mode }: Props) {
  return (
    <>
      {/* ──────── HERO — COMPRESSED, ONE STAT ──────── */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <FadeIn delay={0.1}>
          <h1 className="max-w-5xl text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            Most &ldquo;AI Agents&rdquo;
            <br />
            <span className="text-muted-dark">
              Are Just Chatbots
              <br className="hidden md:block" /> with Extra Steps
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="mt-8 text-xl md:text-2xl font-medium leading-snug max-w-lg text-muted">
            <span className="text-accent">88%</span> of AI pilots never reach production.
            <br />
            The #1 cause isn&apos;t bad models. It&apos;s wrong architecture.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-6 text-sm text-muted-dark">
            By{" "}
            <strong className="text-foreground font-medium">Saheb Singh</strong>{" "}
            &middot; Enterprise AI, American Express. Ex-Google. CMU CS.
          </p>
        </FadeIn>
      </section>

      {/* ──────── THE SPECTRUM — STRAIGHT TO THE MEAT ──────── */}
      <ScrollySection mode={mode} />

      {/* ──────── THE PROOF — WAR STORY (moved up, no gate) ──────── */}
      <section className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="border-t border-surface-light pt-16">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
              What happens when you get it wrong
            </p>
          </div>
        </FadeIn>
        <WarStoryTimeline mode={mode} />
      </section>

      {/* ──────── EMAIL CAPTURE — AFTER VALUE DELIVERED ──────── */}
      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <div className="text-center">
          <FadeIn>
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-6">
              Next issue
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl">
              The Agentic AI Quality Crisis
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-md mx-auto">
              57% of teams have agents in production. Only 37% evaluate if
              their outputs are correct. The quality gap nobody talks about.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 flex justify-center">
              <EmailCapture />
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted-dark/60 tracking-wide">
              Free &middot; Every other Tuesday &middot; 5-min read
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ──────── DECISION FRAMEWORK ──────── */}
      <section className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="border-t border-surface-light pt-16">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
              So what should you actually build?
            </p>
          </div>
        </FadeIn>
        <DecisionTree />
      </section>

      {/* ──────── GOVERNANCE AUDIT ──────── */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <GovernanceAudit mode={mode} />
      </section>
    </>
  );
}
