type StatusBadgeProps = {
  status: 'Paid' | 'Overdue' | 'Pending' | 'Active' | 'Sent' | 'Approved' | 'Flagged' | 'Sold' | 'available' | 'sold' | 'overdue' | 'reserved';
  pulse?: boolean;
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  Paid: { bg: 'bg-teal-500/15', text: 'text-teal-500', label: 'Paid' },
  Active: { bg: 'bg-teal-500/15', text: 'text-teal-500', label: 'Active' },
  Sold: { bg: 'bg-gold-500/15', text: 'text-gold-500', label: 'Sold' },
  sold: { bg: 'bg-gold-500/15', text: 'text-gold-500', label: 'Sold' },
  Overdue: { bg: 'bg-status-error/15', text: 'text-status-error', label: 'Overdue' },
  overdue: { bg: 'bg-status-error/15', text: 'text-status-error', label: 'Overdue' },
  Pending: { bg: 'bg-status-warning/15', text: 'text-status-warning', label: 'Pending' },
  Approved: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Approved' },
  Sent: { bg: 'bg-gold-500/15', text: 'text-gold-500', label: 'Sent' },
  Flagged: { bg: 'bg-status-error/15', text: 'text-status-error', label: 'Flagged' },
  available: { bg: 'bg-navy-500/40', text: 'text-textgray', label: 'Available' },
  reserved: { bg: 'bg-gold-500/10 border border-gold-500/30', text: 'text-gold-500', label: 'Reserved' },
};

export default function StatusBadge({ status, pulse }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig['available'];
  return (
    <span className={`inline-flex items-center rounded-[6px] px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text} ${pulse ? 'animate-pulse' : ''}`}>
      {config.label}
    </span>
  );
}
