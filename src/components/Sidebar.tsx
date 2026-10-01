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
  { label: 'Lease Accounting', path: '/ifrs16', icon: BookOpen },
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
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-[220px] overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#134E4A' }}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2.5 border-b px-5 py-5" style={{ borderColor: '#115E59' }}>
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-primary">
              <Building2 size={17} className="text-white" />
            </div>
            <div>
              <span className="block text-sm font-semibold leading-tight text-white">FracProp OS</span>
              <span className="text-[10px] leading-tight" style={{ color: '#5EEAD4' }}>by Gnanova</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-3">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 border-l-[3px] px-5 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'border-primary text-white'
                      : 'border-transparent hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isActive ? '#115E59' : undefined,
                    color: isActive ? '#FFFFFF' : '#99F6E4',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = '#115E59'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  <Icon size={17} />
                  {link.label}
                </Link>
              );
            })}

            {/* Invoices expandable */}
            <button
              onClick={() => setInvoicesExpanded(!invoicesExpanded)}
              className="flex w-full items-center gap-3 border-l-[3px] px-5 py-2.5 text-sm transition-colors"
              style={{
                borderColor: isInvoicesActive ? '#0D9488' : 'transparent',
                backgroundColor: isInvoicesActive ? '#115E59' : undefined,
                color: isInvoicesActive ? '#FFFFFF' : '#99F6E4',
              }}
              onMouseEnter={e => { if (!isInvoicesActive) (e.currentTarget as HTMLElement).style.backgroundColor = '#115E59'; }}
              onMouseLeave={e => { if (!isInvoicesActive) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
            >
              <Receipt size={17} />
              <span className="flex-1 text-left">Invoices</span>
              {invoicesExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">3</span>
            </button>

            {invoicesExpanded && (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                <Link
                  to="/invoices"
                  onClick={onClose}
                  className="flex items-center gap-3 border-l-[3px] py-2 pl-8 pr-5 text-sm transition-colors"
                  style={{
                    borderColor: location.pathname === '/invoices' ? '#0D9488' : 'transparent',
                    color: location.pathname === '/invoices' ? '#FFFFFF' : '#99F6E4',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#115E59'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = ''}
                >
                  <Receipt size={15} />
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
                      className="flex items-center gap-3 border-l-[3px] py-2 pl-8 pr-5 text-sm transition-colors"
                      style={{
                        borderColor: isActive ? '#0D9488' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#99F6E4',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#115E59'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = ''}
                    >
                      <Icon size={15} />
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
                  className="flex items-center gap-3 border-l-[3px] px-5 py-2.5 text-sm transition-colors"
                  style={{
                    borderColor: isActive ? '#0D9488' : 'transparent',
                    backgroundColor: isActive ? '#115E59' : undefined,
                    color: isActive ? '#FFFFFF' : '#99F6E4',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = '#115E59'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  <Icon size={17} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom branding */}
          <div className="border-t px-5 py-4" style={{ borderColor: '#115E59' }}>
            <p className="text-[10px]" style={{ color: '#5EEAD4' }}>by Gnanova Pro AI Technologies</p>
          </div>
        </div>
      </aside>
    </>
  );
}
