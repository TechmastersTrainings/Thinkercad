import React, { useState } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { ComponentRegistry } from '@circuit/component-sdk';
import { BoardRegistry } from '@circuit/board-sdk';
import { ComponentThumbnail3D } from './ComponentThumbnail3D';
import { Search, ChevronDown, LayoutGrid, List } from 'lucide-react';

export const TinkercadComponentDrawer: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'BASIC' | 'ALL' | 'BOARDS' | 'INPUT' | 'OUTPUT' | 'POWER' | 'BREADBOARDS' | 'ICS'>('BASIC');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { addComponent, addBoard, components: activeComponents } = useCircuitStore();

  if (!isOpen) return null;

  const boards = BoardRegistry.getAllBoards();
  const allComponents = ComponentRegistry.getAllComponents();

  // Basic Tinkercad preset component IDs
  const basicComponentIds = [
    'resistor',
    'led',
    'rgb-led',
    'pushbutton',
    'potentiometer',
    'capacitor',
    'slideswitch',
    'battery-9v',
    'battery-coin',
    'battery-1_5v',
    'breadboard-small',
    'board-arduino-uno',
    'board-arduino-nano',
    'board-arduino-mega',
    'board-esp32',
    'board-raspberry-pi-pico',
    'board-stm32-bluepill',
    'dc-motor',
    'servo',
    'gearmotor',
    'buzzer',
    'temp-sensor-tmp36',
    'ldr-sensor',
    'ultrasonic-hcsr04',
    'pir-motion',
    'soil-moisture',
    'oled-ssd1306',
    'lcd1602',
    'dht11',
    'dht22',
    'mpu6050',
    'keypad-4x4',
    'mq2-gas-sensor',
    'l298n-motor-driver',
    'relay',
    'multimeter',
    'diode',
    'transistor-npn',
  ];

  // Filter items based on selected category & search query
  const query = searchQuery.trim().toLowerCase();

  // Combine Boards and Components for seamless display
  type DrawerItem =
    | { kind: 'board'; id: string; name: string; description: string; category: string }
    | { kind: 'comp'; id: string; name: string; description: string; category: string };

  const allItems: DrawerItem[] = [
    ...boards.map((b) => ({ kind: 'board' as const, id: b.id || '', name: b.name || b.id || '', description: (b as any).description || '', category: 'BOARDS' })),
    ...allComponents.map((c) => ({ kind: 'comp' as const, id: c.id || '', name: c.name || c.id || '', description: c.description || '', category: c.category || 'OTHER' })),
  ];

  const filteredItems = allItems.filter((item) => {
    // Search match with safe optional chaining
    if (query) {
      const nameMatch = item.name ? item.name.toLowerCase().includes(query) : false;
      const descMatch = item.description ? item.description.toLowerCase().includes(query) : false;
      const idMatch = item.id ? item.id.toLowerCase().includes(query) : false;
      return nameMatch || descMatch || idMatch;
    }

    // Category match
    if (selectedFilter === 'BASIC') {
      return basicComponentIds.includes(item.id);
    }
    if (selectedFilter === 'ALL') {
      return true;
    }
    if (selectedFilter === 'BOARDS') {
      return item.kind === 'board';
    }
    if (selectedFilter === 'INPUT') {
      return item.category === 'INPUT' || item.category === 'SENSORS' || ['pushbutton', 'potentiometer', 'slideswitch', 'ldr-sensor', 'ultrasonic-hcsr04', 'pir-motion', 'soil-moisture', 'tilt-sensor', 'temp-sensor-tmp36', 'mq2-gas-sensor', 'keypad-4x4', 'flex-sensor', 'force-sensor', 'dht11', 'dht22'].includes(item.id);
    }
    if (selectedFilter === 'OUTPUT') {
      return item.category === 'OUTPUT' || item.category === 'ACTUATORS' || ['led', 'rgb-led', 'light-bulb', 'neopixel-ring-12', 'servo', 'dc-motor', 'gearmotor', 'buzzer', 'seven-segment', 'lcd1602', 'oled-ssd1306', 'relay'].includes(item.id);
    }
    if (selectedFilter === 'POWER') {
      return item.category === 'POWER' || ['battery-9v', 'battery-1_5v', 'battery-coin', 'solar-cell', 'potato-battery', 'lemon-battery'].includes(item.id);
    }
    if (selectedFilter === 'BREADBOARDS') {
      return item.category === 'BREADBOARDS' || item.id.includes('breadboard');
    }
    if (selectedFilter === 'ICS') {
      return item.category === 'INTEGRATED_CIRCUITS' || item.category === 'LOGIC' || item.id.startsWith('ic-') || item.id.startsWith('logic-') || item.id.startsWith('transistor-');
    }
    return true;
  });

  const handleItemClick = (item: DrawerItem) => {
    const count = activeComponents.length;
    const posX = 120 + (count % 3) * 200;
    const posY = 120 + Math.floor(count / 3) * 160;

    if (item.kind === 'board') {
      addBoard(item.id, posX, posY);
    } else {
      addComponent(item.id, posX, posY);
    }
  };

  return (
    <aside className="w-[320px] min-w-[320px] max-w-[320px] h-full bg-[#F4F6F8] border-l border-[#CFD4D9] flex flex-col shadow-lg z-20 shrink-0 font-sans select-none overflow-hidden">
      {/* Tinkercad Drawer Header & Controls */}
      <div className="px-3.5 py-3 bg-[#FFFFFF] border-b border-[#E2E8F0] space-y-2.5 shadow-xs">
        {/* Category Dropdown & View Mode Switcher */}
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-xs font-black text-[#334155] uppercase tracking-wider shrink-0">
            Components
          </span>
          <div className="flex items-center space-x-1.5 shrink-0">
            {/* View Mode Toggle (Grid / List) */}
            <div className="flex items-center bg-[#F1F5F9] rounded p-0.5 border border-[#CBD5E1]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#00A859]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-xs text-[#00A859]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#94A3B8] text-[#0F172A] font-bold text-xs rounded px-2.5 py-1 pr-6 appearance-none focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] cursor-pointer shadow-xs"
              >
                <option value="BASIC">Basic</option>
                <option value="ALL">All</option>
                <option value="BOARDS">Microcontrollers</option>
                <option value="INPUT">Sensors & Input</option>
                <option value="OUTPUT">Output & Motors</option>
                <option value="POWER">Power</option>
                <option value="BREADBOARDS">Breadboards</option>
                <option value="ICS">ICs & Logic</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#64748B] absolute right-1.5 top-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:bg-white focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853] rounded-md text-xs text-[#0F172A] focus:outline-none placeholder:text-[#94A3B8] shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-xs text-[#94A3B8] hover:text-[#475569]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Component Items Viewport */}
      <div className="flex-1 px-3.5 py-3 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#64748B]">
            No components found matching "{searchQuery}"
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View: 2 Spacious Columns with Large 3D Thumbnails */
          <div className="grid grid-cols-2 gap-2 w-full">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', JSON.stringify({ kind: item.kind, id: item.id }));
                }}
                onClick={() => handleItemClick(item)}
                title={`${item.name} — Click or drag onto canvas`}
                className="bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#00C853] rounded-lg p-2 flex flex-col items-center justify-between cursor-grab active:cursor-grabbing transition-all duration-150 hover:shadow-md active:scale-[0.97] group text-center h-[115px] w-full min-w-0 box-border"
              >
                {/* Large 3D Component Preview */}
                <div className="w-full h-14 flex items-center justify-center bg-[#F8FAFC] group-hover:bg-[#DCFCE7] rounded-md border border-[#F1F5F9] transition-colors overflow-hidden p-1">
                  <ComponentThumbnail3D typeId={item.id} className="w-full h-full drop-shadow-xs" />
                </div>

                {/* Component Name */}
                <span className="text-[11px] font-bold text-[#1E293B] group-hover:text-[#15803D] leading-tight line-clamp-2 w-full text-center px-0.5 mt-1">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* List View: Full-width Cards with Image + Title + Category */
          <div className="space-y-1.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', JSON.stringify({ kind: item.kind, id: item.id }));
                }}
                onClick={() => handleItemClick(item)}
                title={`${item.name} — Click or drag onto canvas`}
                className="bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#00C853] rounded-lg p-2 flex items-center space-x-3 cursor-grab active:cursor-grabbing transition-all duration-150 hover:shadow-sm active:scale-[0.99] group"
              >
                {/* 3D Component Preview Box */}
                <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-[#F8FAFC] group-hover:bg-[#DCFCE7] rounded-md border border-[#F1F5F9] transition-colors overflow-hidden p-1">
                  <ComponentThumbnail3D typeId={item.id} className="w-full h-full drop-shadow-xs" />
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1E293B] group-hover:text-[#15803D] truncate">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-[#64748B] truncate mt-0.5">
                    {item.description || item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
