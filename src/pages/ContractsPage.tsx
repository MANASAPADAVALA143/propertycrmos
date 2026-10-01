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
          <h1 className="text-2xl font-bold text-white">Leaseback Contracts</h1>
          <p className="mt-1 text-sm text-textgray">{contracts.length} active contracts</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
          <Plus size={18} /> New Contract
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <p className="text-sm text-textgray">Active Contracts</p>
          <p className="mt-2 text-2xl font-bold text-teal-500">{contracts.filter((c) => c.status === 'Active').length}</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <p className="text-sm text-textgray">Total Monthly Liability</p>
          <p className="mt-2 text-2xl font-bold text-gold-500">{formatINRFull(contracts.length * 25000)}</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <p className="text-sm text-textgray">Overdue Contracts</p>
          <p className="mt-2 text-2xl font-bold text-status-error">{contracts.filter((c) => c.status === 'Overdue').length}</p>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
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
                  className={`cursor-pointer border-b border-navy-600/50 transition-colors hover:bg-navy-600/30 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}
                >
                  <td className="px-4 py-3.5 text-white">{contract.id}</td>
                  <td className="px-4 py-3.5 text-textgray">{contract.unit}</td>
                  <td className="px-4 py-3.5 font-medium text-white">{contract.buyer}</td>
                  <td className="px-4 py-3.5 text-textgray">{contract.leaseStart}</td>
                  <td className="px-4 py-3.5 text-textgray">{contract.leaseEnd}</td>
                  <td className="px-4 py-3.5 text-white">{formatINRFull(contract.monthlyReturn)}</td>
                  <td className="px-4 py-3.5 text-textgray">{contract.escalation}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={contract.status} /></td>
                  <td className="px-4 py-3.5">
                    <button className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedContract(contract); }}>
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
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-gold-500/15">
          <FileText size={24} className="text-gold-500" />
        </div>
        <div>
          <p className="text-lg font-bold text-white">{contract.id}</p>
          <p className="text-xs text-textgray">{contract.unit}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={contract.status} /></div>
      </div>

      {/* Linked Unit */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Linked Unit</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-textgray">Unit</span><span className="text-white">{contract.unit}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Size</span><span className="text-white">{contract.unitSizeSqYards} sq yards ({contract.unitSizeSqft} sqft)</span></div>
        </div>
      </div>

      {/* Buyer */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Buyer</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-textgray">Name</span><span className="text-white">{contract.buyer}</span></div>
          <div className="flex items-center gap-2"><Phone size={14} className="text-textgray" /><span className="text-white">{contract.buyerPhone}</span></div>
        </div>
      </div>

      {/* Lease Terms */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Lease Terms</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-textgray">Lease Start</span><span className="text-white">{contract.leaseStart}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Lease End</span><span className="text-white">{contract.leaseEnd}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Duration</span><span className="text-white">5 years, 0 months remaining</span></div>
          <div className="flex justify-between"><span className="text-textgray">Lock-in Period</span><span className="text-white">{contract.lockInYears} years</span></div>
          <div className="flex justify-between"><span className="text-textgray">Monthly Return</span><span className="font-semibold text-gold-500">{formatINRFull(contract.monthlyReturn)}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Total Lease Obligation</span><span className="text-white">{formatINRFull(contract.totalLeaseValue)} (60 months × ₹27,000)</span></div>
          <div className="flex justify-between"><span className="text-textgray">Unit Purchase Price</span><span className="text-white">{formatINRFull(contract.unitPurchasePrice)} (paid upfront by buyer)</span></div>
        </div>
      </div>

      {/* Escalation */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Escalation</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-textgray">Annual Escalation</span><span className="text-white">{contract.escalation}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Next Escalation</span><span className="text-white">{contract.nextEscalationDate}</span></div>
          <div className="flex justify-between"><span className="text-textgray">New Amount</span><span className="font-semibold text-gold-500">{formatINRFull(contract.nextEscalationAmount)}</span></div>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Payment History (Last 3 Months)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-textgray">
              <th className="pb-2 font-medium">Month</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {contract.paymentHistory.map((ph, i) => (
              <tr key={i} className="border-t border-navy-600/50">
                <td className="py-2 text-white">{ph.month}</td>
                <td className="py-2 text-white">{formatINRFull(ph.amount)}</td>
                <td className="py-2"><StatusBadge status={ph.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button onClick={onDownload} className="flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-gold-500/50 py-2.5 text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500/10">
          <Download size={16} /> Download PDF
        </button>
        <button onClick={onEdit} className="flex flex-1 items-center justify-center gap-2 rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
          <Edit size={16} /> Edit
        </button>
      </div>
    </div>
  );
}
