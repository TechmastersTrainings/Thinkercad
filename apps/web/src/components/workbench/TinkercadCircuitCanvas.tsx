import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import { BoardRegistry } from '@circuit/board-sdk';
import { ComponentRegistry } from '@circuit/component-sdk';
import { TinkercadRealisticBoard } from './TinkercadRealisticBoard';
import { TinkercadRealisticComponent } from './TinkercadRealisticComponent';
import { Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const TinkercadCircuitCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);

  // Canvas Pan and Zoom State
  const [pan, setPan] = useState({ x: 40, y: 30 });
  const [zoom, setZoom] = useState(0.85);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hasMovedDuringPan, setHasMovedDuringPan] = useState(false);

  const {
    components,
    wires,
    selectedComponentId,
    selectedWireId,
    activeWireDraft,
    selectedWireColor,
    selectComponent,
    selectWire,
    removeWire,
    startWireDraft,
    updateWireDraft,
    completeWireDraft,
    cancelWireDraft,
    updateComponentPosition,
    updateComponentProperty,
    addComponent,
    addBoard,
  } = useCircuitStore();

  const simulationStatus = useSimulationStore((state) => state.status);
  const isSimulating = simulationStatus === 'RUNNING';
  const pin13State = useSimulationStore((state) => state.pinStates?.D13 ?? false);

  // Handle Drag & Drop Component onto Canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dropScreenX = e.clientX - rect.left;
    const dropScreenY = e.clientY - rect.top;

    const worldX = Math.round((dropScreenX - pan.x) / zoom - 40);
    const worldY = Math.round((dropScreenY - pan.y) / zoom - 40);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data && data.id) {
          if (data.kind === 'board') {
            addBoard(data.id, worldX, worldY);
          } else {
            addComponent(data.id, worldX, worldY);
          }
        }
      }
    } catch (err) {
      console.error('Drop parse error', err);
    }
  };

  // Fit all components comfortably in browser view
  const handleFitToView = useCallback(() => {
    if (!canvasRef.current || components.length === 0) {
      setPan({ x: 40, y: 30 });
      setZoom(0.85);
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const minX = Math.min(...components.map(c => c.position.x));
    const maxX = Math.max(...components.map(c => c.position.x + (c.typeId.startsWith('board-') ? 380 : 120)));
    const minY = Math.min(...components.map(c => c.position.y));
    const maxY = Math.max(...components.map(c => c.position.y + (c.typeId.startsWith('board-') ? 260 : 100)));

    const contentWidth = Math.max(400, maxX - minX);
    const contentHeight = Math.max(280, maxY - minY);

    const paddingX = 160;
    const paddingY = 100;
    const scaleX = (rect.width - paddingX) / contentWidth;
    const scaleY = (rect.height - paddingY) / contentHeight;
    const newZoom = Math.min(0.92, Math.max(0.45, Math.min(scaleX, scaleY) * 0.88));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setPan({
      x: rect.width / 2 - centerX * newZoom - 30,
      y: rect.height / 2 - centerY * newZoom,
    });
    setZoom(newZoom);
  }, [components]);

  // Auto-fit on initial mount so canvas immediately fits in the browser window
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFitToView();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut to delete selected wire or fit view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
        target.isContentEditable ||
        target.closest('.monaco-editor') ||
        target.closest('.monaco-inputbox') ||
        target.closest('input, textarea, select')
      ) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedWireId) {
          removeWire(selectedWireId);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        handleFitToView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWireId, removeWire, handleFitToView]);

  // Handle Canvas Background Mouse Down (Start Pan)
  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    if (e.button === 0 || e.button === 1) {
      setIsPanning(true);
      setHasMovedDuringPan(false);
      setPanStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      });
    }
  };

  // Handle Component Drag Start
  const handleMouseDownComp = (e: React.MouseEvent, compId: string, currentX: number, currentY: number) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    selectWire(null);
    selectComponent(compId);
    setDraggingCompId(compId);
    setDragOffset({
      x: (e.clientX - pan.x) / zoom - currentX,
      y: (e.clientY - pan.y) / zoom - currentY,
    });
  };

  // Handle Mouse Move (Panning, Dragging, Wire Drafting)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setHasMovedDuringPan(true);
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
      return;
    }

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const worldMouseX = (e.clientX - rect.left - pan.x) / zoom;
    const worldMouseY = (e.clientY - rect.top - pan.y) / zoom;

    if (activeWireDraft) {
      updateWireDraft(worldMouseX, worldMouseY);
    }

    if (draggingCompId) {
      const newX = (e.clientX - pan.x) / zoom - dragOffset.x;
      const newY = (e.clientY - pan.y) / zoom - dragOffset.y;
      updateComponentPosition(draggingCompId, Math.round(newX), Math.round(newY));
    }
  };

  // Handle Mouse Up
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
    }
    setDraggingCompId(null);
  };

  // Native non-passive wheel event listener to lock browser scroll and move/zoom canvas exclusively
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = canvasEl.getBoundingClientRect();
      const mouseScreenX = e.clientX - rect.left;
      const mouseScreenY = e.clientY - rect.top;

      // Trackpad pinch-to-zoom or Ctrl+wheel or standard wheel zoom
      if (e.ctrlKey || (!e.shiftKey && Math.abs(e.deltaY) >= Math.abs(e.deltaX) * 0.5)) {
        const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
        setZoom((prevZoom) => {
          const newZoom = Math.min(2.5, Math.max(0.35, prevZoom * zoomFactor));
          setPan((prevPan) => ({
            x: mouseScreenX - (mouseScreenX - prevPan.x) * (newZoom / prevZoom),
            y: mouseScreenY - (mouseScreenY - prevPan.y) * (newZoom / prevZoom),
          }));
          return newZoom;
        });
      } else {
        // Trackpad 2-finger pan or Shift+scroll
        setPan((prevPan) => ({
          x: prevPan.x - (e.shiftKey ? e.deltaY : e.deltaX),
          y: prevPan.y - (e.shiftKey ? 0 : e.deltaY),
        }));
      }
    };

    canvasEl.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      canvasEl.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

  // Handle Pin Click to Start / Complete Wire Connection
  const handlePinClick = (e: React.MouseEvent, compId: string, pinId: string, relPinX: number, relPinY: number) => {
    e.stopPropagation();
    const comp = components.find((c) => c.id === compId);
    if (!comp) return;

    const absPinX = comp.position.x + relPinX;
    const absPinY = comp.position.y + relPinY;

    if (!activeWireDraft) {
      startWireDraft(compId, pinId, absPinX, absPinY);
    } else {
      completeWireDraft(compId, pinId);
    }
  };

  // Detailed Pin Information with orientation direction
  interface PinInfo {
    x: number;
    y: number;
    dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  }

  // Calculate absolute pin coordinates and exit normal for orthogonal routing
  const getPinInfo = (compId: string, pinId: string): PinInfo => {
    const comp = components.find((c) => c.id === compId);
    if (!comp) return { x: 0, y: 0, dir: 'UP' };

    const compDef = ComponentRegistry.getComponent(comp.typeId);

    let relX = 50;
    let relY = 50;
    let dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'UP';

    const pid = pinId.toUpperCase();

    if (comp.typeId === 'board-arduino-uno') {
      // Top Digital Pins (y = 14, exit UP)
      if (pid === 'AREF') { relX = 140; relY = 14; dir = 'UP'; }
      else if (pid === 'GND_TOP') { relX = 154; relY = 14; dir = 'UP'; }
      else if (pid === 'D13' || pid === '13') { relX = 168; relY = 14; dir = 'UP'; }
      else if (pid === 'D12' || pid === '12') { relX = 182; relY = 14; dir = 'UP'; }
      else if (pid === 'D11' || pid === '11') { relX = 196; relY = 14; dir = 'UP'; }
      else if (pid === 'D10' || pid === '10') { relX = 210; relY = 14; dir = 'UP'; }
      else if (pid === 'D9' || pid === '9') { relX = 224; relY = 14; dir = 'UP'; }
      else if (pid === 'D8' || pid === '8') { relX = 238; relY = 14; dir = 'UP'; }
      else if (pid === 'D7' || pid === '7') { relX = 258; relY = 14; dir = 'UP'; }
      else if (pid === 'D6' || pid === '6') { relX = 272; relY = 14; dir = 'UP'; }
      else if (pid === 'D5' || pid === '5') { relX = 286; relY = 14; dir = 'UP'; }
      else if (pid === 'D4' || pid === '4') { relX = 300; relY = 14; dir = 'UP'; }
      else if (pid === 'D3' || pid === '3') { relX = 314; relY = 14; dir = 'UP'; }
      else if (pid === 'D2' || pid === '2') { relX = 328; relY = 14; dir = 'UP'; }
      else if (pid === 'D1' || pid === '1' || pid === 'TX') { relX = 342; relY = 14; dir = 'UP'; }
      else if (pid === 'D0' || pid === '0' || pid === 'RX') { relX = 356; relY = 14; dir = 'UP'; }
      // Bottom Power & Analog Pins (y = 246, exit DOWN)
      else if (pid === 'IOREF') { relX = 172; relY = 246; dir = 'DOWN'; }
      else if (pid === 'RESET') { relX = 186; relY = 246; dir = 'DOWN'; }
      else if (pid === '3V3' || pid === '3.3V') { relX = 200; relY = 246; dir = 'DOWN'; }
      else if (pid === '5V') { relX = 214; relY = 246; dir = 'DOWN'; }
      else if (pid === 'GND_BOT1') { relX = 228; relY = 246; dir = 'DOWN'; }
      else if (pid === 'GND' || pid === 'GND_BOT2') { relX = 242; relY = 246; dir = 'DOWN'; }
      else if (pid === 'VIN') { relX = 256; relY = 246; dir = 'DOWN'; }
      else if (pid === 'A0') { relX = 280; relY = 246; dir = 'DOWN'; }
      else if (pid === 'A1') { relX = 294; relY = 246; dir = 'DOWN'; }
      else if (pid === 'A2') { relX = 308; relY = 246; dir = 'DOWN'; }
      else if (pid === 'A3') { relX = 322; relY = 246; dir = 'DOWN'; }
      else if (pid === 'A4') { relX = 336; relY = 246; dir = 'DOWN'; }
      else if (pid === 'A5') { relX = 350; relY = 246; dir = 'DOWN'; }
    } else if (comp.typeId === 'board-arduino-mega') {
      if (pid === 'D13') { relX = 188; relY = 14; dir = 'UP'; }
      else if (pid === 'GND') { relX = 234; relY = 246; dir = 'DOWN'; }
      else if (pid === '5V') { relX = 220; relY = 246; dir = 'DOWN'; }
    } else if (comp.typeId === 'board-esp32-devkit') {
      if (pid === '3V3') { relX = 10; relY = 35; dir = 'LEFT'; }
      else if (pid === 'GND') { relX = 10; relY = 295; dir = 'LEFT'; }
      else if (pid === 'D13') { relX = 10; relY = 315; dir = 'LEFT'; }
      else if (pid === 'D2') { relX = 210; relY = 255; dir = 'RIGHT'; }
      else if (pid === 'VIN') { relX = 210; relY = 315; dir = 'RIGHT'; }
    } else if (comp.typeId === 'resistor') {
      if (pinId === 'pin1' || pid.includes('1')) { relX = 8; relY = 18; dir = 'LEFT'; }
      else if (pinId === 'pin2' || pid.includes('2')) { relX = 112; relY = 18; dir = 'RIGHT'; }
    } else if (comp.typeId === 'led') {
      if (pinId.toLowerCase().includes('anode')) { relX = 17; relY = 84; dir = 'DOWN'; }
      else if (pinId.toLowerCase().includes('cathode')) { relX = 33; relY = 84; dir = 'DOWN'; }
    } else if (comp.typeId === 'rgb-led') {
      if (pinId === 'r') { relX = 14; relY = 88; dir = 'DOWN'; }
      else if (pinId === 'cathode') { relX = 24; relY = 92; dir = 'DOWN'; }
      else if (pinId === 'g') { relX = 36; relY = 88; dir = 'DOWN'; }
      else if (pinId === 'b') { relX = 46; relY = 88; dir = 'DOWN'; }
    } else if (comp.typeId === 'pushbutton') {
      if (pinId === 'pin1a') { relX = 6; relY = 15; dir = 'LEFT'; }
      else if (pinId === 'pin1b') { relX = 6; relY = 45; dir = 'LEFT'; }
      else if (pinId === 'pin2a') { relX = 54; relY = 15; dir = 'RIGHT'; }
      else if (pinId === 'pin2b') { relX = 54; relY = 45; dir = 'RIGHT'; }
    } else if (comp.typeId === 'potentiometer') {
      if (pinId === 'term1') { relX = 20; relY = 110; dir = 'DOWN'; }
      else if (pinId === 'wiper') { relX = 55; relY = 110; dir = 'DOWN'; }
      else if (pinId === 'term2') { relX = 90; relY = 110; dir = 'DOWN'; }
    } else if (comp.typeId === 'servo') {
      if (pinId === 'gnd') { relX = 30; relY = 155; dir = 'DOWN'; }
      else if (pinId === 'vcc') { relX = 45; relY = 155; dir = 'DOWN'; }
      else if (pinId === 'signal') { relX = 60; relY = 155; dir = 'DOWN'; }
    } else if (comp.typeId === 'ultrasonic-hcsr04') {
      if (pinId === 'gnd') { relX = 70; relY = 115; dir = 'DOWN'; }
      else if (pinId === 'vcc') { relX = 95; relY = 115; dir = 'DOWN'; }
      else if (pinId === 'trig' || pinId === 'sig') { relX = 120; relY = 115; dir = 'DOWN'; }
      else { relX = 120; relY = 115; dir = 'DOWN'; }
    } else if (comp.typeId === 'buzzer') {
      if (pinId === 'positive') { relX = 22; relY = 70; dir = 'DOWN'; }
      else if (pinId === 'negative') { relX = 78; relY = 70; dir = 'DOWN'; }
    } else if (comp.typeId === 'camera-ov2640') {
      const pinMap: Record<string, number> = {
        '5v': 20, 'gnd': 45, 'gpio12': 70, 'gpio13': 95, 'gpio14': 120,
        'gpio15': 145, 'gpio2': 170, 'gpio4': 195, 'tx': 220, 'rx': 245
      };
      relX = pinMap[pinId.toLowerCase()] ?? 20;
      relY = 190;
      dir = 'DOWN';
    } else if (comp.typeId === 'mq2-gas-sensor') {
      const pinMap: Record<string, number> = { 'vcc': 30, 'gnd': 55, 'do': 80, 'ao': 105 };
      relX = pinMap[pinId.toLowerCase()] ?? 30;
      relY = 155;
      dir = 'DOWN';
    } else if (comp.typeId === 'dht22') {
      const pinMap: Record<string, number> = { 'vcc': 25, 'data': 50, 'nc': 75, 'gnd': 100 };
      relX = pinMap[pinId.toLowerCase()] ?? 25;
      relY = 155;
      dir = 'DOWN';
    } else if (comp.typeId === 'dht11') {
      const pinMap: Record<string, number> = { 'vcc': 25, 'data': 50, 'nc': 75, 'gnd': 100 };
      relX = pinMap[pinId.toLowerCase()] ?? 25;
      relY = 145;
      dir = 'DOWN';
    } else if (comp.typeId === 'mpu6050') {
      const pinMap: Record<string, number> = {
        'vcc': 15, 'gnd': 35, 'scl': 55, 'sda': 75, 'xda': 95, 'xcl': 115, 'ad0': 135, 'int': 155
      };
      relX = pinMap[pinId.toLowerCase()] ?? 15;
      relY = 155;
      dir = 'DOWN';
    } else if (comp.typeId === 'soil-moisture') {
      const pinMap: Record<string, number> = { 'vcc': 30, 'gnd': 50, 'do': 70, 'ao': 70 };
      relX = pinMap[pinId.toLowerCase()] ?? 50;
      relY = 15;
      dir = 'UP';
    } else if (comp.typeId === 'ir-obstacle') {
      const pinMap: Record<string, number> = { 'vcc': 30, 'gnd': 55, 'out': 80 };
      relX = pinMap[pinId.toLowerCase()] ?? 30;
      relY = 155;
      dir = 'DOWN';
    } else if (comp.typeId === 'hc05-bluetooth') {
      const pinMap: Record<string, number> = { 'state': 25, 'rxd': 50, 'txd': 75, 'gnd': 100, 'vcc': 125, 'en': 150 };
      relX = pinMap[pinId.toLowerCase()] ?? 25;
      relY = 175;
      dir = 'DOWN';
    } else if (comp.typeId === 'l298n-motor-driver') {
      const pinMap: Record<string, number> = {
        'ena': 25, 'in1': 50, 'in2': 75, 'in3': 100, 'in4': 125, 'enb': 150, '12v': 175, 'gnd': 200, '5v': 225
      };
      relX = pinMap[pinId.toLowerCase()] ?? 25;
      relY = 190;
      dir = 'DOWN';
    } else if (comp.typeId === 'rfid-rc522') {
      const pinMap: Record<string, number> = {
        '3v3': 20, 'rst': 40, 'gnd': 60, 'irq': 80, 'miso': 100, 'mosi': 120, 'sck': 140, 'sda': 160
      };
      relX = pinMap[pinId.toLowerCase()] ?? 20;
      relY = 180;
      dir = 'DOWN';
    } else if (comp.typeId === 'pir-motion') {
      const pinMap: Record<string, number> = { 'gnd': 42, 'vcc': 60, 'out': 78 };
      relX = pinMap[pinId.toLowerCase()] ?? 60;
      relY = 140;
      dir = 'DOWN';
    } else if (comp.typeId === 'capacitor-polarized') {
      relX = pinId.toLowerCase().includes('anode') || pinId === '+' ? 15 : 35;
      relY = 55;
      dir = 'DOWN';
    } else if (comp.typeId === 'diode' || comp.typeId === 'diode-zener') {
      relX = pinId.toLowerCase().includes('anode') ? 20 : 20;
      relY = pinId.toLowerCase().includes('anode') ? 5 : 55;
      dir = pinId.toLowerCase().includes('anode') ? 'UP' : 'DOWN';
    } else if (comp.typeId === 'inductor') {
      relX = pinId === 'pin1' || pinId === '1' ? 5 : 65;
      relY = 15;
      dir = pinId === 'pin1' || pinId === '1' ? 'LEFT' : 'RIGHT';
    } else if (comp.typeId === 'slideswitch') {
      const pinMap: Record<string, number> = { 'term1': 15, 'common': 35, 'term2': 55 };
      relX = pinMap[pinId.toLowerCase()] ?? 35;
      relY = 38;
      dir = 'DOWN';
    } else if (comp.typeId === 'light-bulb') {
      relX = pinId === 'term1' ? 22 : 38;
      relY = 78;
      dir = 'DOWN';
    } else if (comp.typeId === 'temp-sensor-tmp36') {
      const pinMap: Record<string, number> = { 'vcc': 12, 'out': 30, 'gnd': 48 };
      relX = pinMap[pinId.toLowerCase()] ?? 30;
      relY = 70;
      dir = 'DOWN';
    } else if (comp.typeId === 'tilt-sensor') {
      relX = pinId === 'pin1' ? 18 : 32;
      relY = 70;
      dir = 'DOWN';
    } else if (comp.typeId === 'battery-9v') {
      relX = 8;
      relY = pinId === 'positive' ? 36 : 64;
      dir = 'LEFT';
    } else if (comp.typeId === 'battery-1_5v') {
      relX = pinId === 'positive' ? 26 : 44;
      relY = 10;
      dir = 'UP';
    } else if (comp.typeId === 'battery-coin') {
      relX = 35;
      relY = pinId === 'positive' ? 6 : 64;
      dir = pinId === 'positive' ? 'UP' : 'DOWN';
    } else if (comp.typeId === 'solar-cell') {
      relX = pinId === 'positive' ? 18 : 32;
      relY = 8;
      dir = 'UP';
    } else if (comp.typeId === 'potato-battery' || comp.typeId === 'lemon-battery') {
      relX = pinId === 'copper' ? 20 : 36;
      relY = 10;
      dir = 'UP';
    } else if (comp.typeId === 'multimeter') {
      relX = pinId === 'pos' ? 45 : 65;
      relY = 46;
      dir = 'DOWN';
    } else if (comp.typeId === 'power-supply') {
      relX = pinId === 'pos' ? 45 : 115;
      relY = 125;
      dir = 'DOWN';
    } else if (comp.typeId === 'function-generator') {
      relX = pinId === 'out' ? 60 : 120;
      relY = 125;
      dir = 'DOWN';
    } else if (comp.typeId === 'oscilloscope') {
      relX = pinId === 'pos' ? 55 : 115;
      relY = 135;
      dir = 'DOWN';
    } else if (comp.typeId.startsWith('ic-') || comp.typeId.startsWith('logic-')) {
      const isDip6 = comp.typeId === 'ic-optocoupler-4n35';
      const isDip8 = ['ic-timer-555', 'ic-opamp-741', 'ic-comparator-lm393'].includes(comp.typeId);
      const isDip16 = ['ic-motor-driver-l293d', 'logic-74hc75', 'logic-74hc283', 'logic-74hc595', 'logic-74hc4017', 'logic-cd4511', 'logic-pcf8574'].includes(comp.typeId);
      const totalPins = isDip6 ? 6 : isDip8 ? 8 : isDip16 ? 16 : 14;
      const pinsPerSide = totalPins / 2;
      const spacing = 18;
      const padMargin = 22;
      const height = 75;

      const pIdx = compDef?.pins.findIndex((p) => p.id === pinId) ?? 0;
      const isTop = pIdx < pinsPerSide;
      const colIndex = isTop ? pIdx : totalPins - 1 - pIdx;
      relX = padMargin + colIndex * spacing;
      relY = isTop ? 6 : height - 6;
      dir = isTop ? 'UP' : 'DOWN';
    } else if (comp.typeId.startsWith('transistor-') && (comp.typeId.includes('npn') || comp.typeId.includes('pnp') || comp.typeId.includes('signal'))) {
      const pIdx = compDef?.pins.findIndex((p) => p.id === pinId) ?? 0;
      relX = 16 + pIdx * 14;
      relY = 68;
      dir = 'DOWN';
    } else if (comp.typeId.includes('power') || comp.typeId.includes('tip120') || comp.typeId.includes('voltage-regulator')) {
      const pIdx = compDef?.pins.findIndex((p) => p.id === pinId) ?? 0;
      relX = pIdx === 0 ? 20 : pIdx === 1 ? 32.5 : 45;
      relY = 88;
      dir = 'DOWN';
    } else if (comp.typeId.startsWith('relay-')) {
      const isDpdt = comp.typeId === 'relay-dpdt';
      const width = isDpdt ? 120 : 100;
      const pIdx = compDef?.pins.findIndex((p) => p.id === pinId) ?? 0;
      relX = 16 + pIdx * ((width - 32) / Math.max(1, (compDef?.pins.length ?? 5) - 1));
      relY = 63;
      dir = 'DOWN';
    } else if (comp.typeId === 'connector-header-8pin') {
      const pIdx = parseInt(pinId.replace('pin', ''), 10) - 1;
      relX = 16;
      relY = 14 + (isNaN(pIdx) ? 0 : pIdx) * 19;
      dir = 'RIGHT';
    } else if (comp.typeId === 'connector-usb-a') {
      const wireMap: Record<string, number> = { vbus: 15, dm: 25, dp: 35, gnd: 45 };
      relX = 110;
      relY = wireMap[pinId] ?? 30;
      dir = 'RIGHT';
    } else if (comp.typeId === 'temp-sensor-tmp36') {
      const pinMap: Record<string, number> = { vcc: 15, out: 30, gnd: 45 };
      relX = pinMap[pinId.toLowerCase()] ?? 30;
      relY = 65;
      dir = 'DOWN';
    } else if (comp.typeId === 'tilt-sensor') {
      relX = pinId === 'pin1' ? 18 : 32;
      relY = 70;
      dir = 'DOWN';
    } else if (comp.typeId === 'dc-motor') {
      relX = pinId === 'positive' ? 18 : 52;
      relY = 75;
      dir = 'DOWN';
    } else if (comp.typeId === 'gearmotor' || comp.typeId === 'hobby-gearmotor') {
      relX = pinId === 'positive' ? 18 : 62;
      relY = 85;
      dir = 'DOWN';
    }

    return {
      x: comp.position.x + relX,
      y: comp.position.y + relY,
      dir,
    };
  };

  // Helper to build filleted SVG path with rounded 90-degree corners
  const createFilletedPath = (points: Array<{ x: number; y: number }>, radius = 8): string => {
    if (points.length < 2) return '';
    if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];

      const v1 = { x: prev.x - curr.x, y: prev.y - curr.y };
      const v2 = { x: next.x - curr.x, y: next.y - curr.y };
      const len1 = Math.hypot(v1.x, v1.y);
      const len2 = Math.hypot(v2.x, v2.y);

      const r = Math.min(radius, len1 / 2, len2 / 2);
      if (r <= 1 || len1 === 0 || len2 === 0) {
        d += ` L ${curr.x} ${curr.y}`;
        continue;
      }

      const pStart = {
        x: curr.x + (v1.x / len1) * r,
        y: curr.y + (v1.y / len1) * r,
      };
      const pEnd = {
        x: curr.x + (v2.x / len2) * r,
        y: curr.y + (v2.y / len2) * r,
      };

      d += ` L ${pStart.x} ${pStart.y} Q ${curr.x} ${curr.y} ${pEnd.x} ${pEnd.y}`;
    }

    d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
    return d;
  };

  // Generate clean orthogonal route connecting two pins with authentic CAD Manhattan bends
  const generateOrthogonalWirePath = (p1: PinInfo, p2: PinInfo, customWaypoints?: Array<{ x: number; y: number }>): string => {
    if (customWaypoints && customWaypoints.length > 0) {
      return createFilletedPath([p1, ...customWaypoints, p2], 8);
    }

    const pts: Array<{ x: number; y: number }> = [p1];

    // Case 1: Arduino Top Pin (UP) -> Resistor Left Pin (LEFT)
    if (p1.dir === 'UP' && p2.dir === 'LEFT') {
      pts.push({ x: p1.x, y: p2.y });
    }
    // Case 2: Resistor Left Pin (LEFT) <- Arduino Top Pin (UP)
    else if (p1.dir === 'LEFT' && p2.dir === 'UP') {
      pts.push({ x: p2.x, y: p1.y });
    }
    // Case 3: Resistor Right Pin (RIGHT) -> LED Anode (DOWN)
    else if (p1.dir === 'RIGHT' && p2.dir === 'DOWN') {
      const rightTrackX = Math.max(p1.x + 30, p2.x + 35);
      const bottomTrackY = p2.y + 16;
      pts.push({ x: rightTrackX, y: p1.y });
      pts.push({ x: rightTrackX, y: bottomTrackY });
      pts.push({ x: p2.x, y: bottomTrackY });
    }
    // Case 4: LED Anode (DOWN) <- Resistor Right Pin (RIGHT)
    else if (p1.dir === 'DOWN' && p2.dir === 'RIGHT') {
      const rightTrackX = Math.max(p2.x + 30, p1.x + 35);
      const bottomTrackY = p1.y + 16;
      pts.push({ x: p1.x, y: bottomTrackY });
      pts.push({ x: rightTrackX, y: bottomTrackY });
      pts.push({ x: rightTrackX, y: p2.y });
    }
    // Case 5: GND / Power Pin (DOWN) -> LED Cathode (DOWN)
    else if (p1.dir === 'DOWN' && p2.dir === 'DOWN') {
      // Check if this is LED-to-LED daisy chain (close X)
      if (Math.abs(p1.x - p2.x) < 30) {
        const leftTrackX = Math.min(p1.x, p2.x) - 20;
        pts.push({ x: leftTrackX, y: p1.y + 10 });
        pts.push({ x: leftTrackX, y: p2.y + 10 });
      } else {
        const bottomGndTrackY = Math.max(p1.y, p2.y) + 36;
        pts.push({ x: p1.x, y: bottomGndTrackY });
        pts.push({ x: p2.x, y: bottomGndTrackY });
      }
    }
    // Case 6: Arduino Top Pin (UP) -> Component Top Pin (UP)
    else if (p1.dir === 'UP' && p2.dir === 'UP') {
      const topTrackY = Math.min(p1.y, p2.y) - 30;
      pts.push({ x: p1.x, y: topTrackY });
      pts.push({ x: p2.x, y: topTrackY });
    }
    // General Orthogonal Step
    else {
      const midX = (p1.x + p2.x) / 2;
      pts.push({ x: midX, y: p1.y });
      pts.push({ x: midX, y: p2.y });
    }

    pts.push(p2);
    return createFilletedPath(pts, 10);
  };

  const isComponentPowered = (compId: string): boolean => {
    const pinStates = useSimulationStore.getState().pinStates;

    const anodeWires = wires.filter(
      (w) =>
        (w.fromComponentId === compId && (w.fromPinId.toLowerCase().includes('anode') || w.fromPinId.toLowerCase() === 'pin1')) ||
        (w.toComponentId === compId && (w.toPinId.toLowerCase().includes('anode') || w.toPinId.toLowerCase() === 'pin1'))
    );

    for (const wire of anodeWires) {
      const otherCompId = wire.toComponentId === compId ? wire.fromComponentId : wire.toComponentId;
      const otherPinId = wire.toComponentId === compId ? wire.fromPinId : wire.toPinId;

      const otherComp = components.find((c) => c.id === otherCompId);
      if (!otherComp) continue;

      if (otherComp.typeId.startsWith('board-')) {
        const pinKey = otherPinId.toUpperCase();
        if (pinStates[pinKey] || pinStates[otherPinId]) return true;
      }

      if (otherComp.typeId === 'resistor') {
        const otherResistorPin = otherPinId === 'pin1' ? 'pin2' : 'pin1';
        const sourceWire = wires.find(
          (w) =>
            (w.toComponentId === otherCompId && w.toPinId === otherResistorPin) ||
            (w.fromComponentId === otherCompId && w.fromPinId === otherResistorPin)
        );

        if (sourceWire) {
          const boardPinId = sourceWire.toComponentId === otherCompId ? sourceWire.fromPinId : sourceWire.toPinId;
          const boardPinKey = boardPinId.toUpperCase();
          if (pinStates[boardPinKey] || pinStates[boardPinId]) return true;
        }
      }
    }

    return false;
  };

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 w-full h-full min-w-0 min-h-0 bg-[#E6E9ED] overflow-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(#BDC5CC 1.2px, transparent 1.2px)',
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
        cursor: isPanning ? 'grabbing' : 'default',
      }}
      onMouseDown={handleMouseDownCanvas}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => {
        if (!hasMovedDuringPan) {
          selectComponent(null);
          selectWire(null);
          if (activeWireDraft) cancelWireDraft();
        }
      }}
    >
      <div
        className="absolute top-3 left-3 z-30 flex flex-col bg-white/95 backdrop-blur-sm border border-[#CFD4D9] rounded-md shadow-md overflow-hidden text-[#444444]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleFitToView}
          className="p-2 hover:bg-[#E8ECEF] active:bg-[#D5DCE1] transition-colors border-b border-[#E0E4E8]"
          title="Fit view to components (F)"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z * 1.15))}
          className="p-2 hover:bg-[#E8ECEF] active:bg-[#D5DCE1] transition-colors border-b border-[#E0E4E8]"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.4, z / 1.15))}
          className="p-2 hover:bg-[#E8ECEF] active:bg-[#D5DCE1] transition-colors border-b border-[#E0E4E8]"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFitToView}
          className="p-2 hover:bg-[#E8ECEF] active:bg-[#D5DCE1] transition-colors"
          title="Reset & Fit View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="py-1 px-1.5 text-[9px] font-bold text-center text-[#777777] bg-[#F4F6F8] border-t border-[#E0E4E8]">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      <div
        className="absolute inset-0 origin-top-left"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '100%',
          height: '100%',
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {wires.map((wire) => {
            const p1 = getPinInfo(wire.fromComponentId, wire.fromPinId);
            const p2 = getPinInfo(wire.toComponentId, wire.toPinId);
            const isSelected = selectedWireId === wire.id;

            const pathD = generateOrthogonalWirePath(p1, p2, wire.waypoints);

            return (
              <g
                key={wire.id}
                className="pointer-events-auto cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  selectComponent(null);
                  selectWire(wire.id);
                }}
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {isSelected && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#2979FF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                    className="animate-pulse"
                  />
                )}

                <path
                  d={pathD}
                  fill="none"
                  stroke="#000000"
                  strokeOpacity="0.22"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d={pathD}
                  fill="none"
                  stroke={wire.color || '#FF0000'}
                  strokeWidth={isSelected ? '4' : '3.5'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all group-hover:stroke-opacity-80"
                />

                <circle cx={p1.x} cy={p1.y} r="3.5" fill="#222" stroke="#FFF" strokeWidth="1" />
                <circle cx={p2.x} cy={p2.y} r="3.5" fill="#222" stroke="#FFF" strokeWidth="1" />
              </g>
            );
          })}

          {activeWireDraft && (
            <g>
              <path
                d={`M ${activeWireDraft.fromX} ${activeWireDraft.fromY} L ${activeWireDraft.toX} ${activeWireDraft.toY}`}
                fill="none"
                stroke={selectedWireColor || '#FF0000'}
                strokeWidth="3.5"
                strokeDasharray="5 4"
                className="animate-pulse"
              />
              <circle cx={activeWireDraft.fromX} cy={activeWireDraft.fromY} r="4" fill={selectedWireColor || '#FF0000'} />
              <circle cx={activeWireDraft.toX} cy={activeWireDraft.toY} r="3" fill="#00E676" />
            </g>
          )}
        </svg>

        {components.map((comp) => {
          const isBoard = comp.typeId.startsWith('board-');
          const boardDef = isBoard ? BoardRegistry.getBoard(comp.typeId) : null;
          const compDef = !isBoard ? ComponentRegistry.getComponent(comp.typeId) : null;
          const isSelected = selectedComponentId === comp.id;
          const isPowered = isComponentPowered(comp.id);

          return (
            <div
              key={comp.id}
              onMouseDown={(e) => handleMouseDownComp(e, comp.id, comp.position.x, comp.position.y)}
              onClick={(e) => {
                e.stopPropagation();
                selectWire(null);
                selectComponent(comp.id);
              }}
              style={{
                left: `${comp.position.x}px`,
                top: `${comp.position.y}px`,
              }}
              className={`absolute z-20 transition-all ${
                isSelected
                  ? 'ring-2 ring-[#00BCD4] ring-offset-2 ring-offset-transparent shadow-xl rounded-lg'
                  : 'hover:ring-1 hover:ring-[#90CAF9]/50 rounded-lg'
              } cursor-grab active:cursor-grabbing`}
            >
              {isBoard && boardDef && (
                <TinkercadRealisticBoard
                  boardDef={boardDef}
                  label={comp.label}
                  isSimulating={isSimulating}
                  rotation={comp.rotation}
                  onPinClick={(e, pinId, pinLabel, px, py) => handlePinClick(e, comp.id, pinId, px, py)}
                  hoveredPinId={hoveredPinId}
                  setHoveredPinId={setHoveredPinId}
                />
              )}

              {!isBoard && compDef && (
                <TinkercadRealisticComponent
                  componentId={comp.id}
                  compDef={compDef}
                  properties={comp.properties}
                  onPropertyChange={(key, val) => updateComponentProperty(comp.id, key, val)}
                  isSimulating={isSimulating}
                  isPowered={isPowered}
                  rotation={comp.rotation}
                  onPinClick={(e, pinId, pinLabel, px, py) => handlePinClick(e, comp.id, pinId, px, py)}
                  hoveredPinId={hoveredPinId}
                  setHoveredPinId={setHoveredPinId}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
