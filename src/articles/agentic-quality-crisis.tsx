"use client";

import FadeIn from "@/components/FadeIn";
import EmailCapture from "@/components/EmailCapture";
import AgentFailureSpectrum from "@/components/AgentFailureSpectrum";
import KlarnaTimeline from "@/components/KlarnaTimeline";
import AgentReadinessTree from "@/components/AgentReadinessTree";
import FailureTaxonomy from "@/components/FailureTaxonomy";

interface Props {
  mode: "executive" | "technical";
}

export default function AgenticQualityCrisis({ mode }: Props) {
  return (
    <>
      {/* ──────── HERO ──────── */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <FadeIn delay={0.1}>
          <h1 className="max-w-5xl text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            Your Agent Works.
            <br />
            <span className="text-muted-dark">
              You Just Can&rsquo;t Prove It.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="mt-8 text-xl md:text-2xl font-medium leading-snug max-w-lg text-muted">
            <span className="text-accent">57%</span> of teams have agents in
            production.
            <br />
            Only <span className="text-accent">37%</span> evaluate if their
            outputs are correct.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-6 text-sm text-muted-dark">
            By{" "}
            <strong className="text-foreground font-medium">
              Saheb Singh
            </strong>{" "}
            &middot; Enterprise AI, American Express. Ex-Google. CMU CS.
          </p>
        </FadeIn>
      </section>

      {/* ──────── THE FAILURE SPECTRUM — SCROLLYTELLING ──────── */}
      <AgentFailureSpectrum mode={mode} />

      {/* ──────── WAR STORY — KLARNA ──────── */}
      <section className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="border-t border-surface-light pt-16">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
              When aggregate metrics hide the truth
            </p>
          </div>
        </FadeIn>
        <KlarnaTimeline mode={mode} />
      </section>

      {/* ──────── EMAIL CAPTURE — AFTER VALUE DELIVERED ──────── */}
      <section className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <div className="text-center">
          <FadeIn>
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-6">
              Next issue
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl">
              Coming Soon
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-md mx-auto">
              The next deep dive is in the works. Subscribe to get it the
              moment it drops.
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

      {/* ──────── READINESS ASSESSMENT — DECISION TREE ──────── */}
      <section className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="border-t border-surface-light pt-16">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
              Before you ship
            </p>
          </div>
        </FadeIn>
        <AgentReadinessTree />
      </section>

      {/* ──────── FAILURE TAXONOMY — ACCORDION ──────── */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <FailureTaxonomy mode={mode} />
      </section>
    </>
  );
}
