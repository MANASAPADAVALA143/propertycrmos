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
        <h1 className="text-2xl font-bold text-white">Vendor Master</h1>
        <p className="mt-1 text-sm text-textgray">{vendors.length} registered vendors</p>
      </div>

      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
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
                  className={`cursor-pointer border-b border-navy-600/50 transition-colors hover:bg-navy-600/30 ${
                    vendor.status === 'Watch' ? 'bg-status-warning/5' : i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'
                  }`}
                >
                  <td className="px-4 py-3.5 text-white">{vendor.id}</td>
                  <td className="px-4 py-3.5 font-medium text-white">{vendor.name}</td>
                  <td className="px-4 py-3.5 text-textgray">{vendor.category}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-textgray">{vendor.gstin}</td>
                  <td className="px-4 py-3.5 text-textgray">{vendor.phone}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-textgray">{vendor.bank} {vendor.accountNo}</td>
                  <td className="px-4 py-3.5 font-mono text-white">{formatINRFull(vendor.totalPaidYTD)}</td>
                  <td className="px-4 py-3.5">
                    {vendor.status === 'Watch' ? (
                      <span className="group relative inline-flex">
                        <span className="flex items-center gap-1 rounded-[6px] bg-status-warning/15 px-2.5 py-1 text-xs font-medium text-status-warning">
                          <AlertTriangle size={12} /> Watch
                        </span>
                        <span className="invisible absolute left-0 top-full z-20 mt-1 w-56 rounded-[6px] border border-navy-600 bg-navy-900 p-2 text-xs text-textgray opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                          {vendor.watchReason}
                        </span>
                      </span>
                    ) : (
                      <StatusBadge status="Active" />
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedVendor(vendor); }} className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400">
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
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15">
          <FileText size={28} className="text-gold-500" />
        </div>
        <div>
          <p className="text-lg font-bold text-white">{vendor.name}</p>
          <p className="text-xs text-textgray">{vendor.id} · {vendor.category}</p>
        </div>
        <div className="ml-auto">
          {vendor.status === 'Watch' ? (
            <span className="flex items-center gap-1 rounded-[6px] bg-status-warning/15 px-2.5 py-1 text-xs font-medium text-status-warning">
              <AlertTriangle size={12} /> Watch
            </span>
          ) : (
            <StatusBadge status="Active" />
          )}
        </div>
      </div>

      {vendor.watchReason && (
        <div className="rounded-[6px] border-l-4 border-status-warning bg-status-warning/5 p-3">
          <p className="text-xs text-status-warning">{vendor.watchReason}</p>
        </div>
      )}

      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Contact & Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><Phone size={14} className="text-textgray" /><span className="text-white">{vendor.phone}</span></div>
          <div className="flex justify-between"><span className="text-textgray">GSTIN</span><span className="font-mono text-white">{vendor.gstin}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Bank</span><span className="text-white">{vendor.bank} {vendor.accountNo}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
          <p className="text-xs text-textgray">Total Paid (YTD)</p>
          <p className="mt-1 text-lg font-bold text-gold-500">{formatINRFull(vendor.totalPaidYTD)}</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
          <p className="text-xs text-textgray">Avg Processing Time</p>
          <p className="mt-1 text-lg font-bold text-white">{vendor.avgProcessingDays} days</p>
        </div>
      </div>

      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Invoice History</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-textgray">
              <th className="pb-2 font-medium">Invoice</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {vendor.invoiceHistory.map((inv, i) => (
              <tr key={i} className="border-t border-navy-600/50">
                <td className="py-2 font-mono text-xs text-white">{inv.id}</td>
                <td className="py-2 font-mono text-white">{formatINRFull(inv.amount)}</td>
                <td className="py-2 text-textgray">{inv.date}</td>
                <td className="py-2">
                  <span className={`text-xs ${inv.status === 'Paid' ? 'text-teal-500' : inv.status === 'Overdue' || inv.status === 'Flagged' ? 'text-status-error' : inv.status === 'Approved' ? 'text-blue-400' : 'text-status-warning'}`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <button onClick={onWhatsApp} className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-teal-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500/90">
          <MessageCircle size={16} /> Send WhatsApp
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-gold-500/50 py-2.5 text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500/10">
          <Eye size={16} /> View All Invoices
        </button>
      </div>
    </div>
  );
}
