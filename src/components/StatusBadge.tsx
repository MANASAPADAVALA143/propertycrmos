type StatusBadgeProps = {
  status: 'Paid' | 'Overdue' | 'Pending' | 'Active' | 'Sent' | 'Approved' | 'Flagged' | 'Sold' | 'available' | 'sold' | 'overdue' | 'reserved';
  pulse?: boolean;
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  Paid:      { bg: 'bg-[#CCFBF1]', text: 'text-[#0F766E]', label: 'Paid' },
  Active:    { bg: 'bg-[#CCFBF1]', text: 'text-[#0F766E]', label: 'Active' },
  Sold:      { bg: 'bg-[#CCFBF1]', text: 'text-[#0F766E]', label: 'Sold' },
  sold:      { bg: 'bg-[#CCFBF1]', text: 'text-[#0F766E]', label: 'Sold' },
  Overdue:   { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: 'Overdue' },
  overdue:   { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: 'Overdue' },
  Pending:   { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', label: 'Pending' },
  Approved:  { bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]', label: 'Approved' },
  Sent:      { bg: 'bg-[#CCFBF1]', text: 'text-[#0F766E]', label: 'Sent' },
  Flagged:   { bg: 'bg-[#FEE2E2]', text: 'text-[#DC2626]', label: 'Flagged' },
  available: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Available' },
  reserved:  { bg: 'bg-[#CCFBF1] border border-[#0D9488]/40', text: 'text-[#0F766E]', label: 'Reserved' },
};

export default function StatusBadge({ status, pulse }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig['available'];
  return (
    <span className={`inline-flex items-center rounded-[6px] px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text} ${pulse ? 'animate-pulse' : ''}`}>
      {config.label}
    </span>
  );
}
