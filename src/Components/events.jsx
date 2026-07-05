import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";
import { events } from "../Data/site";

function EventsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <PageHero
        eyebrow="Events"
        title="Events &"
        script="sammelans."
        intro="From the annual Agrasen Jayanti to intimate youth shivirs — a full calendar of what's coming up."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="divide-y divide-border border-y border-border">
            {events.map((e) => (
              <a href="#" key={e.title} className="group grid grid-cols-12 items-center gap-4 py-10 transition hover:bg-secondary">
                <div className="col-span-3 md:col-span-2">
                  <div className="font-display text-4xl">{e.date}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{e.year}</div>
                </div>
                <div className="col-span-7 md:col-span-8">
                  <h3 className="font-display text-2xl md:text-3xl">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.place}</p>
                </div>
                <div className="col-span-2 flex justify-end">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/40 transition group-hover:bg-ink group-hover:text-cream">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default EventsPage;
