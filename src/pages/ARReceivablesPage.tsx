import { useState } from 'react';
import { Plus, Eye, Bell, X } from 'lucide-react';
import { arInvoices, CAM_OPERATOR, formatINRFull } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { useToasts, default as Toast } from '@/components/Toast';

export default function ARReceivablesPage() {
  const { toasts, showToast, dismissToast } = useToasts();
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const totalBilled = arInvoices.reduce((s, inv) => s + inv.amount, 0);
  const collected = arInvoices.filter((inv) => inv.status === 'Paid').reduce((s, inv) => s + inv.amount, 0);
  const outstanding = arInvoices.filter((inv) => inv.status === 'Sent').reduce((s, inv) => s + inv.amount, 0);
  const collectionRate = Math.round((collected / totalBilled) * 100);

  const summaryStats = [
    { label: 'Total Billed (2026)', value: formatINRFull(totalBilled), sub: '6 months × ₹81,000', color: 'text-primary' },
    { label: 'Collected', value: formatINRFull(collected), sub: '5 months', color: 'text-[#0F766E]' },
    { label: 'Outstanding', value: formatINRFull(outstanding), sub: 'Sep 2026 — due 15 Oct', color: 'text-[#B45309]' },
    { label: 'Collection Rate', value: `${collectionRate}%`, sub: 'All prior months paid', color: 'text-heading' },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">AR — CAM Invoices</h1>
          <p className="mt-1 text-sm text-muted">Invoices raised to {CAM_OPERATOR} for Common Area Maintenance</p>
        </div>
        <button onClick={() => setShowGenerateModal(true)} className="flex items-center justify-center gap-2 rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          <Plus size={18} /> Generate CAM Invoice
        </button>
      </div>

      {/* Summary Strip */}
      <div className="flex flex-wrap gap-4">
        {summaryStats.map((stat, i) => (
          <div key={i} className="flex-1 rounded-[6px] border border-border bg-white px-5 py-4">
            <span className="text-sm text-muted">{stat.label}</span>
            <p className={`mt-1 text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* AR Invoices Table */}
      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">Invoice No</th>
                <th className="px-4 py-3 font-medium">Billed To</th>
                <th className="px-4 py-3 font-medium">Month</th>
                <th className="px-4 py-3 font-medium">Invoice Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {arInvoices.map((inv, i) => (
                <tr key={inv.id} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-4 py-3 font-mono text-xs text-heading">{inv.id}</td>
                  <td className="px-4 py-3 text-muted">{inv.billedTo}</td>
                  <td className="px-4 py-3 text-heading">{inv.month}</td>
                  <td className="px-4 py-3 text-muted">{inv.invoiceDate}</td>
                  <td className="px-4 py-3 font-mono text-heading">{formatINRFull(inv.amount)}</td>
                  <td className="px-4 py-3 text-muted">{inv.dueDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3">
                    {inv.status === 'Sent' ? (
                      <button onClick={() => showToast(`Reminder sent to ${inv.billedTo}`)} className="flex items-center gap-1 text-xs text-[#B45309] hover:text-[#B45309]/80">
                        <Bell size={14} /> Send Reminder
                      </button>
                    ) : (
                      <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover">
                        <Eye size={14} /> View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate CAM Invoice Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[6px] border border-border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-heading">Generate CAM Invoice</h2>
              <button onClick={() => setShowGenerateModal(false)} className="text-muted hover:text-heading"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div className="rounded-[6px] bg-surface p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Billed To</span><span className="text-heading">{CAM_OPERATOR}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Month</span><span className="text-heading">Oct 2026</span></div>
                  <div className="flex justify-between"><span className="text-muted">Property</span><span className="text-heading">Skyline Commerce Hub, Block A</span></div>
                  <div className="flex justify-between"><span className="text-muted">Total Area</span><span className="text-heading">9,000 sqft</span></div>
                  <div className="flex justify-between"><span className="text-muted">CAM Rate</span><span className="text-heading">₹9/sqft/month</span></div>
                  <div className="flex justify-between border-t border-border pt-2"><span className="font-medium text-muted">Amount</span><span className="font-mono font-bold text-primary">{formatINRFull(81000)}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Due Date</span><span className="text-heading">15 Oct 2026</span></div>
                </div>
              </div>
            </div>
            <button
              onClick={() => { showToast('CAM invoice AR-2026-010 generated and sent'); setShowGenerateModal(false); }}
              className="mt-5 w-full rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Generate & Send Invoice
            </button>
          </div>
        </div>
      )}

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}
