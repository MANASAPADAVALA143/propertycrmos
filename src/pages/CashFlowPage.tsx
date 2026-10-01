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
        <h1 className="text-2xl font-bold text-white">Cash Flow</h1>
        <p className="mt-1 text-sm text-textgray">6-month inflow vs outflow overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Total Inflow (6 mo)</span>
            <TrendingUp size={18} className="text-teal-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-teal-500">{formatINRFull(totalInflow)}</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Total Outflow (6 mo)</span>
            <TrendingDown size={18} className="text-status-error" />
          </div>
          <p className="mt-2 text-2xl font-bold text-status-error">{formatINRFull(totalOutflow)}</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-textgray">Net Cash Flow</span>
            <ArrowRight size={18} className="text-gold-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gold-500">{formatINRFull(totalNet)}</p>
        </div>
      </div>

      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Monthly Cash Flow Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cashFlowData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2F45" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#B0BEC5', fontSize: 12 }} axisLine={{ stroke: '#243B53' }} tickLine={false} />
            <YAxis tick={{ fill: '#B0BEC5', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0D1B2A', border: '1px solid #1A2F45', borderRadius: '6px', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#B0BEC5' }} formatter={(v) => <span style={{ color: '#B0BEC5' }}>{v}</span>} />
            <Bar dataKey="inflow" name="Inflow" fill="#1D9E75" radius={[3, 3, 0, 0]} />
            <Bar dataKey="outflow" name="Outflow" fill="#E24B4A" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-hidden rounded-[6px] border border-navy-600 bg-navy-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-600 text-left text-xs text-textgray">
                <th className="px-4 py-3 font-medium">Month</th>
                <th className="px-4 py-3 font-medium">Inflow</th>
                <th className="px-4 py-3 font-medium">Outflow</th>
                <th className="px-4 py-3 font-medium">Net</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((row, i) => (
                <tr key={i} className={`border-b border-navy-600/50 ${i % 2 === 0 ? 'bg-navy-800' : 'bg-navy-900/40'}`}>
                  <td className="px-4 py-3.5 text-white">{row.month}</td>
                  <td className="px-4 py-3.5 text-teal-500">{formatINRFull(row.inflow)}</td>
                  <td className="px-4 py-3.5 text-status-error">{formatINRFull(row.outflow)}</td>
                  <td className="px-4 py-3.5 font-semibold text-gold-500">{formatINRFull(row.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
