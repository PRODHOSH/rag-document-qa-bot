import Link from "next/link";
import { ArrowRight, BookOpen, FileSearch, Quote, Zap, Upload, Layers, Search, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { RagVisualization } from "@/components/ui/rag-visualization";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative w-full">
        {/* subtle grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[64px_64px] opacity-30"
        />
        {/* radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-120 w-225 rounded-full bg-primary/10 blur-[120px]"
        />

        <div className="relative container mx-auto px-4 pt-14 pb-0 flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground tracking-wide uppercase backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            RAG · Retrieval-Augmented Generation
          </span>

          <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Ask Questions From Your Documents{" "}
            <span className="text-primary">— Instantly</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            An AI-powered document intelligence system that retrieves precise answers
            from large document collections using{" "}
            <span className="text-foreground font-medium">
              Retrieval-Augmented Generation (RAG)
            </span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start Asking Questions
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BookOpen className="h-4 w-4" />
              View Documentation
            </Link>
          </div>
        </div>

        {/* ── RAG pipeline visualization ── */}
        <div className="relative container mx-auto px-4 pt-10 pb-16">
          <RagVisualization />
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="w-full py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built for Precision. Designed for Scale.
            </h2>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Quote,
                title: "Grounded Answers",
                description:
                  "Every response is backed by real document evidence. No hallucinations — only verified information.",
              },
              {
                icon: FileSearch,
                title: "Vector Search Engine",
                description:
                  "Documents are indexed using advanced embeddings and semantic search for accurate retrieval.",
              },
              {
                icon: BookOpen,
                title: "Citations & Sources",
                description:
                  "Each answer includes document references and context snippets for full transparency.",
              },
              {
                icon: Zap,
                title: "Fast API Backend",
                description:
                  "Built using FastAPI and optimized vector databases for real-time responses.",
              },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeIn key={feat.title} delay={i * 100} direction="up">
                  <div className="group rounded-2xl border border-border bg-card p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-foreground/20 h-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="w-full py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              How It Works
            </h2>
          </FadeIn>

          <div className="relative mx-auto max-w-4xl">
            {/* connector line — desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] hidden h-px bg-border lg:block"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  icon: Upload,
                  title: "Upload Documents",
                  description: "Add PDFs, text files, or markdown documents.",
                },
                {
                  step: "02",
                  icon: Layers,
                  title: "Vector Indexing",
                  description:
                    "Documents are chunked and converted into embeddings.",
                },
                {
                  step: "03",
                  icon: Search,
                  title: "Semantic Retrieval",
                  description:
                    "Relevant chunks are retrieved using similarity search.",
                },
                {
                  step: "04",
                  icon: Sparkles,
                  title: "Answer Generation",
                  description:
                    "The AI generates grounded answers using retrieved context.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.step} delay={i * 120} direction="up">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card shadow-sm">
                        <Icon className="h-8 w-8 text-primary" />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-64 w-150 rounded-full bg-primary/10 blur-[80px]"
              />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                  Ready to query your documents?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
                  Upload your files and start getting precise, cited answers in seconds.
                </p>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

