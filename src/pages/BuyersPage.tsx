import { useState } from 'react';
import { Eye, FileCheck, FileWarning, Plus, MessageCircle, Download, Phone, Mail } from 'lucide-react';
import { buyers, KPI_DATA, getInitials, formatINRFull, type Buyer } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';
import { useToasts, default as Toast } from '@/components/Toast';

const summaryStats = [
  { label: 'Total Buyers', value: String(KPI_DATA.totalBuyers), color: 'text-gold-500' },
  { label: 'Multi-unit buyers', value: String(KPI_DATA.multiUnitBuyers), color: 'text-white' },
  { label: 'KYC Complete', value: `${KPI_DATA.kycComplete}/${KPI_DATA.totalBuyers}`, color: 'text-teal-500' },
  { label: 'KYC Pending', value: String(KPI_DATA.kycPending), color: 'text-status-warning' },
];

function getMissingKyc(buyer: Buyer): string[] {
  const missing: string[] = [];
  if (!buyer.kyc.pan) missing.push('PAN');
  if (!buyer.kyc.addressProof) missing.push('Address Proof');
  if (!buyer.kyc.aadhaar) missing.push('Aadhaar');
  return missing;
}

export default function BuyersPage() {
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const { toasts, showToast, dismissToast } = useToasts();

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Buyers</h1>
          <p className="mt-1 text-sm text-textgray">{KPI_DATA.totalBuyers} registered buyers · {buyers.length} shown</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
          <Plus size={18} /> Add Buyer
        </button>
      </div>

      {/* Summary Strip */}
      <div className="flex flex-wrap gap-4">
        {summaryStats.map((stat, i) => (
          <div key={i} className="flex-1 rounded-[6px] border border-navy-600 bg-navy-800 px-5 py-4">
            <span className="text-sm text-textgray">{stat.label}</span>
            <span className={`ml-2 text-lg font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Buyers Table */}
      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="px-4 py-3 font-medium">Buyer ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Units Owned</th>
                <th className="px-4 py-3 font-medium">Purchase Date</th>
                <th className="px-4 py-3 font-medium">Lease Status</th>
                <th className="px-4 py-3 font-medium">Documents</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, i) => (
                <tr
                  key={buyer.id}
                  onClick={() => setSelectedBuyer(buyer)}
                  className={`cursor-pointer border-b border-navy-600/50 transition-colors hover:bg-navy-600/30 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}
                >
                  <td className="px-4 py-3.5 text-white">{buyer.id}</td>
                  <td className="px-4 py-3.5 font-medium text-white">{buyer.name}</td>
                  <td className="px-4 py-3.5 text-textgray">{buyer.phone}</td>
                  <td className="px-4 py-3.5 text-textgray">{buyer.unitsOwned.join(', ')}</td>
                  <td className="px-4 py-3.5 text-textgray">{buyer.purchaseDate}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={buyer.leaseStatus} /></td>
                  <td className="px-4 py-3.5">
                    {buyer.docsVerified ? (
                      <span className="flex items-center gap-1.5 text-xs text-teal-500"><FileCheck size={14} /> Sale Deed ✓</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-status-warning"><FileWarning size={14} /> KYC Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedBuyer(buyer); }}>
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buyer Detail SlideOver */}
      <SlideOver open={!!selectedBuyer} onClose={() => setSelectedBuyer(null)} title="Buyer Profile">
        {selectedBuyer && (
          <BuyerDetailPanel buyer={selectedBuyer} onSendReminder={() => showToast(`WhatsApp reminder sent to ${selectedBuyer.name}`)} />
        )}
      </SlideOver>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function BuyerDetailPanel({ buyer, onSendReminder }: { buyer: Buyer; onSendReminder: () => void }) {
  const missingKyc = getMissingKyc(buyer);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-xl font-bold text-navy-900">
          {getInitials(buyer.name)}
        </div>
        <div>
          <p className="text-lg font-bold text-white">{buyer.name}</p>
          <p className="text-xs text-textgray">{buyer.id}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={buyer.leaseStatus} /></div>
      </div>

      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Contact</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><Phone size={14} className="text-textgray" /><span className="text-white">{buyer.phone}</span></div>
          <div className="flex items-center gap-2"><Mail size={14} className="text-textgray" /><span className="text-white">{buyer.email}</span></div>
        </div>
      </div>

      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Units Owned</h3>
        <div className="flex flex-wrap gap-2">
          {buyer.unitsOwned.map((unit) => (
            <span key={unit} className="rounded-[6px] bg-gold-500/15 px-3 py-1 text-xs font-medium text-gold-500">{unit}</span>
          ))}
        </div>
      </div>

      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">KYC Status</h3>
        <div className="flex flex-wrap gap-2">
          <KycBadge label="Aadhaar" verified={buyer.kyc.aadhaar} />
          <KycBadge label="PAN" verified={buyer.kyc.pan} />
          <KycBadge label="Address Proof" verified={buyer.kyc.addressProof} />
        </div>
        {missingKyc.length > 0 && (
          <p className="mt-3 text-xs text-status-error">{missingKyc.join(' and ')} missing</p>
        )}
      </div>

      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Documents</h3>
        <div className="flex flex-wrap gap-2 text-xs text-textgray">
          <span className="rounded-[6px] bg-navy-800 px-3 py-1.5">Sale Deed</span>
          <span className="rounded-[6px] bg-navy-800 px-3 py-1.5">Leaseback Agreement</span>
          <span className="rounded-[6px] bg-navy-800 px-3 py-1.5">NOC</span>
        </div>
      </div>

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
            {buyer.paymentHistory.slice(0, 3).map((ph, i) => (
              <tr key={i} className="border-t border-navy-600/50">
                <td className="py-2 text-white">{ph.month}</td>
                <td className="py-2 text-white">{formatINRFull(ph.amount)}</td>
                <td className="py-2"><StatusBadge status={ph.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        {buyer.leaseStatus === 'Overdue' && (
          <button onClick={onSendReminder} className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-teal-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500/90">
            <MessageCircle size={16} /> Send WhatsApp Reminder
          </button>
        )}
        <button className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-gold-500/50 py-2.5 text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500/10">
          <Download size={16} /> Download Ownership Certificate
        </button>
      </div>
    </div>
  );
}

function KycBadge({ label, verified }: { label: string; verified: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs ${verified ? 'bg-teal-500/15 text-teal-500' : 'bg-status-warning/15 text-status-warning'}`}>
      {label} {verified ? '✓' : '✗'}
    </span>
  );
}
