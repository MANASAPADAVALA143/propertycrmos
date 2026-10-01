import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { renewalInfo, formatINRFull } from '@/data/mockData';

export default function RenewalsPage() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Lease Renewals</h1>
        <p className="mt-1 text-sm text-textgray">Upcoming lease renewal and escalation schedule</p>
      </div>

      {/* Countdown Card */}
      <div className="rounded-[6px] border border-gold-500/30 bg-gradient-to-br from-navy-800 to-navy-900 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-gold-500">
          <Clock size={24} />
          <span className="text-sm font-medium">First escalation in</span>
        </div>
        <p className="mt-3 text-4xl font-bold text-gold-500">{renewalInfo.countdownDays} days</p>
        <p className="mt-2 text-sm text-white">{renewalInfo.firstEscalation} — {renewalInfo.firstEscalationAmount}</p>
        <p className="mt-1 text-xs text-textgray">5% annual escalation applies to all 28 early contracts on their lease anniversary</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gold-500" />
            <span className="text-sm text-textgray">Earliest Renewal</span>
          </div>
          <p className="mt-2 text-sm font-medium text-white">{renewalInfo.earliestRenewal}</p>
          <p className="mt-1 text-xs text-textgray">No renewals due within 12 months</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-gold-500" />
            <span className="text-sm text-textgray">Post-Escalation Liability</span>
          </div>
          <p className="mt-2 text-lg font-bold text-gold-500">{formatINRFull(28 * 28350)}</p>
          <p className="mt-1 text-xs text-textgray">28 units × ₹28,350 (after 5% increase)</p>
        </div>
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-5">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gold-500" />
            <span className="text-sm text-textgray">Annual Escalation Impact</span>
          </div>
          <p className="mt-2 text-lg font-bold text-status-warning">+{formatINRFull(28 * 1350)}/month</p>
          <p className="mt-1 text-xs text-textgray">₹1,350 per unit × 28 units = ₹37,800/month</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15">
          <Calendar size={32} className="text-teal-500" />
        </div>
        <p className="mt-6 text-lg font-semibold text-white">{renewalInfo.emptyMessage}</p>
        <p className="mt-2 text-sm text-textgray">Earliest renewal: {renewalInfo.earliestRenewal}</p>
        <p className="mt-1 text-sm text-textgray">First escalation for all contracts: {renewalInfo.firstEscalation} — {renewalInfo.firstEscalationAmount}</p>
      </div>
    </div>
  );
}
