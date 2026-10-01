import { useState } from 'react';
import { Bell, Menu, ChevronDown, Plus, Check, X } from 'lucide-react';
import { projects, type ProjectData } from '@/data/mockData';

type TopBarProps = {
  onMenuClick: () => void;
  activeProject: ProjectData;
  onProjectChange: (project: ProjectData) => void;
};

export default function TopBar({ onMenuClick, activeProject, onProjectChange }: TopBarProps) {
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '', location: '', developer: '', totalArea: '', unitSize: '', unitPrice: '', monthlyReturn: '', startDate: '',
  });

  const autoCalcUnits = newProject.totalArea && newProject.unitSize
    ? Math.floor(parseFloat(newProject.totalArea) / parseFloat(newProject.unitSize))
    : 0;

  const handleCreateProject = () => {
    const project: ProjectData = {
      id: `P${Date.now()}`,
      name: newProject.name || 'New Project',
      location: newProject.location || '—',
      developer: newProject.developer || '—',
      totalAreaSqYards: parseFloat(newProject.totalArea) || 0,
      unitSizeSqYards: parseFloat(newProject.unitSize) || 0,
      unitPrice: parseFloat(newProject.unitPrice) || 0,
      monthlyReturn: parseFloat(newProject.monthlyReturn) || 0,
      totalUnits: autoCalcUnits,
      startDate: newProject.startDate || '—',
    };
    onProjectChange(project);
    setShowAddModal(false);
    setProjectDropdownOpen(false);
    setNewProject({ name: '', location: '', developer: '', totalArea: '', unitSize: '', unitPrice: '', monthlyReturn: '', startDate: '' });
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="text-muted hover:text-heading transition-colors lg:hidden">
            <Menu size={22} />
          </button>
          <div>
            <h1 className="text-[15px] font-semibold text-heading">Good morning, Manasa</h1>
            <p className="text-xs text-muted">{activeProject.name} — {activeProject.location}</p>
          </div>
          {/* Project Switcher */}
          <div className="relative ml-2 hidden sm:block">
            <button
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="flex items-center gap-2 rounded-[6px] border border-border px-3 py-1.5 text-xs font-medium text-body transition-colors hover:bg-surface"
            >
              {activeProject.name}
              <ChevronDown size={13} className="text-muted" />
            </button>
            {projectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 z-30 w-64 rounded-[6px] border border-border bg-white py-1.5 shadow-card">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { onProjectChange(p); setProjectDropdownOpen(false); }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-body transition-colors hover:bg-surface"
                  >
                    {p.name}
                    {p.id === activeProject.id && <Check size={14} className="text-primary" />}
                  </button>
                ))}
                <div className="my-1 border-t border-border" />
                <button
                  onClick={() => { setShowAddModal(true); setProjectDropdownOpen(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-primary transition-colors hover:bg-surface"
                >
                  <Plus size={13} /> Add New Project
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative text-muted hover:text-heading transition-colors">
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-error text-[9px] font-bold text-white">3</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary-text">MP</div>
        </div>
      </header>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-[10px] border border-border bg-white p-6 shadow-card-hover">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-heading">Add New Project</h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-heading"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <Field label="Project Name" value={newProject.name} onChange={(v) => setNewProject({ ...newProject, name: v })} />
              <Field label="Location" value={newProject.location} onChange={(v) => setNewProject({ ...newProject, location: v })} />
              <Field label="Developer Name" value={newProject.developer} onChange={(v) => setNewProject({ ...newProject, developer: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Total Area (sq yards)" value={newProject.totalArea} onChange={(v) => setNewProject({ ...newProject, totalArea: v })} type="number" />
                <Field label="Unit Size (sq yards)" value={newProject.unitSize} onChange={(v) => setNewProject({ ...newProject, unitSize: v })} type="number" />
              </div>
              {autoCalcUnits > 0 && (
                <p className="text-xs text-primary">Auto-calculated units: {autoCalcUnits}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Unit Price (₹)" value={newProject.unitPrice} onChange={(v) => setNewProject({ ...newProject, unitPrice: v })} type="number" />
                <Field label="Monthly Return (₹)" value={newProject.monthlyReturn} onChange={(v) => setNewProject({ ...newProject, monthlyReturn: v })} type="number" />
              </div>
              <Field label="Project Start Date" value={newProject.startDate} onChange={(v) => setNewProject({ ...newProject, startDate: v })} />
            </div>
            <button
              onClick={handleCreateProject}
              className="mt-5 w-full rounded-[7px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Create Project
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[6px] border border-border-input bg-surface px-3 py-2 text-sm text-heading placeholder-subtle focus:border-primary focus:outline-none"
      />
    </div>
  );
}
