"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthModal } from "@/components/ui/auth-modal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contributors", label: "Contributors" },
  { href: "/team", label: "Team" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border border-border",
        "text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Navbar() {
  const [authOpen, setAuthOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container relative mx-auto flex h-20 items-center px-4">

          {/* Left — logo */}
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/favicon.ico"
                alt="top-devs logo"
                width={32}
                height={32}
                className="rounded-md"
                priority
              />
              <span className="text-xl font-bold tracking-tight text-foreground">
                top-devs
              </span>
            </Link>
          </div>

          {/* Center — desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-base font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-foreground" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right — theme toggle + sign in */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />

            <button
              onClick={() => setAuthOpen(true)}
              className={cn(
                "hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground",
                "transition-colors hover:bg-primary/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "md:flex"
              )}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden",
                "text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-border bg-background px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-base font-medium transition-colors",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                className={cn(
                  "mt-2 flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-base font-medium text-primary-foreground",
                  "transition-colors hover:bg-primary/90"
                )}
              >
                <LogIn className="h-4 w-4" />
                Sign In / Login
              </button>
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}

