import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
];

const teamMembers = [
  { name: "Prodhosh V.S", href: "https://github.com/PRODHOSH" },
  { name: "S. Sharan", href: "https://www.instagram.com/sharansundarp/" },
  { name: "Ashish Reddy", href: "https://www.instagram.com/1xcidd/" },
  { name: "Mohamed Nawaz", href: "https://www.linkedin.com/in/mohamed-nawaz-n-248257393/" },
];

const socials = [
  { icon: Github, href: "https://github.com/PRODHOSH", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@flashfetch.io", label: "Email" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Top row */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/favicon.ico"
                alt="FlashFetch logo"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="text-xl font-semibold tracking-tight text-foreground">
                FlashFetch
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              An AI-powered document intelligence system — ask questions from your documents, instantly.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Navigate</h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">Team</h3>
            <ul className="flex flex-col gap-2.5">
              {teamMembers.map((member) => (
                <li key={member.name}>
                  <a
                    href={member.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {member.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FlashFetch. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
