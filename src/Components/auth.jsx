import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Mail, Phone, Shield, User } from "lucide-react";
import { SiteFooter, SiteNav } from "./site-chrome";

export default function AuthPage() {
  const search = useSearch({ strict: false });
  const role = search.role === "admin" ? "admin" : "member";
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [method, setMethod] = useState("email");
  const [otpSent, setOtpSent] = useState(false);

  const isAdmin = role === "admin";
  const accent = isAdmin ? "bg-ink text-cream" : "bg-saffron text-cream";
  const target = isAdmin ? "/admin" : "/portal";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto grid min-h-screen max-w-[1400px] gap-0 pt-24 lg:grid-cols-2">
        {/* Side panel */}
        <div className={`relative hidden overflow-hidden lg:block ${isAdmin ? "bg-ink text-cream" : "bg-secondary"}`}>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: isAdmin
                ? "radial-gradient(600px 400px at 20% 30%, oklch(0.3 0.05 60), transparent 60%)"
                : "radial-gradient(600px 400px at 20% 30%, oklch(0.85 0.14 65), transparent 60%)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-12">
            <Link to="/" className="text-xs uppercase tracking-[0.3em] opacity-70 hover:opacity-100">
              ← Back to abas.org.in
            </Link>
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest ${isAdmin ? "bg-cream/10" : "bg-ink/5"}`}>
                {isAdmin ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                {isAdmin ? "Admin Panel" : "Member Portal"}
              </div>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
                {isAdmin ? (
                  <>Manage the <span className="script-accent">samaj.</span></>
                ) : (
                  <>Welcome back to the <span className="script-accent">parivar.</span></>
                )}
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed opacity-85">
                {isAdmin
                  ? "Restricted access. National, State and District administrators only."
                  : "Access your digital ID, membership, meetings, donations and activity."}
              </p>
            </div>
            <div className="text-xs uppercase tracking-widest opacity-50">एक ईंट · एक रुपैया · एक परिवार</div>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center px-6 py-16 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex gap-1 rounded-full bg-secondary p-1">
              <Link
                to="/auth"
                search={{ role: "member" }}
                className={`flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition ${!isAdmin ? "bg-background shadow-sm" : "opacity-60"}`}
              >
                Member
              </Link>
              <Link
                to="/auth"
                search={{ role: "admin" }}
                className={`flex-1 rounded-full px-4 py-2 text-center text-sm font-medium transition ${isAdmin ? "bg-background shadow-sm" : "opacity-60"}`}
              >
                Admin
              </Link>
            </div>

            <h2 className="font-display text-3xl md:text-4xl">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "login"
                ? isAdmin ? "Authorised administrators only." : "Use your registered email or phone."
                : "Members should register via Join Us."}
            </p>

            {!isAdmin && (
              <div className="mt-6 flex gap-2 border-b border-border">
                <MethodTab active={method === "email"} onClick={() => setMethod("email")} icon={<Mail className="h-4 w-4" />} label="Email" />
                <MethodTab active={method === "phone"} onClick={() => setMethod("phone")} icon={<Phone className="h-4 w-4" />} label="Phone / OTP" />
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (method === "phone" && !otpSent) {
                  setOtpSent(true);
                  return;
                }
                navigate({ to: target });
              }}
              className="mt-8 space-y-5"
            >
              {method === "email" || isAdmin ? (
                <>
                  <FormField icon={<Mail className="h-4 w-4" />} label="Email" type="email" placeholder="you@example.com" />
                  <FormField icon={<Lock className="h-4 w-4" />} label="Password" type="password" placeholder="••••••••" />
                </>
              ) : (
                <>
                  <FormField icon={<Phone className="h-4 w-4" />} label="Mobile number" type="tel" placeholder="+91 98XXX XXXXX" />
                  {otpSent && (
                    <FormField icon={<Lock className="h-4 w-4" />} label="6-digit OTP" type="text" placeholder="••••••" />
                  )}
                </>
              )}

              {mode === "login" && (method === "email" || isAdmin) && (
                <div className="flex justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded" /> Remember me
                  </label>
                  <button type="button" className="text-saffron hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium uppercase tracking-widest transition hover:opacity-90 ${accent}`}
              >
                {method === "phone" && !otpSent ? "Send OTP" : mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {!isAdmin && (
                <>
                  <div className="relative py-2 text-center text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="relative z-10 bg-background px-3">or continue with</span>
                    <span className="absolute left-0 right-0 top-1/2 h-px bg-border" />
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate({ to: target })}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-secondary"
                  >
                    <GoogleIcon /> Continue with Google
                  </button>
                </>
              )}
            </form>

            {!isAdmin && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>
                    New to ABAS?{" "}
                    <Link to="/join" className="text-saffron font-medium hover:underline">
                      Register as a member
                    </Link>
                  </>
                ) : (
                  <button onClick={() => setMode("login")} className="text-saffron hover:underline">
                    Already have an account? Sign in
                  </button>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function MethodTab({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${active ? "border-saffron text-foreground" : "border-transparent text-muted-foreground"}`}
    >
      {icon} {label}
    </button>
  );
}

function FormField({ icon, label, ...props }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2 flex items-center gap-3 border-b border-border pb-2 focus-within:border-saffron">
        <span className="text-muted-foreground">{icon}</span>
        <input {...props} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8L6.2 33C9.6 39.7 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41.4 35.5 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
