"use client";

import { FileText, Scissors, Hash, Database, MessageSquare, Search, Cpu, BookOpen, ChevronDown, ArrowRight } from "lucide-react";

const ingestion = [
  { icon: FileText,      label: "Documents",       desc: "PDFs, TXT, MD" },
  { icon: Scissors,      label: "Chunking",         desc: "Split into passages" },
  { icon: Hash,          label: "Embeddings",       desc: "Convert to vectors" },
  { icon: Database,      label: "Vector Database",  desc: "Store & index" },
];

const query = [
  { icon: MessageSquare, label: "User Question",    desc: "Natural language query" },
  { icon: Hash,          label: "Query Embedding",  desc: "Embed the question" },
  { icon: Search,        label: "Top-K Retrieval",  desc: "Find similar chunks" },
  { icon: Cpu,           label: "LLM",              desc: "Generate response" },
  { icon: BookOpen,      label: "Answer + Citations", desc: "Grounded, cited output" },
];

export function RagVisualization() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-6 py-3 bg-muted/30">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs text-muted-foreground font-mono tracking-wider">rag-pipeline</span>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">

        {/* ── Ingestion pipeline ── */}
        <div className="px-6 py-6 flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Ingestion Pipeline
          </p>
          {ingestion.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label}>
                <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3 border border-border/50 hover:border-border transition-colors duration-200">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background border border-border">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-none">{step.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground/50 shrink-0">0{i + 1}</span>
                </div>
                {i < ingestion.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            );
          })}
          {/* Bridge to query side */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dashed border-border">
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
            <span className="text-[10px] text-muted-foreground/60 font-mono">vectors available for retrieval</span>
          </div>
        </div>

        {/* ── Query pipeline ── */}
        <div className="px-6 py-6 flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Query Pipeline
          </p>
          {query.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === query.length - 1;
            return (
              <div key={step.label}>
                <div className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors duration-200 ${
                  isLast
                    ? "bg-primary/10 border-primary/30 hover:border-primary/50"
                    : "bg-muted/40 border-border/50 hover:border-border"
                }`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    isLast ? "bg-primary border-primary/30" : "bg-background border-border"
                  }`}>
                    <Icon className={`h-3.5 w-3.5 ${isLast ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className={`text-sm font-semibold leading-none ${isLast ? "text-primary" : "text-foreground"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground/50 shrink-0">0{i + 1}</span>
                </div>
                {i < query.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
