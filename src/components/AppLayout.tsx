import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { projects, type ProjectData } from '@/data/mockData';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectData>(projects[0]);

  return (
    <div className="min-h-screen bg-navy-700">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-[220px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} activeProject={activeProject} onProjectChange={setActiveProject} />
        <main className="animate-fadeIn p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
