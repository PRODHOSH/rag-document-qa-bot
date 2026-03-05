import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background flex items-center justify-center px-4">
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="relative w-full max-w-md text-center flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-lg">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground tracking-widest uppercase">
            Coming Soon
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Chat Interface
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            The interactive document Q&amp;A chat is actively being built.
            Check back soon.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
