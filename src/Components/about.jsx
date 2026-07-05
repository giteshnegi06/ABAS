import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import agrasenImg from "../assets/agrasen.jpg";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";

const values = [
  { title: "Ekta", desc: "One samaj, above region, language and gotra." },
  { title: "Seva", desc: "Service before self — for family, community, and nation." },
  { title: "Vidya", desc: "Education as the birthright of every Agrawal child." },
  { title: "Vyapar", desc: "Ethical enterprise built on trust and shared prosperity." },
];

const history = [
  ["1976", "ABAS founded", "A handful of elders in Delhi convene the first Sammelan to unite Agrawal chapters across Bharat."],
  ["1988", "First Vidya Kendra", "Scholarships program launched; the first Agrasen school opens in Rajasthan."],
  ["2004", "Health Vibhag", "Mobile clinics and free camps rolled out across five states."],
  ["2019", "Digital sammelan", "Marriage Bureau and Vyapar Kosh go online, reaching lakhs of families."],
  ["2026", "One Lakh Trees", "Nationwide Paryavaran drive to plant a lakh native trees by 2028."],
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <PageHero
        eyebrow="About"
        title="A federation of the Agrawal samaj —"
        script="ek parivar."
        intro="ABAS unites lakhs of Agrawal families across every state through a network of vibhags, teams and yojnas. Inspired by Maharaja Agrasen's principle of ek ita, ek rupaiya — one brick, one coin."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
              <img src={agrasenImg} alt="Maharaja Agrasen" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-cream">
                <p className="script-accent text-2xl">since 1976</p>
                <p className="font-display text-xl">Maharaja Agrasen</p>
                <p className="text-xs opacity-80">Symbol of unity, equality & seva</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-8 bg-saffron" /> Vision & Mission
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Building a self-reliant, educated and compassionate Agrawal samaj that serves Bharat.
            </h2>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Maharaja Agrasen ruled with a radical idea — every new family arriving in his
                kingdom received one brick and one coin from every existing family. Prosperity was
                a collective act, not an individual pursuit.
              </p>
              <p>
                Almost five millennia later, ABAS carries this idea forward. We're a national body
                that connects 230+ local Agrawal Sammelans, works with 12 active vibhags, and puts
                seva at the centre of everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-saffron" /> Our values
          </p>
          <h2 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Four words we live by.
          </h2>
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="bg-background p-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">0{i + 1}</div>
                <div className="mt-8 font-display text-4xl">{v.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-saffron" /> History
          </p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            Fifty years of <span className="script-accent">samaj seva.</span>
          </h2>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {history.map(([year, title, desc]) => (
              <div key={year} className="grid grid-cols-12 gap-4 py-8">
                <div className="col-span-3 md:col-span-2 font-display text-3xl">{year}</div>
                <div className="col-span-9 md:col-span-10">
                  <h3 className="font-display text-xl md:text-2xl">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <Link to="/departments" className="inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium">
              Explore our departments <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default AboutPage;
