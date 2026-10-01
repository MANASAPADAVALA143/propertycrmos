import { useState } from 'react';
import { Plus, Eye, Download, Edit, FileText, Phone } from 'lucide-react';
import { contracts, formatINRFull, type Contract } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';
import { useToasts, default as Toast } from '@/components/Toast';

export default function ContractsPage() {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const { toasts, showToast, dismissToast } = useToasts();

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">Leaseback Contracts</h1>
          <p className="mt-1 text-sm text-muted">{contracts.length} active contracts</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          <Plus size={18} /> New Contract
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[6px] border border-border bg-white p-5">
          <p className="text-sm text-muted">Active Contracts</p>
          <p className="mt-2 text-2xl font-bold text-[#0F766E]">{contracts.filter((c) => c.status === 'Active').length}</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <p className="text-sm text-muted">Total Monthly Liability</p>
          <p className="mt-2 text-2xl font-bold text-primary">{formatINRFull(contracts.length * 25000)}</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <p className="text-sm text-muted">Overdue Contracts</p>
          <p className="mt-2 text-2xl font-bold text-[#DC2626]">{contracts.filter((c) => c.status === 'Overdue').length}</p>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">Contract ID</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Buyer</th>
                <th className="px-4 py-3 font-medium">Lease Start</th>
                <th className="px-4 py-3 font-medium">Lease End</th>
                <th className="px-4 py-3 font-medium">Monthly Return</th>
                <th className="px-4 py-3 font-medium">Escalation</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, i) => (
                <tr
                  key={contract.id}
                  onClick={() => setSelectedContract(contract)}
                  className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <td className="px-4 py-3.5 text-heading">{contract.id}</td>
                  <td className="px-4 py-3.5 text-muted">{contract.unit}</td>
                  <td className="px-4 py-3.5 font-medium text-heading">{contract.buyer}</td>
                  <td className="px-4 py-3.5 text-muted">{contract.leaseStart}</td>
                  <td className="px-4 py-3.5 text-muted">{contract.leaseEnd}</td>
                  <td className="px-4 py-3.5 text-heading">{formatINRFull(contract.monthlyReturn)}</td>
                  <td className="px-4 py-3.5 text-muted">{contract.escalation}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={contract.status} /></td>
                  <td className="px-4 py-3.5">
                    <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedContract(contract); }}>
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Detail SlideOver */}
      <SlideOver open={!!selectedContract} onClose={() => setSelectedContract(null)} title="Contract Details">
        {selectedContract && (
          <ContractDetailPanel
            contract={selectedContract}
            onDownload={() => showToast(`Downloading ${selectedContract.id} as PDF...`)}
            onEdit={() => showToast(`Editing ${selectedContract.id}...`)}
          />
        )}
      </SlideOver>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function ContractDetailPanel({ contract, onDownload, onEdit }: { contract: Contract; onDownload: () => void; onEdit: () => void }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-primary-light">
          <FileText size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-heading">{contract.id}</p>
          <p className="text-xs text-muted">{contract.unit}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={contract.status} /></div>
      </div>

      {/* Linked Unit */}
      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Linked Unit</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">Unit</span><span className="text-heading">{contract.unit}</span></div>
          <div className="flex justify-between"><span className="text-muted">Size</span><span className="text-heading">{contract.unitSizeSqYards} sq yards ({contract.unitSizeSqft} sqft)</span></div>
        </div>
      </div>

      {/* Buyer */}
      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Buyer</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">Name</span><span className="text-heading">{contract.buyer}</span></div>
          <div className="flex items-center gap-2"><Phone size={14} className="text-muted" /><span className="text-heading">{contract.buyerPhone}</span></div>
        </div>
      </div>

      {/* Lease Terms */}
      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Lease Terms</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">Lease Start</span><span className="text-heading">{contract.leaseStart}</span></div>
          <div className="flex justify-between"><span className="text-muted">Lease End</span><span className="text-heading">{contract.leaseEnd}</span></div>
          <div className="flex justify-between"><span className="text-muted">Duration</span><span className="text-heading">5 years, 0 months remaining</span></div>
          <div className="flex justify-between"><span className="text-muted">Lock-in Period</span><span className="text-heading">{contract.lockInYears} years</span></div>
          <div className="flex justify-between"><span className="text-muted">Monthly Return</span><span className="font-semibold text-primary">{formatINRFull(contract.monthlyReturn)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Total Lease Obligation</span><span className="text-heading">{formatINRFull(contract.totalLeaseValue)} (60 months × ₹27,000)</span></div>
          <div className="flex justify-between"><span className="text-muted">Unit Purchase Price</span><span className="text-heading">{formatINRFull(contract.unitPurchasePrice)} (paid upfront by buyer)</span></div>
        </div>
      </div>

      {/* Escalation */}
      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Escalation</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">Annual Escalation</span><span className="text-heading">{contract.escalation}</span></div>
          <div className="flex justify-between"><span className="text-muted">Next Escalation</span><span className="text-heading">{contract.nextEscalationDate}</span></div>
          <div className="flex justify-between"><span className="text-muted">New Amount</span><span className="font-semibold text-primary">{formatINRFull(contract.nextEscalationAmount)}</span></div>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Payment History (Last 3 Months)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="pb-2 font-medium">Month</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {contract.paymentHistory.map((ph, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="py-2 text-heading">{ph.month}</td>
                <td className="py-2 text-heading">{formatINRFull(ph.amount)}</td>
                <td className="py-2"><StatusBadge status={ph.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button onClick={onDownload} className="flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-primary/50 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light">
          <Download size={16} /> Download PDF
        </button>
        <button onClick={onEdit} className="flex flex-1 items-center justify-center gap-2 rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          <Edit size={16} /> Edit
        </button>
      </div>
    </div>
  );
}
