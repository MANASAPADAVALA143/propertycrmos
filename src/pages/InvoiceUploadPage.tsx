import { useState } from 'react';
import {
  UploadCloud, FileText, Check, Pencil, Link2,
  Camera, Loader,
} from 'lucide-react';
import { formatINRFull } from '@/data/mockData';
import { useToasts as useToastHook, default as Toast } from '@/components/Toast';

type UploadState = 'idle' | 'loading' | 'extracted';

export default function InvoiceUploadPage() {
  const { showToast, toasts, dismissToast } = useToastHook();
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [linkedPO, setLinkedPO] = useState(false);
  const [linkedGRN, setLinkedGRN] = useState(false);

  const handleUpload = () => {
    setUploadState('loading');
    setTimeout(() => {
      setUploadState('extracted');
      showToast('OCR extraction complete');
    }, 2000);
  };

  const extractedFields = [
    { label: 'Vendor Name', value: 'Sai Constructions Pvt. Ltd.', confidence: '98%' },
    { label: 'GSTIN', value: '36AABCS1234A1Z5', confidence: '95%', mono: true },
    { label: 'Invoice Number', value: 'INV-2026-051', confidence: '99%', mono: true },
    { label: 'Invoice Date', value: '29/09/2026', confidence: '97%' },
    { label: 'Due Date', value: '28/10/2026', confidence: '97%' },
  ];

  const lineItems = [
    { desc: 'Civil & structural works', amount: 200000 },
    { desc: 'Labour charges', amount: 50000 },
    { desc: 'Site supervision', amount: 12500 },
  ];

  const subtotal = 262500;
  const gst = 47250;
  const total = 309750;

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Upload Invoice</h1>
        <p className="mt-1 text-sm text-muted">Upload a PDF or image — data is auto-extracted instantly</p>
      </div>

      {uploadState === 'idle' && (
        <div
          onClick={handleUpload}
          className="flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-[6px] border-2 border-dashed border-border bg-white p-8 transition-colors hover:border-primary/50"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
            <UploadCloud size={32} className="text-primary" />
          </div>
          <p className="mt-6 text-lg font-semibold text-heading">Drag &amp; drop invoice PDF or image here</p>
          <p className="mt-2 text-sm text-muted">or click to browse</p>
          <p className="mt-4 text-xs text-muted">Supported: PDF, JPG, PNG, TIFF — max 10MB</p>
          <p className="mt-6 text-xs text-primary hover:underline">
            <Camera size={12} className="mr-1 inline" />
            Scan a physical invoice with your phone camera →
          </p>
        </div>
      )}

      {uploadState === 'loading' && (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[6px] border border-border bg-white p-8">
          <Loader size={32} className="animate-spin text-primary" />
          <p className="mt-6 text-lg font-semibold text-heading">Extracting data...</p>
          <p className="mt-2 text-sm text-muted">OCR processing in progress</p>
        </div>
      )}

      {uploadState === 'extracted' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left — Document Preview */}
          <div className="rounded-[6px] border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-heading">Document Preview</h2>
            <div className="rounded-[6px] bg-surface p-4">
              <div className="mb-3 text-center">
                <p className="text-lg font-bold text-heading">INVOICE</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted">Vendor:</span>
                  <span className="relative text-heading">
                    Sai Constructions Pvt. Ltd.
                    <span className="absolute -inset-1 rounded border border-primary/40 bg-primary-light" />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">GSTIN:</span>
                  <span className="relative font-mono text-heading">
                    36AABCB1234A1Z5
                    <span className="absolute -inset-1 rounded border border-primary/40 bg-primary-light" />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Invoice No:</span>
                  <span className="relative font-mono text-heading">
                    INV-2026-051
                    <span className="absolute -inset-1 rounded border border-primary/40 bg-primary-light" />
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted">
                      <th className="pb-2 text-left font-medium">Item</th>
                      <th className="pb-2 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-1.5 text-heading">{item.desc}</td>
                        <td className="py-1.5 text-right font-mono text-heading">{formatINRFull(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 border-t border-border pt-2 space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-mono text-heading">{formatINRFull(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted">GST (18%)</span><span className="font-mono text-heading">{formatINRFull(gst)}</span></div>
                <div className="flex justify-between border-t border-border pt-1"><span className="font-medium text-muted">Total</span><span className="relative font-mono font-bold text-heading">{formatINRFull(total)}<span className="absolute -inset-1 rounded border border-primary/40 bg-primary-light" /></span></div>
              </div>
            </div>
          </div>

          {/* Right — Extracted Data */}
          <div className="space-y-4">
            <div className="rounded-[6px] border border-border bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-heading">Auto-Extracted Fields</h2>
                <span className="flex items-center gap-1.5 rounded-[6px] bg-[#CCFBF1] px-3 py-1 text-xs font-medium text-[#0F766E]">
                  <Check size={14} /> Extraction Complete
                </span>
              </div>
              <div className="space-y-3">
                {extractedFields.map((field, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">{field.label}</span>
                      <span className="text-[10px] text-muted">{field.confidence} confidence</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 rounded-[6px] border border-border bg-surface px-3 py-2">
                      <span className={`flex-1 text-sm text-heading ${field.mono ? 'font-mono' : ''}`}>{field.value}</span>
                      <Pencil size={12} className="text-muted hover:text-primary cursor-pointer" />
                    </div>
                  </div>
                ))}

                {/* Line Items */}
                <div>
                  <span className="text-xs text-muted">Line Items</span>
                  <div className="mt-1 space-y-1.5">
                    {lineItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-[6px] border border-border bg-surface px-3 py-2">
                        <span className="text-sm text-heading">{item.desc}</span>
                        <span className="font-mono text-sm text-heading">{formatINRFull(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="rounded-[6px] bg-surface p-3 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-mono text-heading">{formatINRFull(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted">GST (18%)</span><span className="font-mono text-heading">{formatINRFull(gst)}</span></div>
                  <div className="flex justify-between border-t border-border pt-1"><span className="font-medium text-muted">Total</span><span className="font-mono font-bold text-primary">{formatINRFull(total)}</span></div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted">Payment Terms</span>
                  <span className="text-heading">Net 30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Bank Account</span>
                  <span className="text-heading">HDFC 50100234567891</span>
                </div>
              </div>
            </div>

            {/* Link to PO and GRN */}
            <div className="rounded-[6px] border border-border bg-white p-5">
              <h2 className="mb-3 text-sm font-semibold text-heading">Link to PO & GRN</h2>
              <div className="space-y-3">
                <LinkDropdown label="Link to PO" value="PO-2026-040 — Sai Constructions" onLink={() => setLinkedPO(true)} linked={linkedPO} />
                <LinkDropdown label="Link to GRN" value="GRN-2026-051 — Sai Constructions" onLink={() => setLinkedGRN(true)} linked={linkedGRN} />
              </div>

              {linkedPO && linkedGRN && (
                <>
                  {/* 3-Way Match Result */}
                  <div className="mt-4 rounded-[6px] border border-border bg-surface p-3">
                    <p className="mb-2 text-xs font-semibold text-heading">3-Way Match Result</p>
                    <div className="space-y-1.5">
                      <MatchRow ok text="Vendor matches PO" />
                      <MatchRow ok text="Amount within 5% tolerance of PO (₹3,09,750 vs PO ₹3,00,000 — variance ₹9,750 = 3.2%)" />
                      <MatchRow ok text="GRN confirms goods received" />
                    </div>
                  </div>

                  {/* Duplicate Check */}
                  <div className="mt-3 rounded-[6px] border border-border bg-surface p-3">
                    <p className="mb-2 text-xs font-semibold text-heading">Duplicate Check</p>
                    <MatchRow ok text="No duplicate found (invoice number and amount are unique)" />
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 space-y-2">
                    <button onClick={() => showToast('Invoice INV-2026-051 submitted for approval')} className="w-full rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
                      Submit for Approval
                    </button>
                    <button onClick={() => showToast('Invoice saved as draft')} className="w-full rounded-[6px] border border-white/20 py-2.5 text-sm font-semibold text-heading transition-colors hover:bg-white/5">
                      Save as Draft
                    </button>
                    <button onClick={() => { showToast('Invoice rejected and deleted'); setUploadState('idle'); setLinkedPO(false); setLinkedGRN(false); }} className="w-full rounded-[6px] border border-status-error/50 py-2.5 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#FEE2E2]/60">
                      Reject & Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function LinkDropdown({ label, value, onLink, linked }: { label: string; value: string; onLink: () => void; linked: boolean }) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1.5 text-xs text-muted">
        <Link2 size={12} /> {label}
      </label>
      <div className="flex items-center gap-2">
        <select
          onChange={(e) => e.target.value && onLink()}
          defaultValue=""
          className="flex-1 rounded-[6px] border border-border bg-surface px-3 py-2 text-sm text-heading focus:border-primary focus:outline-none"
        >
          <option value="">Select {label.replace('Link to ', '')}...</option>
          <option value={value}>{value}</option>
        </select>
        {linked && <Check size={16} className="text-[#0F766E]" />}
      </div>
    </div>
  );
}

function MatchRow({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <Check size={14} className="mt-0.5 shrink-0 text-[#0F766E]" />
      <span className="text-muted">{text}</span>
    </div>
  );
}
