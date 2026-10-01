import { useState, useMemo } from 'react';
import { Eye, Check, X, Download, Ban, FileText, AlertTriangle } from 'lucide-react';
import { apInvoices, formatINRFull, type APInvoice } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';
import { useToasts, default as Toast } from '@/components/Toast';

type FilterType = 'All' | 'Pending' | 'Approved' | 'Overdue' | 'Paid' | 'Flagged';

const filterCounts: Record<FilterType, number> = {
  All: 10,
  Pending: 3,
  Approved: 4,
  Overdue: 0,
  Paid: 1,
  Flagged: 1,
};

function PoMatchBadge({ match }: { match: APInvoice['poMatch'] }) {
  if (match === 'Matched') return <span className="flex items-center gap-1 text-xs text-[#0F766E]"><Check size={12} /> Matched</span>;
  if (match === 'Mismatch') return <span className="flex items-center gap-1 text-xs text-[#B45309]"><AlertTriangle size={12} /> Mismatch</span>;
  return <span className="flex items-center gap-1 text-xs text-[#DC2626]"><Ban size={12} /> Duplicate</span>;
}

export default function APPayablesPage() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<APInvoice | null>(null);
  const { toasts, showToast, dismissToast } = useToasts();

  const filteredInvoices = useMemo(() => {
    if (filter === 'All') return apInvoices;
    return apInvoices.filter((inv) => inv.status === filter);
  }, [filter]);

  const filters: FilterType[] = ['All', 'Pending', 'Approved', 'Overdue', 'Paid', 'Flagged'];

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">AP — Payables</h1>
        <p className="mt-1 text-sm text-muted">Vendor invoices pending processing and payment</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-primary text-white'
                : 'border border-border bg-white text-muted hover:text-heading'
            }`}
          >
            {f} ({filterCounts[f]})
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-3 py-3 font-medium">Invoice No</th>
                <th className="px-3 py-3 font-medium">Vendor</th>
                <th className="px-3 py-3 font-medium">Invoice Date</th>
                <th className="px-3 py-3 font-medium">Due Date</th>
                <th className="px-3 py-3 font-medium">Amount</th>
                <th className="px-3 py-3 font-medium">PO Match</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Days Overdue</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv, i) => (
                <tr
                  key={inv.id}
                  onClick={() => setSelectedInvoice(inv)}
                  className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <td className="px-3 py-3 font-mono text-xs text-heading">{inv.id}</td>
                  <td className="px-3 py-3 font-medium text-heading">{inv.vendor}</td>
                  <td className="px-3 py-3 text-muted">{inv.invoiceDate}</td>
                  <td className="px-3 py-3 text-muted">{inv.dueDate}</td>
                  <td className="px-3 py-3 font-mono text-heading">{formatINRFull(inv.amount)}</td>
                  <td className="px-3 py-3"><PoMatchBadge match={inv.poMatch} /></td>
                  <td className="px-3 py-3"><StatusBadge status={inv.status} pulse={inv.status === 'Flagged'} /></td>
                  <td className="px-3 py-3">
                    {inv.daysOverdue ? <span className="text-[#DC2626]">{inv.daysOverdue} days</span> : <span className="text-muted">—</span>}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3-Way Match SlideOver */}
      <SlideOver open={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={`Invoice Detail — ${selectedInvoice?.id}`}>
        {selectedInvoice && (
          <InvoiceDetailPanel
            invoice={selectedInvoice}
            onApprove={() => showToast(`Invoice ${selectedInvoice.id} approved with variance`)}
            onReject={() => showToast(`Invoice ${selectedInvoice.id} rejected`)}
            onCreditNote={() => showToast(`Credit note requested for ${selectedInvoice.id}`)}
            onPay={() => showToast(`Payment initiated for ${selectedInvoice.id}`)}
          />
        )}
      </SlideOver>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function InvoiceDetailPanel({
  invoice, onApprove, onReject, onCreditNote, onPay,
}: {
  invoice: APInvoice;
  onApprove: () => void;
  onReject: () => void;
  onCreditNote: () => void;
  onPay: () => void;
}) {
  const variance = invoice.amount - invoice.poAmount;
  const isMismatch = invoice.poMatch === 'Mismatch';
  const isDuplicate = invoice.poMatch === 'Duplicate';

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-primary-light">
          <FileText size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-heading">{invoice.id}</p>
          <p className="text-xs text-muted">{invoice.vendor}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={invoice.status} pulse={invoice.status === 'Flagged'} /></div>
      </div>

      {/* 3-Way Match Columns */}
      <div className="grid grid-cols-1 gap-3 rounded-[6px] border border-border bg-surface p-4 sm:grid-cols-3">
        {/* PO */}
        <div className="border-r border-border pr-3 sm:last:border-r-0">
          <h3 className="mb-2 text-xs font-semibold text-primary">Purchase Order ({invoice.poNumber})</h3>
          <div className="space-y-1.5 text-xs">
            <div><span className="text-muted">Vendor: </span><span className="text-heading">{invoice.vendor}</span></div>
            <div><span className="text-muted">PO Date: </span><span className="text-heading">{invoice.poDate}</span></div>
            <div><span className="text-muted">PO Amount: </span><span className="font-mono text-heading">{formatINRFull(invoice.poAmount)}</span></div>
            <div><span className="text-muted">Items: </span><span className="text-heading">{invoice.items}</span></div>
          </div>
        </div>
        {/* GRN */}
        <div className="border-r border-border pr-3 sm:last:border-r-0">
          <h3 className="mb-2 text-xs font-semibold text-primary">Goods Receipt ({invoice.grnNumber})</h3>
          <div className="space-y-1.5 text-xs">
            <div><span className="text-muted">Received: </span><span className="text-heading">{invoice.grnDate}</span></div>
            <div><span className="text-muted">Items received: </span><span className="text-[#0F766E]">✓ All</span></div>
            <div><span className="text-muted">GRN Amount: </span><span className="font-mono text-heading">{formatINRFull(invoice.grnAmount)}</span></div>
            <div><span className="text-muted">Signed by: </span><span className="text-heading">{invoice.grnSignedBy}</span></div>
          </div>
        </div>
        {/* Invoice */}
        <div>
          <h3 className="mb-2 text-xs font-semibold text-primary">Invoice ({invoice.id})</h3>
          <div className="space-y-1.5 text-xs">
            <div><span className="text-muted">Invoice Date: </span><span className="text-heading">{invoice.invoiceDate}</span></div>
            <div><span className="text-muted">Invoice Amount: </span><span className="font-mono text-heading">{formatINRFull(invoice.amount)}</span></div>
            {isMismatch && <div><span className="text-muted">Variance: </span><span className="font-mono text-[#B45309]">+{formatINRFull(variance)} ⚠</span></div>}
            {isDuplicate && <div><span className="text-[#DC2626]">🔴 Duplicate detected</span></div>}
          </div>
        </div>
      </div>

      {/* Match Result Banner */}
      {isMismatch && (
        <div className="rounded-[6px] border-l-4 border-status-warning bg-[#FEF3C7]/40 p-3">
          <p className="text-sm font-medium text-[#B45309]">⚠ PRICE MISMATCH — Invoice {formatINRFull(variance)} higher than PO. Requires approval.</p>
        </div>
      )}
      {isDuplicate && (
        <div className="rounded-[6px] border-l-4 border-status-error bg-[#FEE2E2]/40 p-3">
          <p className="text-sm font-medium text-[#DC2626]">🔴 DUPLICATE INVOICE — This invoice matches a previously processed invoice. Do not pay.</p>
        </div>
      )}

      {/* OCR Extracted Fields */}
      <div className="rounded-[6px] border border-border bg-surface p-4">
        <h3 className="mb-3 text-sm font-semibold text-heading">Extracted Invoice Fields (OCR)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted">Vendor Name</span><span className="text-heading">{invoice.vendor}</span></div>
          <div className="flex justify-between"><span className="text-muted">GSTIN</span><span className="font-mono text-heading">{invoice.gstin}</span></div>
          <div className="flex justify-between"><span className="text-muted">Invoice No</span><span className="font-mono text-heading">{invoice.id}</span></div>
          <div className="flex justify-between"><span className="text-muted">Invoice Date</span><span className="text-heading">{invoice.invoiceDate}</span></div>
          <div className="flex justify-between"><span className="text-muted">Due Date</span><span className="text-heading">{invoice.dueDate}</span></div>
          <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-mono text-heading">{formatINRFull(invoice.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-muted">GST 18%</span><span className="font-mono text-heading">{formatINRFull(invoice.gst)}</span></div>
          <div className="flex justify-between border-t border-border pt-2"><span className="font-medium text-muted">Total</span><span className="font-mono font-bold text-primary">{formatINRFull(invoice.amount)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Bank</span><span className="text-heading">{invoice.bank} | A/c: {invoice.accountNo} | IFSC: {invoice.ifsc}</span></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {isDuplicate ? (
          <button onClick={onReject} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-status-error/50 py-2.5 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]/60">
            <X size={16} /> Reject Duplicate
          </button>
        ) : (
          <>
            {isMismatch && (
              <button onClick={onApprove} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-status-warning/50 py-2.5 text-sm font-semibold text-[#B45309] transition-colors hover:bg-[#B45309]/10">
                <Check size={16} /> Approve with Variance
              </button>
            )}
            <button onClick={onReject} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-status-error/50 py-2.5 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]/60">
              <X size={16} /> Reject Invoice
            </button>
            <button onClick={onCreditNote} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-white/20 py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-white/5">
              <Download size={16} /> Request Credit Note
            </button>
            {invoice.status === 'Approved' && (
              <button onClick={onPay} className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
                Pay Now
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
