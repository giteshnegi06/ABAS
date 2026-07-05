import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, LogIn, Menu, Search, Shield, User, X } from "lucide-react";

export const NAV_LINKS = [
  {label:"Home", to: "/"},
  { label: "About", to: "/about" },
  { label: "Departments", to: "/departments" },
  { label: "Teams", to: "/teams" },
  { label: "Projects", to: "/projects" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export function SiteNav({ transparentOnTop = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparentOnTop || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/85 backdrop-blur-md border-b border-border text-foreground"
          : "bg-transparent text-cream"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-cream font-display text-lg">
            अ
          </span>
          <span className="font-display text-lg tracking-tight">ABAS</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-saffron" }}
              className="text-sm font-medium opacity-90 transition hover:opacity-100 hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-full border border-current/30 transition hover:bg-current/10"
          >
            <Search className="h-4 w-4" />
          </button>
          <SignInMenu />
          <Link
            to="/join"
            className="group inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-gold"
          >
            <Heart className="h-4 w-4" /> Join us
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-current/30 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-current/10 bg-background/95 backdrop-blur lg:hidden">
          <div className="flex flex-col px-6 py-4 text-foreground">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-base"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/auth"
              search={{ role: "member" }}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 text-sm font-medium"
            >
              <LogIn className="h-4 w-4" /> Member sign in
            </Link>
            <Link
              to="/auth"
              search={{ role: "admin" }}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-ink/60 px-5 py-3 text-sm font-medium"
            >
              <Shield className="h-4 w-4" /> Admin sign in
            </Link>
            <Link
              to="/join"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-5 py-3 text-sm font-medium text-cream"
            >
              <Heart className="h-4 w-4" /> Join us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function SignInMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onClick = () => setOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [open]);
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-current/30 px-4 py-2 text-sm font-medium transition hover:bg-current/10"
      >
        <LogIn className="h-4 w-4" /> Sign in <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-xl">
          <Link
            to="/auth"
            search={{ role: "member" }}
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 px-4 py-3 hover:bg-secondary"
          >
            <User className="mt-0.5 h-4 w-4 text-saffron" />
            <div>
              <div className="text-sm font-medium">Member Portal</div>
              <div className="text-xs text-muted-foreground">For registered members</div>
            </div>
          </Link>
          <Link
            to="/auth"
            search={{ role: "admin" }}
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 border-t border-border px-4 py-3 hover:bg-secondary"
          >
            <Shield className="mt-0.5 h-4 w-4 text-ink" />
            <div>
              <div className="text-sm font-medium">Admin Panel</div>
              <div className="text-xs text-muted-foreground">Restricted access</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-cream py-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-cream font-display text-lg">
              अ
            </span>
            <span className="font-display text-xl">ABAS</span>
          </Link>
          <p className="mt-6 max-w-md font-display text-2xl leading-tight text-ink">
            Akhil Bharatiya Agrawal Sammelan — <span className="script-accent">seva</span>,
            <span className="script-accent"> shiksha</span>,
            <span className="script-accent"> sanskar</span>.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Contact</div>
            <div className="mt-4 space-y-2 text-sm">
              <p>ABAS Kendra, Chandni Chowk</p>
              <p>New Delhi — 110006</p>
              <p className="pt-2">+91 11 4000 1976</p>
              <p>samparka@abas.org.in</p>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-saffron">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Get involved
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-saffron">Become a member</Link></li>
              <li><Link to="/contact" className="hover:text-saffron">Volunteer</Link></li>
              <li><Link to="/contact" className="hover:text-saffron">Donate</Link></li>
              <li><Link to="/departments" className="hover:text-saffron">Marriage Bureau</Link></li>
              <li><Link to="/contact" className="hover:text-saffron">Location map</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-start justify-between gap-4 border-t border-border px-6 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-10">
        <p>© {new Date().getFullYear()} Akhil Bharatiya Agrawal Sammelan. All rights reserved.</p>
        <p className="uppercase tracking-widest">एक ईंट · एक रुपैया · एक परिवार</p>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  script,
  intro,
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <section className="relative overflow-hidden border-b border-border bg-ink pt-40 pb-24 text-cream lg:pt-52 lg:pb-32">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 20%, oklch(0.68 0.18 45), transparent 60%), radial-gradient(700px 400px at 85% 90%, oklch(0.72 0.14 75), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] opacity-75">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div> */}
        <h1 className="max-w-4xl font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
          {title}
          {script && <> <span className="script-accent">{script}</span></>}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-base leading-relaxed opacity-85 md:text-lg">
            {intro}
          </p>
        )}
        {/* <div className="mt-10 text-xs uppercase tracking-widest opacity-50">
          {pathname}
        </div> */}
      </div>
    </section>
  );
}
