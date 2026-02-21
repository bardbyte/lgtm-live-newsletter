import { articles } from "@/config/articles";
import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import ArticleCard from "@/components/ArticleCard";
import EmailCapture from "@/components/EmailCapture";
import ThemeToggle from "@/components/ThemeToggle";
import FadeIn from "@/components/FadeIn";
import ToggleTeaser from "@/components/ToggleTeaser";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ThemeToggle />

      <section className="mx-auto max-w-2xl px-6 pt-24 md:pt-32">
        {/* ── Brand + Descriptor ── */}
        <FadeIn delay={0.1} direction="none">
          <div className="flex items-baseline gap-3">
            <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
              LGTM
            </p>
            <span className="text-[10px] text-muted-dark font-mono">
              For technical leaders who ship
            </span>
          </div>
        </FadeIn>

        {/* ── Headline ── */}
        <FadeIn delay={0.2}>
          <h1 className="mt-6 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] max-w-lg">
            The AI briefing your
            <br />
            team won&apos;t give you.
          </h1>
        </FadeIn>

        {/* ── Loss-aversion stat ── */}
        <FadeIn delay={0.25}>
          <p className="mt-5 text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-accent/50">
            88<span className="text-accent/25">%</span>{" "}
            <span className="text-base font-normal text-muted tracking-normal">
              of AI pilots never reach production.
            </span>
          </p>
        </FadeIn>

        {/* ── Reframed description ── */}
        <FadeIn delay={0.3}>
          <p className="mt-5 text-base text-muted leading-relaxed max-w-md">
            Every two weeks: the architecture pattern that separates $100M AI
            successes from expensive demos. Built so you can explain it to your
            board AND your engineers.
          </p>
        </FadeIn>

        {/* ── Author byline (moved UP, above CTA) ── */}
        <FadeIn delay={0.35}>
          <p className="mt-5 text-xs text-muted-dark">
            By{" "}
            <strong className="text-foreground font-medium">Saheb Singh</strong>{" "}
            &middot; Enterprise AI, American Express. Ex-Google. CMU CS.
          </p>
        </FadeIn>

        {/* ── Toggle teaser (interactive demo) ── */}
        <FadeIn delay={0.38}>
          <ToggleTeaser />
        </FadeIn>

        {/* ── Email capture ── */}
        <FadeIn delay={0.4}>
          <div className="mt-6">
            <EmailCapture />
          </div>
        </FadeIn>

        {/* ── Social proof ── */}
        <FadeIn delay={0.42}>
          <p className="mt-3 font-mono text-[10px] text-muted-dark/70 tracking-wide">
            Join 100+ CTOs, VPs, and Staff+ engineers
          </p>
        </FadeIn>

        {/* ── What You'll Get ── */}
        <FadeIn delay={0.1}>
          <div className="mt-16 md:mt-20">
            <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase mb-6">
              What you&apos;ll get
            </p>
            <div className="space-y-5">
              {/* Real article */}
              <a
                href={`/articles/${articles[0].slug}`}
                className="group block"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-accent/60 font-mono text-sm">&rarr;</span>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {articles[0].title}
                    </p>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      Why your org is building the wrong thing &mdash; and the
                      architecture decision that fixes it.
                    </p>
                  </div>
                </div>
              </a>
              {/* Coming soon teasers */}
              <div className="flex items-start gap-3 opacity-60">
                <span className="mt-1 text-accent/40 font-mono text-sm">&rarr;</span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    RAG in Production: What Breaks at Scale
                  </p>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    The retrieval pipeline architecture that survives 10K daily
                    queries &mdash; and the one that doesn&apos;t.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 opacity-60">
                <span className="mt-1 text-accent/40 font-mono text-sm">&rarr;</span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Fine-Tuning vs. Prompt Engineering: The $2M Decision
                  </p>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    When to train your own model vs. wrangle a foundation
                    model &mdash; the decision matrix your team is skipping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Featured article ── */}
        <div className="mt-16 md:mt-20">
          <FadeIn delay={0.1}>
            <FeaturedArticleCard article={articles[0]} />
          </FadeIn>
        </div>

        {/* ── Older articles ── */}
        {articles.length > 1 && (
          <div className="mt-16">
            <FadeIn>
              <p className="font-mono text-[11px] tracking-[0.25em] text-muted-dark uppercase mb-4">
                Previous
              </p>
            </FadeIn>
            {articles.slice(1).map((article) => (
              <FadeIn key={article.slug} delay={0.05}>
                <ArticleCard article={article} />
              </FadeIn>
            ))}
          </div>
        )}

        {/* ── Learn site card (repositioned: "go deeper") ── */}
        <FadeIn delay={0.1}>
          <div className="mt-20 rounded-2xl border border-surface-light bg-surface/30 overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-surface-light/50">
              {[
                { name: "Tokenization", icon: "Aa" },
                { name: "Embeddings", icon: "[·]" },
                { name: "Attention", icon: "Q·K" },
                { name: "Transformers", icon: "T" },
                { name: "Fine-Tuning", icon: "ft" },
                { name: "RAG", icon: "R+" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="bg-background/60 px-3 py-4 text-center"
                >
                  <p className="font-mono text-lg text-accent/60 leading-none">
                    {c.icon}
                  </p>
                  <p className="mt-2 font-mono text-[9px] text-muted-dark tracking-wide uppercase">
                    {c.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-8 md:p-10">
              <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-3">
                Already reading? Go deeper.
              </p>
              <p className="text-sm text-muted leading-relaxed max-w-md">
                12 interactive AI/ML concepts with 3D visualizations you can
                rotate, zoom, and explore. What the newsletter explains, the
                library lets you experience.
              </p>
              <a
                href="https://learn.lgtm.live"
                className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-foreground transition-colors"
              >
                Explore learn.lgtm.live <span>&rarr;</span>
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-14 pb-24 flex flex-col items-center gap-4 text-center">
            <a
              href="https://www.linkedin.com/in/ssg"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted-dark hover:text-accent transition-colors underline underline-offset-4 decoration-surface-light hover:decoration-accent/40"
            >
              Follow on LinkedIn &rarr;
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
