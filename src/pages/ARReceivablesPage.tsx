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
    { label: 'Total Billed (2026)', value: formatINRFull(totalBilled), sub: '6 months × ₹81,000', color: 'text-gold-500' },
    { label: 'Collected', value: formatINRFull(collected), sub: '5 months', color: 'text-teal-500' },
    { label: 'Outstanding', value: formatINRFull(outstanding), sub: 'Sep 2026 — due 15 Oct', color: 'text-status-warning' },
    { label: 'Collection Rate', value: `${collectionRate}%`, sub: 'All prior months paid', color: 'text-white' },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AR — CAM Invoices</h1>
          <p className="mt-1 text-sm text-textgray">Invoices raised to {CAM_OPERATOR} for Common Area Maintenance</p>
        </div>
        <button onClick={() => setShowGenerateModal(true)} className="flex items-center justify-center gap-2 rounded-[6px] bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
          <Plus size={18} /> Generate CAM Invoice
        </button>
      </div>

      {/* Summary Strip */}
      <div className="flex flex-wrap gap-4">
        {summaryStats.map((stat, i) => (
          <div key={i} className="flex-1 rounded-[6px] border border-navy-600 bg-navy-800 px-5 py-4">
            <span className="text-sm text-textgray">{stat.label}</span>
            <p className={`mt-1 text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-textgray">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* AR Invoices Table */}
      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
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
                <tr key={inv.id} className={`border-b border-navy-600/50 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}>
                  <td className="px-4 py-3 font-mono text-xs text-white">{inv.id}</td>
                  <td className="px-4 py-3 text-textgray">{inv.billedTo}</td>
                  <td className="px-4 py-3 text-white">{inv.month}</td>
                  <td className="px-4 py-3 text-textgray">{inv.invoiceDate}</td>
                  <td className="px-4 py-3 font-mono text-white">{formatINRFull(inv.amount)}</td>
                  <td className="px-4 py-3 text-textgray">{inv.dueDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3">
                    {inv.status === 'Sent' ? (
                      <button onClick={() => showToast(`Reminder sent to ${inv.billedTo}`)} className="flex items-center gap-1 text-xs text-status-warning hover:text-status-warning/80">
                        <Bell size={14} /> Send Reminder
                      </button>
                    ) : (
                      <button className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400">
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
          <div className="w-full max-w-md rounded-[6px] border border-navy-600 bg-navy-800 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Generate CAM Invoice</h2>
              <button onClick={() => setShowGenerateModal(false)} className="text-textgray hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div className="rounded-[6px] bg-navy-900 p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-textgray">Billed To</span><span className="text-white">{CAM_OPERATOR}</span></div>
                  <div className="flex justify-between"><span className="text-textgray">Month</span><span className="text-white">Oct 2026</span></div>
                  <div className="flex justify-between"><span className="text-textgray">Property</span><span className="text-white">Skyline Commerce Hub, Block A</span></div>
                  <div className="flex justify-between"><span className="text-textgray">Total Area</span><span className="text-white">9,000 sqft</span></div>
                  <div className="flex justify-between"><span className="text-textgray">CAM Rate</span><span className="text-white">₹9/sqft/month</span></div>
                  <div className="flex justify-between border-t border-navy-600 pt-2"><span className="font-medium text-textgray">Amount</span><span className="font-mono font-bold text-gold-500">{formatINRFull(81000)}</span></div>
                  <div className="flex justify-between"><span className="text-textgray">Due Date</span><span className="text-white">15 Oct 2026</span></div>
                </div>
              </div>
            </div>
            <button
              onClick={() => { showToast('CAM invoice AR-2026-010 generated and sent'); setShowGenerateModal(false); }}
              className="mt-5 w-full rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
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
