import { useState } from 'react';
import { Building2, User, Bell, Shield } from 'lucide-react';
import { PROJECT, CAM_OPERATOR, formatINRFull } from '@/data/mockData';
import { useToasts, default as Toast } from '@/components/Toast';

export default function SettingsPage() {
  const { toasts, showToast, dismissToast } = useToasts();

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Settings</h1>
        <p className="mt-1 text-sm text-muted">Project configuration and preferences</p>
      </div>

      {/* Project Settings */}
      <div className="rounded-[6px] border border-border bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-heading">Project Details</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SettingField label="Project Name" value={PROJECT.name} />
          <SettingField label="Location" value={PROJECT.location} />
          <SettingField label="Developer" value={PROJECT.developer} />
          <SettingField label="CAM Operator" value={CAM_OPERATOR} />
          <SettingField label="Total Area" value={`${PROJECT.totalAreaSqYards} sq yards`} />
          <SettingField label="Unit Size" value={`${PROJECT.unitSizeSqYards} sq yards`} />
          <SettingField label="Unit Price" value={formatINRFull(PROJECT.unitPrice)} />
          <SettingField label="Monthly Return" value={formatINRFull(PROJECT.monthlyReturn)} />
        </div>
        <button onClick={() => showToast('Settings saved')} className="mt-5 rounded-[6px] bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          Save Changes
        </button>
      </div>

      {/* Notification Settings */}
      <div className="rounded-[6px] border border-border bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Bell size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-heading">Notifications</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow label="Email alerts for overdue payments" defaultOn />
          <ToggleRow label="WhatsApp reminders to buyers" defaultOn />
          <ToggleRow label="Monthly payout summary email" defaultOn />
          <ToggleRow label="Lease renewal reminders (30 days before)" defaultOn />
          <ToggleRow label="IFRS 16 journal entry notifications" />
        </div>
      </div>

      {/* Security */}
      <div className="rounded-[6px] border border-border bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-heading">Security</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow label="Two-factor authentication" defaultOn />
          <ToggleRow label="Audit log for all changes" defaultOn />
          <ToggleRow label="Auto-logout after 30 minutes" />
        </div>
      </div>

      {toasts.length > 0 && <Toast toasts={toasts} onDismiss={dismissToast} />}
    </div>
  );
}

function SettingField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        type="text"
        defaultValue={value}
        readOnly
        className="w-full rounded-[6px] border border-border bg-surface px-3 py-2 text-sm text-heading focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function ToggleRow({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-slate-200'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
