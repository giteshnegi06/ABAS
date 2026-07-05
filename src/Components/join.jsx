import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CreditCard, FileText, ShieldCheck, Upload, UserPlus } from "lucide-react";
import { PageHero, SiteFooter, SiteNav } from "./site-chrome";

const membershipTypes = [
  { id: "life", name: "Life membership", price: "₹ 11,000", term: "One-time", perks: ["Lifetime Digital ID", "Vote in AGMs", "Marriage Bureau access", "Vibhag participation"] },
  { id: "patron", name: "Patron member", price: "₹ 51,000", term: "One-time", perks: ["Everything in Life", "Listed on donor wall", "Priority sammelan seats", "Annual Patrons' dinner"] },
  { id: "annual", name: "Annual member", price: "₹ 1,100", term: "Per year", perks: ["Digital ID (1 yr)", "Newsletter", "Local vibhag events", "Renewable"] },
];

const steps = [
  { key: "type", label: "Type", icon: UserPlus },
  { key: "form", label: "Application", icon: FileText },
  { key: "docs", label: "Documents", icon: Upload },
  { key: "pay", label: "Payment", icon: CreditCard },
  { key: "done", label: "Complete", icon: Check },
];

export default function JoinPage() {
  const [step, setStep] = useState("type");
  const [type, setType] = useState("life");
  const idx = steps.findIndex((s) => s.key === step);
  const next = () => setStep(steps[Math.min(idx + 1, steps.length - 1)].key);
  const back = () => setStep(steps[Math.max(idx - 1, 0)].key);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PageHero
        eyebrow="Join us"
        title="Become a"
        script="member."
        intro="Join lakhs of Agrawal families across Bharat. Five simple steps — takes under 10 minutes."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Stepper */}
          <ol className="mb-14 flex items-center justify-between gap-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = i < idx;
              const active = i === idx;
              return (
                <li key={s.key} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                        active ? "border-saffron bg-saffron text-cream" : done ? "border-saffron/60 bg-saffron/10 text-saffron" : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={`mt-2 text-[10px] uppercase tracking-widest ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`mx-2 h-px flex-1 ${done ? "bg-saffron/60" : "bg-border"}`} />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="rounded-sm border border-border bg-background p-8 md:p-12">
            {step === "type" && <StepType selected={type} onSelect={setType} />}
            {step === "form" && <StepForm />}
            {step === "docs" && <StepDocs />}
            {step === "pay" && <StepPay type={type} />}
            {step === "done" && <StepDone type={type} />}

            {step !== "done" && (
              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <button
                  onClick={back}
                  disabled={idx === 0}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-3 rounded-full bg-saffron px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream transition hover:bg-gold"
                >
                  {step === "pay" ? "Pay & submit" : "Continue"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link to="/auth" search={{ role: "member" }} className="text-saffron font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function StepType({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl">Choose your membership</h2>
      <p className="mt-2 text-sm text-muted-foreground">You can upgrade later at any time.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {membershipTypes.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`rounded-sm border p-6 text-left transition ${
              selected === m.id ? "border-saffron bg-saffron/5 ring-1 ring-saffron" : "border-border hover:border-ink/40"
            }`}
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.term}</div>
            <div className="mt-1 font-display text-2xl">{m.name}</div>
            <div className="mt-3 font-display text-3xl text-saffron">{m.price}</div>
            <ul className="mt-5 space-y-2 text-sm">
              {m.perks.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" /> {p}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepForm() {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl">Fill your application</h2>
      <p className="mt-2 text-sm text-muted-foreground">Details will appear on your Digital ID card.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Input label="Full name" placeholder="As per Aadhaar" />
        <Input label="Father / Husband name" />
        <Input label="Date of birth" type="date" />
        <Input label="Gotra" placeholder="e.g. Garg, Bansal" />
        <Input label="Mobile" type="tel" placeholder="+91" />
        <Input label="Email" type="email" />
        <Input label="Occupation / Business" />
        <Input label="Blood group" placeholder="O+" />
        <div className="sm:col-span-2">
          <Input label="Address" placeholder="House, street, city, PIN" />
        </div>
        <Input label="State" />
        <Input label="District" />
      </div>
    </div>
  );
}

function StepDocs() {
  const docs = ["Photo (passport size)", "Aadhaar / PAN", "Proof of Agrawal lineage (optional)"];
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl">Upload documents</h2>
      <p className="mt-2 text-sm text-muted-foreground">JPG, PNG or PDF · max 5 MB each.</p>
      <div className="mt-8 space-y-4">
        {docs.map((d) => (
          <label key={d} className="flex cursor-pointer items-center justify-between rounded-sm border border-dashed border-border p-5 transition hover:border-saffron hover:bg-saffron/5">
            <div className="flex items-center gap-4">
              <Upload className="h-5 w-5 text-saffron" />
              <div>
                <div className="text-sm font-medium">{d}</div>
                <div className="text-xs text-muted-foreground">Click to browse or drag & drop</div>
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Select file</span>
            <input type="file" className="hidden" />
          </label>
        ))}
      </div>
    </div>
  );
}

function StepPay({ type }) {
  const m = membershipTypes.find((x) => x.id === type);
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl">Payment</h2>
      <p className="mt-2 text-sm text-muted-foreground">Secure checkout · powered by Stripe (test mode).</p>

      <div className="mt-8 rounded-sm border border-border bg-secondary/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected plan</div>
            <div className="mt-1 font-display text-2xl">{m.name}</div>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl text-saffron">{m.price}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.term}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input label="Card number" placeholder="4242 4242 4242 4242" />
        </div>
        <Input label="Expiry" placeholder="MM / YY" />
        <Input label="CVC" placeholder="123" />
        <div className="sm:col-span-2">
          <Input label="Name on card" />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-sm bg-secondary/60 p-4 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 text-saffron" />
        Your card details are encrypted and never stored on our servers. This is a test-mode form — no charge will be made.
      </div>
    </div>
  );
}

function StepDone({ type }) {
  const navigate = useNavigate();
  const m = membershipTypes.find((x) => x.id === type);
  const memberId = "ABAS-" + Math.floor(100000 + Math.random() * 900000);
  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-saffron/10 text-saffron">
        <Check className="h-8 w-8" />
      </div>
      <h2 className="mt-6 font-display text-3xl md:text-4xl">Dhanyavaad — application received</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Your {m.name.toLowerCase()} application <span className="font-medium text-foreground">{memberId}</span> is pending admin approval.
        You'll receive an email once approved (usually within 48 hours).
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-sm border border-border bg-secondary/40 p-6 text-left">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Reference number</div>
        <div className="mt-1 font-display text-2xl">{memberId}</div>
        <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Status</div>
        <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-ink">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> Pending verification
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={() => navigate({ to: "/portal" })}
          className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream hover:bg-gold"
        >
          Go to Member Portal <ArrowRight className="h-4 w-4" />
        </button>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...props}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none transition focus:border-saffron"
      />
    </div>
  );
}
