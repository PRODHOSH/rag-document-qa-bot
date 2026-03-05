"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Send, LogOut, ChevronDown, ChevronUp, Bot, User,
  Upload, FileText, Trash2, Plus, CircleDot,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const RAG_API    = process.env.NEXT_PUBLIC_RAG_API_URL ?? "http://localhost:8000";
const DOCS_API   = RAG_API + "/documents";
const UPLOAD_API = RAG_API + "/upload";
const DELETE_API = (name: string) => `${RAG_API}/documents/${encodeURIComponent(name)}`;

// ── Types ────────────────────────────────────────────────
interface DocFile  { name: string; size_kb: number }
interface Source   { document: string; snippet: string; score: number }
interface Message  {
  id:          string;
  role:        "user" | "assistant";
  content:     string;
  sources?:    Source[];
  confidence?: "high" | "medium" | "low";
  loading?:    boolean;
}

// ── Small components ─────────────────────────────────────
function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high:   "bg-green-500/15 text-green-400 border-green-500/25",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    low:    "bg-red-500/15 text-red-400 border-red-500/25",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", map[level])}>
      {level} confidence
    </span>
  );
}

function SourceCard({ source }: { source: Source }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="rounded-lg border border-white/8 bg-white/3 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-2 px-3 py-2 text-left">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">doc</span>
        <span className="flex-1 truncate text-xs text-white/60">{source.document}</span>
        <span className="shrink-0 text-[11px] text-white/30">{Math.round(source.score * 100)}%</span>
        {open ? <ChevronUp className="h-3.5 w-3.5 shrink-0 text-white/30" /> : <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/30" />}
      </button>
      {open && (
        <div className="border-t border-white/8 px-3 py-2">
          <p className="text-xs leading-relaxed text-white/50">{source.snippet}</p>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div className={cn(
        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
        isUser ? "border-white/15 bg-white/8" : "border-white/10 bg-[#111]"
      )}>
        {isUser ? <User className="h-4 w-4 text-white/60" /> : <Bot className="h-4 w-4 text-white/60" />}
      </div>
      <div className={cn("flex max-w-[75%] flex-col gap-2", isUser && "items-end")}>
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "rounded-tr-sm bg-white text-black" : "rounded-tl-sm border border-white/8 bg-[#0f0f0f] text-white/85"
        )}>
          {msg.loading ? (
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:300ms]" />
            </div>
          ) : msg.content}
        </div>
        {!isUser && !msg.loading && msg.confidence && (
          <div className="flex flex-col gap-1.5 w-full">
            <ConfidenceBadge level={msg.confidence} />
            {msg.sources && msg.sources.length > 0 && (
              <div className="flex flex-col gap-1">
                {msg.sources.map((s, i) => <SourceCard key={i} source={s} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function ChatPage() {
  const router = useRouter();
  const [user,        setUser]        = React.useState<any>(null);
  const [authChecked, setAuthChecked] = React.useState(false);
  const [messages,    setMessages]    = React.useState<Message[]>([{
    id: "welcome", role: "assistant",
    content: "Hi! I'm your AI assistant. Upload documents on the left, then ask me anything about them.",
  }]);
  const [input,     setInput]     = React.useState("");
  const [sending,   setSending]   = React.useState(false);
  const [docs,      setDocs]      = React.useState<DocFile[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [deleting,  setDeleting]  = React.useState<string | null>(null);

  const bottomRef  = React.useRef<HTMLDivElement>(null);
  const inputRef   = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ── Auth guard ─────────────────────────────────────────
  React.useEffect(() => {
    if (!isSupabaseConfigured) { setAuthChecked(true); return; }
    const supabase = createClient();
    if (!supabase)              { setAuthChecked(true); return; }
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/");
      else { setUser(data.user); setAuthChecked(true); }
    });
  }, [router]);

  // ── Load documents ─────────────────────────────────────
  React.useEffect(() => {
    fetchDocs();
  }, []);

  async function fetchDocs() {
    try {
      const res = await fetch(DOCS_API);
      if (!res.ok) return;
      const data = await res.json();
      setDocs(data.documents ?? []);
    } catch { /* backend not running yet */ }
  }

  // ── Auto-scroll ─────────────────────────────────────────
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Sign out ────────────────────────────────────────────
  async function signOut() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    router.replace("/");
  }

  // ── Upload ──────────────────────────────────────────────
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch(UPLOAD_API, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Upload failed");
      setDocs(data.documents ?? []);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // ── Delete doc ──────────────────────────────────────────
  async function handleDelete(name: string) {
    setDeleting(name);
    try {
      const res  = await fetch(DELETE_API(name), { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Delete failed");
      setDocs(data.documents ?? []);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  }

  // ── Send message ─────────────────────────────────────────
  async function sendMessage() {
    const question = input.trim();
    if (!question || sending) return;

    const userMsg: Message     = { id: Date.now().toString(), role: "user", content: question };
    const placeholderId        = Date.now().toString() + "-ai";
    const placeholder: Message = { id: placeholderId, role: "assistant", content: "", loading: true };

    setMessages((prev) => [...prev, userMsg, placeholder]);
    setInput("");
    setSending(true);

    try {
      const res  = await fetch(RAG_API + "/ask", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setMessages((prev) => prev.map((m) =>
        m.id === placeholderId
          ? { ...m, loading: false, content: data.answer, sources: data.sources, confidence: data.confidence }
          : m
      ));
    } catch {
      setMessages((prev) => prev.map((m) =>
        m.id === placeholderId
          ? { ...m, loading: false, content: "Could not reach the RAG API. Make sure the backend is running on port 8000." }
          : m
      ));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  // ── Loading screen ─────────────────────────────────────
  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const displayName  = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "You";
  const avatarLetter = (displayName as string)[0]?.toUpperCase() ?? "U";

  return (
    <div className="flex h-screen bg-black overflow-hidden">

      {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-white/8 bg-[#080808]">
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/8">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">Documents</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Upload document"
            className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-white/40 transition-colors hover:border-white/25 hover:text-white disabled:opacity-40"
          >
            {uploading
              ? <span className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white/80" />
              : <Plus className="h-3.5 w-3.5" />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.pdf"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {/* Doc list */}
        <div className="flex-1 overflow-y-auto py-2">
          {docs.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <Upload className="h-8 w-8 text-white/10" />
              <p className="text-xs text-white/25 leading-relaxed">
                No documents yet.<br />Click + to upload.
              </p>
            </div>
          ) : (
            docs.map((doc) => (
              <div
                key={doc.name}
                className="group flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg hover:bg-white/4 transition-colors"
              >
                <FileText className="h-4 w-4 shrink-0 text-white/30" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs text-white/70 leading-tight">{doc.name}</p>
                  <p className="text-[11px] text-white/25">{doc.size_kb} KB</p>
                </div>
                <button
                  onClick={() => handleDelete(doc.name)}
                  disabled={deleting === doc.name}
                  className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all"
                >
                  {deleting === doc.name
                    ? <span className="h-3 w-3 animate-spin rounded-full border border-white/20 border-t-white/60 block" />
                    : <Trash2 className="h-3.5 w-3.5" />}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Indexed count */}
        <div className="border-t border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            <CircleDot className={cn("h-3 w-3", docs.length > 0 ? "text-green-500" : "text-white/20")} />
            <span className="text-xs text-white/35">
              {docs.length} doc{docs.length !== 1 ? "s" : ""} indexed
            </span>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Top bar */}
        <header className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" className="h-6 w-6 rounded object-contain" />
            <span className="text-sm font-semibold text-white tracking-tight">AI Chat</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
              {avatarLetter}
            </div>
            <span className="hidden text-sm text-white/50 sm:block">{displayName}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/40 transition-colors hover:border-white/20 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
            {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div className="shrink-0 border-t border-white/8 bg-black px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your documents…"
                className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none max-h-40"
                style={{ lineHeight: "1.5rem" }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className={cn(
                  "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all",
                  input.trim() && !sending
                    ? "bg-white text-black hover:scale-105 active:scale-95"
                    : "bg-white/10 text-white/20 cursor-not-allowed"
                )}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-white/20">
              Answers are grounded in your uploaded documents · Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}