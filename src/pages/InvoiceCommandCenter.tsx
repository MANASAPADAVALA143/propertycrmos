import { Link } from 'react-router-dom';
import {
  IndianRupee, AlertTriangle, Clock, TrendingUp,
  ArrowRight, AlertCircle, CheckCircle2, Info,
} from 'lucide-react';
import { invoiceKPIs, recentActivity, formatINRFull } from '@/data/mockData';
import { useToasts, default as Toast } from '@/components/Toast';

export default function InvoiceCommandCenter() {
  const { toasts, showToast, dismissToast } = useToasts();

  const kpiRow1 = [
    { label: 'Open AP Balance', value: formatINRFull(invoiceKPIs.openAPBalance), sub: `${invoiceKPIs.openAPCount} invoices pending`, icon: IndianRupee, color: 'text-primary' },
    { label: 'Overdue AP', value: formatINRFull(invoiceKPIs.overdueAP), sub: 'All current — none past due yet', icon: AlertCircle, color: 'text-[#0F766E]' },
    { label: 'Weighted Avg DPO', value: `${invoiceKPIs.avgDPO} days`, sub: 'Days payable outstanding', icon: Clock, color: 'text-heading' },
  ];

  const kpiRow2 = [
    { label: 'CAM Receivable', value: formatINRFull(invoiceKPIs.camReceivable), sub: 'Sep 2026 — from RealSpace Operations', icon: TrendingUp, color: 'text-[#0F766E]' },
    { label: 'Recoverable Value', value: formatINRFull(invoiceKPIs.recoverableValue), sub: 'Duplicate INV-2026-047 if caught = full amount saved', icon: IndianRupee, color: 'text-primary', tooltip: '₹3,20,000 — Duplicate invoice: INV-2026-047 (Sai Constructions) matches INV-2026-039. Same PO-031, same amount.' },
    { label: 'Recon Mismatches', value: String(invoiceKPIs.reconMismatches), sub: 'Lift Masters — ₹5,000 variance', icon: AlertTriangle, color: 'text-[#B45309]' },
  ];

  const actions = [
    { color: 'red', amount: '₹3,20,000 at risk', text: 'DUPLICATE: INV-2026-047 (Sai Constructions) matches INV-2026-039. Same PO-031, same amount. Reject immediately.', buttons: [{ label: 'Reject Duplicate', action: () => showToast('Duplicate invoice INV-2026-047 rejected') }] },
    { color: 'amber', amount: '₹5,000 variance', text: 'INV-2026-046 (Lift Masters India): Invoice ₹60,000 vs PO ₹55,000. Vendor claims revised scope.', buttons: [{ label: 'Review & Approve', action: () => showToast('Reviewing INV-2026-046 variance') }, { label: 'Request Credit Note', action: () => showToast('Credit note requested for INV-2026-046') }] },
    { color: 'amber', amount: '₹36,000 pending', text: 'INV-2026-045 (CleanCity) awaiting your approval for 5 days.', buttons: [{ label: 'Approve Now', action: () => showToast('INV-2026-045 approved') }] },
    { color: 'green', amount: '₹81,000 CAM invoice sent', text: 'RealSpace Operations Pvt. Ltd. — Sep 2026. Payment due 15 Oct.', buttons: [{ label: 'Track', action: () => {} }] },
  ];

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    red: { border: 'border-l-[#DC2626]', bg: 'bg-[#FEE2E2]/40', text: 'text-[#DC2626]' },
    amber: { border: 'border-l-[#B45309]', bg: 'bg-[#FEF3C7]/40', text: 'text-[#B45309]' },
    blue: { border: 'border-l-[#0369A1]', bg: 'bg-blue-500/5', text: 'text-[#0369A1]' },
    green: { border: 'border-l-teal-500', bg: 'bg-[#0D9488]/5', text: 'text-[#0F766E]' },
  };

  const activityIcons: Record<string, typeof Info> = {
    info: Info,
    success: CheckCircle2,
    error: AlertCircle,
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Invoice Portal</h1>
        <p className="mt-1 text-sm text-muted">Accounts Payable · Accounts Receivable · Skyline Commerce Hub, Block A</p>
      </div>

      {/* KPI Row 1 — AP */}
      <div className="grid gap-4 sm:grid-cols-3">
        {kpiRow1.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="rounded-[6px] border border-border bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{card.label}</span>
                <Icon size={18} className="text-primary" />
              </div>
              <p className={`mt-3 text-2xl font-bold ${card.color}`}>{card.value}</p>
              <p className="mt-1 text-xs text-muted">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* KPI Row 2 — AR + Recovery */}
      <div className="grid gap-4 sm:grid-cols-3">
        {kpiRow2.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`group relative rounded-[6px] border border-primary/30 bg-white p-5 ${card.tooltip ? 'cursor-help' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{card.label}</span>
                <Icon size={18} className="text-primary" />
              </div>
              <p className={`mt-3 text-2xl font-bold ${card.color}`}>{card.value}</p>
              <p className="mt-1 text-xs text-muted">{card.sub}</p>
              {card.tooltip && (
                <div className="invisible absolute left-0 top-full z-20 mt-1 w-72 rounded-[6px] border border-border bg-surface p-3 text-xs text-muted opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                  {card.tooltip.split('\n').map((line, j) => <p key={j}>{line}</p>)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Action Required Panel */}
        <div className="rounded-[6px] border border-border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-heading">Action Required</h2>
          <div className="space-y-3">
            {actions.map((action, i) => {
              const c = colorMap[action.color];
              return (
                <div key={i} className={`flex items-center justify-between rounded-[6px] border-l-4 ${c.border} ${c.bg} p-3`}>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${c.text}`}>{action.amount}</p>
                    <p className="mt-0.5 text-xs text-muted">{action.text}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {action.buttons.map((btn, j) => (
                      <button
                        key={j}
                        onClick={btn.action}
                        className={`rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                          btn.label.includes('Reject') || btn.label.includes('Duplicate')
                            ? 'border border-status-error/50 text-[#DC2626] hover:bg-[#FEE2E2]/60'
                            : btn.label.includes('Pay')
                            ? 'bg-primary text-white hover:bg-primary-hover'
                            : 'border border-border text-muted hover:text-heading'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/invoices/ap" className="mt-4 flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors">
            Go to AP Payables <ArrowRight size={14} />
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[6px] border border-border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-heading">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => {
              const Icon = activityIcons[activity.type] || Info;
              const iconColor = activity.type === 'success' ? 'text-[#0F766E]' : activity.type === 'error' ? 'text-[#DC2626]' : 'text-muted';
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon size={16} className={`mt-0.5 shrink-0 ${iconColor}`} />
                  <div>
                    <p className="text-xs text-heading">{activity.text}</p>
                    <p className="text-[10px] text-muted">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}
