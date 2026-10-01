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
    <div className="min-h-screen bg-navy-700">
      {/* Portal Sidebar (narrower, 180px) */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-[180px] bg-navy-900 border-r border-navy-600 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-4 py-5 border-b border-navy-600">
            <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-gold-500">
              <Building2 size={16} className="text-navy-900" />
            </div>
            <div>
              <span className="text-white font-bold text-xs block">FracProp OS</span>
              <span className="text-textgray text-[9px]">Buyer Portal</span>
            </div>
          </div>
          <nav className="flex-1 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    activeTab === item.key
                      ? 'text-gold-500 border-r-2 border-gold-500 bg-navy-800/50'
                      : 'text-textgray hover:text-white hover:bg-navy-800/30'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="border-t border-navy-600 px-4 py-4">
            <span className="text-textgray text-[9px]">by Gnanova Pro AI Technologies</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[180px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-navy-600 bg-navy-700/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-900">
              {portalBuyer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-white font-semibold text-base sm:text-lg">Welcome, {portalBuyer.name}</h1>
              <p className="text-textgray text-xs">{portalBuyer.id} · Buyer Portal</p>
            </div>
          </div>
          <button onClick={() => navigate('/portal/login')} className="flex items-center gap-1 text-textgray hover:text-white transition-colors">
            <LogOut size={18} /> <span className="hidden text-sm sm:inline">Logout</span>
          </button>
        </header>

        {/* Mobile Nav */}
        <div className="flex gap-2 overflow-x-auto border-b border-navy-600 bg-navy-800 px-4 py-2 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`whitespace-nowrap rounded-[6px] px-3 py-1.5 text-xs font-medium ${
                activeTab === item.key ? 'bg-gold-500 text-navy-900' : 'text-textgray'
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
      <h2 className="text-lg font-semibold text-white">My Units</h2>
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold text-white">Unit 001</p>
            <p className="mt-1 text-xs text-textgray">25 sq yards ({UNIT_SIZE_SQFT} sqft)</p>
          </div>
          <StatusBadge status="Active" />
        </div>
        <div className="mt-4 grid gap-3 border-t border-navy-600 pt-4 sm:grid-cols-2">
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
      <h2 className="text-lg font-semibold text-white">My Payments</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <p className="text-sm text-textgray">Total Received to Date</p>
          <p className="mt-2 text-2xl font-bold text-teal-500">{formatINRFull(totalReceived)}</p>
          <p className="mt-1 text-xs text-textgray">{history.length} months</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <p className="text-sm text-textgray">Remaining Lease Value</p>
          <p className="mt-2 text-2xl font-bold text-gold-500">{formatINRFull(remaining)}</p>
          <p className="mt-1 text-xs text-textgray">52 months remaining</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-600 text-left text-xs text-textgray">
              <th className="px-4 py-3 font-medium">Month</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((ph, i) => (
              <tr key={i} className={`border-b border-navy-600/50 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}>
                <td className="px-4 py-3 text-white">{ph.month}</td>
                <td className="px-4 py-3 text-white">{formatINRFull(ph.amount)}</td>
                <td className="px-4 py-3"><StatusBadge status={ph.status} /></td>
                <td className="px-4 py-3 text-textgray">{ph.paymentDate}</td>
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
      <h2 className="text-lg font-semibold text-white">My Documents</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {portalDocuments.map((doc, i) => (
          <div key={i} className="flex items-center gap-3 rounded-[6px] border border-navy-600 bg-navy-800 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-gold-500/15">
              <FolderOpen size={20} className="text-gold-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{doc.name}</p>
              <p className="text-xs text-textgray">{doc.type}</p>
            </div>
            <button className="text-gold-500 hover:text-gold-400">
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
      <h2 className="text-lg font-semibold text-white">Support</h2>
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">Contact Developer</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-textgray" />
            <span className="text-sm text-white">{PROJECT.developer}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-textgray" />
            <span className="text-sm text-white">+91 98765 00001</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-textgray" />
            <span className="text-sm text-white">contact@skylineventures.in</span>
          </div>
        </div>
        <button className="mt-5 flex items-center justify-center gap-2 rounded-[6px] bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500/90">
          <MessageCircle size={16} /> Chat with us on WhatsApp
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-textgray">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-gold-500' : 'text-white'}`}>{value}</span>
    </div>
  );
}
