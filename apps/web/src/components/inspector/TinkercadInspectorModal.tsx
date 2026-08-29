import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { ComponentRegistry } from '@circuit/component-sdk';
import { BoardRegistry } from '@circuit/board-sdk';
import { TINKERCAD_WIRE_COLORS, TINKERCAD_WIRE_TYPES } from '../../types/wireConstants';
import { X, Sliders } from 'lucide-react';

export const TinkercadInspectorModal: React.FC = () => {
  const {
    selectedComponentId,
    selectComponent,
    components,
    updateComponentProperty,
    removeComponent,
    rotateComponent,
  } = useCircuitStore();

  if (!selectedComponentId) return null;

  const activeComp = components.find((c) => c.id === selectedComponentId);
  if (!activeComp) return null;

  const compDef = ComponentRegistry.getComponent(activeComp.typeId);
  const boardDef = BoardRegistry.getBoard(activeComp.typeId);

  const title = compDef?.name || boardDef?.name || 'Component';

  return (
    <div className="absolute top-16 right-6 w-72 bg-white border border-[#BDC5CC] rounded-md shadow-2xl z-30 font-sans text-xs select-none animate-in fade-in zoom-in-95 duration-150">
      {/* Header Bar */}
      <div className="bg-[#F4F6F8] px-3 py-2 border-b border-[#CFD4D9] flex items-center justify-between rounded-t-md">
        <div className="flex items-center space-x-1.5 font-bold text-[#222222]">
          <Sliders className="w-4 h-4 text-[#00A859]" />
          <span>{title}</span>
        </div>
        <button
          onClick={() => selectComponent(null)}
          className="p-1 rounded hover:bg-[#E0E0E0] text-[#666666] hover:text-[#222222] transition-colors"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Inspector Form Body */}
      <div className="p-3 space-y-3 text-[#333333]">
        {/* Name Field */}
        <div>
          <label className="block text-[11px] font-semibold text-[#666666] mb-1">
            Name
          </label>
          <input
            type="text"
            value={activeComp.label}
            onChange={(e) => {
              activeComp.label = e.target.value;
              useCircuitStore.setState({ components: [...components] });
            }}
            className="w-full px-2.5 py-1 bg-[#F9FAFB] border border-[#BDC5CC] focus:border-[#00C853] rounded text-xs text-[#222222] focus:outline-none"
          />
        </div>

        {/* Dynamic Property Fields (e.g. Resistance, LED Color, Voltage) */}
        {compDef && compDef.propertiesSchema.map((prop) => {
          const val = activeComp.properties[prop.key] ?? prop.default;

          if (prop.type === 'number') {
            return (
              <div key={prop.key}>
                <label className="block text-[11px] font-semibold text-[#666666] mb-1">
                  {prop.label}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => updateComponentProperty(activeComp.id, prop.key, parseFloat(e.target.value) || 0)}
                    className="flex-1 px-2.5 py-1 bg-[#F9FAFB] border border-[#BDC5CC] focus:border-[#00C853] rounded text-xs text-[#222222] focus:outline-none"
                  />
                  {prop.unit && (
                    <span className="px-2 py-1 bg-[#E8ECEF] border border-[#BDC5CC] rounded text-[11px] font-mono text-[#555555]">
                      {prop.unit}
                    </span>
                  )}
                </div>
              </div>
            );
          }

          if (prop.type === 'enum') {
            return (
              <div key={prop.key}>
                <label className="block text-[11px] font-semibold text-[#666666] mb-1">
                  {prop.label}
                </label>
                <select
                  value={val}
                  onChange={(e) => updateComponentProperty(activeComp.id, prop.key, e.target.value)}
                  className="w-full px-2 py-1 bg-[#F9FAFB] border border-[#BDC5CC] focus:border-[#00C853] rounded text-xs text-[#222222] focus:outline-none cursor-pointer"
                >
                  {prop.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return null;
        })}

        {/* Action Controls (Rotate & Delete) */}
        <div className="pt-2 border-t border-[#EEEEEE] flex items-center justify-between">
          <button
            onClick={() => rotateComponent(activeComp.id)}
            className="px-3 py-1 bg-[#E8ECEF] hover:bg-[#D5DCE1] text-[#333333] font-semibold rounded transition-colors"
          >
            Rotate (R)
          </button>
          <button
            onClick={() => removeComponent(activeComp.id)}
            className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
