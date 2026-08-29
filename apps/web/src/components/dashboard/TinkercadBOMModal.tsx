import React from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { ComponentRegistry } from '@circuit/component-sdk';
import { BoardRegistry } from '@circuit/board-sdk';
import { X, Download, FileText } from 'lucide-react';

export const TinkercadBOMModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { components } = useCircuitStore();

  // Group components by type to generate quantities
  const groupedMap = new Map<string, { name: string; category: string; count: number; desc: string }>();

  components.forEach((c) => {
    const compDef = ComponentRegistry.getComponent(c.typeId);
    const boardDef = BoardRegistry.getBoard(c.typeId);

    const name = compDef?.name || boardDef?.name || c.typeId;
    const category = compDef?.category || boardDef?.architecture || 'General';
    const desc = compDef?.description || (boardDef ? `${boardDef.family} (${boardDef.architecture})` : 'Circuit component');

    if (groupedMap.has(name)) {
      const item = groupedMap.get(name)!;
      item.count += 1;
    } else {
      groupedMap.set(name, { name, category, count: 1, desc });
    }
  });

  const bomList = Array.from(groupedMap.values());

  const handleExportCSV = () => {
    let csv = 'Name,Quantity,Category,Description\n';
    bomList.forEach((item) => {
      csv += `"${item.name}",${item.count},"${item.category}","${item.desc}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Tinkercad_BOM_Component_List.csv';
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans select-none animate-in fade-in duration-200">
      <div className="bg-white border border-[#BDC5CC] rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="bg-[#F4F6F8] px-4 py-3 border-b border-[#CFD4D9] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#00A859]" />
            <h2 className="text-sm font-bold text-[#222222]">
              Component List (Bill of Materials)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#E0E0E0] text-[#666666] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-4 overflow-y-auto flex-1">
          {bomList.length === 0 ? (
            <div className="text-center py-10 text-[#888888]">
              No components currently placed on the workspace canvas.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#E8ECEF] border-b border-[#CFD4D9] text-[#444444] font-bold">
                  <th className="p-2.5">Component</th>
                  <th className="p-2.5 text-center">Quantity</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE]">
                {bomList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB]">
                    <td className="p-2.5 font-bold text-[#222222]">{item.name}</td>
                    <td className="p-2.5 text-center font-mono font-bold text-[#00A859]">
                      {item.count}
                    </td>
                    <td className="p-2.5 text-[#666666]">{item.category}</td>
                    <td className="p-2.5 text-[#555555]">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F4F6F8] px-4 py-3 border-t border-[#CFD4D9] flex items-center justify-between">
          <span className="text-xs text-[#666666] font-medium">
            Total Unique Parts: {bomList.length}
          </span>
          <button
            onClick={handleExportCSV}
            disabled={bomList.length === 0}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-[#00A859] hover:bg-[#00C853] text-white font-bold rounded shadow transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
