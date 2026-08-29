import React, { useState } from 'react';
import { TinkercadNavbar } from './components/workbench/TinkercadNavbar';
import { TinkercadActionToolbar } from './components/workbench/TinkercadActionToolbar';
import { TinkercadComponentDrawer } from './components/workbench/TinkercadComponentDrawer';
import { TinkercadCircuitCanvas } from './components/workbench/TinkercadCircuitCanvas';
import { TinkercadCodePanel } from './components/editor/TinkercadCodePanel';
import { TinkercadBOMModal } from './components/dashboard/TinkercadBOMModal';
import { ElectricalValidationPanel } from './components/inspector/ElectricalValidationPanel';
import { TinkercadInspectorModal } from './components/inspector/TinkercadInspectorModal';
import { BreadboardBuildGuideModal } from './components/inspector/BreadboardBuildGuideModal';
import { ProjectDashboardModal } from './components/dashboard/ProjectDashboardModal';
import { UserAuthModal } from './components/auth/UserAuthModal';

export const App: React.FC = () => {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isBOMOpen, setIsBOMOpen] = useState(false);
  const [isBuildGuideOpen, setIsBuildGuideOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#E6E9ED] text-[#333333] overflow-hidden font-sans select-none flex flex-col">
      {/* 1. Tinkercad Top Action Navbar */}
      <TinkercadNavbar
        onToggleCode={() => setIsCodeOpen(!isCodeOpen)}
        isCodeOpen={isCodeOpen}
        onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
        onOpenBOM={() => setIsBOMOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onToggleValidation={() => setIsValidationOpen(!isValidationOpen)}
      />

      {/* 2. Tinkercad Action Secondary Toolbar (Rotate, Delete, Undo/Redo, Wire Color, Wire Type) */}
      <TinkercadActionToolbar />

      {/* 3. Main Tinkercad Workspace Layout */}
      <div className="flex-1 flex w-full h-full min-w-0 min-h-0 overflow-hidden relative">
        {/* Photorealistic Interactive Canvas Viewport */}
        <div className="flex-1 flex relative min-w-0 min-h-0 h-full overflow-hidden">
          <TinkercadCircuitCanvas />
          <TinkercadInspectorModal />
          <ElectricalValidationPanel
            isOpen={isValidationOpen}
            onToggle={() => setIsValidationOpen(!isValidationOpen)}
          />
        </div>

        {/* Slide-out Tinkercad Code Panel */}
        <TinkercadCodePanel isOpen={isCodeOpen} onClose={() => setIsCodeOpen(false)} />

        {/* Tinkercad Right Sidebar Component Drawer (1:1 Tinkercad Layout) */}
        <TinkercadComponentDrawer isOpen={isDrawerOpen} />
      </div>

      {/* Tinkercad Component List (BOM) Modal */}
      {isBOMOpen && (
        <TinkercadBOMModal onClose={() => setIsBOMOpen(false)} />
      )}

      {/* Hardware Build Guide Modal */}
      {isBuildGuideOpen && (
        <BreadboardBuildGuideModal onClose={() => setIsBuildGuideOpen(false)} />
      )}

      {/* Projects Dashboard Modal */}
      {isDashboardOpen && (
        <ProjectDashboardModal onClose={() => setIsDashboardOpen(false)} />
      )}

      {/* User Authentication Modal */}
      {isAuthOpen && (
        <UserAuthModal onClose={() => setIsAuthOpen(false)} />
      )}
    </div>
  );
};

export default App;
