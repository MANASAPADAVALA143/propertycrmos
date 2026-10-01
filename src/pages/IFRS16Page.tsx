import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Check, X, Download, BookOpen, IndianRupee, TrendingUp, FileText } from 'lucide-react';
import {
  contracts,
  ifrs16Data,
  ifrs16Totals,
  ifrs16Classification,
  generateAmortisationSchedule,
  formatINRFull,
} from '@/data/mockData';
import { useToasts, default as Toast } from '@/components/Toast';

export default function IFRS16Page() {
  const [selectedContract, setSelectedContract] = useState('LC001');
  const [showAllMonths, setShowAllMonths] = useState(false);
  const { toasts, showToast, dismissToast } = useToasts();

  const schedule = useMemo(() => generateAmortisationSchedule(selectedContract), [selectedContract]);
  const displaySchedule = showAllMonths ? schedule : schedule.slice(0, 12);

  const chartData = schedule.map((row) => ({
    month: `M${row.month}`,
    interest: row.interestIncome,
    principal: row.principalRepayment,
  }));

  const totalReceipts12 = schedule.slice(0, 12).reduce((s, r) => s + r.leaseReceipt, 0);
  const totalInterest12 = schedule.slice(0, 12).reduce((s, r) => s + r.interestIncome, 0);
  const totalPrincipal12 = schedule.slice(0, 12).reduce((s, r) => s + r.principalRepayment, 0);
  const nilClosing12 = schedule[11]?.closingNIL || 0;

  const kpiCards = [
    { label: 'Total NIL (Receivable)', value: formatINRFull(ifrs16Totals.carryingValue), icon: IndianRupee },
    { label: 'Finance Income — Sep 2026', value: formatINRFull(ifrs16Totals.financeIncomeSep), icon: TrendingUp },
    { label: 'Unearned Finance Income', value: formatINRFull(ifrs16Totals.unearnedRemaining), icon: BookOpen },
    { label: 'Finance Leases Active', value: String(ifrs16Totals.activeCount), icon: FileText },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">IFRS 16 — Finance Lease Accounting</h1>
        <p className="mt-1 text-sm text-textgray">Lessor accounting for fractional leaseback contracts (IFRS 16 / Ind AS 116)</p>
      </div>

      {/* Info Banner */}
      <div className="rounded-[6px] border-l-4 border-gold-500 bg-navy-800 p-5">
        <p className="text-sm leading-relaxed text-textgray">
          Under IFRS 16, the developer (lessor) in a sale-and-leaseback arrangement classifies each leaseback as a Finance Lease when substantially all risks and rewards of ownership transfer to the buyer (lessee). The net investment in the lease is recognised as a receivable.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-textgray">{card.label}</span>
                <Icon size={18} className="text-gold-500" />
              </div>
              <p className="mt-3 text-xl font-bold text-gold-500">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Section 1: Lease Classification */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <h2 className="mb-1 text-lg font-semibold text-white">Lease Classification — IFRS 16 Test</h2>
        <p className="mb-4 text-xs text-textgray">28 of 28 contracts classified as Finance Leases | 0 Operating Leases</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {ifrs16Classification.slice(0, 4).map((cls) => (
            <div key={cls.contractId} className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{cls.contractId} — {cls.unit} — {cls.buyer}</p>
                <span className="rounded-[6px] bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-500">FINANCE LEASE</span>
              </div>
              <div className="space-y-1.5">
                {cls.criteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    {c.pass ? <Check size={14} className="mt-0.5 shrink-0 text-teal-500" /> : <X size={14} className="mt-0.5 shrink-0 text-status-error" />}
                    <span className="text-textgray">{c.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 border-t border-navy-600 pt-2 text-xs italic text-gold-500">{cls.basis}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: NIL Summary Table */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <h2 className="mb-1 text-lg font-semibold text-white">Net Investment in Lease — All Contracts</h2>
        <div className="mb-4 rounded-[6px] bg-navy-900 p-3">
          <p className="text-xs leading-relaxed text-textgray">
            At commencement, the lessor derecognises the underlying asset and recognises a Net Investment in the Lease (NIL) = PV of lease payments + PV of unguaranteed residual value, discounted at the implicit rate.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="px-3 py-2 font-medium">Contract</th>
                <th className="px-3 py-2 font-medium">Unit</th>
                <th className="px-3 py-2 font-medium">Buyer</th>
                <th className="px-3 py-2 font-medium">Term</th>
                <th className="px-3 py-2 font-medium">Monthly</th>
                <th className="px-3 py-2 font-medium">Rate</th>
                <th className="px-3 py-2 font-medium">NIL Inception</th>
                <th className="px-3 py-2 font-medium">Unearned Income</th>
                <th className="px-3 py-2 font-medium">Carrying Value</th>
              </tr>
            </thead>
            <tbody>
              {ifrs16Data.map((row, i) => (
                <tr key={i} className={`border-b border-navy-600/50 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}>
                  <td className="px-3 py-2.5 text-white">{row.contract}</td>
                  <td className="px-3 py-2.5 text-textgray">{row.unit}</td>
                  <td className="px-3 py-2.5 text-textgray">{row.buyer}</td>
                  <td className="px-3 py-2.5 text-textgray">{row.leaseTerm} mo</td>
                  <td className="px-3 py-2.5 text-white">{formatINRFull(row.monthlyPayment)}</td>
                  <td className="px-3 py-2.5 text-textgray">{row.implicitRate}</td>
                  <td className="px-3 py-2.5 font-mono text-gold-500">{formatINRFull(row.nilAtInception)}</td>
                  <td className="px-3 py-2.5 font-mono text-textgray">{formatINRFull(row.unearnedFinanceIncome)}</td>
                  <td className="px-3 py-2.5 font-mono text-white">{formatINRFull(row.carryingValue)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-navy-600 bg-navy-900/60">
                <td className="px-3 py-3 font-semibold text-white" colSpan={3}>Totals (28 contracts)</td>
                <td className="px-3 py-3 text-textgray">—</td>
                <td className="px-3 py-3 font-semibold text-white">{formatINRFull(ifrs16Totals.monthlyPayment)}/mo</td>
                <td className="px-3 py-3 text-textgray">—</td>
                <td className="px-3 py-3 font-mono font-bold text-gold-500">{formatINRFull(ifrs16Totals.nilAtInception)}</td>
                <td className="px-3 py-3 font-mono font-bold text-textgray">{formatINRFull(ifrs16Totals.unearnedFinanceIncome)}</td>
                <td className="px-3 py-3 font-mono font-bold text-white">{formatINRFull(ifrs16Totals.carryingValue)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-textgray">NIL calculated using PV of annuity formula: PMT × [1-(1+r)^-n]/r where r=0.875%, n=60, PMT=₹27,000</p>
      </div>

      {/* Section 3: Amortisation Schedule */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Finance Lease Amortisation Schedule</h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none"
            >
              {contracts.map((c) => (
                <option key={c.id} value={c.id}>{c.id} — {c.unit}</option>
              ))}
            </select>
            <button
              onClick={() => setShowAllMonths(!showAllMonths)}
              className="rounded-[6px] border border-navy-600 px-3 py-2 text-xs font-medium text-textgray transition-colors hover:text-white"
            >
              {showAllMonths ? 'Show 12 months' : 'Show all 60 months'}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="px-3 py-2 font-medium">Month</th>
                <th className="px-3 py-2 font-medium">Opening NIL</th>
                <th className="px-3 py-2 font-medium">Receipt</th>
                <th className="px-3 py-2 font-medium">Interest Income</th>
                <th className="px-3 py-2 font-medium">Principal</th>
                <th className="px-3 py-2 font-medium">Closing NIL</th>
              </tr>
            </thead>
            <tbody>
              {displaySchedule.map((row) => (
                <tr key={row.month} className="border-b border-navy-600/50">
                  <td className="px-3 py-2 text-white">{row.monthLabel}</td>
                  <td className="px-3 py-2 font-mono text-textgray">{formatINRFull(row.openingNIL)}</td>
                  <td className="px-3 py-2 font-mono text-white">{formatINRFull(row.leaseReceipt)}</td>
                  <td className="px-3 py-2 font-mono text-gold-500">{formatINRFull(row.interestIncome)}</td>
                  <td className="px-3 py-2 font-mono text-teal-500">{formatINRFull(row.principalRepayment)}</td>
                  <td className="px-3 py-2 font-mono text-textgray">{formatINRFull(row.closingNIL)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <SummaryStat label="Total Receipts (12 mo)" value={formatINRFull(totalReceipts12)} />
          <SummaryStat label="Interest Income (12 mo)" value={formatINRFull(totalInterest12)} color="text-gold-500" />
          <SummaryStat label="Principal Recovered (12 mo)" value={formatINRFull(totalPrincipal12)} color="text-teal-500" />
          <SummaryStat label="NIL Closing (M12)" value={formatINRFull(nilClosing12)} />
        </div>
      </div>

      {/* Amortisation Chart */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Interest vs Principal Over Lease Term — {selectedContract}</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9922A" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#C9922A" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="principalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D9E75" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#1D9E75" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2F45" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#B0BEC5', fontSize: 10 }} axisLine={{ stroke: '#243B53' }} tickLine={false} interval={5} />
            <YAxis tick={{ fill: '#B0BEC5', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #1A2F45', borderRadius: '6px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="interest" name="Interest Income" stroke="#C9922A" fill="url(#interestGrad)" />
            <Area type="monotone" dataKey="principal" name="Principal Repayment" stroke="#1D9E75" fill="url(#principalGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Section 4: Journal Entries */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">IFRS 16 Journal Entries</h2>
          <div className="flex items-center gap-3">
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none"
            >
              {contracts.map((c) => (
                <option key={c.id} value={c.id}>{c.id}</option>
              ))}
            </select>
            <button onClick={() => showToast('Exporting journal entries to CSV...')} className="flex items-center gap-2 rounded-[6px] border border-gold-500/50 px-3 py-2 text-xs font-semibold text-gold-500 transition-colors hover:bg-gold-500/10">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Entry 1 */}
          <div className="rounded-[6px] border-l-4 border-gold-500 bg-navy-900 p-4">
            <p className="mb-3 text-sm font-semibold text-white">Entry 1: At commencement (01 May 2026) — Derecognise asset, recognise NIL</p>
            <div className="space-y-1 font-mono text-sm">
              <div className="flex justify-between"><span className="text-white">Dr. Net Investment in Lease (Receivable)</span><span className="text-white">₹12,45,915</span></div>
              <div className="flex justify-between"><span className="text-white">Dr. Unearned Finance Income</span><span className="text-white">₹3,74,085</span></div>
              <div className="flex justify-between pl-10"><span className="text-textgray">Cr. Investment Property / PPE (Asset)</span><span className="text-textgray">₹18,00,000</span></div>
            </div>
            <p className="mt-2 text-xs italic text-gold-500">Narration: Recognition of finance lease — {contracts.find(c => c.id === selectedContract)?.unit} — {selectedContract}</p>
          </div>

          {/* Entry 2 */}
          <div className="rounded-[6px] border-l-4 border-gold-500 bg-navy-900 p-4">
            <p className="mb-3 text-sm font-semibold text-white">Entry 2: Monthly receipt (01 Jun 2026) — Month 1</p>
            <div className="space-y-1 font-mono text-sm">
              <div className="flex justify-between"><span className="text-white">Dr. Cash / Bank</span><span className="text-white">₹27,000</span></div>
              <div className="flex justify-between pl-10"><span className="text-textgray">Cr. Net Investment in Lease (Principal)</span><span className="text-textgray">₹16,098</span></div>
              <div className="flex justify-between pl-10"><span className="text-textgray">Cr. Finance Income (P&L)</span><span className="text-textgray">₹10,902</span></div>
            </div>
            <p className="mt-2 text-xs italic text-gold-500">Narration: Finance lease receipt — {contracts.find(c => c.id === selectedContract)?.unit} — {selectedContract} — Month 1</p>
          </div>

          {/* Entry 3 */}
          <div className="rounded-[6px] border-l-4 border-gold-500 bg-navy-900 p-4">
            <p className="mb-3 text-sm font-semibold text-white">Entry 3: Unearned income recognition (monthly)</p>
            <div className="space-y-1 font-mono text-sm">
              <div className="flex justify-between"><span className="text-white">Dr. Unearned Finance Income</span><span className="text-white">₹10,902</span></div>
              <div className="flex justify-between pl-10"><span className="text-textgray">Cr. Finance Income (P&L)</span><span className="text-textgray">₹10,902</span></div>
            </div>
            <p className="mt-2 text-xs italic text-gold-500">Narration: Recognition of finance income — {contracts.find(c => c.id === selectedContract)?.unit} — {selectedContract} — Month 1</p>
          </div>
        </div>
      </div>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function SummaryStat({ label, value, color = 'text-white' }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-[6px] bg-navy-900 p-3">
      <p className="text-xs text-textgray">{label}</p>
      <p className={`mt-1 font-mono text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}
