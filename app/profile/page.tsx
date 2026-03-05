"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Check, Loader2, LogIn, ArrowLeft } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getLocalAvatar, setLocalAvatar } from "@/lib/avatar";

export default function ProfilePage() {
  const router = useRouter();
  const [user,        setUser]        = React.useState<any>(null);
  const [loading,     setLoading]     = React.useState(true);
  const [avatarUrl,   setAvatarUrl]   = React.useState<string | null>(null);
  const [previewUrl,  setPreviewUrl]  = React.useState<string | null>(null);
  const [avatarFile,  setAvatarFile]  = React.useState<File | null>(null);
  const [displayName, setDisplayName] = React.useState("");
  const [saving,      setSaving]      = React.useState(false);
  const [saved,       setSaved]       = React.useState(false);
  const [error,       setError]       = React.useState("");
  const fileRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user ?? null;
      setUser(u);
      if (u) {
        setDisplayName(u.user_metadata?.full_name || u.email?.split("@")[0] || "");
        // custom upload takes priority, otherwise fall back to OAuth (Google) photo
        const local = getLocalAvatar(u.id);
        setAvatarUrl(local ?? u.user_metadata?.avatar_url ?? null);
      }
      setLoading(false);
    });
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
  }

  // Resize + compress image to a small base64 string (max 200x200, quality 0.7)
  function resizeToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const size = 200;
        const canvas = document.createElement("canvas");
        const ratio = Math.min(size / img.width, size / img.height);
        canvas.width  = Math.round(img.width  * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setError("");
    const supabase = createClient()!;

    let newAvatarUrl = avatarUrl;

    // Convert picked file to base64 and store in localStorage (never in metadata)
    if (avatarFile) {
      try {
        newAvatarUrl = await resizeToBase64(avatarFile);
        setLocalAvatar(user.id, newAvatarUrl);
      } catch {
        setError("Could not process image. Please try another file.");
        setSaving(false);
        return;
      }
    }

    // Only save display name to metadata (no avatar — keeps JWT small)
    const { error: updateErr } = await supabase.auth.updateUser({
      data: { full_name: displayName },
    });

    if (updateErr) {
      setError(updateErr.message);
    } else {
      setAvatarUrl(newAvatarUrl);
      setPreviewUrl(null);
      setAvatarFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-white/30" />
      </div>
    );
  }

  // ── Not signed in ────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-6 text-center max-w-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <LogIn className="h-8 w-8 text-white/30" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in to access your profile</h1>
            <p className="mt-2 text-sm text-white/40 leading-relaxed">
              Create an account or sign in to edit your profile photo, display name, and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm text-white/50 hover:text-white hover:border-white/25 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.8))" }}
            >
              Sign In
            </Link>
          </div>
          <p className="text-xs text-white/20">
            Your profile lets you upload a photo and personalise your FlashFetch experience.
          </p>
        </div>
      </div>
    );
  }

  // ── Profile (signed in) ──────────────────────────────────
  const displayAvatar = previewUrl || avatarUrl;
  const initials = (displayName || user.email || "U")[0].toUpperCase();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-lg mx-auto px-6 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight mb-1">Settings</h1>
        <p className="text-sm text-white/40 mb-10">Manage your profile photo and display name</p>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full border-2 border-white/10 bg-white/8 overflow-hidden flex items-center justify-center text-3xl font-semibold text-white/60">
              {displayAvatar
                ? <img src={displayAvatar} alt="avatar" className="h-full w-full object-cover" />
                : initials
              }
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#111] text-white/60 hover:text-white hover:border-white/30 transition-all shadow-lg"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          {previewUrl && (
            <p className="text-xs text-white/35">New photo selected — click Save to apply</p>
          )}
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Display name */}
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-widest">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-3 text-sm text-white/35 cursor-not-allowed"
            />
            <p className="text-[11px] text-white/20 mt-1">Email cannot be changed</p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0.82))" }}
          >
            {saving ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            ) : saved ? (
              <><Check className="h-4 w-4 text-emerald-600" /> Saved!</>
            ) : (
              "Save Changes"
            )}
          </button>

          <div className="pt-4 border-t border-white/6">
            <button
              onClick={async () => {
                const s = createClient();
                await s?.auth.signOut();
                router.push("/");
              }}
              className="text-sm text-red-400/70 hover:text-red-400 transition-colors"
            >
              Sign out of this account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
