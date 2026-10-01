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
  critical: { border: 'border-l-status-error', bg: 'bg-status-error/5', text: 'text-status-error', icon: AlertCircle },
  warning: { border: 'border-l-status-warning', bg: 'bg-status-warning/5', text: 'text-status-warning', icon: AlertTriangle },
  info: { border: 'border-l-blue-500', bg: 'bg-blue-500/5', text: 'text-blue-400', icon: Info },
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-3 text-xs">
      <p className="mb-2 font-semibold text-white">{label} 2026</p>
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
    <div className="animate-fadeIn space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Total Units</span>
            <Grid3x3 size={18} className="text-gold-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gold-500">{KPI_DATA.totalUnits}</p>
          <p className="mt-1 text-xs text-textgray">{KPI_DATA.soldUnits} sold · {KPI_DATA.reservedUnits} reserved · {KPI_DATA.availableUnits} available</p>
          <p className="mt-1 text-xs text-teal-500">+3 units sold this month</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Monthly Payout Liability</span>
            <IndianRupee size={18} className="text-gold-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gold-500">{formatINRFull(KPI_DATA.monthlyPayoutLiability)}</p>
          <p className="mt-1 text-xs text-textgray">28 active leases × ₹27,000</p>
          <p className="mt-1 text-xs text-teal-500">↑ ₹81,000 vs last month (3 new units)</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Collection Rate</span>
            <TrendingUp size={18} className="text-gold-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gold-500">{KPI_DATA.collectionRate}%</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-teal-500"><ArrowUp size={12} /> vs last month {KPI_DATA.lastMonthCollectionRate}%</p>
          <p className="mt-1 text-xs text-textgray">14 payments due today — expected by EOD</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Overdue</span>
            <AlertCircle size={18} className="text-gold-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-gold-500">{KPI_DATA.overdueCount} unit · {formatINRFull(KPI_DATA.overdueAmount)}</p>
          <p className="mt-1 text-xs text-status-error">Farhan Qureshi — Unit 007 · 2 months</p>
          <p className="mt-1 text-xs text-status-error">↑ from 0 last month — action required</p>
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Priority Alerts</h2>
        <div className="space-y-2">
          {alerts.map((alert) => {
            const style = alertStyles[alert.severity];
            const Icon = style.icon;
            return (
              <div key={alert.id} className={`flex items-center justify-between rounded-[6px] border-l-4 ${style.border} ${style.bg} p-3`}>
                <div className="flex items-start gap-3 flex-1">
                  <Icon size={16} className={`mt-0.5 shrink-0 ${style.text}`} />
                  <div>
                    <p className={`text-sm font-semibold ${style.text}`}>{alert.title}</p>
                    <p className="mt-0.5 text-xs text-textgray">{alert.message}</p>
                  </div>
                </div>
                <button onClick={() => showToast(`${alert.action}: ${alert.title}`)} className={`shrink-0 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${style.text} border ${style.border} hover:${style.bg}`}>
                  {alert.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Unit Occupancy Map */}
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Unit Occupancy</h2>
            <p className="text-xs text-textgray">{PROJECT.name}</p>
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            {units.map((unit, i) => (
              <div
                key={i}
                onMouseEnter={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setHoveredUnit({ unit, x: rect.left + rect.width / 2, y: rect.top }); }}
                onMouseLeave={() => setHoveredUnit(null)}
                onClick={() => setSelectedUnit(unit)}
                className={`aspect-square cursor-pointer rounded-[3px] transition-transform hover:scale-110 ${
                  unit.status === 'sold' ? 'bg-gold-500' : unit.status === 'overdue' ? 'bg-status-error' : unit.status === 'reserved' ? 'bg-gold-500/30 border border-gold-500/50' : 'bg-navy-500'
                }`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-gold-500" /><span className="text-xs text-textgray">Sold & Leased</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-gold-500/30 border border-gold-500/50" /><span className="text-xs text-textgray">Reserved</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-navy-500" /><span className="text-xs text-textgray">Available</span></div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-[3px] bg-status-error" /><span className="text-xs text-textgray">Overdue</span></div>
          </div>
        </div>

        {/* Payout Trend Chart */}
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Monthly Payout Trend</h2>
            <p className="text-xs text-textgray">Dues generated vs amount collected (₹ in lakhs)</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyTrends} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2F45" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#B0BEC5', fontSize: 12 }} axisLine={{ stroke: '#243B53' }} tickLine={false} />
              <YAxis tick={{ fill: '#B0BEC5', fontSize: 12 }} axisLine={false} tickLine={false} unit="L" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A2F4540' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#B0BEC5' }} formatter={(value) => <span style={{ color: '#B0BEC5' }}>{value}</span>} />
              <Bar dataKey="dues" name="Dues Generated" fill="#C9922A" radius={[3, 3, 0, 0]} />
              <Bar dataKey="collected" name="Amount Collected" fill="#1D9E75" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout Forecast — expanded 6-month table */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Payout Liability Forecast — Next 8 Months</h2>
          <p className="text-xs text-textgray">Projected liability with escalation and CAM income offset</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="pb-3 pr-4 font-medium">Month</th>
                <th className="pb-3 pr-4 font-medium">Units Active</th>
                <th className="pb-3 pr-4 font-medium">Base Liability</th>
                <th className="pb-3 pr-4 font-medium">Escalation</th>
                <th className="pb-3 pr-4 font-medium">Net Liability</th>
                <th className="pb-3 pr-4 font-medium">CAM Income</th>
                <th className="pb-3 font-medium">Net Position</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((row, i) => (
                <tr key={i} className={`border-b border-navy-600/50 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}>
                  <td className="py-3 pr-4 text-white">{row.month}</td>
                  <td className="py-3 pr-4 text-textgray">{row.unitsActive}</td>
                  <td className="py-3 pr-4 font-mono text-white">{formatINRFull(row.baseLiability)}</td>
                  <td className="py-3 pr-4 font-mono text-textgray">{row.escalation ? formatINRFull(row.escalation) : '—'}</td>
                  <td className="py-3 pr-4 font-mono font-semibold text-gold-500">{formatINRFull(row.netLiability)}</td>
                  <td className="py-3 pr-4 font-mono text-teal-500">{formatINRFull(row.camIncome)}</td>
                  <td className="py-3 font-mono text-status-error">{formatINRFull(row.netPosition)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-textgray">At full occupancy (40 units), monthly liability peaks at {formatINRFull(1080000)}. CAM income of {formatINRFull(81000)} partially offsets. Net developer outflow: {formatINRFull(999000)}/month covered by property operating revenue.</p>
      </div>

      {/* Recent Payments Table */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Payments</h2>
          <Link to="/payments" className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-colors">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="pb-3 pr-4 font-medium">Unit ID</th>
                <th className="pb-3 pr-4 font-medium">Buyer Name</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Due Date</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, i) => (
                <tr key={payment.id} className={`border-b border-navy-600/50 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}>
                  <td className="py-3 pr-4 text-white">{payment.unitId}</td>
                  <td className="py-3 pr-4 text-textgray">{payment.buyerName}</td>
                  <td className="py-3 pr-4 text-white">{formatINRFull(payment.amount)}</td>
                  <td className="py-3 pr-4 text-textgray">{payment.dueDate}</td>
                  <td className="py-3 pr-4"><StatusBadge status={payment.status} /></td>
                  <td className="py-3">
                    {payment.status === 'Overdue' ? (
                      <button onClick={() => showToast(`WhatsApp reminder sent to ${payment.buyerName}`)} className="flex items-center gap-1 text-xs text-status-error hover:text-status-error/80 transition-colors"><Bell size={13} /> Remind</button>
                    ) : (
                      <button className="flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-colors"><Eye size={13} /> View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {hoveredUnit && (
        <div className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2 text-xs text-white shadow-xl" style={{ left: hoveredUnit.x, top: hoveredUnit.y - 4 }}>
          <p className="font-semibold">{hoveredUnit.unit.label} | {hoveredUnit.unit.sizeSqYards} sq yards</p>
          <p className="text-textgray">Buyer: {hoveredUnit.unit.buyerName || '—'}</p>
          <p className="text-textgray">Status: <span className="capitalize">{hoveredUnit.unit.status}</span></p>
        </div>
      )}

      <SlideOver open={!!selectedUnit} onClose={() => setSelectedUnit(null)} title={selectedUnit?.label}>
        {selectedUnit && <UnitDetail unit={selectedUnit} onViewProfile={() => { setSelectedUnit(null); }} />}
      </SlideOver>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function UnitDetail({ unit, onViewProfile }: { unit: Unit; onViewProfile: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-gold-500/15"><Grid3x3 size={24} className="text-gold-500" /></div>
        <div><p className="text-lg font-bold text-white">{unit.label}</p><p className="text-xs text-textgray">{unit.sizeSqYards} sq yards ({unit.sizeSqft} sqft)</p></div>
        <div className="ml-auto"><StatusBadge status={unit.status} /></div>
      </div>
      {unit.status !== 'available' && unit.status !== 'reserved' ? (
        <>
          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Buyer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textgray">Name</span><span className="text-white">{unit.buyerName}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Phone</span><span className="text-white">{unit.buyerPhone}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Purchase Date</span><span className="text-white">{unit.purchaseDate}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Purchase Price</span><span className="text-white">{formatINRFull(unit.purchasePrice || 0)}</span></div>
            </div>
          </div>
          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Lease Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textgray">Lease Start</span><span className="text-white">{unit.leaseStart}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Lease End</span><span className="text-white">{unit.leaseEnd}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Monthly Return</span><span className="font-semibold text-gold-500">{formatINRFull(unit.monthlyReturn || 0)}</span></div>
            </div>
          </div>
          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Last Payment</h3>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-white">{unit.lastPaymentDate}</p><p className="text-xs text-textgray">Payment status</p></div>
              {unit.lastPaymentStatus && <StatusBadge status={unit.lastPaymentStatus} />}
            </div>
          </div>
          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Documents</h3>
            <div className="flex gap-3"><DocBadge label="Sale Deed" uploaded={unit.saleDeedUploaded} /><DocBadge label="KYC" uploaded={unit.kycUploaded} /></div>
          </div>
          <button className="w-full rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400" onClick={onViewProfile}>View Full Profile</button>
        </>
      ) : (
        <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4 text-center">
          <p className="text-sm text-textgray">{unit.status === 'reserved' ? 'This unit is reserved — deposit received, sale in progress' : 'This unit is available for sale'}</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-textgray">Unit price</span><span className="text-white">{formatINRFull(PROJECT.unitPrice)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-textgray">Monthly payout if leased</span><span className="text-white">{formatINRFull(PROJECT.monthlyReturn)}</span></div>
          </div>
          {unit.status !== 'reserved' && <button className="mt-4 w-full rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">Mark as Sold</button>}
        </div>
      )}
    </div>
  );
}

function DocBadge({ label, uploaded }: { label: string; uploaded?: boolean }) {
  return <span className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs ${uploaded ? 'bg-teal-500/15 text-teal-500' : 'bg-status-warning/15 text-status-warning'}`}>{label} {uploaded ? '✓' : 'Pending'}</span>;
}
