import React, { useState, useEffect } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import {
  RotateCw, Trash2, Undo2, Redo2, StickyNote, Eye, EyeOff, ChevronDown, Check
} from 'lucide-react';
import { TINKERCAD_WIRE_COLORS, TINKERCAD_WIRE_TYPES } from '../../types/wireConstants';

export const TinkercadActionToolbar: React.FC = () => {
  const {
    selectedComponentId,
    selectedWireId,
    removeComponent,
    removeWire,
    updateWireColor,
    rotateComponent,
    selectedWireColor,
    setSelectedWireColor,
    selectedWireType,
    setSelectedWireType,
    notesVisible,
    toggleNotesVisible,
    undo,
    redo,
    historyStack,
    futureStack,
  } = useCircuitStore();

  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);

  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const hasSelection = Boolean(selectedComponentId || selectedWireId);
  const canUndo = historyStack.length > 0;
  const canRedo = futureStack.length > 0;

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setIsColorMenuOpen(false);
        setIsTypeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard Shortcuts: 'Ctrl+Z' for undo, 'Ctrl+Y'/'Ctrl+Shift+Z' for redo, 'R' to rotate, 'Delete'/'Backspace' to delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 'r' || e.key === 'R') {
        if (selectedComponentId) rotateComponent(selectedComponentId);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedComponentId) removeComponent(selectedComponentId);
        if (selectedWireId) removeWire(selectedWireId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentId, selectedWireId, rotateComponent, removeComponent, removeWire, undo, redo]);

  const currentColor = TINKERCAD_WIRE_COLORS.find(c => c.hex.toLowerCase() === selectedWireColor.toLowerCase()) || TINKERCAD_WIRE_COLORS[0];
  const currentType = TINKERCAD_WIRE_TYPES.find(t => t.id === selectedWireType) || TINKERCAD_WIRE_TYPES[0];

  const handleDelete = () => {
    if (selectedComponentId) removeComponent(selectedComponentId);
    if (selectedWireId) removeWire(selectedWireId);
  };

  return (
    <div
      ref={toolbarRef}
      className="h-10 bg-[#E8ECEF] border-b border-[#CFD4D9] px-4 flex items-center justify-between text-[#333333] font-sans text-xs select-none z-30 shrink-0 shadow-inner relative"
    >
      {/* Left Action Buttons & Wire Styling (Tinkercad Standard Layout) */}
      <div className="flex items-center space-x-2">
        {/* Rotate Button */}
        <button
          onClick={() => selectedComponentId && rotateComponent(selectedComponentId)}
          disabled={!selectedComponentId}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
            selectedComponentId
              ? 'hover:bg-[#D5DCE1] active:bg-[#C2CBD1] text-[#222222] cursor-pointer'
              : 'opacity-40 cursor-not-allowed text-[#888888]'
          }`}
          title="Rotate Selected Component (R)"
        >
          <RotateCw className="w-4 h-4 text-[#444444]" />
          <span className="font-medium hidden sm:inline">Rotate</span>
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={!hasSelection}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
            hasSelection
              ? 'hover:bg-rose-100 hover:text-rose-700 active:bg-rose-200 text-[#222222] cursor-pointer'
              : 'opacity-40 cursor-not-allowed text-[#888888]'
          }`}
          title="Delete Selected Item (Delete)"
        >
          <Trash2 className="w-4 h-4 text-[#444444]" />
          <span className="font-medium hidden sm:inline">Delete</span>
        </button>

        <div className="h-4 w-[1px] bg-[#C5CBD0] mx-0.5" />

        {/* Undo Button */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-1.5 rounded transition-colors ${
            canUndo
              ? 'hover:bg-[#D5DCE1] active:bg-[#C2CBD1] text-[#222222] cursor-pointer'
              : 'opacity-40 cursor-not-allowed text-[#888888]'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        {/* Redo Button */}
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-1.5 rounded transition-colors ${
            canRedo
              ? 'hover:bg-[#D5DCE1] active:bg-[#C2CBD1] text-[#222222] cursor-pointer'
              : 'opacity-40 cursor-not-allowed text-[#888888]'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-[#C5CBD0] mx-0.5" />

        {/* Annotation Notes */}
        <button
          className="p-1.5 rounded hover:bg-[#D5DCE1] active:bg-[#C2CBD1] text-[#444444]"
          title="Notes & Annotations"
        >
          <StickyNote className="w-4 h-4 text-amber-600" />
        </button>

        {/* Toggle Notes Visibility */}
        <button
          onClick={toggleNotesVisible}
          className="p-1.5 rounded hover:bg-[#D5DCE1] active:bg-[#C2CBD1] text-[#444444]"
          title={notesVisible ? 'Hide Notes' : 'Show Notes'}
        >
          {notesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-[#888888]" />}
        </button>

        <div className="h-4 w-[1px] bg-[#C5CBD0] mx-1" />

        {/* Wire Color Dropdown (Positioned safely on toolbar left) */}
        <div className="relative">
          <button
            onClick={() => {
              setIsColorMenuOpen(!isColorMenuOpen);
              setIsTypeMenuOpen(false);
            }}
            className="flex items-center space-x-2 bg-white border border-[#BDC5CC] hover:border-[#8E99A3] px-2.5 py-1 rounded shadow-sm transition-colors cursor-pointer"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner"
              style={{ backgroundColor: currentColor.hex }}
            />
            <span className="font-semibold text-[#222222] min-w-[50px] text-left">
              {currentColor.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
          </button>

          {isColorMenuOpen && (
            <div className="absolute left-0 mt-1 w-48 bg-white border border-[#BDC5CC] rounded shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] font-bold text-[#888888] uppercase tracking-wider border-b border-[#EEEEEE]">
                Wire Color
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {TINKERCAD_WIRE_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setSelectedWireColor(color.hex);
                      if (selectedWireId) updateWireColor(selectedWireId, color.hex);
                      setIsColorMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#F0F4F8] transition-colors text-left cursor-pointer ${
                      selectedWireColor.toLowerCase() === color.hex.toLowerCase() ? 'bg-[#E3F2FD] font-bold' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs text-[#333333]">{color.name}</span>
                    </div>
                    {selectedWireColor.toLowerCase() === color.hex.toLowerCase() && (
                      <Check className="w-3.5 h-3.5 text-[#1976D2]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wire Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsTypeMenuOpen(!isTypeMenuOpen);
              setIsColorMenuOpen(false);
            }}
            className="flex items-center space-x-2 bg-white border border-[#BDC5CC] hover:border-[#8E99A3] px-2.5 py-1 rounded shadow-sm transition-colors cursor-pointer"
          >
            <span className="font-semibold text-[#222222]">{currentType.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
          </button>

          {isTypeMenuOpen && (
            <div className="absolute left-0 mt-1 w-44 bg-white border border-[#BDC5CC] rounded shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] font-bold text-[#888888] uppercase tracking-wider border-b border-[#EEEEEE]">
                Wire Type
              </div>
              {TINKERCAD_WIRE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedWireType(type.id);
                    setIsTypeMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 hover:bg-[#F0F4F8] transition-colors text-left cursor-pointer ${
                    selectedWireType === type.id ? 'bg-[#E3F2FD] font-bold' : ''
                  }`}
                >
                  <span className="text-xs text-[#333333]">{type.name}</span>
                  {selectedWireType === type.id && (
                    <Check className="w-3.5 h-3.5 text-[#1976D2]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Area Spacer */}
      <div />
    </div>
  );
};
