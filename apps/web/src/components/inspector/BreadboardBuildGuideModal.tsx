import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { ComponentRegistry } from '@circuit/component-sdk';
import { BoardRegistry } from '@circuit/board-sdk';
import { Wrench, Download, Cpu, ShieldCheck, DollarSign } from 'lucide-react';

export const BreadboardBuildGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { components, wires } = useCircuitStore();

  // Compute Bill of Materials (BOM)
  const bomList = components.map((comp) => {
    const isBoard = comp.typeId.startsWith('board-');
    const boardDef = isBoard ? BoardRegistry.getBoard(comp.typeId) : null;
    const compDef = !isBoard ? ComponentRegistry.getComponent(comp.typeId) : null;

    return {
      id: comp.id,
      name: boardDef ? boardDef.name : compDef ? compDef.name : comp.label,
      category: boardDef ? 'Microcontroller Board' : compDef ? compDef.category : 'General Component',
      quantity: 1,
      estimatedPriceUSD: isBoard ? 12.0 : 1.5,
    };
  });

  const totalCost = bomList.reduce((acc, item) => acc + item.estimatedPriceUSD, 0);

  // Generate Step-by-Step Wiring Instructions
  const wiringInstructions = wires.map((wire, index) => {
    const fromComp = components.find((c) => c.id === wire.fromComponentId);
    const toComp = components.find((c) => c.id === wire.toComponentId);
    return {
      step: index + 1,
      from: `${fromComp?.label || 'Component'} (Pin ${wire.fromPinId})`,
      to: `${toComp?.label || 'Component'} (Pin ${wire.toPinId})`,
      color: wire.color || '#06b6d4',
    };
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-surface border border-slate-800 rounded-2xl w-[720px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-panel border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent-amber/20 flex items-center justify-center border border-accent-amber/40">
              <Wrench className="w-5 h-5 text-accent-amber" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 tracking-wider">
                REAL-WORLD BREADBOARD BUILD GUIDE & BOM
              </h2>
              <p className="text-xs text-slate-400">
                Step-by-step physical assembly instructions & Bill of Materials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Bill of Materials (BOM) Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-accent-cyan" />
                <span>Bill of Materials (BOM)</span>
              </h3>
              <span className="text-xs font-mono text-accent-emerald flex items-center">
                <DollarSign className="w-3.5 h-3.5" />
                Total Estimated Cost: ${totalCost.toFixed(2)} USD
              </span>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <th className="p-3 font-semibold">Component Name</th>
                    <th className="p-3 font-semibold">Category</th>
                    <th className="p-3 font-semibold">Qty</th>
                    <th className="p-3 font-semibold">Est. Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {bomList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-medium text-slate-200">{item.name}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-400">{item.category}</td>
                      <td className="p-3 font-mono">{item.quantity}</td>
                      <td className="p-3 font-mono text-accent-emerald">${item.estimatedPriceUSD.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Physical Wiring Steps */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-accent-emerald" />
              <span>Step-by-Step Breadboard Wiring Instructions</span>
            </h3>

            {wiringInstructions.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No wire connections placed on canvas yet.</p>
            ) : (
              <div className="space-y-2">
                {wiringInstructions.map((w) => (
                  <div
                    key={w.step}
                    className="p-3 rounded-xl bg-panel border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-accent-cyan font-mono font-bold flex items-center justify-center text-[11px]">
                        {w.step}
                      </span>
                      <span className="text-slate-300 font-mono">
                        Connect <strong className="text-slate-100">{w.from}</strong> ➔ <strong className="text-slate-100">{w.to}</strong>
                      </span>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full border border-slate-600"
                      style={{ backgroundColor: w.color }}
                      title="Wire Color"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-panel border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-slate-100"
          >
            Close
          </button>
          <button
            onClick={() => {
              const csvContent = 'data:text/csv;charset=utf-8,' + bomList.map((e) => `${e.name},${e.category},${e.quantity},${e.estimatedPriceUSD}`).join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'circuit_bom.csv');
              document.body.appendChild(link);
              link.click();
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-accent-emerald text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export BOM CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
