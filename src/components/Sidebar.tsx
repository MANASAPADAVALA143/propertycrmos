import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  Grid3x3,
  Users,
  CreditCard,
  ScrollText,
  RefreshCw,
  TrendingUp,
  BookOpen,
  FolderOpen,
  Settings,
  Building2,
  Receipt,
  ChevronDown,
  ChevronRight,
  Upload,
  ArrowDownLeft,
  ArrowUpRight,
  Store,
} from 'lucide-react';

const mainLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Units', path: '/units', icon: Grid3x3 },
  { label: 'Buyers', path: '/buyers', icon: Users },
  { label: 'Payments', path: '/payments', icon: CreditCard },
  { label: 'Contracts', path: '/contracts', icon: ScrollText },
  { label: 'Renewals', path: '/renewals', icon: RefreshCw },
  { label: 'Cash Flow', path: '/cashflow', icon: TrendingUp },
  { label: 'IFRS 16', path: '/ifrs16', icon: BookOpen },
];

const invoiceSubLinks = [
  { label: 'AP — Payables', path: '/invoices/ap', icon: ArrowDownLeft },
  { label: 'AR — Receivables', path: '/invoices/ar', icon: ArrowUpRight },
  { label: 'Upload Invoice', path: '/invoices/upload', icon: Upload },
  { label: 'Vendor Master', path: '/invoices/vendors', icon: Store },
];

const bottomLinks = [
  { label: 'Documents', path: '/documents', icon: FolderOpen },
  { label: 'Settings', path: '/settings', icon: Settings },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const [invoicesExpanded, setInvoicesExpanded] = useState(
    location.pathname.startsWith('/invoices')
  );

  const isInvoicesActive = location.pathname.startsWith('/invoices');

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-[220px] overflow-y-auto bg-navy-900 border-r border-navy-600 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-5 py-5 border-b border-navy-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-gold-500">
              <Building2 size={18} className="text-navy-900" />
            </div>
            <div>
              <span className="text-white font-bold text-sm leading-tight block">FracProp OS</span>
              <span className="text-gold-500 text-[10px] leading-tight">by Gnanova</span>
            </div>
          </div>

          <nav className="flex-1 py-4">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'text-gold-500 border-r-2 border-gold-500 bg-navy-800/50'
                      : 'text-textgray hover:text-white hover:bg-navy-800/30'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}

            {/* Invoices expandable section */}
            <button
              onClick={() => setInvoicesExpanded(!invoicesExpanded)}
              className={`flex w-full items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isInvoicesActive
                  ? 'text-gold-500 bg-navy-800/50'
                  : 'text-textgray hover:text-white hover:bg-navy-800/30'
              }`}
            >
              <Receipt size={18} />
              <span className="flex-1 text-left">Invoices</span>
              {invoicesExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold-500 px-1 text-[9px] font-bold text-navy-900">3</span>
            </button>

            {invoicesExpanded && (
              <div className="bg-navy-800/20">
                <Link
                  to="/invoices"
                  onClick={onClose}
                  className={`flex items-center gap-3 py-2 pl-8 pr-5 text-sm transition-colors ${
                    location.pathname === '/invoices'
                      ? 'text-gold-500 border-r-2 border-gold-500'
                      : 'text-textgray hover:text-white'
                  }`}
                >
                  <Receipt size={16} />
                  Command Center
                </Link>
                {invoiceSubLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 py-2 pl-8 pr-5 text-sm transition-colors ${
                        isActive
                          ? 'text-gold-500 border-r-2 border-gold-500'
                          : 'text-textgray hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {bottomLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'text-gold-500 border-r-2 border-gold-500 bg-navy-800/50'
                      : 'text-textgray hover:text-white hover:bg-navy-800/30'
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-navy-600 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-gold-500">
                <Building2 size={16} className="text-navy-900" />
              </div>
              <div>
                <span className="text-white font-bold text-xs block">FracProp OS</span>
                <span className="text-textgray text-[10px]">by Gnanova Pro AI Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
