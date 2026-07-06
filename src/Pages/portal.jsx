import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, Bell, CalendarDays, CheckCircle2, CreditCard, Download, Gift, IdCard,
  LayoutDashboard, LogOut, Mail, MapPin, Phone, QrCode, Search, Settings, User, Users, Menu, X,
} from "lucide-react";
import avatarImg from "../assets/avatar.png";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [{ title: "Member Portal — ABAS" }, { name: "robots", content: "noindex" }],
  }),
  component: PortalPage,
});

const nav = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "profile", label: "Profile", icon: User },
  { key: "membership", label: "Membership", icon: CreditCard },
  { key: "id", label: "Digital ID Card", icon: IdCard },
  { key: "payments", label: "Payments & Receipts", icon: Download },
  { key: "directory", label: "Directory Search", icon: Search },
  { key: "meetings", label: "Meetings", icon: CalendarDays },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "donations", label: "Donations", icon: Gift },
  { key: "activity", label: "Activity Logs", icon: Activity },
  { key: "settings", label: "Settings", icon: Settings },
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

const payments = [
  { id: "INV-8821", date: "01 Jul 2026", purpose: "Life membership", amount: "₹ 11,000", status: "Paid" },
  { id: "INV-8720", date: "18 Jun 2026", purpose: "Donation — Shiksha", amount: "₹ 2,100", status: "Paid" },
  { id: "INV-8611", date: "05 May 2026", purpose: "Event ticket — AGM", amount: "₹ 500", status: "Paid" },
  { id: "INV-8492", date: "22 Feb 2026", purpose: "Donation — Paryavaran", amount: "₹ 1,100", status: "Paid" },
];

const directory = [
  { name: "Anjali Bansal", city: "Jaipur", gotra: "Bansal", type: "Life" },
  { name: "Sohan Garg", city: "Indore", gotra: "Garg", type: "Patron" },
  { name: "Priya Mittal", city: "Nagpur", gotra: "Mittal", type: "Annual" },
  { name: "Vikas Aggarwal", city: "Kolkata", gotra: "Kansal", type: "Life" },
  { name: "Rakesh Goyal", city: "Delhi", gotra: "Goyal", type: "Life" },
  { name: "Sunita Jindal", city: "Ludhiana", gotra: "Jindal", type: "Patron" },
];

const activity = [
  { text: "Logged in from Delhi, IN", time: "Today, 09:14 AM" },
  { text: "Downloaded receipt INV-8821", time: "Yesterday, 07:22 PM" },
  { text: "RSVP'd to Delhi Vibhag monthly meet", time: "2 days ago" },
  { text: "Updated profile photo", time: "1 week ago" },
  { text: "Made donation to Shiksha initiative", time: "2 weeks ago" },
];

