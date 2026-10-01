import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Grid3x3, Users, FileText, CreditCard, BarChart3, BookOpen, X, Menu } from 'lucide-react';

const unitGrid = Array.from({ length: 40 }, (_, i) => {
  if (i === 2) return 'overdue';
  if (i === 28) return 'reserved';
  if (i < 28) return 'sold';
  return 'available';
});

const features = [
  { icon: Grid3x3, title: 'Unit master', desc: 'Track every fractional unit — size, status, sale price, sq yards and sqft.', iconBg: 'bg-primary-light', iconColor: 'text-primary' },
  { icon: Users, title: 'Buyer registry', desc: 'Owner KYC, Aadhaar, PAN, purchase records and document vault per buyer.', iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0369A1]' },
  { icon: FileText, title: 'Leaseback contracts', desc: 'Lease terms, monthly return, escalation clauses, lock-in and auto-renewal.', iconBg: 'bg-[#FEF3C7]', iconColor: 'text-[#B45309]' },
  { icon: CreditCard, title: 'Payment scheduler', desc: 'Auto-generate monthly dues, track paid and overdue, WhatsApp reminders.', iconBg: 'bg-[#F3E8FF]', iconColor: 'text-[#7C3AED]' },
  { icon: BarChart3, title: 'Developer dashboard', desc: 'Payout liability, collection rate, occupancy map and 12-month cash flow forecast.', iconBg: 'bg-primary-light', iconColor: 'text-primary' },
  { icon: BookOpen, title: 'Lease accounting', desc: 'Automated amortisation schedule, interest income recognition and journal entries.', iconBg: 'bg-[#FEE2E2]', iconColor: 'text-[#DC2626]' },
];

const problems = [
  { tag: 'Units in Excel?', text: 'Unit registry with buyer KYC, ownership records, and sq yard ↔ sqft conversion built in.' },
  { tag: 'Manual payouts?', text: 'Auto-scheduled monthly payouts per leaseback contract with escalation tracking.' },
  { tag: 'No lease accounting?', text: 'Automated amortisation schedule and journal entries for every leaseback contract.' },
];

const avatars = [
  { initials: 'SR', bg: 'bg-primary-light', color: 'text-primary-text' },
  { initials: 'RK', bg: 'bg-[#E0F2FE]', color: 'text-[#0369A1]' },
  { initials: 'MV', bg: 'bg-[#F3E8FF]', color: 'text-[#7C3AED]' },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* Navbar */}
      <nav className={`fixed left-0 right-0 top-0 z-50 h-14 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-white'} border-b border-border`}>
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-7">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-primary">
              <Building2 size={17} className="text-white" />
            </div>
            <span className="text-heading font-bold text-[15px]">FracProp OS</span>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/portal/login" className="rounded-[7px] border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-light">
              Buyer login
            </Link>
            <Link to="/dashboard" className="rounded-[7px] bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
              Start free trial
            </Link>
          </div>

          <button className="text-muted md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-white px-7 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link to="/portal/login" className="rounded-[7px] border border-primary px-4 py-2 text-center text-sm font-semibold text-primary" onClick={() => setMobileMenuOpen(false)}>Buyer login</Link>
              <Link to="/dashboard" className="rounded-[7px] bg-primary px-4 py-2 text-center text-sm font-semibold text-white" onClick={() => setMobileMenuOpen(false)}>Start free trial</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-7">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div className="animate-fadeIn">
              <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span className="text-[11px] font-semibold text-primary-text">Now live — Hyderabad &amp; Pune developers</span>
              </div>

              <h1 className="text-[34px] font-bold leading-[1.22] tracking-tight text-heading">
                Sell commercial space<br />
                in <span className="text-primary">fractions.</span><br />
                Automate every lease.
              </h1>

              <p className="mt-5 max-w-[420px] text-sm leading-[1.7] text-muted">
                FracProp OS helps real estate developers manage fractional unit sales,
                leaseback contracts, and monthly payouts — all in one platform.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/dashboard" className="rounded-[7px] bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
                  Start free trial
                </Link>
                <Link to="/dashboard" className="rounded-[7px] border border-border-input px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface">
                  See demo
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2.5">
                <div className="flex">
                  {avatars.map((a, i) => (
                    <div key={i} className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${a.bg} ${a.color} ${i > 0 ? '-ml-2 ring-2 ring-white' : ''}`}>
                      {a.initials}
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-subtle">Trusted by developers managing 500+ fractional units</p>
              </div>
            </div>

            {/* Right — demo card */}
            <div className="animate-fadeIn rounded-xl border border-border bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <p className="mb-3 text-[11px] text-subtle">Skyline Commerce Hub — Block A</p>

              {/* 8×5 unit grid */}
              <div className="grid grid-cols-8 gap-[3px]">
                {unitGrid.map((status, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-[3px] ${
                      status === 'overdue'
                        ? 'animate-pulse bg-[#EF4444]'
                        : status === 'sold'
                        ? 'bg-primary'
                        : status === 'reserved'
                        ? 'border-[1.5px] border-dashed border-primary bg-transparent'
                        : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-[2px] bg-primary" /><span className="text-[10px] text-subtle">Sold &amp; leased</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-[2px] bg-border" /><span className="text-[10px] text-subtle">Available</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 animate-pulse rounded-[2px] bg-[#EF4444]" /><span className="text-[10px] text-subtle">Overdue</span></div>
              </div>

              <div className="my-4 border-t border-border" />

              <p className="text-[11px] text-subtle">Monthly payout tracked</p>
              <p className="mt-1 text-2xl font-bold text-primary">₹7.56L</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-primary" style={{ width: '96.4%' }} />
              </div>
              <p className="mt-1.5 text-[11px] text-subtle">96.4% collected this month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem strip */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {problems.map((item, i) => (
              <div key={i} className="px-[22px] py-5">
                <span className="inline-block rounded-full bg-primary-light px-3 py-1 text-[11px] font-bold text-primary-text">{item.tag}</span>
                <p className="mt-3 text-[13px] leading-[1.6] text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface px-7 py-9">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">Platform Features</p>
          <h2 className="mt-2 text-[20px] font-bold text-heading">Everything a developer needs</h2>
          <p className="mt-1 text-[13px] text-muted">From first unit sale to full lease management — one platform</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-[10px] border border-border bg-white p-4 transition-shadow hover:shadow-card">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-[8px] ${f.iconBg}`}>
                    <Icon size={18} className={f.iconColor} />
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-heading">{f.title}</h3>
                  <p className="mt-1 text-[13px] leading-[1.6] text-muted">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white px-7 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-[11px] text-subtle">© 2026 FracProp OS. All rights reserved.</p>
          <p className="text-[11px] text-subtle">FracProp OS by Gnanova Pro AI Technologies</p>
        </div>
      </footer>
    </div>
  );
}
