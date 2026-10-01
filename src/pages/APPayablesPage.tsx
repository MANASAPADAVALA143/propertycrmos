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
  if (match === 'Matched') return <span className="flex items-center gap-1 text-xs text-teal-500"><Check size={12} /> Matched</span>;
  if (match === 'Mismatch') return <span className="flex items-center gap-1 text-xs text-status-warning"><AlertTriangle size={12} /> Mismatch</span>;
  return <span className="flex items-center gap-1 text-xs text-status-error"><Ban size={12} /> Duplicate</span>;
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
        <h1 className="text-2xl font-bold text-white">AP — Payables</h1>
        <p className="mt-1 text-sm text-textgray">Vendor invoices pending processing and payment</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-gold-500 text-navy-900'
                : 'border border-navy-600 bg-navy-800 text-textgray hover:text-white'
            }`}
          >
            {f} ({filterCounts[f]})
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
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
                  className={`cursor-pointer border-b border-navy-600/50 transition-colors hover:bg-navy-600/30 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}
                >
                  <td className="px-3 py-3 font-mono text-xs text-white">{inv.id}</td>
                  <td className="px-3 py-3 font-medium text-white">{inv.vendor}</td>
                  <td className="px-3 py-3 text-textgray">{inv.invoiceDate}</td>
                  <td className="px-3 py-3 text-textgray">{inv.dueDate}</td>
                  <td className="px-3 py-3 font-mono text-white">{formatINRFull(inv.amount)}</td>
                  <td className="px-3 py-3"><PoMatchBadge match={inv.poMatch} /></td>
                  <td className="px-3 py-3"><StatusBadge status={inv.status} pulse={inv.status === 'Flagged'} /></td>
                  <td className="px-3 py-3">
                    {inv.daysOverdue ? <span className="text-status-error">{inv.daysOverdue} days</span> : <span className="text-textgray">—</span>}
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}
                      className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400"
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
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-gold-500/15">
          <FileText size={24} className="text-gold-500" />
        </div>
        <div>
          <p className="text-lg font-bold text-white">{invoice.id}</p>
          <p className="text-xs text-textgray">{invoice.vendor}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={invoice.status} pulse={invoice.status === 'Flagged'} /></div>
      </div>

      {/* 3-Way Match Columns */}
      <div className="grid grid-cols-1 gap-3 rounded-[6px] border border-navy-600 bg-navy-900 p-4 sm:grid-cols-3">
        {/* PO */}
        <div className="border-r border-navy-600 pr-3 sm:last:border-r-0">
          <h3 className="mb-2 text-xs font-semibold text-gold-500">Purchase Order ({invoice.poNumber})</h3>
          <div className="space-y-1.5 text-xs">
            <div><span className="text-textgray">Vendor: </span><span className="text-white">{invoice.vendor}</span></div>
            <div><span className="text-textgray">PO Date: </span><span className="text-white">{invoice.poDate}</span></div>
            <div><span className="text-textgray">PO Amount: </span><span className="font-mono text-white">{formatINRFull(invoice.poAmount)}</span></div>
            <div><span className="text-textgray">Items: </span><span className="text-white">{invoice.items}</span></div>
          </div>
        </div>
        {/* GRN */}
        <div className="border-r border-navy-600 pr-3 sm:last:border-r-0">
          <h3 className="mb-2 text-xs font-semibold text-gold-500">Goods Receipt ({invoice.grnNumber})</h3>
          <div className="space-y-1.5 text-xs">
            <div><span className="text-textgray">Received: </span><span className="text-white">{invoice.grnDate}</span></div>
            <div><span className="text-textgray">Items received: </span><span className="text-teal-500">✓ All</span></div>
            <div><span className="text-textgray">GRN Amount: </span><span className="font-mono text-white">{formatINRFull(invoice.grnAmount)}</span></div>
            <div><span className="text-textgray">Signed by: </span><span className="text-white">{invoice.grnSignedBy}</span></div>
          </div>
        </div>
        {/* Invoice */}
        <div>
          <h3 className="mb-2 text-xs font-semibold text-gold-500">Invoice ({invoice.id})</h3>
          <div className="space-y-1.5 text-xs">
            <div><span className="text-textgray">Invoice Date: </span><span className="text-white">{invoice.invoiceDate}</span></div>
            <div><span className="text-textgray">Invoice Amount: </span><span className="font-mono text-white">{formatINRFull(invoice.amount)}</span></div>
            {isMismatch && <div><span className="text-textgray">Variance: </span><span className="font-mono text-status-warning">+{formatINRFull(variance)} ⚠</span></div>}
            {isDuplicate && <div><span className="text-status-error">🔴 Duplicate detected</span></div>}
          </div>
        </div>
      </div>

      {/* Match Result Banner */}
      {isMismatch && (
        <div className="rounded-[6px] border-l-4 border-status-warning bg-status-warning/5 p-3">
          <p className="text-sm font-medium text-status-warning">⚠ PRICE MISMATCH — Invoice {formatINRFull(variance)} higher than PO. Requires approval.</p>
        </div>
      )}
      {isDuplicate && (
        <div className="rounded-[6px] border-l-4 border-status-error bg-status-error/5 p-3">
          <p className="text-sm font-medium text-status-error">🔴 DUPLICATE INVOICE — This invoice matches a previously processed invoice. Do not pay.</p>
        </div>
      )}

      {/* OCR Extracted Fields */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">Extracted Invoice Fields (OCR)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-textgray">Vendor Name</span><span className="text-white">{invoice.vendor}</span></div>
          <div className="flex justify-between"><span className="text-textgray">GSTIN</span><span className="font-mono text-white">{invoice.gstin}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Invoice No</span><span className="font-mono text-white">{invoice.id}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Invoice Date</span><span className="text-white">{invoice.invoiceDate}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Due Date</span><span className="text-white">{invoice.dueDate}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Subtotal</span><span className="font-mono text-white">{formatINRFull(invoice.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-textgray">GST 18%</span><span className="font-mono text-white">{formatINRFull(invoice.gst)}</span></div>
          <div className="flex justify-between border-t border-navy-600 pt-2"><span className="font-medium text-textgray">Total</span><span className="font-mono font-bold text-gold-500">{formatINRFull(invoice.amount)}</span></div>
          <div className="flex justify-between"><span className="text-textgray">Bank</span><span className="text-white">{invoice.bank} | A/c: {invoice.accountNo} | IFSC: {invoice.ifsc}</span></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {isDuplicate ? (
          <button onClick={onReject} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-status-error/50 py-2.5 text-sm font-semibold text-status-error transition-colors hover:bg-status-error/10">
            <X size={16} /> Reject Duplicate
          </button>
        ) : (
          <>
            {isMismatch && (
              <button onClick={onApprove} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-status-warning/50 py-2.5 text-sm font-semibold text-status-warning transition-colors hover:bg-status-warning/10">
                <Check size={16} /> Approve with Variance
              </button>
            )}
            <button onClick={onReject} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-status-error/50 py-2.5 text-sm font-semibold text-status-error transition-colors hover:bg-status-error/10">
              <X size={16} /> Reject Invoice
            </button>
            <button onClick={onCreditNote} className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-white/20 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5">
              <Download size={16} /> Request Credit Note
            </button>
            {invoice.status === 'Approved' && (
              <button onClick={onPay} className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
                Pay Now
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
