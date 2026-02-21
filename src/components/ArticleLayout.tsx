"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ViewToggle from "@/components/ViewToggle";
import EmailCapture from "@/components/EmailCapture";
import FadeIn from "@/components/FadeIn";
import type { ArticleMeta } from "@/config/articles";

interface ArticleLayoutProps {
  meta: ArticleMeta;
  Component: ComponentType<{ mode: "executive" | "technical" }>;
}

function trackShare(article: string, method: string) {
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).plausible) {
    (window as unknown as Record<string, (...args: unknown[]) => void>).plausible("Share", {
      props: { article, method },
    });
  }
}

function ShareButton({ meta }: { meta: ArticleMeta }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: meta.title, url });
        trackShare(meta.slug, "native-share");
      } catch {
        // User cancelled share — not an error
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare(meta.slug, "copy-link");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="mt-4 font-mono text-sm text-accent hover:text-foreground transition-colors underline underline-offset-4 decoration-surface-light hover:decoration-accent/40"
    >
      {copied ? "Copied!" : "Copy link to share \u2192"}
    </button>
  );
}

export default function ArticleLayout({
  meta,
  Component,
}: ArticleLayoutProps) {
  const [mode, setMode] = useState<"executive" | "technical">("executive");

  return (
    <main className="relative min-h-screen">
      {/* ── Nav ── */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 font-mono text-xs tracking-[0.25em] text-accent hover:text-foreground transition-colors uppercase"
      >
        LGTM
      </Link>
      <ThemeToggle />

      {/* ── Sticky ViewToggle bar ── */}
      {meta.hasViewToggle && <ViewToggle mode={mode} onToggle={setMode} />}

      {/* ── Article (add top padding to clear sticky toggle) ── */}
      <div className={meta.hasViewToggle ? "pt-10" : ""}>
        <Component mode={mode} />
      </div>

      {/* ── Footer ── */}
      <footer className="mx-auto max-w-2xl px-6 py-24">
        <div className="border-t border-surface-light pt-12">
          <FadeIn>
            <div className="text-center">
              {/* 1. Email capture with social proof */}
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-dark uppercase mb-3">
                Get the next one
              </p>
              <div className="flex justify-center">
                <EmailCapture variant="footer" />
              </div>
              <p className="mt-3 font-mono text-[10px] text-muted-dark/60 tracking-wide">
                Join 100+ CTOs, VPs, and Staff+ engineers
              </p>

              {/* 2. Share with your team */}
              <div className="mt-10 pt-8 border-t border-surface-light">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-dark uppercase mb-3">
                  Share with your team
                </p>
                <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
                  Know someone navigating AI architecture decisions? Forward
                  this &mdash; the best technical leaders build shared context.
                </p>
                <ShareButton meta={meta} />
              </div>

              {/* 3. Go deeper — learn site */}
              <div className="mt-10 pt-8 border-t border-surface-light">
                <div className="rounded-xl border border-surface-light bg-surface/30 overflow-hidden text-left">
                  <div className="grid grid-cols-4 gap-px bg-surface-light/50">
                    {[
                      { name: "Tokenization", icon: "Aa" },
                      { name: "Embeddings", icon: "[·]" },
                      { name: "Attention", icon: "Q·K" },
                      { name: "Transformers", icon: "T" },
                    ].map((c) => (
                      <div
                        key={c.name}
                        className="bg-background/60 px-2 py-3 text-center"
                      >
                        <p className="font-mono text-sm text-accent/60 leading-none">
                          {c.icon}
                        </p>
                        <p className="mt-1 font-mono text-[8px] text-muted-dark tracking-wide uppercase">
                          {c.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
                      Go deeper on these concepts
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                      12 interactive AI/ML concepts with 3D visualizations.
                      What the newsletter explains, the library lets you explore.
                    </p>
                    <a
                      href="https://learn.lgtm.live"
                      className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-foreground transition-colors"
                    >
                      Explore learn.lgtm.live <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 4. Navigation + Author */}
              <div className="mt-10 flex flex-col items-center gap-4">
                <Link
                  href="/articles"
                  className="font-mono text-sm text-muted-dark hover:text-accent transition-colors underline underline-offset-4 decoration-surface-light hover:decoration-accent/40"
                >
                  All articles &rarr;
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-surface-light">
                <p className="text-sm text-muted">
                  By{" "}
                  <strong className="text-foreground font-medium">
                    Saheb Singh
                  </strong>
                </p>
                <p className="mt-1 text-xs text-muted-dark">
                  Enterprise AI, American Express. Ex-Google. CMU CS.
                </p>
                <a
                  href="https://www.linkedin.com/in/ssg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-xs text-muted-dark hover:text-accent transition-colors underline underline-offset-4 decoration-surface-light hover:decoration-accent/40"
                >
                  Follow on LinkedIn &rarr;
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
    </main>
  );
}
