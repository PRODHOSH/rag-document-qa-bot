export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-semibold tracking-tighter text-foreground">
          About Us
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          TopDevs is a community-driven platform that connects the world's most
          talented developers with businesses that need them most. We believe
          great software is built by great people — and we make it easy to find
          both.
        </p>
      </div>

      {/* Mission */}
      <div className="mx-auto mt-20 max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Our Mission",
              body:
                "Streamline how small and medium businesses hire top engineering talent — faster, fairer, and with less friction than ever before.",
            },
            {
              title: "Our Vision",
              body:
                "A world where every ambitious project finds the right developer, and every great developer finds the right project — without endless back-and-forth.",
            },
            {
              title: "Our Values",
              body:
                "Transparency, craft, and community. We ship in the open, hold ourselves to high standards, and invest in the people who make the ecosystem thrive.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mx-auto mt-24 max-w-4xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
          Meet the team
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              name: "Alex Rivera",
              role: "Co-founder & CEO",
              avatar: "https://i.pravatar.cc/150?img=11",
              bio: "Former engineering lead at Stripe. Obsessed with developer experience and clean APIs.",
            },
            {
              name: "Priya Nair",
              role: "Co-founder & CTO",
              avatar: "https://i.pravatar.cc/150?img=47",
              bio: "Full-stack engineer with 10+ years shipping products at scale. Loves Rust and coffee.",
            },
            {
              name: "Jordan Lee",
              role: "Head of Design",
              avatar: "https://i.pravatar.cc/150?img=33",
              bio: "Pixel-perfect designer who thinks design systems are the best investment a team can make.",
            },
            {
              name: "Sam Okafor",
              role: "Head of Growth",
              avatar: "https://i.pravatar.cc/150?img=60",
              bio: "Growth strategist who grew three startups from zero to their first 10 k users.",
            },
            {
              name: "Taylor Chen",
              role: "Lead Engineer",
              avatar: "https://i.pravatar.cc/150?img=25",
              bio: "Open-source contributor and TypeScript advocate. Maintains several popular npm packages.",
            },
            {
              name: "Morgan Walsh",
              role: "Community Lead",
              avatar: "https://i.pravatar.cc/150?img=45",
              bio: "Connects developers worldwide and organises the annual TopDevs summit.",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-border"
              />
              <h3 className="mt-4 font-semibold text-foreground">
                {member.name}
              </h3>
              <span className="mt-1 text-xs font-medium text-muted-foreground">
                {member.role}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-24 max-w-3xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "12 k+", label: "Developers" },
            { value: "3.4 k", label: "Companies" },
            { value: "98%", label: "Satisfaction" },
            { value: "42", label: "Countries" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
