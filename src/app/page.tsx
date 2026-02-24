import Image from "next/image";
import ParallaxHero from "@/components/ParallaxHero";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Digital Coffee" width={32} height={32} />
            <span className="text-lg font-bold tracking-tight">Digital Coffee</span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <ParallaxHero />
        <div className="relative z-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Creative Digital Studio
          </p>
          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Your Digital Caffeine.
          </h1>

        </div>
      </section>

      {/* Our Apps */}
      <section id="apps" className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Our Apps</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Things we&apos;re building.
          </h2>
          <a
            href="https://tomeworlds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex max-w-lg overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm text-left transition-transform hover:scale-[1.02] hover:border-accent"
          >
            <div className="flex-1 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-muted">tomeworlds.com</p>
              <p className="mt-1 text-sm font-semibold leading-snug">TomeWorlds</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                A worldbuilding app for authors and creators. Organize characters, locations, and lore — all in one place.
              </p>
            </div>
            <div className="relative w-28 shrink-0">
              <Image
                src="/tomeworlds-thumb.png"
                alt="TomeWorlds"
                fill
                className="object-cover"
              />
            </div>
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">About</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Small studio. Big ideas.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Digital Coffee is a creative digital studio focused on building products that are fun,
            useful, and well-crafted. We design and develop apps, websites, and digital experiences
            from concept to launch.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Based in the United States, we move fast and keep things lean — no bloat, no fluff,
            just good work.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Digital Coffee, LLC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
