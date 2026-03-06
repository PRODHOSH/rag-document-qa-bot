import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { UpgradeButton } from "@/components/ui/upgrade-button";

/* ─── hero product mock ─────────────────────────────── */
function ProductMock() {
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: "-30%", width: "85%", height: "100%",
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      {/* browser chrome */}
      <div className="relative z-10 rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        {/* macOS-style title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/8 bg-[#111]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex items-center gap-1.5 rounded bg-white/6 border border-white/8 px-2 py-0.5">
            <svg className="h-2.5 w-2.5 text-white/25" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <span className="text-[10px] text-white/30 font-mono">localhost:3000/chat</span>
          </div>
        </div>

        {/* app body */}
        <div className="flex" style={{ minHeight: 340 }}>

          {/* ── SIDEBAR ── */}
          <div className="hidden sm:flex w-52 flex-col border-r border-white/8 bg-[#0d0d0d]">
            {/* FILES / HISTORY tabs */}
            <div className="flex border-b border-white/8">
              {[
                { label: "FILES",   icon: "M4 2h8v1H4zM2 4h12v10H2z", active: true  },
                { label: "HISTORY", icon: "M8 3a5 5 0 100 10A5 5 0 008 3zM8 6v3l2 1", active: false },
              ].map((tab) => (
                <button key={tab.label} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold tracking-[0.12em] transition-colors ${tab.active ? "text-white border-b-2 border-white -mb-px" : "text-white/30"}`}>
                  <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d={tab.icon}/></svg>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* documents header */}
            <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-white/30">Documents</span>
              <div className="h-4 w-4 rounded flex items-center justify-center bg-white/6 border border-white/10">
                <svg className="h-2.5 w-2.5 text-white/40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3v10M3 8h10" strokeLinecap="round"/></svg>
              </div>
            </div>

            {/* file rows */}
            <div className="flex flex-col gap-0.5 px-2 pb-2">
              {[
                { name: "prodhosh_new_resu…", size: "119.4 KB", icon: "person" },
                { name: "simulation_code.pdf", size: "4314.7 KB", icon: "pdf"    },
                { name: "faq_docs.pdf",        size: "87.2 KB",   icon: "pdf"    },
              ].map((f, i) => (
                <div key={f.name} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-white/6" : ""}`}>
                  <div className="h-6 w-6 rounded bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                    <svg className="h-3 w-3 text-white/40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M4 1h6l3 3v10H3V1z"/><path d="M10 1v3h3"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/70 truncate leading-tight">{f.name}</p>
                    <p className="text-[9px] text-white/25 leading-tight">{f.size}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* add more files */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-1.5 text-white/30 cursor-default">
                <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 13l3-3 2 2 4-5 3 2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 15h14" strokeLinecap="round"/></svg>
                <span className="text-[10px]">Add more files</span>
              </div>
            </div>

            {/* indexed status */}
            <div className="mt-auto border-t border-white/8 px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-white/30">2 docs indexed</span>
              </div>
            </div>
          </div>

          {/* ── CHAT PANEL ── */}
          <div className="flex-1 flex flex-col bg-[#080808]">
            {/* chat header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-[#0d0d0d]">
              <div className="h-6 w-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <svg className="h-3 w-3 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <span className="text-[13px] font-semibold text-white/80 flex-1">AI Chat</span>
              <div className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/40 gap-1">
                <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 8h12M8 2l6 6-6 6" strokeLinecap="round"/></svg>
                New Chat
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 pl-1 pr-2 py-0.5">
                <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white/60">P</span>
                </div>
                <span className="text-[10px] text-white/50">prodhosh2</span>
                <svg className="h-2 w-2 text-white/30" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
              {/* user bubble */}
              <div className="flex justify-end">
                <div className="rounded-xl rounded-br-none bg-white text-black px-3 py-2 max-w-[58%]">
                  <p className="text-[11px] font-medium leading-snug">Summarize my resume for a software engineering role</p>
                </div>
              </div>

              {/* bot bubble */}
              <div className="flex flex-col gap-2 max-w-[85%]">
                <div className="rounded-xl rounded-bl-none border border-white/8 bg-[#111] px-3 py-2.5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="h-4 w-4 rounded bg-white flex items-center justify-center shrink-0">
                      <span className="text-black text-[7px] font-black">FF</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-semibold">FlashFetch</span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" /> High confidence
                    </span>
                  </div>
                  <p className="text-[11px] text-white/75 leading-relaxed">
                    Prodhosh is a full-stack developer with experience in React, Next.js, Python, and FastAPI. His resume highlights RAG pipelines, AI integrations, and hackathon projects including FlashFetch.
                  </p>
                  {/* source chip */}
                  <div className="mt-2 pt-2 border-t border-white/8 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-white/35">prodhosh_new_resu…</span>
                    <span className="text-[8px] font-semibold text-emerald-400 bg-emerald-400/10 rounded px-1.5 py-0.5">94%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* input bar */}
            <div className="px-4 pb-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-3 py-2.5">
                <p className="text-[11px] text-white/20 flex-1">Ask a question about your documents…</p>
                {/* mic */}
                <div className="h-6 w-6 rounded-lg border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="h-3 w-3 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v4M8 22h8"/>
                  </svg>
                </div>
                {/* send */}
                <div className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))" }}>
                  <svg className="h-3 w-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              <p className="text-center text-[9px] text-white/15 mt-1.5">Multi-turn memory · Grounded answers · Enter to send</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── page ─────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-start px-6 pt-28 pb-20 overflow-hidden">
        {/* radial top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "80%",
            height: "600px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 65%)",
          }}
        />
        {/* warm amber horizon glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            top: "46%",
            width: "50%",
            height: "420px",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,150,20,0.95) 0%, rgba(230,80,0,0.55) 28%, rgba(180,50,0,0.12) 50%, transparent 65%)",
            filter: "blur(1px)",
          }}
        />

        {/* announcement pill */}
        <FadeIn>
          <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 backdrop-blur-sm px-4 py-2">
            <span className="text-xs text-white/50">🎯 Document Q&A Bot · Built for Synthetix 4.0</span>
            <Link href="#how-it-works" className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors">
              See how it works
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </aside>
        </FadeIn>

        {/* headline */}
        <FadeIn delay={60}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center max-w-4xl leading-[1.06] mb-6"
            style={{
              background: "linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.05em",
            }}
          >
            Your Documents,<br />Now Answerable.
          </h1>
        </FadeIn>

        {/* sub */}
        <FadeIn delay={120}>
          <p className="text-sm sm:text-base text-white/50 text-center max-w-xl leading-relaxed mb-10">
            FlashFetch finds the exact passages in your files and answers any question with <span className="text-white/80">verifiable citations</span> — powered by Retrieval-Augmented Generation. Never fabricated, always grounded.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={180}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 h-12 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.75))" }}
            >
              Start Querying Free
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 h-12 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all"
            >
              How it works
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </FadeIn>

        {/* product mock */}
        <FadeIn delay={240} className="w-full">
          <ProductMock />
        </FadeIn>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="border-y border-white/8 bg-white/2">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "< 500ms",   label: "Avg. retrieval time" },
            { value: "Zero",      label: "Hallucinations guaranteed" },
            { value: "3 formats", label: "PDF · TXT · Markdown" },
            { value: "5+ langs",  label: "Tamil, Hindi, Telugu…" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/35 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30 mb-3">Core Capabilities</p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              What Makes FlashFetch Different
            </h2>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Grounded Responses",
                desc: "Every answer is generated exclusively from retrieved document content. If it's not in your docs, FlashFetch says so — never guesses.",
                accent: "from-amber-500/20 to-transparent",
                border: "border-amber-500/15",
                dot: "bg-amber-400",
              },
              {
                icon: "🔍",
                title: "Semantic Vector Search",
                desc: "Documents are embedded with transformer models. Finds conceptually similar passages even when the exact words don't match.",
                accent: "from-blue-500/20 to-transparent",
                border: "border-blue-500/15",
                dot: "bg-blue-400",
              },
              {
                icon: "📎",
                title: "Source Citations",
                desc: "Every response includes the source document, the exact text snippet used, and a confidence score — fully transparent retrieval.",
                accent: "from-emerald-500/20 to-transparent",
                border: "border-emerald-500/15",
                dot: "bg-emerald-400",
              },
              {
                icon: "🚦",
                title: "Honest Fallback",
                desc: 'When no relevant content is found, FlashFetch responds: "I could not find this in the provided documents." No fabricated citations.',
                accent: "from-purple-500/20 to-transparent",
                border: "border-purple-500/15",
                dot: "bg-purple-400",
              },
            ].map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 70} direction="up">
                <div className={`group relative flex flex-col gap-5 rounded-2xl border ${feat.border} bg-white/2 p-7 transition-all duration-300 hover:bg-white/4 h-full overflow-hidden`}>
                  {/* top glow */}
                  <div className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${feat.accent}`} />
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-xl">
                      {feat.icon}
                    </div>
                    <div className={`h-1.5 w-1.5 rounded-full ${feat.dot}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">{feat.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" className="py-24 px-6 scroll-mt-20 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30 mb-3">Process</p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              From Files to Answers in Seconds
            </h2>
          </FadeIn>

          <div className="relative">
            {/* connector line — desktop */}
            <div className="hidden lg:block absolute top-8 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", icon: "📂", title: "Upload",       desc: "Drop PDFs, TXT, or Markdown files into the interface or drag & drop.", color: "text-amber-400",   ring: "ring-amber-400/20"  },
                { step: "02", icon: "⚙️",  title: "Auto Index",   desc: "Chunks are embedded with Sentence Transformers and stored in FAISS.", color: "text-blue-400",    ring: "ring-blue-400/20"   },
                { step: "03", icon: "💬", title: "Ask Anything",  desc: "Type a natural language question — no special syntax needed.",        color: "text-emerald-400", ring: "ring-emerald-400/20" },
                { step: "04", icon: "✅", title: "Cited Answer",  desc: "Get a grounded answer with source snippets and a confidence score.",  color: "text-purple-400",  ring: "ring-purple-400/20"  },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 90} direction="up">
                  <div className="flex flex-col items-center text-center gap-4">
                    {/* Step circle */}
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0f0f0f] ring-4 ${item.ring} text-2xl shadow-lg`}>
                      {item.icon}
                      <span className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black border border-white/10 text-[10px] font-bold ${item.color}`}>
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                      <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" className="py-24 px-6 border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30 mb-3">Pricing</p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              Simple, Honest Pricing
            </h2>
            <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
              Start for free. Upgrade when you need more.
            </p>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">

            {/* Free */}
            <FadeIn delay={60} direction="up">
              <div className="relative flex flex-col rounded-2xl border border-white/10 bg-white/2 p-8 h-full">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Free</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-black text-white tracking-tight">₹0</span>
                </div>
                <p className="text-xs text-white/30 mb-8">Forever free — no card required</p>

                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {[
                    "Up to 10 AI chats / month",
                    "Upload up to 2 documents",
                    "PDF · TXT · Markdown support",
                    "Cited answers with sources",
                    "Standard response speed",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-white/30" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/chat"
                  className="w-full flex items-center justify-center rounded-xl border border-white/15 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-white/30 transition-all"
                >
                  Get started free
                </Link>
              </div>
            </FadeIn>

            {/* Pro */}
            <FadeIn delay={120} direction="up">
              <div className="relative flex flex-col rounded-2xl border border-white/20 bg-white/4 p-8 h-full ring-1 ring-white/10">
                {/* Popular badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black tracking-wide">
                    Most Popular
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Pro</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-black text-white tracking-tight">₹999</span>
                  <span className="text-sm text-white/35 mb-2.5">/month</span>
                </div>
                <p className="text-xs text-white/30 mb-8">Billed monthly · Cancel anytime</p>

                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {[
                    "Unlimited AI chats",
                    "Upload unlimited documents",
                    "PDF · TXT · Markdown support",
                    "Cited answers with sources",
                    "Priority response speed",
                    "Confidence scoring & analytics",
                    "Email support",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <UpgradeButton />
              </div>
            </FadeIn>
          </div>

          {/* Fine print */}
          <FadeIn delay={180}>
            <p className="text-center text-xs text-white/20 mt-8">
              Prices in INR · Secure payment via Razorpay · Unused chats don&apos;t roll over
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24 px-6 border-t border-white/6">
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{
                background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.04em",
              }}
            >
              Start Querying Your Documents
            </h2>
            <p className="text-sm text-white/45 mb-8 max-w-md mx-auto leading-relaxed">
              Upload your documents and interact with them using natural language. Every answer is grounded, cited, and honest.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-8 h-12 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.75))" }}
            >
              Get Started Free
            </Link>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
