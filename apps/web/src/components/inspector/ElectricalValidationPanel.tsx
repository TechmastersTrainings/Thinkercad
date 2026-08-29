import React, { useState } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { ShieldCheck, ShieldAlert, AlertTriangle, Info, CheckCircle2, X, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';

interface ElectricalValidationPanelProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const ElectricalValidationPanel: React.FC<ElectricalValidationPanelProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { validationErrors, runValidation } = useCircuitStore();

  const isExpanded = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggleOpen = onToggle || (() => setInternalIsOpen(!internalIsOpen));

  const hasErrors = validationErrors.length > 0;

  return (
    <div className="absolute bottom-4 left-4 z-30 font-sans text-xs select-none">
      {/* 1. Minimized Compact Floating Status Badge (Zero screen obstruction) */}
      {!isExpanded ? (
        <button
          onClick={toggleOpen}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-105 ${
            !hasErrors
              ? 'bg-white/95 text-[#00A859] border-[#BDC5CC] hover:border-[#00C853]'
              : 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
          }`}
          title="Click to expand Electrical Inspector"
        >
          {!hasErrors ? (
            <ShieldCheck className="w-4 h-4 text-[#00A859]" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          )}
          <span className="font-bold text-[11px]">
            {!hasErrors ? 'Electrical Inspector: Clean' : `${validationErrors.length} Issue${validationErrors.length > 1 ? 's' : ''}`}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-[#888888]" />
        </button>
      ) : (
        /* 2. Expanded Floating Inspector Card */
        <div className="w-80 bg-white border border-[#BDC5CC] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-80">
          {/* Header Bar */}
          <div className="px-3 py-2 bg-[#F4F6F8] border-b border-[#CFD4D9] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-bold text-[#222222]">
              {!hasErrors ? (
                <ShieldCheck className="w-4 h-4 text-[#00A859]" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              )}
              <span className="text-xs">Electrical Inspector</span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={runValidation}
                className="p-1 rounded hover:bg-[#E0E0E0] text-[#666666] transition-colors"
                title="Re-run validation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleOpen}
                className="p-1 rounded hover:bg-[#E0E0E0] text-[#666666] transition-colors"
                title="Minimize"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Validation Logs & Results List */}
          <div className="p-3 overflow-y-auto space-y-2.5 flex-1 scrollbar-thin">
            {!hasErrors ? (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-1.5 text-[#666666]">
                <CheckCircle2 className="w-8 h-8 text-[#00A859]" />
                <span className="text-xs font-bold text-[#222222]">
                  Zero Electrical Errors
                </span>
                <p className="text-[11px] text-[#777777] max-w-[220px]">
                  All netlists, power rails, and logic level constraints verified.
                </p>
              </div>
            ) : (
              validationErrors.map((error) => {
                const isError = error.severity === 'ERROR';
                return (
                  <div
                    key={error.id}
                    className={`p-2.5 rounded border text-xs space-y-1.5 ${
                      isError
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 font-bold">
                      {isError ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                      ) : (
                        <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      )}
                      <span>{error.title}</span>
                    </div>
                    <p className="text-[11px] text-[#444444] leading-relaxed">
                      {error.message}
                    </p>
                    {error.recommendation && (
                      <div className="pt-1 border-t border-black/5 text-[10px] text-[#666666]">
                        <span className="font-bold text-[#333333]">Fix: </span>
                        {error.recommendation}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
