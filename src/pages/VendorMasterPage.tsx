import { useState } from 'react';
import { Eye, MessageCircle, FileText, Phone, AlertTriangle } from 'lucide-react';
import { vendors, formatINRFull, type Vendor } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';
import { useToasts, default as Toast } from '@/components/Toast';

export default function VendorMasterPage() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const { toasts, showToast, dismissToast } = useToasts();

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Vendor Master</h1>
        <p className="mt-1 text-sm text-muted">{vendors.length} registered vendors</p>
      </div>

      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">Vendor ID</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">GSTIN</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Bank Account</th>
                <th className="px-4 py-3 font-medium">Total Paid (YTD)</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, i) => (
                <tr
                  key={vendor.id}
                  onClick={() => setSelectedVendor(vendor)}
                  className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-100 ${
                    vendor.status === 'Watch' ? 'bg-[#FEF3C7]/40' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-3.5 text-heading">{vendor.id}</td>
                  <td className="px-4 py-3.5 font-medium text-heading">{vendor.name}</td>
                  <td className="px-4 py-3.5 text-muted">{vendor.category}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-muted">{vendor.gstin}</td>
                  <td className="px-4 py-3.5 text-muted">{vendor.phone}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-muted">{vendor.bank} {vendor.accountNo}</td>
                  <td className="px-4 py-3.5 font-mono text-heading">{formatINRFull(vendor.totalPaidYTD)}</td>
                  <td className="px-4 py-3.5">
                    {vendor.status === 'Watch' ? (
                      <span className="group relative inline-flex">
                        <span className="flex items-center gap-1 rounded-[6px] bg-[#FEF3C7] px-2.5 py-1 text-xs font-medium text-[#B45309]">
                          <AlertTriangle size={12} /> Watch
                        </span>
                        <span className="invisible absolute left-0 top-full z-20 mt-1 w-56 rounded-[6px] border border-border bg-surface p-2 text-xs text-muted opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                          {vendor.watchReason}
                        </span>
                      </span>
                    ) : (
                      <StatusBadge status="Active" />
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedVendor(vendor); }} className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover">
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Detail SlideOver */}
      <SlideOver open={!!selectedVendor} onClose={() => setSelectedVendor(null)} title="Vendor Profile">
        {selectedVendor && (
          <VendorDetailPanel vendor={selectedVendor} onWhatsApp={() => showToast(`WhatsApp sent to ${selectedVendor.name}`)} />
        )}
      </SlideOver>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function VendorDetailPanel({ vendor, onWhatsApp }: { vendor: Vendor; onWhatsApp: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
          <FileText size={28} className="text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-heading">{vendor.name}</p>
          <p className="text-xs text-muted">{vendor.id} · {vendor.category}</p>
        </div>
        <div className="ml-auto">
          {vendor.status === 'Watch' ? (
            <span className="flex items-center gap-1 rounded-[6px] bg-[#FEF3C7] px-2.5 py-1 text-xs font-medium text-[#B45309]">
              <AlertTriangle size={12} /> Watch
            </span>
          ) : (
            <StatusBadge status="Active" />
          )}
        </div>
      </div>

      {vendor.watchReason && (
        <div className="rounded-[6px] border-l-4 border-status-warning bg-[#FEF3C7]/40 p-3">
          <p className="text-xs text-[#B45309]">{vendor.watchReason}</p>
        </div>
      )}

      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Contact & Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><Phone size={14} className="text-muted" /><span className="text-heading">{vendor.phone}</span></div>
          <div className="flex justify-between"><span className="text-muted">GSTIN</span><span className="font-mono text-heading">{vendor.gstin}</span></div>
          <div className="flex justify-between"><span className="text-muted">Bank</span><span className="text-heading">{vendor.bank} {vendor.accountNo}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[6px] border border-border bg-surface p-4">
          <p className="text-xs text-muted">Total Paid (YTD)</p>
          <p className="mt-1 text-lg font-bold text-primary">{formatINRFull(vendor.totalPaidYTD)}</p>
        </div>
        <div className="rounded-[6px] border border-border bg-surface p-4">
          <p className="text-xs text-muted">Avg Processing Time</p>
          <p className="mt-1 text-lg font-bold text-heading">{vendor.avgProcessingDays} days</p>
        </div>
      </div>

      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Invoice History</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="pb-2 font-medium">Invoice</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendor.invoiceHistory.map((inv, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="py-2 font-mono text-xs text-heading">{inv.id}</td>
                <td className="py-2 font-mono text-heading">{formatINRFull(inv.amount)}</td>
                <td className="py-2 text-muted">{inv.date}</td>
                <td className="py-2">
                  <span className={`text-xs ${inv.status === 'Paid' ? 'text-[#0F766E]' : inv.status === 'Overdue' || inv.status === 'Flagged' ? 'text-[#DC2626]' : inv.status === 'Approved' ? 'text-[#0369A1]' : 'text-[#B45309]'}`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <button onClick={onWhatsApp} className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#0D9488] py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-[#0D9488]/90">
          <MessageCircle size={16} /> Send WhatsApp
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-primary/50 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light">
          <Eye size={16} /> View All Invoices
        </button>
      </div>
    </div>
  );
}
