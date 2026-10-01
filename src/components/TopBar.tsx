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
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-navy-600 bg-navy-700/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="text-textgray hover:text-white lg:hidden">
            <Menu size={22} />
          </button>
          <div>
            <h1 className="text-white font-semibold text-base sm:text-lg">Good morning, Skyline</h1>
            <p className="text-textgray text-xs">{activeProject.name} — {activeProject.location}</p>
          </div>
          {/* Project Switcher */}
          <div className="relative ml-2 hidden sm:block">
            <button
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="flex items-center gap-2 rounded-[6px] border border-navy-600 bg-navy-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-navy-600/30"
            >
              {activeProject.name}
              <ChevronDown size={14} className="text-textgray" />
            </button>
            {projectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 z-30 w-64 rounded-[6px] border border-navy-600 bg-navy-800 py-2 shadow-xl">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { onProjectChange(p); setProjectDropdownOpen(false); }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-textgray transition-colors hover:bg-navy-600/30"
                  >
                    {p.name}
                    {p.id === activeProject.id && <Check size={14} className="text-gold-500" />}
                  </button>
                ))}
                <div className="my-1 border-t border-navy-600" />
                <button
                  onClick={() => { setShowAddModal(true); setProjectDropdownOpen(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gold-500 transition-colors hover:bg-navy-600/30"
                >
                  <Plus size={14} /> Add New Project
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative text-textgray hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-error text-[9px] font-bold text-white">3</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-gold-500 font-bold text-navy-900 text-sm">SV</div>
        </div>
      </header>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[6px] border border-navy-600 bg-navy-800 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Add New Project</h2>
              <button onClick={() => setShowAddModal(false)} className="text-textgray hover:text-white"><X size={20} /></button>
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
                <p className="text-xs text-teal-500">Auto-calculated units: {autoCalcUnits}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Unit Price (₹)" value={newProject.unitPrice} onChange={(v) => setNewProject({ ...newProject, unitPrice: v })} type="number" />
                <Field label="Monthly Return (₹)" value={newProject.monthlyReturn} onChange={(v) => setNewProject({ ...newProject, monthlyReturn: v })} type="number" />
              </div>
              <Field label="Project Start Date" value={newProject.startDate} onChange={(v) => setNewProject({ ...newProject, startDate: v })} />
            </div>
            <button
              onClick={handleCreateProject}
              className="mt-5 w-full rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
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
      <label className="mb-1 block text-xs text-textgray">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-white placeholder-textgray focus:border-gold-500 focus:outline-none"
      />
    </div>
  );
}
