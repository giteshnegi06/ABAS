import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Activity, Bell, CalendarDays, CreditCard, Download, Gift, IdCard, LayoutDashboard,
  LogOut, QrCode, Search, Settings, User, Users, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [{ title: "Member Portal — ABAS" }, { name: "robots", content: "noindex" }],
  }),
  component: PortalPage,
});

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Profile", icon: User },
  { label: "Membership", icon: CreditCard },
  { label: "Digital ID Card", icon: IdCard },
  { label: "Payments & Receipts", icon: Download },
  { label: "Directory Search", icon: Search },
  { label: "Meetings", icon: CalendarDays },
  { label: "Notifications", icon: Bell },
  { label: "Donations", icon: Gift },
  { label: "Activity Logs", icon: Activity },
  { label: "Settings", icon: Settings },
];

const upcomingMeetings = [
  { date: "12 Jul", title: "Delhi Vibhag monthly", place: "ABAS Kendra, Chandni Chowk", time: "6:00 PM" },
  { date: "20 Jul", title: "Marriage Bureau meet", place: "Agrasen Bhavan, Fort", time: "11:00 AM" },
  { date: "05 Aug", title: "National AGM 2026", place: "Vigyan Bhavan, Delhi", time: "10:00 AM" },
];

const notifications = [
  { text: "Your Life membership application was approved.", time: "2h ago", unread: true },
  { text: "New MOM uploaded — June State Meeting.", time: "1d ago", unread: true },
  { text: "Receipt #INV-8821 available for download.", time: "3d ago" },
  { text: "AGM 2026 invitation — RSVP by 25 Jul.", time: "5d ago" },
];

export default function PortalPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-secondary/30 text-foreground flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4 lg:hidden sticky top-0 z-40 w-full shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-cream font-display text-base">अ</span>
          <span className="font-display text-sm text-foreground">ABAS Portal</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto flex max-w-8xl w-full flex-1 flex-col lg:flex-row">
        {/* Sidebar Backdrop (Mobile only) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:flex shrink-0`}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-cream font-display text-lg">अ</span>
              <div>
                <div className="font-display text-base leading-none text-foreground">ABAS</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Member Portal</div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-foreground lg:hidden cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.label}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition cursor-pointer ${
                    n.active ? "bg-saffron/10 text-saffron font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {n.label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-3 border-t border-border px-6 py-4 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 min-w-0">
          {/* Top bar */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Welcome back</p>
              <h1 className="mt-1 font-display text-3xl md:text-4xl">
                Namaste, <span className="script-accent">Rahul ji</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-saffron" />
              </button>
              <div className="flex items-center gap-3 rounded-full border border-border bg-background pl-1 pr-1 md:pr-4 py-1">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream text-sm font-medium">RA</span>
                <div className="hidden text-left sm:block">
                  <div className="text-sm font-medium leading-tight">Rahul Agrawal</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Life member</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Membership" value="Life" sub="Active" tone="saffron" />
            <StatCard label="Meetings attended" value="14" sub="This year" />
            <StatCard label="Contributions" value="₹ 12,500" sub="Since 2023" />
            <StatCard label="Notifications" value="2" sub="Unread" tone="gold" />
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Digital ID */}
            <div className="lg:col-span-2">
              <SectionTitle title="Your Digital ID Card" action="Download" />
              <div className="relative overflow-hidden rounded-lg bg-ink p-8 text-cream shadow-lg">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(500px 300px at 15% 20%, oklch(0.68 0.18 45), transparent 60%), radial-gradient(400px 250px at 85% 90%, oklch(0.72 0.14 75), transparent 60%)",
                  }}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-70">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-saffron text-cream font-display text-xs">अ</span>
                      ABAS · Member Card
                    </div>
                    <div className="mt-6 font-display text-3xl md:text-4xl">Rahul Agrawal</div>
                    <div className="mt-1 text-xs opacity-70">Gotra: Garg · Delhi Vibhag</div>

                    <div className="mt-8 grid grid-cols-3 gap-6 text-xs">
                      <div>
                        <div className="opacity-60">Member ID</div>
                        <div className="mt-1 font-medium">ABAS-482910</div>
                      </div>
                      <div>
                        <div className="opacity-60">Type</div>
                        <div className="mt-1 font-medium">Life</div>
                      </div>
                      <div>
                        <div className="opacity-60">Valid till</div>
                        <div className="mt-1 font-medium">Lifetime</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid h-24 w-24 place-items-center rounded-md bg-cream text-ink">
                    <QrCode className="h-16 w-16" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <SectionTitle title="Notifications" action="View all" />
              <ul className="divide-y divide-border rounded-lg border border-border bg-background">
                {notifications.map((n, i) => (
                  <li key={i} className="flex items-start gap-3 p-4">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-saffron" : "bg-border"}`} />
                    <div className="flex-1">
                      <p className="text-sm">{n.text}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meetings */}
            <div className="lg:col-span-2">
              <SectionTitle title="Upcoming meetings" action="See all" />
              <div className="overflow-hidden rounded-lg border border-border bg-background">
                {upcomingMeetings.map((m, i) => (
                  <div key={i} className={`flex items-center gap-5 p-5 ${i > 0 ? "border-t border-border" : ""}`}>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-saffron/10 text-saffron">
                      <div className="text-center">
                        <div className="font-display text-lg leading-none">{m.date.split(" ")[0]}</div>
                        <div className="text-[10px] uppercase tracking-widest">{m.date.split(" ")[1]}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-lg leading-tight">{m.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{m.place} · {m.time}</div>
                    </div>
                    <button className="rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest hover:bg-secondary">
                      RSVP
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <SectionTitle title="Quick actions" />
              <div className="grid grid-cols-2 gap-3">
                <QuickAction icon={CreditCard} label="Renew" />
                <QuickAction icon={Gift} label="Donate" />
                <QuickAction icon={Users} label="Directory" />
                <QuickAction icon={Download} label="Receipt" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, tone }) {
  const color = tone === "saffron" ? "text-saffron" : tone === "gold" ? "text-gold" : "text-ink";
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-2 font-display text-3xl ${color}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function SectionTitle({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-xl">{title}</h2>
      {action && <button className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">{action}</button>}
    </div>
  );
}

function QuickAction({ icon: Icon, label }) {
  return (
    <button className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background p-5 transition hover:border-saffron hover:bg-saffron/5">
      <Icon className="h-5 w-5 text-saffron" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
