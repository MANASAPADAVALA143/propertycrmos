import { useState } from 'react';
import { Eye, FileCheck, FileWarning, Plus, MessageCircle, Download, Phone, Mail } from 'lucide-react';
import { buyers, KPI_DATA, getInitials, formatINRFull, type Buyer } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';
import { useToasts, default as Toast } from '@/components/Toast';

const summaryStats = [
  { label: 'Total Buyers', value: String(KPI_DATA.totalBuyers), color: 'text-primary' },
  { label: 'Multi-unit buyers', value: String(KPI_DATA.multiUnitBuyers), color: 'text-heading' },
  { label: 'KYC Complete', value: `${KPI_DATA.kycComplete}/${KPI_DATA.totalBuyers}`, color: 'text-[#0F766E]' },
  { label: 'KYC Pending', value: String(KPI_DATA.kycPending), color: 'text-[#B45309]' },
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
          <h1 className="text-2xl font-bold text-heading">Buyers</h1>
          <p className="mt-1 text-sm text-muted">{KPI_DATA.totalBuyers} registered buyers · {buyers.length} shown</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          <Plus size={18} /> Add Buyer
        </button>
      </div>

      {/* Summary Strip */}
      <div className="flex flex-wrap gap-4">
        {summaryStats.map((stat, i) => (
          <div key={i} className="flex-1 rounded-[6px] border border-border bg-white px-5 py-4">
            <span className="text-sm text-muted">{stat.label}</span>
            <span className={`ml-2 text-lg font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Buyers Table */}
      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
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
                  className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <td className="px-4 py-3.5 text-heading">{buyer.id}</td>
                  <td className="px-4 py-3.5 font-medium text-heading">{buyer.name}</td>
                  <td className="px-4 py-3.5 text-muted">{buyer.phone}</td>
                  <td className="px-4 py-3.5 text-muted">{buyer.unitsOwned.join(', ')}</td>
                  <td className="px-4 py-3.5 text-muted">{buyer.purchaseDate}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={buyer.leaseStatus} /></td>
                  <td className="px-4 py-3.5">
                    {buyer.docsVerified ? (
                      <span className="flex items-center gap-1.5 text-xs text-[#0F766E]"><FileCheck size={14} /> Sale Deed ✓</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-[#B45309]"><FileWarning size={14} /> KYC Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedBuyer(buyer); }}>
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
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
          {getInitials(buyer.name)}
        </div>
        <div>
          <p className="text-lg font-bold text-heading">{buyer.name}</p>
          <p className="text-xs text-muted">{buyer.id}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={buyer.leaseStatus} /></div>
      </div>

      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Contact</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><Phone size={14} className="text-muted" /><span className="text-heading">{buyer.phone}</span></div>
          <div className="flex items-center gap-2"><Mail size={14} className="text-muted" /><span className="text-heading">{buyer.email}</span></div>
        </div>
      </div>

      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Units Owned</h3>
        <div className="flex flex-wrap gap-2">
          {buyer.unitsOwned.map((unit) => (
            <span key={unit} className="rounded-[6px] bg-primary-light px-3 py-1 text-xs font-medium text-primary">{unit}</span>
          ))}
        </div>
      </div>

      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">KYC Status</h3>
        <div className="flex flex-wrap gap-2">
          <KycBadge label="Aadhaar" verified={buyer.kyc.aadhaar} />
          <KycBadge label="PAN" verified={buyer.kyc.pan} />
          <KycBadge label="Address Proof" verified={buyer.kyc.addressProof} />
        </div>
        {missingKyc.length > 0 && (
          <p className="mt-3 text-xs text-[#DC2626]">{missingKyc.join(' and ')} missing</p>
        )}
      </div>

      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Documents</h3>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          <span className="rounded-[6px] bg-white px-3 py-1.5">Sale Deed</span>
          <span className="rounded-[6px] bg-white px-3 py-1.5">Leaseback Agreement</span>
          <span className="rounded-[6px] bg-white px-3 py-1.5">NOC</span>
        </div>
      </div>

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
            {buyer.paymentHistory.slice(0, 3).map((ph, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="py-2 text-heading">{ph.month}</td>
                <td className="py-2 text-heading">{formatINRFull(ph.amount)}</td>
                <td className="py-2"><StatusBadge status={ph.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        {buyer.leaseStatus === 'Overdue' && (
          <button onClick={onSendReminder} className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#0D9488] py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-[#0D9488]/90">
            <MessageCircle size={16} /> Send WhatsApp Reminder
          </button>
        )}
        <button className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-primary/50 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light">
          <Download size={16} /> Download Ownership Certificate
        </button>
      </div>
    </div>
  );
}

function KycBadge({ label, verified }: { label: string; verified: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs ${verified ? 'bg-[#CCFBF1] text-[#0F766E]' : 'bg-[#FEF3C7] text-[#B45309]'}`}>
      {label} {verified ? '✓' : '✗'}
    </span>
  );
}
