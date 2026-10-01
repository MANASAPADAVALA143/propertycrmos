import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2, Grid3x3, CreditCard, FolderOpen, MessageCircle, LogOut,
  Download, CheckCircle2, Calendar, Phone, Mail,
} from 'lucide-react';
import { portalBuyer, portalDocuments, formatINRFull, UNIT_SIZE_SQFT, PROJECT } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';

type Tab = 'units' | 'payments' | 'documents' | 'support';

const navItems: { key: Tab; label: string; icon: typeof Grid3x3 }[] = [
  { key: 'units', label: 'My Units', icon: Grid3x3 },
  { key: 'payments', label: 'My Payments', icon: CreditCard },
  { key: 'documents', label: 'My Documents', icon: FolderOpen },
  { key: 'support', label: 'Support', icon: MessageCircle },
];

export default function PortalDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('units');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Portal Sidebar (narrower, 180px) */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-[180px] lg:block" style={{ backgroundColor: '#134E4A' }}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-4 py-5 border-b" style={{ borderColor: '#115E59' }}>
            <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary">
              <Building2 size={16} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xs block">FracProp OS</span>
              <span className="text-[9px]" style={{ color: '#5EEAD4' }}>Buyer Portal</span>
            </div>
          </div>
          <nav className="flex-1 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className="flex w-full items-center gap-3 border-r-[3px] px-4 py-2.5 text-sm transition-colors"
                  style={{
                    borderColor: activeTab === item.key ? '#0D9488' : 'transparent',
                    backgroundColor: activeTab === item.key ? '#115E59' : undefined,
                    color: '#99F6E4',
                  }}
                  onMouseEnter={e => { if (activeTab !== item.key) (e.currentTarget as HTMLElement).style.backgroundColor = '#115E59'; }}
                  onMouseLeave={e => { if (activeTab !== item.key) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="border-t px-4 py-4" style={{ borderColor: '#115E59' }}>
            <span className="text-[9px]" style={{ color: '#5EEAD4' }}>by Gnanova Pro AI Technologies</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[180px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {portalBuyer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-heading font-semibold text-base sm:text-lg">Welcome, {portalBuyer.name}</h1>
              <p className="text-muted text-xs">{portalBuyer.id} · Buyer Portal</p>
            </div>
          </div>
          <button onClick={() => navigate('/portal/login')} className="flex items-center gap-1 text-muted hover:text-heading transition-colors">
            <LogOut size={18} /> <span className="hidden text-sm sm:inline">Logout</span>
          </button>
        </header>

        {/* Mobile Nav */}
        <div className="flex gap-2 overflow-x-auto border-b border-border bg-white px-4 py-2 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`whitespace-nowrap rounded-[6px] px-3 py-1.5 text-xs font-medium ${
                activeTab === item.key ? 'bg-primary text-white' : 'text-muted'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <main className="animate-fadeIn p-4 sm:p-6">
          {activeTab === 'units' && <MyUnitsTab />}
          {activeTab === 'payments' && <MyPaymentsTab />}
          {activeTab === 'documents' && <MyDocumentsTab />}
          {activeTab === 'support' && <SupportTab />}
        </main>
      </div>
    </div>
  );
}

function MyUnitsTab() {
  return (
    <div className="animate-fadeIn space-y-4">
      <h2 className="text-lg font-semibold text-heading">My Units</h2>
      <div className="rounded-[6px] border border-border bg-white p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold text-heading">Unit 001</p>
            <p className="mt-1 text-xs text-muted">25 sq yards ({UNIT_SIZE_SQFT} sqft)</p>
          </div>
          <StatusBadge status="Active" />
        </div>
        <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <InfoRow label="Monthly Return" value={formatINRFull(27000)} highlight />
          <InfoRow label="Lease Start" value="01 May 2026" />
          <InfoRow label="Lease End" value="30 Apr 2031" />
          <InfoRow label="Next Payment Due" value="01 Oct 2026" />
          <InfoRow label="IFRS 16 Classification" value="Finance Lease" />
          <InfoRow label="Purchase Price" value={formatINRFull(1800000)} />
        </div>
      </div>
    </div>
  );
}

function MyPaymentsTab() {
  const history = portalBuyer.paymentHistory;
  const totalReceived = history.reduce((s, p) => s + p.amount, 0);
  const remaining = 1620000 - totalReceived;

  return (
    <div className="animate-fadeIn space-y-4">
      <h2 className="text-lg font-semibold text-heading">My Payments</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[6px] border border-border bg-white p-5">
          <p className="text-sm text-muted">Total Received to Date</p>
          <p className="mt-2 text-2xl font-bold text-[#0F766E]">{formatINRFull(totalReceived)}</p>
          <p className="mt-1 text-xs text-muted">{history.length} months</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <p className="text-sm text-muted">Remaining Lease Value</p>
          <p className="mt-2 text-2xl font-bold text-primary">{formatINRFull(remaining)}</p>
          <p className="mt-1 text-xs text-muted">52 months remaining</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Month</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((ph, i) => (
              <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="px-4 py-3 text-heading">{ph.month}</td>
                <td className="px-4 py-3 text-heading">{formatINRFull(ph.amount)}</td>
                <td className="px-4 py-3"><StatusBadge status={ph.status} /></td>
                <td className="px-4 py-3 text-muted">{ph.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MyDocumentsTab() {
  return (
    <div className="animate-fadeIn space-y-4">
      <h2 className="text-lg font-semibold text-heading">My Documents</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {portalDocuments.map((doc, i) => (
          <div key={i} className="flex items-center gap-3 rounded-[6px] border border-border bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-primary-light">
              <FolderOpen size={20} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-heading">{doc.name}</p>
              <p className="text-xs text-muted">{doc.type}</p>
            </div>
            <button className="text-primary hover:text-primary-hover">
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportTab() {
  return (
    <div className="animate-fadeIn space-y-4">
      <h2 className="text-lg font-semibold text-heading">Support</h2>
      <div className="rounded-[6px] border border-border bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-heading">Contact Developer</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-muted" />
            <span className="text-sm text-heading">{PROJECT.developer}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-muted" />
            <span className="text-sm text-heading">+91 98765 00001</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-muted" />
            <span className="text-sm text-heading">contact@skylineventures.in</span>
          </div>
        </div>
        <button className="mt-5 flex items-center justify-center gap-2 rounded-[6px] bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-[#0D9488]/90">
          <MessageCircle size={16} /> Chat with us on WhatsApp
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-primary' : 'text-heading'}`}>{value}</span>
    </div>
  );
}
