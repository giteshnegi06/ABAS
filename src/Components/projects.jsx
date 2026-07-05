import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";
import { projects } from "../Data/site";

const groups = [
  { tag: "Ongoing", heading: "Ongoing projects" },
  { tag: "Completed", heading: "Completed projects" },
  { tag: "Future", heading: "Future projects" },
];

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <PageHero
        eyebrow="Projects"
        title="Stories from the"
        script="field."
        intro="From village clinics to city schools, our projects are run by local volunteers with full transparency and yearly public reporting."
      />

      {groups.map((g, gi) => {
        const items = projects.filter((p) => p.tag === g.tag);
        if (items.length === 0) return null;
        return (
          <section key={g.tag} className={`${gi % 2 === 1 ? "border-y border-border bg-secondary" : ""} py-24 lg:py-28`}>
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
              <div className="mb-12 flex items-end justify-between gap-6">
                <h2 className="font-display text-3xl leading-tight md:text-5xl">{g.heading}</h2>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{items.length} project{items.length > 1 && "s"}</span>
              </div>
              <div className="grid gap-10 md:grid-cols-2">
                {items.map((p) => (
                  <article key={p.title} className="group cursor-pointer">
                    <div className="relative aspect-[5/4] overflow-hidden bg-secondary">
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
      })}

      <SiteFooter />
    </div>
  );
}

export default ProjectsPage;
