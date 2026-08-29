import React, { useRef, useState } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import { ComponentRegistry } from '@circuit/component-sdk';
import { BoardRegistry } from '@circuit/board-sdk';
import { BoardGraphicRenderer } from './BoardGraphicRenderer';
import { ComponentGraphicRenderer } from './ComponentGraphicRenderer';
import { Cpu, Zap, Trash2 } from 'lucide-react';

export const CircuitCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const {
    components,
    wires,
    selectedComponentId,
    activeWireDraft,
    selectComponent,
    startWireDraft,
    updateWireDraft,
    completeWireDraft,
    cancelWireDraft,
    updateComponentPosition,
    updateComponentProperty,
    removeComponent,
  } = useCircuitStore();

  const simulationStatus = useSimulationStore((state) => state.status);
  const isSimulating = simulationStatus === 'RUNNING';

  const handleMouseDownComp = (e: React.MouseEvent, compId: string, currentX: number, currentY: number) => {
    e.stopPropagation();
    selectComponent(compId);
    setDraggingCompId(compId);
    setDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeWireDraft) {
      updateWireDraft(x, y);
    }

    if (draggingCompId) {
      const newX = Math.max(10, Math.min(rect.width - 280, e.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(rect.height - 240, e.clientY - dragOffset.y));
      updateComponentPosition(draggingCompId, newX, newY);
    }
  };

  const handleMouseUp = () => {
    setDraggingCompId(null);
  };

  const handlePinClick = (e: React.MouseEvent, componentId: string, pinId: string, pinX: number, pinY: number) => {
    e.stopPropagation();
    if (!activeWireDraft) {
      startWireDraft(componentId, pinId, pinX, pinY);
    } else {
      completeWireDraft(componentId, pinId);
    }
  };

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 h-full bg-[#090d16] grid-bg overflow-hidden cursor-crosshair select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => {
        selectComponent(null);
        if (activeWireDraft) cancelWireDraft();
      }}
    >
      {/* Dynamic Curved Wire SVG Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {wires.map((wire) => {
          const fromComp = components.find((c) => c.id === wire.fromComponentId);
          const toComp = components.find((c) => c.id === wire.toComponentId);
          if (!fromComp || !toComp) return null;

          const x1 = fromComp.position.x + 100;
          const y1 = fromComp.position.y + 60;
          const x2 = toComp.position.x + 100;
          const y2 = toComp.position.y + 60;

          const dx = Math.abs(x2 - x1) * 0.5;
          const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

          return (
            <g key={wire.id}>
              <path
                d={pathD}
                fill="none"
                stroke={wire.color || '#06b6d4'}
                strokeWidth="3"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all"
              />
            </g>
          );
        })}

        {/* Active Wire Draft */}
        {activeWireDraft && (
          <line
            x1={activeWireDraft.fromX}
            y1={activeWireDraft.fromY}
            x2={activeWireDraft.toX}
            y2={activeWireDraft.toY}
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Rendered Boards & Components */}
      {components.map((comp) => {
        const isBoard = comp.typeId.startsWith('board-');
        const boardDef = isBoard ? BoardRegistry.getBoard(comp.typeId) : null;
        const compDef = !isBoard ? ComponentRegistry.getComponent(comp.typeId) : null;
        const isSelected = selectedComponentId === comp.id;
        const pins = boardDef ? boardDef.pins : compDef ? compDef.pins : [];

        return (
          <div
            key={comp.id}
            onMouseDown={(e) => handleMouseDownComp(e, comp.id, comp.position.x, comp.position.y)}
            style={{
              left: `${comp.position.x}px`,
              top: `${comp.position.y}px`,
            }}
            className={`absolute p-3 rounded-2xl border z-20 transition-all ${
              isSelected
                ? 'bg-panel/95 border-accent-cyan shadow-[0_0_24px_rgba(6,182,212,0.4)] ring-1 ring-accent-cyan/50'
                : 'bg-surface/90 border-slate-800 hover:border-slate-700'
            } backdrop-blur-md cursor-grab active:cursor-grabbing`}
          >
            {/* Header Control Toolbar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 truncate">
                {isBoard ? (
                  <Cpu className="w-4 h-4 text-accent-cyan shrink-0" />
                ) : (
                  <Zap className="w-4 h-4 text-accent-amber shrink-0" />
                )}
                <span className="text-xs font-bold text-slate-200 tracking-wide truncate">
                  {comp.label}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeComponent(comp.id);
                }}
                className="p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded transition-colors"
                title="Remove component"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* High-Fidelity Realistic Hardware Visual Graphics Render */}
            {isBoard && boardDef && (
              <BoardGraphicRenderer boardDef={boardDef} label={comp.label} isSimulating={isSimulating} />
            )}

            {!isBoard && compDef && (
              <ComponentGraphicRenderer
                compDef={compDef}
                properties={comp.properties}
                onPropertyChange={(key, val) => updateComponentProperty(comp.id, key, val)}
                isSimulating={isSimulating}
              />
            )}

            {/* Pin Connections Container */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80 mt-2">
              {pins.map((pin) => {
                const absPinX = comp.position.x + pin.position.x;
                const absPinY = comp.position.y + pin.position.y;

                return (
                  <div
                    key={pin.id}
                    className="flex items-center justify-between group cursor-pointer hover:bg-slate-800/60 px-1.5 py-0.5 rounded transition-colors"
                    onClick={(e) => handlePinClick(e, comp.id, pin.id, absPinX, absPinY)}
                  >
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-accent-cyan transition-colors truncate max-w-[150px]">
                      {pin.label}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full border transition-all shrink-0 ${
                        pin.isPowerVcc
                          ? 'bg-rose-500/40 border-rose-500 group-hover:scale-125'
                          : pin.isPowerGnd
                          ? 'bg-slate-500/40 border-slate-400 group-hover:scale-125'
                          : 'bg-accent-cyan/40 border-accent-cyan group-hover:scale-125'
                      }`}
                      title={`Click pin to connect wire (${pin.label})`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
