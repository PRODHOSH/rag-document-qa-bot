"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, MessageSquare, ChevronDown, Settings } from "lucide-react";
import { AuthModal } from "@/components/ui/auth-modal";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { resolveAvatar } from "@/lib/avatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/team", label: "Team" },
];

export function Navbar() {
  const [authOpen,    setAuthOpen]    = React.useState(false);
  const [mobileOpen,  setMobileOpen]  = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [user,        setUser]        = React.useState<any>(null);
  const [avatarSrc,   setAvatarSrc]   = React.useState<string | null>(null);
  const router      = useRouter();
  const profileRef  = React.useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  React.useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user ?? null;
      setUser(u);
      if (u) setAvatarSrc(resolveAvatar(u.id, u.user_metadata?.avatar_url));
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) setAvatarSrc(resolveAvatar(u.id, u.user_metadata?.avatar_url));
      else setAvatarSrc(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  function handleCTAClick() {
    if (user) router.push("/chat");
    else setAuthOpen(true);
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 border-b border-white/8 bg-black/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="FlashFetch" className="h-8 w-8 rounded-lg object-contain" />
              <span className="text-base font-semibold text-white tracking-tight">FlashFetch</span>
            </Link>

            {/* Center links — use <a> for hash anchors so the browser handles scroll after navigation */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/4 pl-1 pr-3 py-1 transition-colors hover:border-white/20 hover:bg-white/8"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white overflow-hidden">
                      {avatarSrc
                        ? <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                        : (user?.user_metadata?.full_name || user?.email || "U")[0].toUpperCase()
                      }
                    </div>
                    <span className="text-sm text-white/70">
                      {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 text-white/30 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/8">
                        <p className="text-sm font-medium text-white truncate">
                          {user?.user_metadata?.full_name || "User"}
                        </p>
                        <p className="text-xs text-white/35 truncate mt-0.5">{user?.email}</p>
                      </div>
                      <div className="p-1.5">
                        <button
                          onClick={() => { setProfileOpen(false); router.push("/profile"); }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/6 hover:text-white"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <button
                          onClick={() => { setProfileOpen(false); router.push("/chat"); }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/6 hover:text-white"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Go to Chat
                        </button>
                        <button
                          onClick={async () => {
                            setProfileOpen(false);
                            const s = createClient();
                            await s?.auth.signOut();
                            setUser(null);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/6 hover:text-red-400"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={handleCTAClick}
                    className="inline-flex items-center justify-center gap-2 rounded-md px-5 h-10 text-sm font-medium text-black transition-all hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.88), rgba(255,255,255,0.7))" }}
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/8">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors py-1.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors py-1.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/8">
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="text-sm text-white/60 hover:text-white transition-colors py-2 text-left"
                >
                  Sign in
                </button>
                <button
                  onClick={() => { handleCTAClick(); setMobileOpen(false); }}
                  className="rounded-md px-4 py-2.5 text-sm font-medium text-black"
                  style={{
                    background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.7))",
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        onSuccess={() => { setAuthOpen(false); router.push("/chat"); }}
      />
    </>
  );
}
