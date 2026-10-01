import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ArrowRight,
  Play,
  CheckCircle2,
  Grid3x3,
  Users,
  FileText,
  CalendarClock,
  BarChart3,
  BookOpen,
  Check,
  Menu,
  X,
} from 'lucide-react';

const features = [
  {
    icon: Grid3x3,
    title: 'Unit Master',
    desc: 'Track every fractional unit, size, status, sq yard ↔ sqft conversion',
  },
  {
    icon: Users,
    title: 'Buyer Registry',
    desc: 'Owner KYC, purchase records, sale deed uploads',
  },
  {
    icon: FileText,
    title: 'Leaseback Contracts',
    desc: 'Lease terms, monthly return amount, escalation clauses',
  },
  {
    icon: CalendarClock,
    title: 'Payment Scheduler',
    desc: 'Auto-generate monthly dues, mark paid/overdue',
  },
  {
    icon: BarChart3,
    title: 'Developer Dashboard',
    desc: 'Total payout liability, collection rate, unit occupancy map',
  },
  {
    icon: BookOpen,
    title: 'IFRS 16 Finance Lease',
    desc: 'Auto-classify leasebacks, generate interest income schedule, unearned income recognition',
  },
];

const problems = [
  {
    problem: 'Tracking unit sales in Excel?',
    solution: 'Unit registry with buyer KYC, documents, and ownership history',
  },
  {
    problem: 'Calculating lease payouts manually?',
    solution: 'Auto-scheduled monthly payouts per leaseback contract',
  },
  {
    problem: 'No visibility on collection status?',
    solution: 'Real-time dashboard — paid, overdue, and pending in one view',
  },
];

const steps = [
  {
    num: '01',
    title: 'Set up your project',
    desc: 'Enter total area, unit size, price per unit',
  },
  {
    num: '02',
    title: 'Register sales & leaseback',
    desc: 'Add buyers, upload deeds, set lease terms',
  },
  {
    num: '03',
    title: 'Track payouts automatically',
    desc: 'Scheduler generates dues, alerts on overdue',
  },
];

const unitGrid = Array.from({ length: 40 }, (_, i) => {
  if (i === 2 || i === 5 || i === 8) return 'overdue';
  if (i < 28) return 'sold';
  return 'available';
});

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy-900/95 backdrop-blur border-b border-navy-600 py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-gold-500">
              <Building2 size={18} className="text-navy-900" />
            </div>
            <span className="text-white font-bold text-lg">FracProp OS</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-textgray hover:text-white transition-colors text-sm">Features</a>
            <a href="#how" className="text-textgray hover:text-white transition-colors text-sm">How it works</a>
            <a href="#pricing" className="text-textgray hover:text-white transition-colors text-sm">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/portal/login"
              className="hidden rounded-[6px] border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5 sm:block"
            >
              Buyer Login
            </Link>
            <Link
              to="/dashboard"
              className="hidden rounded-[6px] bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400 md:block"
            >
              Start Free Trial
            </Link>
            <button
              className="text-white md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-navy-600 bg-navy-900 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-textgray hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how" className="text-textgray hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>How it works</a>
              <a href="#pricing" className="text-textgray hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link to="/portal/login" className="rounded-[6px] border border-white/30 px-5 py-2.5 text-center text-sm font-semibold text-white">Buyer Login</Link>
              <Link to="/dashboard" className="rounded-[6px] bg-gold-500 px-5 py-2.5 text-center text-sm font-semibold text-navy-900">Start Free Trial</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fadeIn">
              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
                Sell Commercial Space in Fractions. Automate Every Lease.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-textgray">
                FracProp OS helps real estate developers manage fractional unit sales, leaseback contracts, and monthly payouts — all in one platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-[6px] bg-gold-500 px-6 py-3 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                >
                  Start Free Trial
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-[6px] border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <Play size={16} />
                  See Demo
                </Link>
              </div>
              <p className="mt-6 text-sm text-textgray">
                Used by developers managing 500+ fractional units
              </p>
            </div>

            {/* Hero mockup card */}
            <div className="animate-fadeIn rounded-[6px] border border-navy-600 bg-navy-800 p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-textgray">Skyline Commerce Hub — Block A</p>
                  <p className="text-sm font-semibold text-white">Unit Occupancy</p>
                </div>
                <div className="rounded-[6px] bg-gold-500/15 px-3 py-1">
                  <span className="text-xs font-medium text-gold-500">28/40 Sold · 1 Reserved</span>
                </div>
              </div>

              <div className="grid grid-cols-8 gap-1.5">
                {unitGrid.map((status, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-[3px] ${
                      status === 'sold'
                        ? 'bg-gold-500'
                        : status === 'overdue'
                        ? 'bg-status-error'
                        : 'bg-navy-500'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-navy-600 pt-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-[3px] bg-gold-500" />
                    <span className="text-xs text-textgray">Sold</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-[3px] bg-navy-500" />
                    <span className="text-xs text-textgray">Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-[3px] bg-status-error" />
                    <span className="text-xs text-textgray">Overdue</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[6px] bg-navy-900 p-4">
                <p className="text-xs text-textgray">Monthly Payout Tracked</p>
                <p className="text-2xl font-bold text-gold-500">₹7.56L</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-500">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: '96.4%' }} />
                </div>
                <p className="mt-1.5 text-xs text-textgray">96.4% collected this month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution strip */}
      <section className="border-y border-navy-600 bg-navy-800/50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((item, i) => (
              <div key={i} className="rounded-[6px] border border-navy-600 bg-navy-800 p-6">
                <p className="text-sm text-textgray line-through">{item.problem}</p>
                <div className="mt-3 flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-500" />
                  <p className="text-sm font-medium text-white">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to manage fractional property</h2>
            <p className="mt-4 text-textgray">From unit registration to monthly payout tracking — all in one platform</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group rounded-[6px] border border-navy-600 bg-navy-800 p-6 transition-colors hover:border-gold-500/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-gold-500/15 transition-colors group-hover:bg-gold-500/25">
                    <Icon size={22} className="text-gold-500" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>

                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-textgray">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-navy-600 bg-navy-800/50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-4 text-textgray">Three steps to go from spreadsheet to system</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute top-8 left-[60%] hidden h-px w-[80%] bg-navy-600 md:block" />
                )}
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[6px] border-2 border-gold-500 bg-navy-900 text-2xl font-bold text-gold-500">
                    {step.num}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-textgray">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">Start your free trial today</h2>
            <p className="mt-4 text-textgray">No credit card required. Get started in minutes.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-textgray">
                <Check size={16} className="text-teal-500" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2 text-sm text-textgray">
                <Check size={16} className="text-teal-500" />
                Unlimited units
              </div>
              <div className="flex items-center gap-2 text-sm text-textgray">
                <Check size={16} className="text-teal-500" />
                Cancel anytime
              </div>
            </div>
            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-[6px] bg-gold-500 px-8 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-600 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-gold-500">
                <Building2 size={18} className="text-navy-900" />
              </div>
              <div>
                <span className="text-white font-bold text-sm">FracProp OS</span>
                <p className="text-xs text-textgray">Sell in fractions. Manage everything.</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-textgray">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-navy-600 pt-6 text-center">
            <p className="text-xs text-textgray">FracProp OS by Gnanova Pro AI Technologies · Copyright 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
