import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { usePageVisible } from "../App";

import heroImg from "../assets/hero-abas.jpg";
import { SiteNav, SiteFooter } from "../Components/site-chrome";
import { departments, projects, events, news } from "../Data/site";

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <Hero />
      <Marquee />
      <AboutPreview />
      <DepartmentsPreview />
      <ProjectsPreview />
      <EventsPreview />
      <NewsPreview />
      <CallToAction />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  const visible = usePageVisible();
  // Paused until the overlay starts fading; then all animations play in stagger.
  const play = visible ? "running" : "paused";

  return (
    <section className="relative h-screen min-h-180 w-full overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Community gathering"
          width={1920}
          height={1280}
          className="ken-burns h-full w-full object-cover opacity-80"
          style={{ animationPlayState: play }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/20 to-ink/85" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-350 flex-col justify-end px-6 pb-24 lg:px-10 lg:pb-32">
        {/* Eyebrow — fades in first, slight delay */}
        <p
          className="hero-fade mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] opacity-90"
          style={{ animationPlayState: play }}
        >
          <span className="h-px w-8 bg-gold" /> Akhil Bharatiya Agrawal Sammelan
        </p>

        {/* Headline — slides up with a slightly longer duration */}
        <h1
          className="hero-reveal font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[92px]"
          style={{ animationPlayState: play }}
        >
          One community.<br />
          One mission.<br />
          <span className="relative inline-block">
            <span>Serving </span>
            <span className="script-accent text-6xl md:text-7xl lg:text-[96px]">samaj.</span>
            <svg viewBox="0 0 600 120" className="pointer-events-none absolute -bottom-6 left-0 h-16 w-full text-gold" fill="none">
              <path d="M20 80 C 160 20, 340 20, 580 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="draw-stroke" style={{ animationPlayState: play }} />
            </svg>
          </span>
        </h1>

        <div className="mt-12 flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Body copy — fades in last */}
          <p
            className="hero-fade text-base leading-relaxed opacity-85 sm:text-lg"
            style={{ animationDelay: "0.35s", animationPlayState: play }}
          >
            From Maharaja Agrasen's vision of shared prosperity to today's Bharat — we bring the
            Agrawal community together for education, health, environment and livelihood.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-3 self-start text-sm font-medium uppercase tracking-widest sm:self-end"
          >
            <span>Discover</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 transition group-hover:bg-cream group-hover:text-ink">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Shiksha", "Swasthya", "Vyapar Kosh", "Paryavaran", "Nari Shakti", "Rozgar", "Sanskar", "Seva"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-ink py-6 text-cream overflow-hidden">
      <div className="marquee flex whitespace-nowrap gap-14 pr-14">
        {row.map((t, i) => (
          <span key={i} className="font-display text-3xl md:text-4xl inline-flex items-center gap-14">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  script,
  href,
  cta,
  dark = false,
}) {
  return (
    <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div>
        <p className={`mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] ${dark ? "opacity-70" : "text-muted-foreground"}`}>
          <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-saffron"}`} /> {eyebrow}
        </p>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {title} {script && <span className="script-accent">{script}</span>}
        </h2>
      </div>
      <Link to={href} className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest ${dark ? "opacity-80 hover:opacity-100" : ""}`}>
        {cta} <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function AboutPreview() {
  const { ref, shown } = useReveal();
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div ref={ref} className={`grid gap-12 lg:grid-cols-12 lg:gap-20 ${shown ? "reveal" : "opacity-0"}`}>
          <div className="lg:col-span-7">
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-8 bg-saffron" /> About ABAS
            </p>
            <h2 className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">
              A federation of the Agrawal samaj — <span className="script-accent">rooted in dharma,</span> building{" "}
              <span className="text-saffron">tomorrow.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              ABAS unites lakhs of Agrawal families across every state, inspired by Maharaja
              Agrasen's principle of <em>ek ita, ek rupaiya</em> — one brick, one coin.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium">
              Read our story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5">
            {[["48+", "Years of seva"], ["230", "Sammelans"], ["12", "Vibhags"], ["2L+", "Families"]].map(([n, l]) => (
              <div key={l} className="border-t border-border pt-4">
                <div className="font-display text-4xl text-ink">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DepartmentsPreview() {
  const { ref, shown } = useReveal();
  const featured = departments.slice(0, 4);
  return (
    <section className="relative bg-ink py-28 text-cream lg:py-36">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <SectionHeader eyebrow="What we do" title="A glimpse of our" script="vibhags." href="/departments" cta="All departments" dark />
        <div ref={ref} className="grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={d.name}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`group relative flex flex-col justify-between bg-ink p-8 transition duration-500 hover:bg-cream/4 ${shown ? "reveal" : "opacity-0"}`}
              >
                {d.image && (
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-40">
                    <img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-ink/60" />
                  </div>
                )}
                <div className="relative">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-8 font-display text-2xl leading-tight">{d.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-70">{d.desc}</p>
                </div>
                <div className="relative mt-10 flex items-center justify-between text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">
                  <span>0{i + 1}</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  const featured = projects.slice(0, 2);
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <SectionHeader eyebrow="Our projects" title="Stories from the" script="field." href="/projects" cta="All projects" />
        <div className="grid gap-10 md:grid-cols-2">
          {featured.map((p) => (
            <article key={p.title} className="group cursor-pointer">
              <div className="relative aspect-5/4 overflow-hidden bg-secondary">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium uppercase tracking-widest text-ink">
                  {p.tag}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
                <div className="shrink-0 pt-1 text-right">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.year}</div>
                  <ArrowUpRight className="ml-auto mt-2 h-5 w-5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsPreview() {
  const featured = events.slice(0, 3);
  return (
    <section className="border-y border-border bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <SectionHeader eyebrow="Upcoming" title="Events &" script="sammelans" href="/events" cta="All events" />
        <div className="divide-y divide-border border-y border-border">
          {featured.map((e) => (
            <Link to="/events" key={e.title} className="group grid grid-cols-12 items-center gap-4 py-8 transition hover:bg-cream">
              <div className="col-span-3 md:col-span-2">
                <div className="font-display text-3xl">{e.date}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{e.year}</div>
              </div>
              <div className="col-span-7 md:col-span-8">
                <h3 className="font-display text-xl md:text-2xl">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
              </div>
              <div className="col-span-2 flex justify-end">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/40 transition group-hover:bg-ink group-hover:text-cream">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsPreview() {
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <SectionHeader eyebrow="Samachar" title="Latest" script="news" href="/projects" cta="All stories" />
        <div className="grid gap-10 md:grid-cols-3">
          {news.map((n) => (
            <article key={n.title} className="group cursor-pointer border-t border-ink pt-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>{n.kicker}</span>
                <span>{n.date}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight transition group-hover:text-saffron">{n.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Read story <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream lg:py-36">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(1000px 500px at 20% 20%, oklch(0.68 0.18 45), transparent 60%), radial-gradient(800px 400px at 80% 80%, oklch(0.72 0.14 75), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-350 px-6 text-center lg:px-10">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] opacity-70">Join the organization</p>
        <h2 className="mx-auto max-w-4xl font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Become part of a <span className="script-accent">movement</span> that has served samaj for five decades.
        </h2>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/join" className="inline-flex items-center gap-3 rounded-full bg-saffron px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition hover:bg-gold">
            Membership application <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-3 rounded-full border border-cream/40 px-8 py-4 text-sm font-medium uppercase tracking-widest transition hover:bg-cream/10">
            Volunteer with us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
