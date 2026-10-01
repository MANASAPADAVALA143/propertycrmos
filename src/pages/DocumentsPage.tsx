import { FileText, Download, Upload, FileCheck } from 'lucide-react';
import { useToasts, default as Toast } from '@/components/Toast';

const documents = [
  { name: 'Sale Deed — Unit 001.pdf', type: 'Sale Deed', unit: 'Unit 001', uploaded: '12 Jan 2026' },
  { name: 'Leaseback Agreement — LC001.pdf', type: 'Leaseback', unit: 'Unit 001', uploaded: '01 Feb 2026' },
  { name: 'Sale Deed — Unit 002.pdf', type: 'Sale Deed', unit: 'Unit 002', uploaded: '18 Feb 2026' },
  { name: 'Sale Deed — Unit 001.pdf', type: 'Sale Deed', unit: 'Unit 001', uploaded: '05 Apr 2026' },
  { name: 'Leaseback Agreement — LC001.pdf', type: 'Leaseback', unit: 'Unit 001', uploaded: '01 May 2026' },
  { name: 'KYC — Rajesh Kumar Agarwal.pdf', type: 'KYC', unit: 'Unit 001', uploaded: '05 Apr 2026' },
  { name: 'NOC — Skyline Commerce Hub.pdf', type: 'NOC', unit: 'Project', uploaded: '01 Apr 2026' },
  { name: 'Ownership Certificate — SKY-FOC-2026-001.pdf', type: 'Certificate', unit: 'Unit 001', uploaded: '10 Apr 2026' },
];

export default function DocumentsPage() {
  const { toasts, showToast, dismissToast } = useToasts();

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="mt-1 text-sm text-textgray">{documents.length} files across all units</p>
        </div>
        <button onClick={() => showToast('Upload dialog opened')} className="flex items-center justify-center gap-2 rounded-[6px] bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
          <Upload size={18} /> Upload Document
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {documents.map((doc, i) => (
          <div key={i} className="rounded-[6px] border border-navy-600 bg-navy-800 p-5 transition-colors hover:border-gold-500/40">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-gold-500/15">
                <FileText size={20} className="text-gold-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{doc.name}</p>
                <p className="mt-1 text-xs text-textgray">{doc.type} · {doc.unit}</p>
                <p className="mt-1 text-xs text-textgray">Uploaded {doc.uploaded}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => showToast(`Downloading ${doc.name}`)} className="flex flex-1 items-center justify-center gap-1.5 rounded-[6px] border border-navy-600 py-2 text-xs font-medium text-textgray transition-colors hover:text-white">
                <Download size={14} /> Download
              </button>
              <span className="flex items-center gap-1 text-xs text-teal-500"><FileCheck size={12} /> Verified</span>
            </div>
          </div>
        ))}
      </div>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}
