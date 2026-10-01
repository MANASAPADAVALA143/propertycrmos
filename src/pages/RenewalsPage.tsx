import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { renewalInfo, formatINRFull } from '@/data/mockData';

export default function RenewalsPage() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Lease Renewals</h1>
        <p className="mt-1 text-sm text-muted">Upcoming lease renewal and escalation schedule</p>
      </div>

      {/* Countdown Card */}
      <div className="rounded-[6px] border border-primary/30 bg-gradient-to-br from-navy-800 to-navy-900 p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Clock size={24} />
          <span className="text-sm font-medium">First escalation in</span>
        </div>
        <p className="mt-3 text-4xl font-bold text-primary">{renewalInfo.countdownDays} days</p>
        <p className="mt-2 text-sm text-heading">{renewalInfo.firstEscalation} — {renewalInfo.firstEscalationAmount}</p>
        <p className="mt-1 text-xs text-muted">5% annual escalation applies to all 28 early contracts on their lease anniversary</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[6px] border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span className="text-sm text-muted">Earliest Renewal</span>
          </div>
          <p className="mt-2 text-sm font-medium text-heading">{renewalInfo.earliestRenewal}</p>
          <p className="mt-1 text-xs text-muted">No renewals due within 12 months</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <span className="text-sm text-muted">Post-Escalation Liability</span>
          </div>
          <p className="mt-2 text-lg font-bold text-primary">{formatINRFull(28 * 28350)}</p>
          <p className="mt-1 text-xs text-muted">28 units × ₹28,350 (after 5% increase)</p>
        </div>
        <div className="rounded-[6px] border border-border bg-white p-5">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            <span className="text-sm text-muted">Annual Escalation Impact</span>
          </div>
          <p className="mt-2 text-lg font-bold text-[#B45309]">+{formatINRFull(28 * 1350)}/month</p>
          <p className="mt-1 text-xs text-muted">₹1,350 per unit × 28 units = ₹37,800/month</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="rounded-[6px] border border-border bg-white p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#CCFBF1]">
          <Calendar size={32} className="text-[#0F766E]" />
        </div>
        <p className="mt-6 text-lg font-semibold text-heading">{renewalInfo.emptyMessage}</p>
        <p className="mt-2 text-sm text-muted">Earliest renewal: {renewalInfo.earliestRenewal}</p>
        <p className="mt-1 text-sm text-muted">First escalation for all contracts: {renewalInfo.firstEscalation} — {renewalInfo.firstEscalationAmount}</p>
      </div>
    </div>
  );
}
