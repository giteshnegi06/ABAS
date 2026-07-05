import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";
import { departments } from "../Data/site";

function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <PageHero
        eyebrow="Departments"
        title="Twelve vibhags."
        script="One samaj."
        intro="Each vibhag operates independently with its own team, budget and outreach — coordinated through the national council."
      />

      <section className="bg-ink py-24 text-cream lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={d.name} className="group relative flex flex-col justify-between bg-ink p-8 transition duration-500 hover:bg-cream/[0.04]">
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
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default DepartmentsPage;
