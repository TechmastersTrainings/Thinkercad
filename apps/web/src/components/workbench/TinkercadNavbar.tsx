import React, { useState, useEffect } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import {
  Code2, Play, Square, Download, Share2, FileText, Cpu, ChevronLeft,
  Pencil, Check, Sparkles, User, ShieldCheck, ShieldAlert, Layers, LayoutGrid
} from 'lucide-react';

interface NavbarProps {
  onToggleCode: () => void;
  isCodeOpen: boolean;
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
  onOpenBOM: () => void;
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  onToggleValidation?: () => void;
}

export const TinkercadNavbar: React.FC<NavbarProps> = ({
  onToggleCode,
  isCodeOpen,
  onToggleDrawer,
  isDrawerOpen,
  onOpenBOM,
  onOpenDashboard,
  onOpenAuth,
  onToggleValidation,
}) => {
  const [projectName, setProjectName] = useState('Glorious Snag-Snapper');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [simSeconds, setSimSeconds] = useState(0);

  const { validationErrors } = useCircuitStore();
  const { status, start, stop } = useSimulationStore();

  // Timer counter when simulation status is RUNNING
  useEffect(() => {
    let interval: any = null;
    if (status === 'RUNNING') {
      interval = setInterval(() => {
        setSimSeconds((prev) => prev + 0.1);
      }, 100);
    } else {
      setSimSeconds(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatSimTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = (secs % 60).toFixed(1);
    const paddedMins = mins.toString().padStart(2, '0');
    const paddedSecs = parseFloat(s) < 10 ? `0${s}` : s;
    return `${paddedMins}:${paddedSecs}`;
  };

  const handleSave = () => {
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  return (
    <header className="h-12 bg-[#22252A] text-white px-3 flex items-center justify-between font-sans text-xs select-none z-30 shrink-0 border-b border-[#181A1D] shadow-md">
      {/* Left: Tinkercad Logo, Dashboard Link & Project Title */}
      <div className="flex items-center space-x-2.5">
        {/* Back to Dashboard Button */}
        <button
          onClick={onOpenDashboard}
          className="p-1 rounded hover:bg-[#34383F] text-[#CCCCCC] hover:text-white transition-colors"
          title="Back to Dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Official Tinkercad 3D Block Logo Badge */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={onOpenDashboard}>
          <div className="w-7 h-7 rounded bg-gradient-to-br from-[#00C853] via-[#00A859] to-[#007E33] flex items-center justify-center font-black text-white text-xs shadow-md">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex items-baseline space-x-1 font-black text-sm tracking-wide">
            <span className="text-white font-extrabold tracking-tight">TINKERCAD</span>
            <span className="text-[#00E676] text-[10px] font-bold px-1 py-0.5 bg-[#00C853]/20 rounded border border-[#00C853]/40">CIRCUITS</span>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-[#3A3E45] mx-1" />

        {/* Editable Project Title */}
        <div className="flex items-center space-x-1.5 group">
          {isEditingTitle ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              autoFocus
              className="px-2 py-0.5 bg-[#181A1D] border border-[#00C853] rounded text-white font-semibold text-xs focus:outline-none w-48"
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="flex items-center space-x-1.5 px-2 py-1 rounded hover:bg-[#34383F] text-[#E0E0E0] font-semibold transition-colors"
              title="Click to edit project name"
            >
              <span className="truncate max-w-[160px] sm:max-w-[200px]">{projectName}</span>
              <Pencil className="w-3 h-3 text-[#888888] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          <button
            onClick={handleSave}
            className="p-1 rounded hover:bg-[#34383F] text-[#CCCCCC] transition-colors"
            title="Save Project"
          >
            {isSavedFeedback ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Middle: Schematic View, BOM, Code Toggle & Simulation Button */}
      <div className="flex items-center space-x-2">
        {/* Schematic View Mode Toggle */}
        <button
          className="p-1.5 rounded hover:bg-[#34383F] text-[#CCCCCC] hover:text-white transition-colors"
          title="Schematic View"
        >
          <Layers className="w-4 h-4 text-[#AAAAAA]" />
        </button>

        {/* Component List / BOM Toggle */}
        <button
          onClick={onOpenBOM}
          className="p-1.5 rounded hover:bg-[#34383F] text-[#CCCCCC] hover:text-white transition-colors"
          title="Component List (BOM)"
        >
          <FileText className="w-4 h-4 text-[#AAAAAA]" />
        </button>

        <div className="h-5 w-[1px] bg-[#3A3E45] mx-1" />

        {/* Code Panel Toggle Button (Tinkercad Green when active) */}
        <button
          onClick={onToggleCode}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all shadow-sm ${
            isCodeOpen
              ? 'bg-[#00C853] text-white hover:bg-[#00E676]'
              : 'bg-[#34383F] text-[#E0E0E0] hover:bg-[#424750]'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Code</span>
        </button>

        {/* Start / Stop Simulation Button */}
        {status === 'RUNNING' ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={stop}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-[#DC2626] text-white hover:bg-[#EF4444] font-bold shadow-md transition-all active:scale-95"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>Stop Simulation</span>
            </button>
            <span className="font-mono text-xs text-amber-300 font-bold bg-[#181A1D] px-2 py-1 rounded border border-[#3A3E45]">
              {formatSimTime(simSeconds)}
            </span>
          </div>
        ) : (
          <button
            onClick={start}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-[#00A859] text-white hover:bg-[#00C853] font-bold shadow-md transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Simulation</span>
          </button>
        )}
      </div>

      {/* Right: Export, Share, Components Toggle, Validation Diagnostics & Profile */}
      <div className="flex items-center space-x-2">
        {/* Export Button */}
        <button
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#34383F] hover:bg-[#424750] text-[#E0E0E0] font-medium transition-colors"
          title="Export Circuit / BOM"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Export</span>
        </button>

        {/* Share Button */}
        <button
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#34383F] hover:bg-[#424750] text-[#E0E0E0] font-medium transition-colors"
          title="Share Project"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Send to</span>
        </button>

        <div className="h-5 w-[1px] bg-[#3A3E45] mx-0.5" />

        {/* Toggle Component Drawer Button (Tinkercad 9-dot grid icon) */}
        <button
          onClick={onToggleDrawer}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded font-bold transition-all shadow-sm ${
            isDrawerOpen
              ? 'bg-[#00C853] text-white'
              : 'bg-[#34383F] text-[#E0E0E0] hover:bg-[#424750]'
          }`}
          title="Toggle Components Panel"
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="hidden sm:inline">Components</span>
        </button>

        {/* Diagnostic Status Indicator Button */}
        <button
          onClick={onToggleValidation}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] font-semibold border transition-all hover:scale-105 ${
            validationErrors.length === 0
              ? 'bg-[#00A859]/20 text-[#00E676] border-[#00A859]/40 hover:bg-[#00A859]/30'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30 animate-pulse'
          }`}
          title={validationErrors.length === 0 ? 'Circuit Verified (Click to open Inspector)' : `${validationErrors.length} Circuit Issues (Click to open Inspector)`}
        >
          {validationErrors.length === 0 ? (
            <ShieldCheck className="w-3.5 h-3.5" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5" />
          )}
        </button>

        {/* User Account / Profile Button */}
        <button
          onClick={onOpenAuth}
          className="w-7 h-7 rounded-full bg-[#34383F] hover:bg-[#424750] border border-[#4A4F58] flex items-center justify-center text-[#E0E0E0] transition-colors"
          title="User Account"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
