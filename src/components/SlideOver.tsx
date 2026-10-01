import { type ReactNode } from 'react';
import { X } from 'lucide-react';

type SlideOverProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function SlideOver({ open, onClose, title, children }: SlideOverProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 transition-opacity" onClick={onClose} />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[420px] overflow-y-auto border-l border-border bg-white transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-white px-5 py-4">
          <h2 className="text-[16px] font-semibold text-heading">{title}</h2>
          <button onClick={onClose} className="text-subtle transition-colors hover:text-heading">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </aside>
    </>
  );
}