export default function PortalPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const current = nav.find((n) => n.key === section);

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground">
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
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
              const active = section === n.key;
              return (
                <button
                  key={n.key}
                  onClick={() => {
                    setSection(n.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition ${active ? "bg-saffron/10 text-saffron font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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

        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 min-w-0">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {section === "dashboard" ? "Welcome back" : "Member Portal"}
              </p>
              <h1 className="mt-1 font-display text-3xl md:text-4xl">
                {section === "dashboard" ? (
                  <>Namaste, <span className="script-accent">Rahul ji</span></>
                ) : (
                  current.label
                )}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-saffron" />
              </button>
              <div className="flex items-center gap-3 rounded-full border border-border bg-background pl-1 pr-1 md:pr-4 py-1">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-cream text-sm font-medium"><img src={avatarImg} alt="Rahul Agrawal" className="rounded-full" /></span>
                <div className="hidden text-left sm:block">
                  <div className="text-sm font-medium leading-tight">Rahul Agrawal</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Life member</div>
                </div>
              </div>
            </div>
          </div>

          {section === "dashboard" && <DashboardSection />}
          {section === "profile" && <ProfileSection />}
          {section === "membership" && <MembershipSection />}
          {section === "id" && <IdCardSection />}
          {section === "payments" && <PaymentsSection />}
          {section === "directory" && <DirectorySection />}
          {section === "meetings" && <MeetingsSection />}
          {section === "notifications" && <NotificationsSection />}
          {section === "donations" && <DonationsSection />}
          {section === "activity" && <ActivitySection />}
          {section === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

function DashboardSection() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Membership" value="Life" sub="Active" tone="saffron" />
        <StatCard label="Meetings attended" value="14" sub="This year" />
        <StatCard label="Contributions" value="₹ 12,500" sub="Since 2023" />
        <StatCard label="Notifications" value="2" sub="Unread" tone="gold" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SectionTitle title="Your Digital ID Card" action="Download" />
          <IdCardView />
        </div>
        <div className="lg:col-span-2">
          <SectionTitle title="Notifications" action="View all" />
          <NotificationList />
        </div>

        <div className="lg:col-span-2">
          <SectionTitle title="Upcoming meetings" action="See all" />
          <MeetingList />
        </div>

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
    </>
  );
}

function ProfileSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-lg border border-border bg-background p-6 lg:col-span-1">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-24 w-24 place-items-center rounded-full bg-ink text-cream font-display text-3xl"><img src={avatarImg} alt="Rahul Agrawal" className="rounded-full" /></span>
          <div className="mt-4 font-display text-2xl">Rahul Agrawal</div>
          <div className="text-xs text-muted-foreground">ABAS-482910 · Life member</div>
          <button className="mt-4 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-secondary">
            Change photo
          </button>
        </div>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> rahul@example.com</div>
          <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> +91 98••• •••23</div>
          <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> Delhi, India</div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background p-6 lg:col-span-2">
        <SectionTitle title="Personal details" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value="Rahul Agrawal" />
          <Field label="Gotra" value="Garg" />
          <Field label="Date of birth" value="14 August 1988" />
          <Field label="Blood group" value="B+" />
          <Field label="Occupation" value="Business — Textiles" />
          <Field label="Vibhag" value="Delhi" />
          <Field label="City" value="New Delhi" />
          <Field label="Pincode" value="110006" />
        </div>
        <SectionTitle title="Family" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Father's name" value="Shri Ram Prakash Agrawal" />
          <Field label="Mother's name" value="Smt Sushila Devi" />
          <Field label="Spouse" value="Smt Neha Agrawal" />
          <Field label="Children" value="2" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-widest hover:bg-secondary">Cancel</button>
          <button className="rounded-full bg-saffron px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream hover:bg-gold">Save changes</button>
        </div>
      </div>
    </div>
  );
}

function MembershipSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-lg border border-border bg-background p-6 lg:col-span-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Current plan</div>
            <div className="mt-2 font-display text-4xl">Life Membership</div>
            <div className="mt-1 text-sm text-muted-foreground">Enrolled 12 Mar 2023 · Valid Lifetime</div>
          </div>
          <span className="rounded-full bg-saffron/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-saffron">Active</span>
        </div>

        <div className="mt-6 grid gap-3 text-sm">
          {[
            "Voting rights at all AGMs and elections",
            "Digital ID card with lifetime validity",
            "Priority access to Marriage Bureau",
            "Free entry to all Vibhag events",
            "Directory access across India",
          ].map((b) => (
            <div key={b} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-saffron" /> <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <SectionTitle title="Upgrade to Patron" />
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-5">
            <div>
              <div className="font-display text-lg">Patron — ₹ 51,000 one-time</div>
              <div className="text-xs text-muted-foreground">Lifetime honour, plaque at ABAS Kendra, VIP seating</div>
            </div>
            <button className="rounded-full bg-ink px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream hover:bg-ink/90">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-background p-6">
          <SectionTitle title="Member since" />
          <div className="font-display text-3xl">1,213 days</div>
          <div className="text-xs text-muted-foreground">Since 12 Mar 2023</div>
        </div>
        <div className="rounded-lg border border-border bg-background p-6">
          <SectionTitle title="Referrals" />
          <div className="font-display text-3xl">7 members</div>
          <div className="text-xs text-muted-foreground">Invited by you</div>
          <button className="mt-4 w-full rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-secondary">
            Invite more
          </button>
        </div>
      </div>
    </div>
  );
}

function IdCardSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <IdCardView />
      <div className="mt-6 flex justify-center gap-3">
        <button className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-widest hover:bg-secondary">Print</button>
        <button className="rounded-full bg-saffron px-5 py-2 text-xs font-medium uppercase tracking-widest text-cream hover:bg-gold">
          Download PDF
        </button>
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="grid grid-cols-12 gap-4 border-b border-border px-5 py-3 text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="col-span-2">Invoice</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-4">Purpose</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Action</div>
      </div>
      {payments.map((p) => (
        <div key={p.id} className="grid grid-cols-12 items-center gap-4 border-b border-border px-5 py-3.5 text-sm last:border-0">
          <div className="col-span-2 font-mono text-xs text-muted-foreground">{p.id}</div>
          <div className="col-span-2 text-muted-foreground">{p.date}</div>
          <div className="col-span-4">{p.purpose}</div>
          <div className="col-span-2 font-medium">{p.amount}</div>
          <div className="col-span-1">
            <span className="rounded-full bg-saffron/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-saffron">{p.status}</span>
          </div>
          <div className="col-span-1 text-right">
            <button className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">PDF</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DirectorySection() {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search by name, city, gotra…" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <select className="rounded-full border border-border bg-background px-4 py-2.5 text-sm">
          <option>All Vibhag</option><option>Delhi</option><option>Mumbai</option><option>Rajasthan</option>
        </select>
        <select className="rounded-full border border-border bg-background px-4 py-2.5 text-sm">
          <option>All types</option><option>Life</option><option>Patron</option><option>Annual</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {directory.map((d) => (
          <div key={d.name} className="rounded-lg border border-border bg-background p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-saffron/15 text-saffron text-sm font-medium">
                {d.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.city} · {d.gotra}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] uppercase tracking-widest">{d.type}</span>
              <button className="text-xs uppercase tracking-widest text-saffron hover:text-gold">View</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MeetingsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <SectionTitle title="Upcoming" />
        <MeetingList />
        <SectionTitle title="Past meetings" />
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          {[
            { d: "12 Jun", t: "Delhi Vibhag monthly", a: "Attended" },
            { d: "22 May", t: "Youth wing quarterly", a: "Attended" },
            { d: "18 Apr", t: "Ladies wing summit", a: "Missed" },
          ].map((m, i) => (
            <div key={i} className={`flex items-center justify-between px-5 py-4 text-sm ${i > 0 ? "border-t border-border" : ""}`}>
              <div>
                <div className="font-medium">{m.t}</div>
                <div className="text-xs text-muted-foreground">{m.d}, 2026</div>
              </div>
              <span className={`text-xs uppercase tracking-widest ${m.a === "Attended" ? "text-saffron" : "text-muted-foreground"}`}>{m.a}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle title="Attendance" />
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="font-display text-4xl">78%</div>
          <div className="mt-1 text-xs text-muted-foreground">14 of 18 meetings this year</div>
          <div className="mt-4 h-2 rounded-full bg-secondary">
            <div className="h-full w-[78%] rounded-full bg-saffron" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex gap-2 text-xs uppercase tracking-widest">
        <button className="rounded-full bg-ink px-4 py-1.5 text-cream">All</button>
        <button className="rounded-full border border-border px-4 py-1.5 hover:bg-secondary">Unread</button>
        <button className="rounded-full border border-border px-4 py-1.5 hover:bg-secondary">Meetings</button>
        <button className="rounded-full border border-border px-4 py-1.5 hover:bg-secondary">Payments</button>
      </div>
      <NotificationList />
    </div>
  );
}

function DonationsSection() {
  const causes = [
    { name: "Shiksha — Scholarship fund", raised: "₹ 8.2 L", goal: "₹ 12 L", pct: 68 },
    { name: "Paryavaran — Tree plantation", raised: "₹ 3.1 L", goal: "₹ 5 L", pct: 62 },
    { name: "Swasthya — Medical camps", raised: "₹ 5.4 L", goal: "₹ 10 L", pct: 54 },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {causes.map((c) => (
          <div key={c.name} className="rounded-lg border border-border bg-background p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.raised} raised of {c.goal}</div>
              </div>
              <button className="rounded-full bg-saffron px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cream hover:bg-gold">
                Donate
              </button>
            </div>
            <div className="mt-4 h-2 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-saffron" style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-background p-6">
        <SectionTitle title="Your giving" />
        <div className="font-display text-4xl">₹ 12,500</div>
        <div className="text-xs text-muted-foreground">Lifetime contributions</div>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">This year</span><span>₹ 3,200</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Last year</span><span>₹ 5,100</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">80G eligible</span><span>₹ 12,500</span></div>
        </div>
        <button className="mt-6 w-full rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-secondary">
          Download 80G certificate
        </button>
      </div>
    </div>
  );
}

function ActivitySection() {
  return (
    <div className="mx-auto max-w-3xl">
      <ul className="relative space-y-6 border-l border-border pl-6">
        {activity.map((a, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[29px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-saffron ring-4 ring-background" />
            <div className="text-sm">{a.text}</div>
            <div className="text-xs text-muted-foreground">{a.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-lg border border-border bg-background p-6">
        <SectionTitle title="Account" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value="rahul@example.com" />
          <Field label="Phone" value="+91 98••• •••23" />
        </div>
        <button className="mt-4 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-secondary">
          Change password
        </button>
      </div>

      <div className="rounded-lg border border-border bg-background p-6">
        <SectionTitle title="Notification preferences" />
        {[
          { l: "Meeting reminders", d: "Email + SMS 24 hours before" },
          { l: "Payment receipts", d: "Email after every transaction" },
          { l: "Newsletter", d: "Monthly digest from ABAS" },
          { l: "Marriage bureau alerts", d: "New profile matches" },
        ].map((s, i) => (
          <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-border" : ""}`}>
            <div>
              <div className="text-sm font-medium">{s.l}</div>
              <div className="text-xs text-muted-foreground">{s.d}</div>
            </div>
            <button className="relative h-6 w-11 rounded-full bg-saffron">
              <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-cream" />
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <SectionTitle title="Danger zone" />
        <p className="text-sm text-muted-foreground">Deactivate your account. This will hide your profile from the directory.</p>
        <button className="mt-4 rounded-full border border-destructive/40 px-4 py-2 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10">
          Deactivate account
        </button>
      </div>
    </div>
  );
}

/* ------------ shared subviews ------------ */

function IdCardView() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink px-4 py-6 md:p-6 text-cream shadow-lg max-w-sm mx-auto h-[480px] flex flex-col justify-between">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(500px 300px at 15% 20%, oklch(0.68 0.18 45), transparent 60%), radial-gradient(400px 250px at 85% 90%, oklch(0.72 0.14 75), transparent 60%)",
        }}
      />
      
      {/* Header */}
      <div className="relative flex items-center justify-center gap-3 border-b border-cream/10 pb-3 w-full">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-saffron text-cream font-display text-xl">अ</span>
        <div className="flex flex-col text-center">
          <span className="text-lg font-display leading-none tracking-wider">ABAS India</span>
          <span className="text-[10px] uppercase tracking-widest text-saffron mt-1">Member ID Card</span>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="relative flex flex-col items-center mt-2 z-10">
        <div className="relative">
          <img 
            src={avatarImg} 
            alt="Rahul Agrawal" 
            className="h-24 w-24 rounded-full object-cover border-2 border-saffron shadow-lg"
          />
          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-ink" />
        </div>
        <h3 className="mt-2.5 font-display text-lg text-cream font-semibold">Rahul Agrawal</h3>
        <span className="text-[10px] uppercase tracking-widest bg-saffron/10 border border-saffron/20 text-saffron rounded-full px-2.5 py-0.5 mt-1 font-medium">Life Member</span>
      </div>

      {/* Info Grid */}
      <div className="relative grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs w-full px-4 border-t border-cream/10 pt-3 z-10">
        <div>
          <div className="opacity-55 text-[9px] uppercase tracking-wider">Member ID</div>
          <div className="font-mono text-sm font-semibold mt-0.5">ABAS-482910</div>
        </div>
        <div>
          <div className="opacity-55 text-[9px] uppercase tracking-wider">Level</div>
          <div className="text-sm font-semibold mt-0.5">Sector Member</div>
        </div>
        <div>
          <div className="opacity-55 text-[9px] uppercase tracking-wider">Vibhag</div>
          <div className="text-sm font-semibold mt-0.5">Delhi</div>
        </div>
        <div>
          <div className="opacity-55 text-[9px] uppercase tracking-wider">Blood Group</div>
          <div className="text-sm font-semibold mt-0.5">B+</div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between w-full px-4 border-t border-cream/10 pt-3 z-10">
        <div className="p-1 rounded bg-cream flex items-center justify-center">
          <QrCode className="h-10 w-10 text-ink" strokeWidth={1.5} />
        </div>
        <div className="text-right flex flex-col justify-end">
          <span className="font-display text-xs italic opacity-85">Om Prakash Bansal</span>
          <span className="text-[8px] uppercase tracking-wider opacity-55 mt-0.5">Authorized Signatory</span>
        </div>
      </div>
    </div>
  );
}

function NotificationList() {
  return (
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
  );
}

function MeetingList() {
  return (
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
    <div className="mb-4 mt-2 flex items-center justify-between">
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

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm">{value}</div>
    </div>
  );
}
