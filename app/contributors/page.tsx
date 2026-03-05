import { Github, Globe, Twitter } from "lucide-react";

const contributors = [
  {
    name: "Taylor Chen",
    handle: "taylorchen",
    avatar: "https://i.pravatar.cc/150?img=25",
    role: "Core Maintainer",
    commits: 842,
    prs: 217,
    bio: "TypeScript wizard. Owns the compiler pipeline and CI infrastructure.",
    tags: ["TypeScript", "CI/CD", "Tooling"],
    github: "https://github.com",
    website: "https://example.com",
  },
  {
    name: "Nia Oduya",
    handle: "niaoduya",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Core Contributor",
    commits: 631,
    prs: 154,
    bio: "Accessibility advocate. Every PR she touches ships with full ARIA support.",
    tags: ["Accessibility", "React", "CSS"],
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Riku Tanaka",
    handle: "rikutanaka",
    avatar: "https://i.pravatar.cc/150?img=68",
    role: "Core Contributor",
    commits: 509,
    prs: 128,
    bio: "Performance nerd. Cut bundle size by 40% and p99 latency by half.",
    tags: ["Performance", "Rust", "WASM"],
    github: "https://github.com",
  },
  {
    name: "Lena Müller",
    handle: "lenamueller",
    avatar: "https://i.pravatar.cc/150?img=44",
    role: "Docs Lead",
    commits: 394,
    prs: 203,
    bio: "Turns cryptic internals into docs that junior devs actually understand.",
    tags: ["Docs", "MDX", "Education"],
    github: "https://github.com",
    website: "https://example.com",
  },
  {
    name: "Carlos Vega",
    handle: "carlosvega",
    avatar: "https://i.pravatar.cc/150?img=53",
    role: "Contributor",
    commits: 278,
    prs: 89,
    bio: "Back-end specialist who owns the auth and billing integrations.",
    tags: ["Node.js", "Auth", "PostgreSQL"],
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Aisha Patel",
    handle: "aishapatel",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Contributor",
    commits: 201,
    prs: 67,
    bio: "Mobile-first thinker. Responsible for our responsive design system.",
    tags: ["Design System", "Figma", "Tailwind"],
    github: "https://github.com",
    website: "https://example.com",
  },
  {
    name: "Finn Larsen",
    handle: "finnlarsen",
    avatar: "https://i.pravatar.cc/150?img=15",
    role: "Contributor",
    commits: 163,
    prs: 42,
    bio: "DevOps engineer who keeps our Kubernetes cluster humming.",
    tags: ["K8s", "Terraform", "AWS"],
    github: "https://github.com",
  },
  {
    name: "Zoe Kim",
    handle: "zoekim",
    avatar: "https://i.pravatar.cc/150?img=49",
    role: "Contributor",
    commits: 118,
    prs: 38,
    bio: "Testing evangelist — our coverage went from 42% to 91% since she joined.",
    tags: ["Testing", "Vitest", "Playwright"],
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

const tierColor: Record<string, string> = {
  "Core Maintainer": "bg-primary text-primary-foreground",
  "Core Contributor": "bg-secondary text-secondary-foreground",
  "Docs Lead": "bg-secondary text-secondary-foreground",
  Contributor: "bg-muted text-muted-foreground",
};

export default function ContributorsPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-semibold tracking-tighter text-foreground">
          Contributors
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          TopDevs is built by a passionate open-source community. Every commit,
          bug report, and documentation fix makes the platform better for
          everyone.
        </p>
      </div>

      {/* Stats bar */}
      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-6">
        {[
          { value: "3 136", label: "Total commits" },
          { value: "938", label: "Pull requests" },
          { value: "8", label: "Core members" },
          { value: "91%", label: "Test coverage" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold tracking-tight text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {contributors.map((c) => (
          <div
            key={c.handle}
            className="flex flex-col rounded-2xl border border-border bg-card p-5"
          >
            {/* Avatar + tier */}
            <div className="flex items-start justify-between">
              <img
                src={c.avatar}
                alt={c.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-border"
              />
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${tierColor[c.role] ?? "bg-muted text-muted-foreground"}`}
              >
                {c.role}
              </span>
            </div>

            {/* Name */}
            <h3 className="mt-3 font-semibold text-foreground">{c.name}</h3>
            <span className="text-xs text-muted-foreground">@{c.handle}</span>

            {/* Bio */}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {c.bio}
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
              <span>
                <strong className="text-foreground">{c.commits}</strong> commits
              </span>
              <span>
                <strong className="text-foreground">{c.prs}</strong> PRs
              </span>
            </div>

            {/* Social links */}
            <div className="mt-4 flex gap-2">
              {c.github && (
                <a
                  href={c.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              {"twitter" in c && c.twitter && (
                <a
                  href={c.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
              )}
              {"website" in c && c.website && (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Website"
                >
                  <Globe className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mx-auto mt-20 max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Want to contribute?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We're always open to new ideas, bug fixes, and feature requests.
          Check out our GitHub and jump in.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </a>
      </div>
    </main>
  );
}
