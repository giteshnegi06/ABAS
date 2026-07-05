import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck, BarChart3, Building2, CalendarDays, ChevronRight, FileText, LayoutDashboard,
  LogOut, Megaphone, Settings, Shield, TrendingUp, UserCheck, Users, Wallet,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel — ABAS" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "User Management", icon: Users },
  { label: "Team Hierarchy", icon: Building2 },
  { label: "Department Management", icon: Shield },
  { label: "Meeting Management", icon: CalendarDays },
  { label: "Finance", icon: Wallet },
  { label: "CMS", icon: FileText },
  { label: "Advertisements", icon: Megaphone },
  { label: "Reports & Analytics", icon: BarChart3 },
  { label: "Notifications", icon: BadgeCheck },
  { label: "Settings", icon: Settings },
];

const pending = [
  { name: "Anjali Bansal", type: "Life", city: "Jaipur", date: "2 Jul" },
  { name: "Sohan Garg", type: "Patron", city: "Indore", date: "2 Jul" },
  { name: "Priya Mittal", type: "Annual", city: "Nagpur", date: "1 Jul" },
  { name: "Vikas Aggarwal", type: "Life", city: "Kolkata", date: "1 Jul" },
];

const recentPayments = [
  { id: "INV-8834", name: "Rakesh Goyal", amount: "₹ 11,000", type: "Life membership", status: "success" },
  { id: "INV-8833", name: "Sunita Jindal", amount: "₹ 51,000", type: "Patron", status: "success" },
  { id: "INV-8832", name: "Manoj Bansal", amount: "₹ 5,000", type: "Donation — Shiksha", status: "success" },
  { id: "INV-8831", name: "Kavita Singhal", amount: "₹ 1,100", type: "Annual renewal", status: "pending" },
];

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-ink text-cream">
      <div className="mx-auto flex max-w-8xl">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-cream/10 bg-ink lg:flex">
          <Link to="#" className="flex items-center gap-2.5 border-b border-cream/10 px-6 py-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-cream font-display text-lg">अ</span>
            <div>
              <div className="font-display text-base leading-none">ABAS</div>
              <div className="text-[10px] uppercase tracking-widest opacity-60">Admin Panel</div>
            </div>
          </Link>
          <nav className="flex-1 overflow-y-auto p-3">
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.label}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                    n.active ? "bg-cream/10 text-cream font-medium" : "opacity-60 hover:bg-cream/5 hover:opacity-100"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {n.label}
                </button>
              );
            })}
          </nav>
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-3 border-t border-cream/10 px-6 py-4 text-sm opacity-70 hover:opacity-100"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] opacity-60">
                <Shield className="h-3 w-3" /> Super Admin
              </p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl">
                Admin <span className="script-accent">Dashboard</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-cream/20 bg-cream/5 pl-1 pr-4 py-1">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-cream text-sm font-medium">AD</span>
              <div className="text-left">
                <div className="text-sm font-medium leading-tight">admin@gmail.com</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">National</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AdminStat label="Total members" value="2,14,832" delta="+128 this week" icon={Users} />
            <AdminStat label="Active teams" value="284" delta="12 states" icon={Building2} />
            <AdminStat label="Payments (Jul)" value="₹ 18.4 L" delta="+22% MoM" icon={TrendingUp} tone="saffron" />
            <AdminStat label="Pending approvals" value="47" delta="Needs action" icon={UserCheck} tone="gold" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Pending approvals */}
            <div className="lg:col-span-2">
              <AdminSection title="Pending member approvals" action="Review all" />
              <div className="overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.03]">
                {pending.map((p, i) => (
                  <div key={i} className={`grid grid-cols-12 items-center gap-4 p-4 ${i > 0 ? "border-t border-cream/10" : ""}`}>
                    <div className="col-span-4 flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-xs font-medium">
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs opacity-60">{p.city}</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <span className="rounded-full bg-saffron/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-saffron">
                        {p.type}
                      </span>
                    </div>
                    <div className="col-span-2 text-xs opacity-60">{p.date}</div>
                    <div className="col-span-3 flex justify-end gap-2">
                      <button className="rounded-full bg-saffron px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-cream hover:bg-gold">
                        Approve
                      </button>
                      <button className="rounded-full border border-cream/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest hover:bg-cream/10">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick jump */}
            <div>
              <AdminSection title="Modules" />
              <div className="grid gap-2">
                {["User Management", "Team Hierarchy", "Meeting Management", "Finance", "CMS", "Reports"].map((m) => (
                  <button key={m} className="flex items-center justify-between rounded-lg border border-cream/10 bg-cream/[0.03] px-4 py-3 text-sm hover:bg-cream/10">
                    {m} <ChevronRight className="h-4 w-4 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Payments */}
            <div className="lg:col-span-3">
              <AdminSection title="Recent transactions" action="Open ledger" />
              <div className="overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.03]">
                <div className="grid grid-cols-12 gap-4 border-b border-cream/10 px-5 py-3 text-[10px] uppercase tracking-widest opacity-60">
                  <div className="col-span-2">Invoice</div>
                  <div className="col-span-3">Member</div>
                  <div className="col-span-4">Purpose</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1 text-right">Status</div>
                </div>
                {recentPayments.map((p) => (
                  <div key={p.id} className="grid grid-cols-12 items-center gap-4 border-b border-cream/10 px-5 py-3.5 text-sm last:border-0">
                    <div className="col-span-2 font-mono text-xs opacity-70">{p.id}</div>
                    <div className="col-span-3">{p.name}</div>
                    <div className="col-span-4 opacity-70">{p.type}</div>
                    <div className="col-span-2 font-medium">{p.amount}</div>
                    <div className="col-span-1 text-right">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                        p.status === "success" ? "bg-saffron/20 text-saffron" : "bg-gold/20 text-gold"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminStat({ label, value, delta, icon: Icon, tone }) {
  const color = tone === "saffron" ? "text-saffron" : tone === "gold" ? "text-gold" : "text-cream";
  return (
    <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest opacity-60">{label}</div>
          <div className={`mt-2 font-display text-3xl ${color}`}>{value}</div>
        </div>
        <Icon className="h-5 w-5 opacity-40" />
      </div>
      <div className="mt-2 text-xs opacity-60">{delta}</div>
    </div>
  );
}

function AdminSection({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-xl">{title}</h2>
      {action && <button className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100">{action}</button>}
    </div>
  );
}
