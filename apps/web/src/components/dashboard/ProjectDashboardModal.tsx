import React, { useState } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { FolderPlus, FolderOpen, Save, Trash2, Cpu, Download, Upload, Share2, Sparkles } from 'lucide-react';

interface ProjectItem {
  id: string;
  name: string;
  boardType: string;
  lastModified: string;
  componentCount: number;
}

export const ProjectDashboardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { components, wires, clearCircuit } = useCircuitStore();

  const [projects, setProjects] = useState<ProjectItem[]>([
    { id: 'proj_1', name: 'Smart IoT Home Security', boardType: 'ESP32 DevKit V1', lastModified: '2026-08-13', componentCount: 5 },
    { id: 'proj_2', name: 'Ultrasonic Distance Meter', boardType: 'Arduino UNO R3', lastModified: '2026-08-12', componentCount: 3 },
    { id: 'proj_3', name: 'Robot Arm Servo Control', boardType: 'STM32 BluePill', lastModified: '2026-08-10', componentCount: 4 },
  ]);

  const [newProjectName, setNewProjectName] = useState('');

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    clearCircuit();
    const newProj: ProjectItem = {
      id: `proj_${Date.now()}`,
      name: newProjectName.trim(),
      boardType: 'Arduino UNO R3',
      lastModified: new Date().toISOString().split('T')[0],
      componentCount: 0,
    };
    setProjects([newProj, ...projects]);
    setNewProjectName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-6 font-sans">
      <div className="bg-surface border border-slate-800 rounded-2xl w-[780px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-panel border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 flex items-center justify-center border border-accent-cyan/40 shadow-lg shadow-accent-cyan/10">
              <FolderOpen className="w-5 h-5 text-accent-cyan" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 tracking-wide font-mono">
                PROJECT DASHBOARD & SAVED WORKSPACES
              </h2>
              <p className="text-xs text-slate-400">
                Manage, load, save, and share your virtual electronic circuit projects
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-100 font-bold">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Create New Project Bar */}
          <form onSubmit={handleCreateNewProject} className="flex items-center space-x-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
            <FolderPlus className="w-5 h-5 text-accent-cyan shrink-0" />
            <input
              type="text"
              placeholder="Enter new project title..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-accent-cyan"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent-cyan text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition-all shrink-0"
            >
              Create Project
            </button>
          </form>

          {/* Saved Projects List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Saved Projects</span>
            </h3>

            <div className="space-y-2">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-panel border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-accent-cyan">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-accent-cyan transition-colors">
                        {proj.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="font-mono">{proj.boardType}</span>
                        <span>•</span>
                        <span>{proj.componentCount} Components</span>
                        <span>•</span>
                        <span>Modified {proj.lastModified}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onClose()}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-accent-cyan hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-lg transition-all"
                    >
                      Open Project
                    </button>
                    <button
                      onClick={() => setProjects(projects.filter((p) => p.id !== proj.id))}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-panel border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>Project Sharing enabled</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ components, wires }));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", "circuit_project.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button onClick={onClose} className="px-4 py-1.5 bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
