import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CreditCard, FileText, ShieldCheck, Upload, UserPlus, QrCode } from "lucide-react";
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
        <div className="mx-auto max-w-4xl px-6 flex flex-col items-center lg:px-10">
          {/* Stepper */}
          <ol className=" mb-14 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = i < idx;
              const active = i === idx;
              return (
                <li key={s.key} className="flex flex-1 items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`grid h-8 w-8 md:h-12 md:w-12  place-items-center rounded-full border transition ${active ? "border-saffron bg-saffron text-cream" : done ? "border-saffron/60 bg-saffron/10 text-saffron" : "border-border bg-background text-muted-foreground"
                        }`}
                    >
                      {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={`mt-2 text-[10px] uppercase tracking-widest ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="rounded-sm border border-border bg-background p-8 md:p-12 w-full">
            {step === "type" && <StepType selected={type} onSelect={setType} onNext={next} />}
            {step === "form" && <StepForm onNext={next} onBack={back} />}
            {step === "docs" && <StepDocs onNext={next} onBack={back} />}
            {step === "pay" && <StepPay type={type} onNext={next} onBack={back} />}
            {step === "done" && <StepDone type={type} />}
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

function StepNavigation({ onBack, onNext, isFirst = false, nextLabel = "Continue", isSubmit = false }) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-border pt-6 w-full">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-40 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <button
        type={isSubmit ? "submit" : "button"}
        onClick={isSubmit ? undefined : onNext}
        className="inline-flex items-center gap-3 rounded-full bg-saffron px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream transition hover:bg-gold cursor-pointer"
      >
        {nextLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function StepType({ selected, onSelect, onNext }) {
  return (
    <div>
      <h2 className="font-display text-3xl md:text-4xl">Choose your membership</h2>
      <p className="mt-2 text-sm text-muted-foreground">You can upgrade later at any time.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {membershipTypes.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`rounded-sm border p-6 text-left transition ${selected === m.id ? "border-saffron bg-saffron/5 ring-1 ring-saffron" : "border-border hover:border-ink/40"
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
      <StepNavigation onNext={onNext} isFirst />
    </div>
  );
}

function StepForm({ onNext, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-3xl md:text-4xl">Fill your application</h2>
        <p className="mt-2 text-sm text-muted-foreground">Details will appear on your Digital ID card. All details are required.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Input label="Full name" placeholder="As per Aadhaar" required />
          <Input label="Father / Husband name" required />
          <Input label="Date of birth" type="date" required />
          <Input label="Gotra" placeholder="e.g. Garg, Bansal" required />
          <Input label="Mobile" type="tel" placeholder="+91" required />
          <Input label="Email" type="email" required />
          <Input label="Occupation / Business" required />
          <Input label="Blood group" placeholder="O+" required />
          <div className="sm:col-span-2">
            <Input label="Address" placeholder="House, street, city, PIN" required />
          </div>
          <Input label="State" required />
          <Input label="District" required />
        </div>
        <StepNavigation onBack={onBack} isSubmit nextLabel="Continue" />
      </form>
    </div>
  );
}

function StepDocs({ onNext, onBack }) {
  const docs = ["Photo (passport size)", "Aadhaar / PAN", "Proof of Agrawal lineage (optional)"];
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <StepNavigation onBack={onBack} isSubmit nextLabel="Continue" />
      </form>
    </div>
  );
}

function StepPay({ type, onNext, onBack }) {
  const m = membershipTypes.find((x) => x.id === type);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-3xl md:text-4xl">Payment</h2>
        <p className="mt-2 text-sm text-muted-foreground">Secure checkout · choose your preferred method below.</p>

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

        {/* Payment Method Switcher */}
        <div className="mt-6 flex border border-border rounded-lg overflow-hidden bg-secondary/20 p-1">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-md transition cursor-pointer ${
              paymentMethod === "card" ? "bg-saffron text-cream animate-pulse-once" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Credit / Debit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            className={`flex-1 py-2 text-center text-xs font-semibold rounded-md transition cursor-pointer ${
              paymentMethod === "upi" ? "bg-saffron text-cream animate-pulse-once" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            UPI Payment (QR / VPA)
          </button>
        </div>

        {paymentMethod === "card" && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input label="Card number" placeholder="4242 4242 4242 4242" required />
            </div>
            <Input label="Expiry" placeholder="MM / YY" required />
            <Input label="CVC" placeholder="123" required />
            <div className="sm:col-span-2">
              <Input label="Name on card" required />
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg bg-background">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Scan QR to pay {m.price}</p>
              {/* Simulated UPI QR Code */}
              <div className="relative p-4 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center">
                <QrCode className="h-40 w-40 text-slate-800" strokeWidth={1.5} />
                <div className="absolute grid h-10 w-10 place-items-center rounded-full bg-saffron text-cream font-display text-xs border-2 border-white shadow-md">
                  अ
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 text-center">
                Merchant: ABAS National Trust<br />
                UPI ID: <span className="font-mono text-foreground font-semibold">abas@sbi</span>
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Your UPI ID" placeholder="username@upi" required />
              <Input label="12-Digit UTR / Transaction ID" placeholder="e.g. 301234567890" pattern="[0-9]{12}" title="Please enter valid 12-digit transaction ID" required />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-start gap-3 rounded-sm bg-secondary/60 p-4 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-saffron" />
          Your details are encrypted and never stored on our servers. This is a test-mode form — no charge will be made.
        </div>

        <StepNavigation onBack={onBack} isSubmit nextLabel="Pay & submit" />
      </form>
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
          className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream hover:bg-gold cursor-pointer"
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
