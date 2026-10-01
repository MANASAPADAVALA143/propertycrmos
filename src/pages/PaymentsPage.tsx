import { Eye, Bell, Download, Search, FileText, FileSpreadsheet, Send } from 'lucide-react';
import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { payments, formatINRFull, KPI_DATA, type PaymentStatus } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { useToasts, default as Toast } from '@/components/Toast';

const months = ['Sep 2026', 'Aug 2026', 'Jul 2026', 'Jun 2026'];

const kpiCards = [
  { label: 'Total Due This Month', value: formatINRFull(KPI_DATA.monthlyPayoutLiability), sub: `${KPI_DATA.soldUnits} units × ₹27,000`, color: 'text-gold-500' },
  { label: 'Collected', value: formatINRFull(KPI_DATA.collectedThisMonth), sub: `${KPI_DATA.collectionRate}% collection rate`, color: 'text-teal-500' },
  { label: 'Overdue', value: formatINRFull(KPI_DATA.overdueAmount), sub: `${KPI_DATA.overdueCount} unit — 2 months`, color: 'text-status-error' },
];

const donutData = [
  { name: 'Paid', value: 13, color: '#1D9E75' },
  { name: 'Overdue', value: 1, color: '#E24B4A' },
  { name: 'Pending', value: 14, color: '#EF9F27' },
];

function DonutTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-2 text-xs text-white">
      {entry.name}: {entry.value} units
    </div>
  );
}

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Overdue' | 'Pending'>('All');
  const [selectedMonth, setSelectedMonth] = useState('Sep 2026');
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<Set<string>>(new Set());
  const { toasts, showToast, dismissToast } = useToasts();

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch = p.unitId.toLowerCase().includes(search.toLowerCase()) || p.buyerName.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, statusFilter]);

  const statusFilters: typeof statusFilter[] = ['All', 'Paid', 'Overdue', 'Pending'];

  const checkedOverdue = payments.filter((p) => p.status === 'Overdue' && checkedRows.has(p.id));

  const toggleRow = (id: string) => {
    setCheckedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkReminder = () => {
    const names = checkedOverdue.map((p) => p.buyerName).join(', ');
    showToast(`WhatsApp reminders sent to ${names}`);
    setCheckedRows(new Set());
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="mt-1 text-sm text-textgray">{selectedMonth} · Monthly payout Cycle</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
              className="flex items-center gap-2 rounded-[6px] border border-navy-600 bg-navy-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-600/30"
            >
              {selectedMonth}
              <span className="text-textgray">▼</span>
            </button>
            {monthDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 z-30 rounded-[6px] border border-navy-600 bg-navy-800 py-1 shadow-xl">
                {months.map((m) => (
                  <button
                    key={m}
                    onClick={() => { setSelectedMonth(m); setMonthDropdownOpen(false); }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-navy-600/30 ${m === selectedMonth ? 'text-gold-500' : 'text-textgray'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Export buttons */}
          <button onClick={() => showToast('Exporting to CSV...')} className="flex items-center gap-2 rounded-[6px] border border-gold-500/50 px-3 py-2.5 text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500/10">
            <FileSpreadsheet size={16} /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button onClick={() => showToast('Exporting to PDF...')} className="flex items-center gap-2 rounded-[6px] border border-gold-500/50 px-3 py-2.5 text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500/10">
            <FileText size={16} /> <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* KPI Strip + Donut Chart */}
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
        {kpiCards.map((card, i) => (
          <div key={i} className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
            <p className="text-sm text-textgray">{card.label}</p>
            <p className={`mt-2 text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="mt-1 text-xs text-textgray">{card.sub}</p>
          </div>
        ))}
        {/* Donut Chart */}
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <p className="text-sm font-medium text-white">{selectedMonth} Collection Status</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
              {donutData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="h-3 w-3 rounded-[3px]" style={{ backgroundColor: d.color }} />
                  <span className="text-textgray">{d.name}: {d.value} ({d.value > 0 ? Math.round((d.value / 28) * 100) : 0}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter + Bulk Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textgray" />
          <input
            type="text"
            placeholder="Search by unit ID or buyer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[6px] border border-navy-600 bg-navy-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-textgray focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-[6px] px-4 py-2.5 text-sm font-medium transition-colors ${
                statusFilter === f ? 'bg-gold-500 text-navy-900' : 'border border-navy-600 bg-navy-800 text-textgray hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Bar */}
      {checkedOverdue.length > 0 && (
        <div className="flex items-center justify-between rounded-[6px] border border-status-error/30 bg-status-error/10 px-4 py-3 animate-fadeIn">
          <span className="text-sm text-white">{checkedOverdue.length} overdue row(s) selected</span>
          <button onClick={handleBulkReminder} className="flex items-center gap-2 rounded-[6px] bg-status-error px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-status-error/90">
            <Send size={14} /> Send Bulk Reminder
          </button>
        </div>
      )}

      {/* Payments Table */}
      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="px-4 py-3 font-medium w-8">
                  <input type="checkbox" className="accent-gold-500" onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedRows(new Set(payments.filter((p) => p.status === 'Overdue').map((p) => p.id)));
                    } else {
                      setCheckedRows(new Set());
                    }
                  }} />
                </th>
                <th className="px-4 py-3 font-medium">Unit ID</th>
                <th className="px-4 py-3 font-medium">Buyer Name</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Days Overdue</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, i) => (
                <tr
                  key={payment.id}
                  className={`border-b border-navy-600/50 transition-colors hover:bg-navy-600/30 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}
                >
                  <td className="px-4 py-3.5">
                    {payment.status === 'Overdue' && (
                      <input type="checkbox" checked={checkedRows.has(payment.id)} onChange={() => toggleRow(payment.id)} className="accent-gold-500" />
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-white">{payment.unitId}</td>
                  <td className="px-4 py-3.5 font-medium text-white">{payment.buyerName}</td>
                  <td className="px-4 py-3.5 text-white">{formatINRFull(payment.amount)}</td>
                  <td className="px-4 py-3.5 text-textgray">{payment.dueDate}</td>
                  <td className="px-4 py-3.5">
                    {payment.daysOverdue ? <span className="text-status-error">{payment.daysOverdue} days</span> : <span className="text-textgray">—</span>}
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={payment.status} /></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-colors">
                        <Eye size={14} /> View
                      </button>
                      {payment.status === 'Overdue' && (
                        <button onClick={() => showToast(`WhatsApp reminder sent to ${payment.buyerName}`)} className="flex items-center gap-1 text-xs text-status-error hover:text-status-error/80 transition-colors">
                          <Bell size={14} /> Send Reminder
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-12 text-center">
          <p className="text-textgray">No payments found matching your filters.</p>
        </div>
      )}

      <p className="text-center text-xs text-textgray">
        Showing {filteredPayments.length} of {payments.length} payment records
      </p>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}
