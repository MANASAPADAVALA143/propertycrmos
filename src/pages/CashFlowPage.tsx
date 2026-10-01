import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { cashFlowData, formatINRFull } from '@/data/mockData';

export default function CashFlowPage() {
  const totalInflow = cashFlowData.reduce((s, r) => s + r.inflow, 0);
  const totalOutflow = cashFlowData.reduce((s, r) => s + r.outflow, 0);
  const totalNet = totalInflow - totalOutflow;

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Cash Flow</h1>
        <p className="mt-1 text-sm text-muted">6-month inflow vs outflow overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[6px] border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Total Inflow (6 mo)</span>
            <TrendingUp size={18} className="text-[#0F766E]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#0F766E]">{formatINRFull(totalInflow)}</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Total Outflow (6 mo)</span>
            <TrendingDown size={18} className="text-[#DC2626]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#DC2626]">{formatINRFull(totalOutflow)}</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Net Cash Flow</span>
            <ArrowRight size={18} className="text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-primary">{formatINRFull(totalNet)}</p>
        </div>
      </div>

      <div className="rounded-[6px] border border-border bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-heading">Monthly Cash Flow Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} formatter={(v) => <span style={{ color: '#94A3B8' }}>{v}</span>} />
            <Bar dataKey="inflow" name="Inflow" fill="#1D9E75" radius={[3, 3, 0, 0]} />
            <Bar dataKey="outflow" name="Outflow" fill="#E24B4A" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-hidden rounded-[6px] border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">Month</th>
                <th className="px-4 py-3 font-medium">Inflow</th>
                <th className="px-4 py-3 font-medium">Outflow</th>
                <th className="px-4 py-3 font-medium">Net</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-4 py-3.5 text-heading">{row.month}</td>
                  <td className="px-4 py-3.5 text-[#0F766E]">{formatINRFull(row.inflow)}</td>
                  <td className="px-4 py-3.5 text-[#DC2626]">{formatINRFull(row.outflow)}</td>
                  <td className="px-4 py-3.5 font-semibold text-primary">{formatINRFull(row.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
