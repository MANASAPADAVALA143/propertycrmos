import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export type ToastData = {
  id: number;
  message: string;
};

type ToastProps = {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
};

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="flex items-center gap-3 rounded-[6px] border border-teal-500/30 bg-navy-800 px-4 py-3 shadow-xl animate-fadeIn">
      <CheckCircle2 size={18} className="text-teal-500" />
      <span className="text-sm text-white">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-textgray hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, dismissToast };
}
