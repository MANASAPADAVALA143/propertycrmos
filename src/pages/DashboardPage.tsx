import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Grid3x3, IndianRupee, TrendingUp, AlertCircle, Eye, Bell,
  ArrowRight, ArrowUp, AlertTriangle, Info,
} from 'lucide-react';
import {
  KPI_DATA, units, payments, monthlyTrends, forecastData, alerts,
  formatINRFull, PROJECT, type Unit, type AlertItem,
} from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';
import Toast, { useToasts } from '@/components/Toast';

const recentPayments = payments.slice(0, 5);

const alertStyles: Record<string, { border: string; bg: string; text: string; icon: typeof Info }> = {
  critical: { border: 'border-l-[#DC2626]', bg: 'bg-[#FEE2E2]/60', text: 'text-[#DC2626]', icon: AlertCircle },
  warning:  { border: 'border-l-[#B45309]', bg: 'bg-[#FEF3C7]/60', text: 'text-[#B45309]', icon: AlertTriangle },
  info:     { border: 'border-l-[#0369A1]', bg: 'bg-[#E0F2FE]/60', text: 'text-[#0369A1]', icon: Info },
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-[6px] border border-border bg-white p-3 text-xs shadow-card">
      <p className="mb-2 font-semibold text-heading">{label} 2026</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }}>{entry.name}: ₹{entry.value}L</p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [hoveredUnit, setHoveredUnit] = useState<{ unit: Unit; x: number; y: number } | null>(null);
  const { toasts, showToast, dismissToast } = useToasts();

  return (
    <div className="animate-fadeIn space-y-5">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Total Units', icon: Grid3x3,
            value: KPI_DATA.totalUnits,
            sub: `${KPI_DATA.soldUnits} sold · ${KPI_DATA.reservedUnits} reserved · ${KPI_DATA.availableUnits} available`,
            trend: '+3 units sold this month', trendUp: true,
          },
          {
            label: 'Monthly Payout Liability', icon: IndianRupee,
            value: formatINRFull(KPI_DATA.monthlyPayoutLiability),
            sub: '28 active leases × ₹27,000',
            trend: '↑ ₹81,000 vs last month (3 new units)', trendUp: true,
          },
          {
            label: 'Collection Rate', icon: TrendingUp,
            value: `${KPI_DATA.collectionRate}%`,
            sub: '14 payments due today — expected by EOD',
            trend: `↑ vs last month ${KPI_DATA.lastMonthCollectionRate}%`, trendUp: true,
          },
          {
            label: 'Overdue', icon: AlertCircle,
            value: `${KPI_DATA.overdueCount} unit · ${formatINRFull(KPI_DATA.overdueAmount)}`,
            sub: 'Farhan Qureshi — Unit 007 · 2 months',
            trend: '↑ from 0 last month — action required', trendUp: false,
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="rounded-[10px] border-l-[3px] border-t border-r border-b border-border bg-white p-5 shadow-card" style={{ borderLeftColor: '#0D9488' }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted">{card.label}</span>
                <Icon size={17} className="text-primary" />
              </div>
              <p className="mt-3 text-[26px] font-bold leading-none text-primary">{card.value}</p>
              <p className="mt-1.5 text-[11px] text-muted">{card.sub}</p>
              <p className={`mt-1 text-[11px] ${card.trendUp ? 'text-[#0F766E]' : 'text-[#DC2626]'}`}>{card.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Priority Alerts */}
      <div className="rounded-[10px] border border-border bg-white p-5 shadow-card">
        <h2 className="mb-4 text-[16px] font-semibold text-heading">Priority Alerts</h2>
        <div className="space-y-2">
          {alerts.map((alert) => {
            const style = alertStyles[alert.severity];
            const Icon = style.icon;
            return (
              <div key={alert.id} className={`flex items-center justify-between rounded-[6px] border-l-4 ${style.border} ${style.bg} p-3`}>
                <div className="flex flex-1 items-start gap-3">
                  <Icon size={15} className={`mt-0.5 shrink-0 ${style.text}`} />
                  <div>
                    <p className={`text-sm font-semibold ${style.text}`}>{alert.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{alert.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`${alert.action}: ${alert.title}`)}
                  className={`shrink-0 rounded-[6px] border px-3 py-1.5 text-xs font-medium transition-colors ${style.text} border-current hover:opacity-80`}
                >
                  {alert.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Unit Occupancy Map */}
        <div className="rounded-[10px] border border-border bg-white p-5 shadow-card">
          <h2 className="text-[16px] font-semibold text-heading">Unit Occupancy</h2>
          <p className="mb-4 text-xs text-muted">{PROJECT.name}</p>
          <div className="grid grid-cols-8 gap-1.5">
            {units.map((unit, i) => (
              <div
                key={i}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredUnit({ unit, x: rect.left + rect.width / 2, y: rect.top });
                }}
                onMouseLeave={() => setHoveredUnit(null)}
                onClick={() => setSelectedUnit(unit)}
                className={`aspect-square cursor-pointer rounded-[3px] transition-transform hover:scale-110 ${
                  unit.status === 'sold' ? 'bg-primary'
                  : unit.status === 'overdue' ? 'bg-[#EF4444] animate-pulse'
                  : unit.status === 'reserved' ? 'border-[1.5px] border-dashed border-primary bg-transparent'
                  : 'bg-border'
                }`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-primary" /><span className="text-xs text-muted">Sold &amp; Leased</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] border-[1.5px] border-dashed border-primary" /><span className="text-xs text-muted">Reserved</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-border" /><span className="text-xs text-muted">Available</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-[#EF4444]" /><span className="text-xs text-muted">Overdue</span></div>
          </div>
        </div>

        {/* Payout Trend Chart */}
        <div className="rounded-[10px] border border-border bg-white p-5 shadow-card">
          <h2 className="text-[16px] font-semibold text-heading">Monthly Payout Trend</h2>
          <p className="mb-4 text-xs text-muted">Dues generated vs amount collected (₹ in lakhs)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyTrends} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} unit="L" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFB' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} formatter={(v) => <span style={{ color: '#64748B' }}>{v}</span>} />
              <Bar dataKey="dues" name="Dues Generated" fill="#0D9488" radius={[3, 3, 0, 0]} />
              <Bar dataKey="collected" name="Amount Collected" fill="#5EEAD4" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout Forecast Table */}
      <div className="rounded-[10px] border border-border bg-white p-5 shadow-card">
        <h2 className="mb-1 text-[16px] font-semibold text-heading">Payout Liability Forecast — Next 8 Months</h2>
        <p className="mb-4 text-xs text-muted">Projected liability with escalation and CAM income offset</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted" style={{ backgroundColor: '#F8FAFB' }}>
                <th className="px-3 pb-3 pt-2 font-semibold">Month</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Units Active</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Base Liability</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Escalation</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Net Liability</th>
                <th className="px-3 pb-3 pt-2 font-semibold">CAM Income</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Net Position</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((row, i) => (
                <tr key={i} className="border-b border-border transition-colors hover:bg-surface" style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8FAFB' }}>
                  <td className="px-3 py-3 text-body">{row.month}</td>
                  <td className="px-3 py-3 text-muted">{row.unitsActive}</td>
                  <td className="px-3 py-3 font-mono text-body">{formatINRFull(row.baseLiability)}</td>
                  <td className="px-3 py-3 font-mono text-muted">{row.escalation ? formatINRFull(row.escalation) : '—'}</td>
                  <td className="px-3 py-3 font-mono font-semibold text-primary">{formatINRFull(row.netLiability)}</td>
                  <td className="px-3 py-3 font-mono text-[#0F766E]">{formatINRFull(row.camIncome)}</td>
                  <td className="px-3 py-3 font-mono text-[#DC2626]">{formatINRFull(row.netPosition)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">At full occupancy (40 units), monthly liability peaks at {formatINRFull(1080000)}. CAM income of {formatINRFull(81000)} partially offsets. Net developer outflow: {formatINRFull(999000)}/month covered by property operating revenue.</p>
      </div>

      {/* Recent Payments */}
      <div className="rounded-[10px] border border-border bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-heading">Recent Payments</h2>
          <Link to="/payments" className="flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary-hover">View all <ArrowRight size={13} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted" style={{ backgroundColor: '#F8FAFB' }}>
                <th className="px-3 pb-3 pt-2 font-semibold">Unit ID</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Buyer Name</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Amount</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Due Date</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Status</th>
                <th className="px-3 pb-3 pt-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, i) => (
                <tr key={payment.id} className="border-b border-border transition-colors hover:bg-surface" style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8FAFB' }}>
                  <td className="px-3 py-3 text-body">{payment.unitId}</td>
                  <td className="px-3 py-3 text-body">{payment.buyerName}</td>
                  <td className="px-3 py-3 text-body">{formatINRFull(payment.amount)}</td>
                  <td className="px-3 py-3 text-muted">{payment.dueDate}</td>
                  <td className="px-3 py-3"><StatusBadge status={payment.status} /></td>
                  <td className="px-3 py-3">
                    {payment.status === 'Overdue' ? (
                      <button onClick={() => showToast(`WhatsApp reminder sent to ${payment.buyerName}`)} className="flex items-center gap-1 text-xs text-[#DC2626] transition-colors hover:opacity-80"><Bell size={13} /> Remind</button>
                    ) : (
                      <button className="flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary-hover"><Eye size={13} /> View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {hoveredUnit && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-[6px] border border-border bg-white px-3 py-2 text-xs text-heading shadow-card-hover"
          style={{ left: hoveredUnit.x, top: hoveredUnit.y - 4 }}
        >
          <p className="font-semibold">{hoveredUnit.unit.label} | {hoveredUnit.unit.sizeSqYards} sq yards</p>
          <p className="text-muted">Buyer: {hoveredUnit.unit.buyerName || '—'}</p>
          <p className="text-muted">Status: <span className="capitalize">{hoveredUnit.unit.status}</span></p>
        </div>
      )}

      <SlideOver open={!!selectedUnit} onClose={() => setSelectedUnit(null)} title={selectedUnit?.label}>
        {selectedUnit && <UnitDetail unit={selectedUnit} onViewProfile={() => setSelectedUnit(null)} />}
      </SlideOver>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function UnitDetail({ unit, onViewProfile }: { unit: Unit; onViewProfile: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-primary-light"><Grid3x3 size={22} className="text-primary" /></div>
        <div><p className="text-[15px] font-bold text-heading">{unit.label}</p><p className="text-xs text-muted">{unit.sizeSqYards} sq yards ({unit.sizeSqft} sqft)</p></div>
        <div className="ml-auto"><StatusBadge status={unit.status} /></div>
      </div>
      {unit.status !== 'available' && unit.status !== 'reserved' ? (
        <>
          <div className="rounded-[8px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-[13px] font-semibold text-heading">Buyer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Name</span><span className="text-body">{unit.buyerName}</span></div>
              <div className="flex justify-between"><span className="text-muted">Phone</span><span className="text-body">{unit.buyerPhone}</span></div>
              <div className="flex justify-between"><span className="text-muted">Purchase Date</span><span className="text-body">{unit.purchaseDate}</span></div>
              <div className="flex justify-between"><span className="text-muted">Purchase Price</span><span className="text-body">{formatINRFull(unit.purchasePrice || 0)}</span></div>
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-[13px] font-semibold text-heading">Lease Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Lease Start</span><span className="text-body">{unit.leaseStart}</span></div>
              <div className="flex justify-between"><span className="text-muted">Lease End</span><span className="text-body">{unit.leaseEnd}</span></div>
              <div className="flex justify-between"><span className="text-muted">Monthly Return</span><span className="font-semibold text-primary">{formatINRFull(unit.monthlyReturn || 0)}</span></div>
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-[13px] font-semibold text-heading">Last Payment</h3>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-body">{unit.lastPaymentDate}</p><p className="text-xs text-muted">Payment status</p></div>
              {unit.lastPaymentStatus && <StatusBadge status={unit.lastPaymentStatus} />}
            </div>
          </div>
          <div className="rounded-[8px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-[13px] font-semibold text-heading">Documents</h3>
            <div className="flex gap-2">
              <DocBadge label="Sale Deed" uploaded={unit.saleDeedUploaded} />
              <DocBadge label="KYC" uploaded={unit.kycUploaded} />
            </div>
          </div>
          <button className="w-full rounded-[7px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover" onClick={onViewProfile}>View Full Profile</button>
        </>
      ) : (
        <div className="rounded-[8px] border border-border bg-surface p-4 text-center">
          <p className="text-sm text-muted">{unit.status === 'reserved' ? 'This unit is reserved — deposit received, sale in progress' : 'This unit is available for sale'}</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted">Unit price</span><span className="text-body">{formatINRFull(PROJECT.unitPrice)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted">Monthly payout if leased</span><span className="text-body">{formatINRFull(PROJECT.monthlyReturn)}</span></div>
          </div>
          {unit.status !== 'reserved' && <button className="mt-4 w-full rounded-[7px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">Mark as Sold</button>}
        </div>
      )}
    </div>
  );
}

function DocBadge({ label, uploaded }: { label: string; uploaded?: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs ${uploaded ? 'bg-[#CCFBF1] text-[#0F766E]' : 'bg-[#FEF3C7] text-[#B45309]'}`}>
      {label} {uploaded ? '✓' : 'Pending'}
    </span>
  );
}
