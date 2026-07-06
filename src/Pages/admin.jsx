import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck, BarChart3, Building2, CalendarDays, ChevronRight, FileText, LayoutDashboard,
  LogOut, Megaphone, MoreHorizontal, Plus, Search, Settings, Shield, TrendingUp,
  UserCheck, Users, Wallet, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel — ABAS" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

const nav = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "User Management", icon: Users },
  { key: "teams", label: "Team Hierarchy", icon: Building2 },
  { key: "departments", label: "Department Management", icon: Shield },
  { key: "meetings", label: "Meeting Management", icon: CalendarDays },
  { key: "finance", label: "Finance", icon: Wallet },
  { key: "cms", label: "CMS", icon: FileText },
  { key: "ads", label: "Advertisements", icon: Megaphone },
  { key: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { key: "notifications", label: "Notifications", icon: BadgeCheck },
  { key: "settings", label: "Settings", icon: Settings },
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
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const current = nav.find((n) => n.key === section);

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-cream/10 bg-ink px-6 py-4 lg:hidden sticky top-0 z-40 w-full shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-cream font-display text-base">अ</span>
          <span className="font-display text-sm">ABAS Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-md border border-cream/20 text-cream cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto flex max-w-8xl">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-cream/10 bg-ink transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:flex shrink-0`}
        >
          <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-cream font-display text-lg">अ</span>
              <div>
                <div className="font-display text-base leading-none">ABAS</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">Admin Panel</div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-cream/20 text-cream lg:hidden cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-3">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = section === n.key;
              return (
                <button
                  key={n.key}
                  onClick={() => {
                    setSection(n.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${
                    active ? "bg-cream/10 text-cream font-medium" : "opacity-60 hover:bg-cream/5 hover:opacity-100"
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

        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 min-w-0">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] opacity-60">
                <Shield className="h-3 w-3" /> Super Admin
              </p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl">
                {section === "dashboard" ? (
                  <>Admin <span className="script-accent">Dashboard</span></>
                ) : current.label}
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-cream/20 bg-cream/5 pl-1 pr-1 md:pr-4 py-1">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-cream text-sm font-medium">AD</span>
              <div className="text-left">
                <div className="text-sm font-medium leading-tight">admin@gmail.com</div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">National</div>
              </div>
            </div>
          </div>

          {section === "dashboard" && <DashboardSection setSection={setSection} />}
          {section === "users" && <UsersSection />}
          {section === "teams" && <TeamsSection />}
          {section === "departments" && <DepartmentsSection />}
          {section === "meetings" && <MeetingsSection />}
          {section === "finance" && <FinanceSection />}
          {section === "cms" && <CmsSection />}
          {section === "ads" && <AdsSection />}
          {section === "reports" && <ReportsSection />}
          {section === "notifications" && <NotificationsSection />}
          {section === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

/* ---------------- sections ---------------- */

function DashboardSection({ setSection }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStat label="Total members" value="2,14,832" delta="+128 this week" icon={Users} />
        <AdminStat label="Active teams" value="284" delta="12 states" icon={Building2} />
        <AdminStat label="Payments (Jul)" value="₹ 18.4 L" delta="+22% MoM" icon={TrendingUp} tone="saffron" />
        <AdminStat label="Pending approvals" value="47" delta="Needs action" icon={UserCheck} tone="gold" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
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

        <div>
          <AdminSection title="Modules" />
          <div className="grid gap-2">
            {nav.filter((n) => n.key !== "dashboard").slice(0, 6).map((m) => (
              <button
                key={m.key}
                onClick={() => setSection(m.key)}
                className="flex items-center justify-between rounded-lg border border-cream/10 bg-cream/[0.03] px-4 py-3 text-sm hover:bg-cream/10"
              >
                {m.label} <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
            ))}
          </div>
        </div>

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
    </>
  );
}

function UsersSection() {
  const users = [
    { name: "Rahul Agrawal", email: "rahul@example.com", role: "Member", type: "Life", city: "Delhi", status: "Active" },
    { name: "Anjali Bansal", email: "anjali@example.com", role: "Member", type: "Life", city: "Jaipur", status: "Pending" },
    { name: "Sohan Garg", email: "sohan@example.com", role: "Vibhag Admin", type: "Patron", city: "Indore", status: "Active" },
    { name: "Priya Mittal", email: "priya@example.com", role: "Member", type: "Annual", city: "Nagpur", status: "Active" },
    { name: "Vikas Aggarwal", email: "vikas@example.com", role: "Member", type: "Life", city: "Kolkata", status: "Suspended" },
    { name: "Rakesh Goyal", email: "rakesh@example.com", role: "Team Lead", type: "Life", city: "Delhi", status: "Active" },
  ];
  return (
    <>
      <ToolBar placeholder="Search members by name, email, city…" primary="Add member" />
      <div className="overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.03]">
        <div className="grid grid-cols-12 gap-4 border-b border-cream/10 px-5 py-3 text-[10px] uppercase tracking-widest opacity-60">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-2">City</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        {users.map((u) => (
          <div key={u.email} className="grid grid-cols-12 items-center gap-4 border-b border-cream/10 px-5 py-3.5 text-sm last:border-0">
            <div className="col-span-3 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-cream/10 text-xs font-medium">
                {u.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <span>{u.name}</span>
            </div>
            <div className="col-span-3 opacity-70">{u.email}</div>
            <div className="col-span-2 opacity-70">{u.role}</div>
            <div className="col-span-1"><Chip>{u.type}</Chip></div>
            <div className="col-span-2 opacity-70">{u.city}</div>
            <div className="col-span-1 text-right">
              <StatusChip status={u.status} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TeamsSection() {
  const nodes = [
    { level: "National", name: "National Executive Committee", head: "Shri Om Prakash Bansal", members: 24 },
    { level: "State", name: "Delhi State Committee", head: "Smt Meena Garg", members: 42 },
    { level: "Vibhag", name: "Delhi — North Vibhag", head: "Shri Ashok Mittal", members: 128 },
    { level: "Vibhag", name: "Delhi — South Vibhag", head: "Shri Naresh Singhal", members: 96 },
    { level: "Local", name: "Chandni Chowk Unit", head: "Shri Manoj Bansal", members: 34 },
  ];
  return (
    <>
      <ToolBar placeholder="Search teams…" primary="New team" />
      <div className="space-y-3">
        {nodes.map((n) => (
          <div key={n.name} className="flex items-center gap-4 rounded-lg border border-cream/10 bg-cream/[0.03] p-5">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-saffron/15 text-saffron">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cream/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">{n.level}</span>
                <span className="font-display text-lg">{n.name}</span>
              </div>
              <div className="mt-1 text-xs opacity-60">Head: {n.head} · {n.members} members</div>
            </div>
            <button className="rounded-full border border-cream/20 px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-cream/10">
              Manage
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function DepartmentsSection() {
  const depts = [
    { name: "Marriage Bureau", head: "Dr Rajesh Bansal", members: 84, budget: "₹ 24 L" },
    { name: "Vyapar Kosh", head: "Dr Kavita Garg", members: 62, budget: "₹ 18 L" },
    { name: "Shiksha Vibhag", head: "Shri Sandeep Mittal", members: 41, budget: "₹ 8 L" },
    { name: "Health Vibhag", head: "Smt Rekha Singhal", members: 55, budget: "₹ 12 L" },
    { name: "IT Vibhag", head: "Shri Amit Goyal", members: 128, budget: "₹ 15 L" },
    { name: "Women Empowerment", head: "Smt Neha Jindal", members: 96, budget: "₹ 8 L" },
    { name: "Paryavaran Vibhag", head: "Smt Kavita Garg", members: 148, budget: "₹ 28 L" },
    { name: "Rozgar Yojna", head: "Shri Rahul Agrawal", members: 95, budget: "₹ 16 L" },
  ];
  return (
    <>
      <ToolBar placeholder="Search departments…" primary="New department" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {depts.map((d) => (
          <div key={d.name} className="rounded-lg border border-cream/10 bg-cream/[0.03] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-xl">{d.name}</div>
                <div className="mt-1 text-xs opacity-60">Head · {d.head}</div>
              </div>
              <button className="opacity-60 hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">Members</div>
                <div className="font-display text-2xl">{d.members}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">Budget</div>
                <div className="font-display text-2xl">{d.budget}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MeetingsSection() {
  const meetings = [
    { title: "National AGM 2026", date: "05 Aug 2026", place: "Vigyan Bhavan, Delhi", rsvp: 412, status: "Upcoming" },
    { title: "Delhi Vibhag monthly", date: "12 Jul 2026", place: "ABAS Kendra", rsvp: 78, status: "Upcoming" },
    { title: "Marriage Bureau meet", date: "20 Jul 2026", place: "Agrasen Bhavan", rsvp: 54, status: "Upcoming" },
    { title: "Youth wing quarterly", date: "22 May 2026", place: "Delhi", rsvp: 92, status: "Concluded" },
  ];
  return (
    <>
      <ToolBar placeholder="Search meetings…" primary="Schedule meeting" />
      <div className="overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.03]">
        <div className="grid grid-cols-12 gap-4 border-b border-cream/10 px-5 py-3 text-[10px] uppercase tracking-widest opacity-60">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-3">Venue</div>
          <div className="col-span-1">RSVP</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        {meetings.map((m) => (
          <div key={m.title} className="grid grid-cols-12 items-center gap-4 border-b border-cream/10 px-5 py-3.5 text-sm last:border-0">
            <div className="col-span-4 font-medium">{m.title}</div>
            <div className="col-span-2 opacity-70">{m.date}</div>
            <div className="col-span-3 opacity-70">{m.place}</div>
            <div className="col-span-1">{m.rsvp}</div>
            <div className="col-span-2 text-right"><StatusChip status={m.status} /></div>
          </div>
        ))}
      </div>
    </>
  );
}

function FinanceSection() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStat label="July inflow" value="₹ 18.4 L" delta="+22% MoM" icon={TrendingUp} tone="saffron" />
        <AdminStat label="Outflow" value="₹ 6.2 L" delta="Approved" icon={Wallet} />
        <AdminStat label="Reserve fund" value="₹ 3.4 Cr" delta="As of today" icon={Shield} />
        <AdminStat label="Pending refunds" value="₹ 21,500" delta="4 tickets" icon={UserCheck} tone="gold" />
      </div>

      <div className="mt-8">
        <AdminSection title="Ledger" action="Export CSV" />
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
              <div className="col-span-1 text-right"><StatusChip status={p.status} /></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CmsSection() {
  const pages = [
    { title: "About ABAS", path: "/about", updated: "3 Jul 2026", author: "admin" },
    { title: "Departments", path: "/departments", updated: "1 Jul 2026", author: "editor" },
    { title: "Projects", path: "/projects", updated: "28 Jun 2026", author: "editor" },
    { title: "Events", path: "/events", updated: "26 Jun 2026", author: "admin" },
    { title: "Contact", path: "/contact", updated: "20 Jun 2026", author: "admin" },
  ];
  return (
    <>
      <ToolBar placeholder="Search pages, posts, media…" primary="New page" />
      <div className="overflow-hidden rounded-lg border border-cream/10 bg-cream/[0.03]">
        <div className="grid grid-cols-12 gap-4 border-b border-cream/10 px-5 py-3 text-[10px] uppercase tracking-widest opacity-60">
          <div className="col-span-4">Title</div>
          <div className="col-span-3">Path</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-2">Updated</div>
          <div className="col-span-1 text-right">Action</div>
        </div>
        {pages.map((p) => (
          <div key={p.path} className="grid grid-cols-12 items-center gap-4 border-b border-cream/10 px-5 py-3.5 text-sm last:border-0">
            <div className="col-span-4 font-medium">{p.title}</div>
            <div className="col-span-3 font-mono text-xs opacity-70">{p.path}</div>
            <div className="col-span-2 opacity-70">{p.author}</div>
            <div className="col-span-2 opacity-70">{p.updated}</div>
            <div className="col-span-1 text-right">
              <button className="text-xs uppercase tracking-widest opacity-70 hover:opacity-100">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AdsSection() {
  const ads = [
    { name: "AGM 2026 Banner", placement: "Home hero", status: "Live", clicks: "12.4k" },
    { name: "Marriage Bureau promo", placement: "Portal sidebar", status: "Live", clicks: "3.1k" },
    { name: "Shiksha fundraiser", placement: "Donations page", status: "Scheduled", clicks: "—" },
    { name: "Yuva summit CTA", placement: "Events page", status: "Draft", clicks: "—" },
  ];
  return (
    <>
      <ToolBar placeholder="Search campaigns…" primary="New campaign" />
      <div className="grid gap-4 sm:grid-cols-2">
        {ads.map((a) => (
          <div key={a.name} className="rounded-lg border border-cream/10 bg-cream/[0.03] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg">{a.name}</div>
                <div className="mt-1 text-xs opacity-60">{a.placement}</div>
              </div>
              <StatusChip status={a.status} />
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-60">Clicks</div>
                <div className="font-display text-2xl">{a.clicks}</div>
              </div>
              <button className="rounded-full border border-cream/20 px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-cream/10">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ReportsSection() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStat label="Signups (30d)" value="1,284" delta="+9%" icon={Users} tone="saffron" />
        <AdminStat label="Retention" value="86%" delta="Life members" icon={TrendingUp} />
        <AdminStat label="Avg. donation" value="₹ 2,140" delta="+₹ 210 MoM" icon={Wallet} />
        <AdminStat label="Meeting turnout" value="72%" delta="Across Vibhags" icon={CalendarDays} tone="gold" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-6">
          <AdminSection title="Membership growth" />
          <FauxChart />
        </div>
        <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-6">
          <AdminSection title="Revenue by category" />
          <div className="space-y-4">
            {[
              { l: "Life memberships", v: 62 },
              { l: "Patron", v: 18 },
              { l: "Donations", v: 12 },
              { l: "Events", v: 8 },
            ].map((r) => (
              <div key={r.l}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="opacity-70">{r.l}</span>
                  <span>{r.v}%</span>
                </div>
                <div className="h-2 rounded-full bg-cream/10">
                  <div className="h-full rounded-full bg-saffron" style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function NotificationsSection() {
  return (
    <>
      <ToolBar placeholder="Search notifications…" primary="Send broadcast" />
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          { title: "AGM 2026 invitation", audience: "All members", sent: "12,482", status: "Delivered" },
          { title: "Life membership drive", audience: "Non-members", sent: "3,120", status: "Delivered" },
          { title: "Payment reminder — July", audience: "Annual members", sent: "842", status: "Scheduled" },
          { title: "Donations 80G ready", audience: "Donors 2025-26", sent: "2,214", status: "Draft" },
        ].map((n) => (
          <div key={n.title} className="rounded-lg border border-cream/10 bg-cream/[0.03] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg">{n.title}</div>
                <div className="mt-1 text-xs opacity-60">Audience: {n.audience}</div>
              </div>
              <StatusChip status={n.status} />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs opacity-70">
              <span>Sent to {n.sent}</span>
              <button className="uppercase tracking-widest hover:opacity-100">Open</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SettingsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-6">
        <AdminSection title="Organisation" />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdField label="Name" value="Akhil Bharatiya Agrawal Sammelan" />
          <AdField label="Registration No" value="ABAS/1946/DEL" />
          <AdField label="Contact email" value="admin@abas.org" />
          <AdField label="Support phone" value="+91 11 2345 6789" />
        </div>
      </div>
      <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-6">
        <AdminSection title="Security" />
        <div className="space-y-3 text-sm">
          {[
            { l: "Two-factor for admins", d: "Require TOTP for all admin roles" },
            { l: "Session timeout", d: "Log out after 30 minutes idle" },
            { l: "Audit log", d: "Track all admin actions" },
          ].map((s, i) => (
            <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-cream/10" : ""}`}>
              <div>
                <div className="text-sm font-medium">{s.l}</div>
                <div className="text-xs opacity-60">{s.d}</div>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-saffron">
                <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-cream" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-cream/10 bg-cream/[0.03] p-6 lg:col-span-2">
        <AdminSection title="Roles & permissions" />
        <div className="overflow-hidden rounded-md border border-cream/10">
          <div className="grid grid-cols-12 gap-4 border-b border-cream/10 bg-cream/5 px-5 py-2.5 text-[10px] uppercase tracking-widest opacity-70">
            <div className="col-span-3">Role</div>
            <div className="col-span-2">Members</div>
            <div className="col-span-2">Users</div>
            <div className="col-span-2">Finance</div>
            <div className="col-span-3">Content</div>
          </div>
          {[
            { r: "Super Admin", a: ["✓", "✓", "✓", "✓"] },
            { r: "National Admin", a: ["✓", "✓", "✓", "✓"] },
            { r: "State Admin", a: ["✓", "✓", "—", "✓"] },
            { r: "Vibhag Admin", a: ["✓", "—", "—", "—"] },
          ].map((r) => (
            <div key={r.r} className="grid grid-cols-12 gap-4 border-b border-cream/10 px-5 py-3 text-sm last:border-0">
              <div className="col-span-3 font-medium">{r.r}</div>
              {r.a.map((v, i) => (
                <div key={i} className="col-span-2 last:col-span-3 opacity-70">{v}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- shared ---------------- */

function ToolBar({ placeholder, primary }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="flex flex-1 items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.03] px-4 py-2.5">
        <Search className="h-4 w-4 opacity-60" />
        <input placeholder={placeholder} className="flex-1 bg-transparent text-sm outline-none placeholder:text-cream/40" />
      </div>
      <select className="rounded-full border border-cream/15 bg-cream/[0.03] px-4 py-2.5 text-sm">
        <option>All</option><option>Active</option><option>Pending</option><option>Suspended</option>
      </select>
      <button className="flex items-center gap-2 rounded-full bg-saffron px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-cream hover:bg-gold">
        <Plus className="h-3.5 w-3.5" /> {primary}
      </button>
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

function Chip({ children }) {
  return <span className="rounded-full bg-cream/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">{children}</span>;
}

function StatusChip({ status }) {
  const good = ["Active", "Delivered", "Live", "success", "Concluded"];
  const warn = ["Pending", "Scheduled", "pending", "Draft"];
  const bad = ["Suspended", "Failed"];
  const cls = good.includes(status)
    ? "bg-saffron/20 text-saffron"
    : warn.includes(status)
    ? "bg-gold/20 text-gold"
    : bad.includes(status)
    ? "bg-destructive/20 text-destructive"
    : "bg-cream/10 text-cream";
  return <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${cls}`}>{status}</span>;
}

function AdField({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest opacity-60">{label}</div>
      <div className="mt-1 rounded-md border border-cream/10 bg-ink px-3 py-2 text-sm">{value}</div>
    </div>
  );
}

function FauxChart() {
  const bars = [42, 55, 48, 63, 71, 68, 82, 79, 88, 95, 91, 104];
  const max = Math.max(...bars);
  return (
    <div className="flex h-40 items-end gap-2">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-t bg-saffron/70 transition hover:bg-saffron" style={{ height: `${(b / max) * 100}%` }} />
      ))}
    </div>
  );
}
