import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";

const offices = [
  { city: "New Delhi (HQ)", addr: "ABAS Kendra, Chandni Chowk, Delhi 110006", phone: "+91 11 4000 1976" },
  { city: "Mumbai", addr: "Agrasen Bhavan, Fort, Mumbai 400001", phone: "+91 22 2200 1976" },
  { city: "Kolkata", addr: "Agrawal Sabha, Burrabazar, Kolkata 700007", phone: "+91 33 2200 1976" },
  { city: "Chennai", addr: "Agrasen Hall, Sowcarpet, Chennai 600079", phone: "+91 44 2500 1976" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparentOnTop />
      <PageHero
        eyebrow="Contact"
        title="Say"
        script="namaste."
        intro="Whether you want to become a member, volunteer with a vibhag, or partner on a project — we'd love to hear from you."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-5">
            <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-8 bg-saffron" /> Reach us
            </p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">Head office & helpline</h2>

            <ul className="mt-10 space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-saffron" strokeWidth={1.5} />
                <div>
                  <div className="font-medium">ABAS Kendra, Chandni Chowk</div>
                  <div className="text-muted-foreground">New Delhi — 110006, Bharat</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-saffron" strokeWidth={1.5} />
                <div>
                  <div className="font-medium">+91 11 4000 1976</div>
                  <div className="text-muted-foreground">Mon–Sat · 10 am to 6 pm IST</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 text-saffron" strokeWidth={1.5} />
                <div>
                  <div className="font-medium">samparka@abas.org.in</div>
                  <div className="text-muted-foreground">We reply within two working days</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-sm border border-border bg-secondary/40 p-8 md:p-10"
            >
              <h3 className="font-display text-2xl md:text-3xl">Send a message</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone" name="phone" />
                <Field label="City" name="city" />
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    I'd like to
                  </label>
                  <select className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-saffron">
                    <option>Become a member</option>
                    <option>Volunteer with a vibhag</option>
                    <option>Partner on a project</option>
                    <option>Register for Marriage Bureau</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none focus:border-saffron"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-saffron px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition hover:bg-gold"
              >
                {sent ? "Dhanyavaad — we'll be in touch" : "Send message"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">Regional offices</h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <div key={o.city} className="bg-background p-8">
                <div className="font-display text-2xl">{o.city}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.addr}</p>
                <p className="mt-3 text-sm text-saffron">{o.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-saffron"
      />
    </div>
  );
}

export default ContactPage;
