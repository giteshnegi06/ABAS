import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";
import { teams } from "../Data/site";

function TeamsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <PageHero
        eyebrow="Teams"
        title="Organised like a"
        script="parivar."
        intro="ABAS runs on a six-tier structure — from the national council to your neighbourhood colony team. Every layer is elected, transparent and accountable."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((t, i) => (
              <article key={t.name} className="group border-t border-ink pt-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1}</div>
                <h3 className="mt-6 font-display text-3xl leading-tight">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-saffron">{t.count}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default TeamsPage;
