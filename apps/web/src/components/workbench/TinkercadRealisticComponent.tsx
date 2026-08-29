import React from 'react';
import { ComponentDefinition } from '@circuit/shared';
import { useSimulationStore } from '../../store/useSimulationStore';

interface ComponentProps {
  componentId?: string;
  compDef: ComponentDefinition;
  properties: Record<string, any>;
  onPropertyChange: (key: string, value: any) => void;
  isSimulating: boolean;
  isPowered?: boolean;
  rotation?: number;
  onPinClick: (e: React.MouseEvent, pinId: string, pinLabel: string, pinX: number, pinY: number) => void;
  hoveredPinId: string | null;
  setHoveredPinId: (id: string | null) => void;
}

export const TinkercadRealisticComponent: React.FC<ComponentProps> = ({
  componentId,
  compDef,
  properties,
  onPropertyChange,
  isSimulating,
  isPowered = false,
  rotation = 0,
  onPinClick,
  hoveredPinId,
  setHoveredPinId,
}) => {
  const { id } = compDef;
  const isLedLit = isSimulating && isPowered;

  // 1. Resistor (Compact 100x30)
  if (id === 'resistor') {
    const resistance = properties.resistance ?? 220;
    const getBands = (ohms: number) => {
      if (ohms === 220) return ['#D32F2F', '#D32F2F', '#795548', '#FFD700'];
      if (ohms === 1000 || ohms === 1000) return ['#795548', '#000000', '#D32F2F', '#FFD700'];
      if (ohms === 10000) return ['#795548', '#000000', '#FF9800', '#FFD700'];
      if (ohms === 330) return ['#FF9800', '#FF9800', '#795548', '#FFD700'];
      return ['#D32F2F', '#D32F2F', '#795548', '#FFD700'];
    };

    const bands = getBands(resistance);
    const pin1 = { id: 'pin1', label: 'Terminal 1', x: 6, y: 15 };
    const pin2 = { id: 'pin2', label: 'Terminal 2', x: 94, y: 15 };

    return (
      <div
        className="relative select-none"
        style={{
          width: '100px',
          height: '30px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 100 30" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Metal Wire Leads */}
          <line x1="6" y1="15" x2="26" y2="15" stroke="#B0BEC5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="74" y1="15" x2="94" y2="15" stroke="#B0BEC5" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ceramic Body */}
          <path
            d="M 26,8 C 26,5 33,5 36,7 L 64,7 C 67,5 74,5 74,8 L 74,22 C 74,25 67,25 64,23 L 36,23 C 33,25 26,25 26,22 Z"
            fill="#EAD9B8"
            stroke="#C4A47C"
            strokeWidth="1.2"
          />
          {/* Color Bands */}
          <rect x="35" y="7" width="4.5" height="16" fill={bands[0]} rx="0.5" />
          <rect x="43" y="8" width="4.5" height="14" fill={bands[1]} rx="0.5" />
          <rect x="51" y="8" width="4.5" height="14" fill={bands[2]} rx="0.5" />
          <rect x="63" y="7" width="4.5" height="16" fill={bands[3]} rx="0.5" />

          {/* Pin 1 Terminal */}
          <g
            className="cursor-pointer"
            onClick={(e) => onPinClick(e, pin1.id, pin1.label, pin1.x, pin1.y)}
            onMouseEnter={() => setHoveredPinId(pin1.id)}
            onMouseLeave={() => setHoveredPinId(null)}
          >
            <circle cx={pin1.x} cy={pin1.y} r="4" fill="#78909C" stroke="#37474F" strokeWidth="1" />
            {hoveredPinId === pin1.id && (
              <circle cx={pin1.x} cy={pin1.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
            )}
          </g>

          {/* Pin 2 Terminal */}
          <g
            className="cursor-pointer"
            onClick={(e) => onPinClick(e, pin2.id, pin2.label, pin2.x, pin2.y)}
            onMouseEnter={() => setHoveredPinId(pin2.id)}
            onMouseLeave={() => setHoveredPinId(null)}
          >
            <circle cx={pin2.x} cy={pin2.y} r="4" fill="#78909C" stroke="#37474F" strokeWidth="1" />
            {hoveredPinId === pin2.id && (
              <circle cx={pin2.x} cy={pin2.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
            )}
          </g>
        </svg>
      </div>
    );
  }

  // 2. 5mm LED Bulb (Compact 40x72)
  if (id === 'led') {
    const color = properties.color ?? 'RED';
    const colorMap: Record<string, { off: string; on: string; glow: string }> = {
      RED: { off: '#8B0000', on: '#FF1744', glow: 'rgba(255, 23, 68, 0.85)' },
      GREEN: { off: '#006400', on: '#00E676', glow: 'rgba(0, 230, 118, 0.85)' },
      BLUE: { off: '#00008B', on: '#2979FF', glow: 'rgba(41, 121, 255, 0.85)' },
      YELLOW: { off: '#B8860B', on: '#FFD600', glow: 'rgba(255, 214, 0, 0.85)' },
      WHITE: { off: '#D3D3D3', on: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.95)' },
    };

    const currentPalette = colorMap[color] || colorMap.RED;
    const bulbColor = isLedLit ? currentPalette.on : currentPalette.off;

    const anode = { id: 'anode', label: 'Anode (+)', x: 14, y: 68 };
    const cathode = { id: 'cathode', label: 'Cathode (-)', x: 26, y: 68 };

    return (
      <div
        className="relative select-none"
        style={{
          width: '40px',
          height: '72px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 40 72" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Anode Lead */}
          <path d="M 16,35 L 16,50 L 14,58 L 14,68" fill="none" stroke="#B0BEC5" strokeWidth="2.2" strokeLinecap="round" />
          {/* Cathode Lead */}
          <path d="M 26,35 L 26,68" fill="none" stroke="#B0BEC5" strokeWidth="2.2" strokeLinecap="round" />

          {/* Active Glow Halo */}
          {isLedLit && (
            <circle cx="20" cy="18" r="22" fill={currentPalette.on} fillOpacity="0.35" filter="blur(5px)" />
          )}

          {/* Bulb Dome Lens */}
          <path
            d="M 10,18 C 10,6 30,6 30,18 L 30,33 C 30,35 32,36 32,37 L 8,37 C 8,36 10,35 10,33 Z"
            fill={bulbColor}
            fillOpacity="0.88"
            stroke={isLedLit ? '#FFFFFF' : '#333333'}
            strokeWidth="1.2"
          />
          {/* Internal Anvil & Post */}
          <path d="M 15,24 L 18,18 L 22,24 Z" fill="#FFFFFF" fillOpacity="0.55" />
          <path d="M 22,20 L 25,29" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.55" />
          {/* Gloss Highlight */}
          <path d="M 13,14 C 13,8 21,7 25,8" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />

          {/* Anode Terminal */}
          <g
            className="cursor-pointer"
            onClick={(e) => onPinClick(e, anode.id, anode.label, anode.x, anode.y)}
            onMouseEnter={() => setHoveredPinId(anode.id)}
            onMouseLeave={() => setHoveredPinId(null)}
          >
            <circle cx={anode.x} cy={anode.y} r="3.5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
            {hoveredPinId === anode.id && (
              <circle cx={anode.x} cy={anode.y} r="6.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
            )}
          </g>

          {/* Cathode Terminal */}
          <g
            className="cursor-pointer"
            onClick={(e) => onPinClick(e, cathode.id, cathode.label, cathode.x, cathode.y)}
            onMouseEnter={() => setHoveredPinId(cathode.id)}
            onMouseLeave={() => setHoveredPinId(null)}
          >
            <circle cx={cathode.x} cy={cathode.y} r="3.5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
            {hoveredPinId === cathode.id && (
              <circle cx={cathode.x} cy={cathode.y} r="6.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
            )}
          </g>
        </svg>
      </div>
    );
  }

  // 3. RGB LED (Proportional 60x95)
  if (id === 'rgb-led') {
    const rPin = { id: 'r', label: 'Red (R)', x: 14, y: 88 };
    const cathodePin = { id: 'cathode', label: 'Cathode (-)', x: 24, y: 92 };
    const gPin = { id: 'g', label: 'Green (G)', x: 36, y: 88 };
    const bPin = { id: 'b', label: 'Blue (B)', x: 46, y: 88 };

    return (
      <div
        className="relative select-none"
        style={{ width: '60px', height: '95px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 60 95" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="14" y1="44" x2="14" y2="88" stroke="#B0BEC5" strokeWidth="2" />
          <line x1="24" y1="44" x2="24" y2="92" stroke="#B0BEC5" strokeWidth="2.5" />
          <line x1="36" y1="44" x2="36" y2="88" stroke="#B0BEC5" strokeWidth="2" />
          <line x1="46" y1="44" x2="46" y2="88" stroke="#B0BEC5" strokeWidth="2" />

          {/* Translucent Bulb */}
          <path
            d="M 16,22 C 16,8 44,8 44,22 L 44,42 C 44,44 46,45 46,46 L 14,46 C 14,45 16,44 16,42 Z"
            fill="#F8FAFC"
            fillOpacity="0.85"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          {/* Tri-Color Dies */}
          <circle cx="23" cy="28" r="2.5" fill="#FF1744" opacity="0.8" />
          <circle cx="30" cy="24" r="2.5" fill="#00E676" opacity="0.8" />
          <circle cx="37" cy="28" r="2.5" fill="#2979FF" opacity="0.8" />

          {[rPin, cathodePin, gPin, bPin].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 4. Pushbutton (Proportional 60x60)
  if (id === 'pushbutton') {
    const isPressed = properties.isPressed ?? false;
    const pin1a = { id: 'pin1a', label: 'Terminal 1a', x: 6, y: 15 };
    const pin1b = { id: 'pin1b', label: 'Terminal 1b', x: 6, y: 45 };
    const pin2a = { id: 'pin2a', label: 'Terminal 2a', x: 54, y: 15 };
    const pin2b = { id: 'pin2b', label: 'Terminal 2b', x: 54, y: 45 };
    const pins = [pin1a, pin1b, pin2a, pin2b];

    return (
      <div
        className="relative select-none"
        style={{
          width: '60px',
          height: '60px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Metal Side Lead Legs */}
          <line x1="6" y1="15" x2="14" y2="15" stroke="#B0BEC5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="45" x2="14" y2="45" stroke="#B0BEC5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="15" x2="54" y2="15" stroke="#B0BEC5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="46" y1="45" x2="54" y2="45" stroke="#B0BEC5" strokeWidth="2.5" strokeLinecap="round" />

          {/* Switch Base */}
          <rect x="14" y="10" width="32" height="40" rx="3" fill="#263238" stroke="#101820" strokeWidth="1.2" />
          <rect x="17" y="13" width="26" height="34" rx="2" fill="#B0BEC5" />
          {/* Circular Plunger Actuator */}
          <circle
            cx="30"
            cy="30"
            r={isPressed ? '9' : '11'}
            fill={isPressed ? '#1565C0' : '#212121'}
            stroke="#0D47A1"
            strokeWidth={isPressed ? '1.5' : '0'}
            className="cursor-pointer transition-all active:scale-90"
            onClick={() => onPropertyChange('isPressed', !isPressed)}
          />

          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="3.5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 5. Potentiometer
  if (id === 'potentiometer') {
    const pin1 = { id: 'term1', label: 'Terminal 1', x: 20, y: 110 };
    const wiper = { id: 'wiper', label: 'Wiper', x: 55, y: 110 };
    const pin2 = { id: 'term2', label: 'Terminal 2', x: 90, y: 110 };
    const pins = [pin1, wiper, pin2];

    return (
      <div
        className="relative select-none"
        style={{
          width: '110px',
          height: '120px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 110 120" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="20" y1="70" x2="20" y2="110" stroke="#90A4AE" strokeWidth="3" />
          <line x1="55" y1="70" x2="55" y2="110" stroke="#90A4AE" strokeWidth="3" />
          <line x1="90" y1="70" x2="90" y2="110" stroke="#90A4AE" strokeWidth="3" />
          <circle cx="55" cy="45" r="35" fill="#0288D1" stroke="#01579B" strokeWidth="2" />
          <circle cx="55" cy="45" r="24" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1" />
          <line x1="55" y1="45" x2="55" y2="25" stroke="#D32F2F" strokeWidth="3" strokeLinecap="round" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="9" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 6. SG90 Micro Servo (Tinkercad 1:1 Style)
  if (id === 'servo') {
    const angle = properties.angle ?? 90;
    const gnd = { id: 'gnd', label: 'GND (Brown)', x: 30, y: 155 };
    const vcc = { id: 'vcc', label: 'VCC 5V (Red)', x: 45, y: 155 };
    const sig = { id: 'signal', label: 'Signal (Orange)', x: 60, y: 155 };
    const pins = [gnd, vcc, sig];

    return (
      <div
        className="relative select-none"
        style={{
          width: '100px',
          height: '180px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Top 3-Pin Cable Plug (Black Connector Block) */}
          <g id="servo-plug" transform="translate(36, 10)">
            <rect x="0" y="0" width="28" height="24" rx="2" fill="#18181B" stroke="#09090B" strokeWidth="1" />
            <circle cx="6" cy="12" r="2.5" fill="#795548" />
            <circle cx="14" cy="12" r="2.5" fill="#DC2626" />
            <circle cx="22" cy="12" r="2.5" fill="#F97316" />
          </g>

          {/* 3 Colored Ribbon Wires */}
          <path d="M 42,34 L 42,65" stroke="#795548" strokeWidth="3" />
          <path d="M 50,34 L 50,65" stroke="#DC2626" strokeWidth="3" />
          <path d="M 58,34 L 58,65" stroke="#F97316" strokeWidth="3" />

          {/* Blue Servo Body Housing */}
          <rect x="30" y="65" width="40" height="85" rx="3" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          {/* Side Mounting Flanges with Screw Slots */}
          <rect x="18" y="95" width="64" height="12" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          <circle cx="24" cy="101" r="2.5" fill="#F8FAFC" />
          <circle cx="76" cy="101" r="2.5" fill="#F8FAFC" />

          {/* White Cross-Arm Servo Horn (Rotatable) */}
          <g transform={`translate(50, 80) rotate(${angle})`}>
            {/* Long Vertical Arm */}
            <rect x="-4" y="-36" width="8" height="72" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            {/* Horizontal Cross Arm */}
            <rect x="-16" y="-4" width="32" height="8" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            {/* Center Boss & Mounting Screw */}
            <circle cx="0" cy="0" r="9" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="4" fill="#334155" />
            <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#CBD5E1" strokeWidth="1" />
            {/* Perforated Holes along the arms */}
            <circle cx="0" cy="-28" r="1.5" fill="#94A3B8" />
            <circle cx="0" cy="-20" r="1.5" fill="#94A3B8" />
            <circle cx="0" cy="-12" r="1.5" fill="#94A3B8" />
            <circle cx="0" cy="12" r="1.5" fill="#94A3B8" />
            <circle cx="0" cy="20" r="1.5" fill="#94A3B8" />
            <circle cx="0" cy="28" r="1.5" fill="#94A3B8" />
            <circle cx="-10" cy="0" r="1.5" fill="#94A3B8" />
            <circle cx="10" cy="0" r="1.5" fill="#94A3B8" />
          </g>

          {/* Solder / Wire Pins */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#1E293B" stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 7. PING))) Ultrasonic Sensor (Tinkercad 1:1 Style)
  if (id === 'ultrasonic-hcsr04') {
    const gnd = { id: 'gnd', label: 'GND', x: 70, y: 115 };
    const vcc = { id: 'vcc', label: '5V Power', x: 95, y: 115 };
    const sig = { id: 'trig', label: 'SIG (Signal)', x: 120, y: 115 };
    const pins = [gnd, vcc, sig];

    return (
      <div
        className="relative select-none"
        style={{
          width: '190px',
          height: '120px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 190 120" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Teal PCB Board with Rounded Corners & Mounting Holes */}
          <rect x="10" y="15" width="170" height="85" rx="6" fill="#0F766E" stroke="#115E59" strokeWidth="2" />
          {/* 4 Corner Screw Holes */}
          <circle cx="20" cy="25" r="4" fill="#0D9488" stroke="#134E4A" strokeWidth="1" />
          <circle cx="170" cy="25" r="4" fill="#0D9488" stroke="#134E4A" strokeWidth="1" />
          <circle cx="20" cy="90" r="4" fill="#0D9488" stroke="#134E4A" strokeWidth="1" />
          <circle cx="170" cy="90" r="4" fill="#0D9488" stroke="#134E4A" strokeWidth="1" />

          {/* Left Transducer Cylinder Can */}
          <circle cx="52" cy="55" r="28" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="52" cy="55" r="20" fill="#CA8A04" fillOpacity="0.8" stroke="#A16207" strokeWidth="1.5" />
          <circle cx="52" cy="55" r="12" fill="#0F172A" />

          {/* Right Transducer Cylinder Can */}
          <circle cx="138" cy="55" r="28" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="138" cy="55" r="20" fill="#CA8A04" fillOpacity="0.8" stroke="#A16207" strokeWidth="1.5" />
          <circle cx="138" cy="55" r="12" fill="#0F172A" />

          {/* Center Brand & Labels */}
          <text x="95" y="32" fill="#F0FDFA" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">28015 REV C</text>
          <text x="95" y="42" fill="#CCFBF1" fontSize="5.5" fontFamily="monospace" textAnchor="middle">WWW.PARALLAX.COM</text>
          <text x="95" y="60" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">PING)))</text>
          <text x="95" y="85" fill="#CCFBF1" fontSize="6" fontFamily="monospace" textAnchor="middle">GND 5V SIG</text>

          {/* 3 Header Pins */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <line x1={pin.x} y1={100} x2={pin.x} y2={pin.y} stroke="#94A3B8" strokeWidth="2.5" />
              <circle cx={pin.x} cy={pin.y} r="4" fill="#334155" stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 8. Piezo Buzzer (Tinkercad 1:1 Style)
  if (id === 'buzzer') {
    const pos = { id: 'positive', label: 'Positive (+)', x: 22, y: 70 };
    const neg = { id: 'negative', label: 'Negative (-)', x: 78, y: 70 };
    const pins = [pos, neg];

    return (
      <div
        className="relative select-none"
        style={{ width: '100px', height: '100px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
          {/* Main Dark Charcoal Housing */}
          <circle cx="50" cy="50" r="38" fill="#27272A" stroke="#18181B" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="#3F3F46" />
          <circle cx="50" cy="50" r="28" fill="#27272A" />
          {/* Golden Brass Resonator Core Disc */}
          <circle cx="50" cy="50" r="14" fill="#D97706" stroke="#B45309" strokeWidth="1" />
          <circle cx="50" cy="50" r="4.5" fill="#09090B" />

          {/* Left (+) and Right (-) Markings */}
          <text x="26" y="54" fill="#94A3B8" fontSize="13" fontWeight="900" textAnchor="middle">+</text>
          <text x="74" y="54" fill="#94A3B8" fontSize="15" fontWeight="900" textAnchor="middle">-</text>

          {/* Terminals */}
          {[pos, neg].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 9. LCD 1602 Display (I2C)
  if (id === 'lcd1602') {
    const gnd = { id: 'gnd', label: 'GND', x: 25, y: 95 };
    const vcc = { id: 'vcc', label: 'VCC', x: 45, y: 95 };
    const sda = { id: 'sda', label: 'SDA', x: 65, y: 95 };
    const scl = { id: 'scl', label: 'SCL', x: 85, y: 95 };
    const pins = [gnd, vcc, sda, scl];

    return (
      <div
        className="relative select-none"
        style={{ width: '220px', height: '110px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 220 110" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="5" width="210" height="85" rx="4" fill="#065F46" stroke="#047857" strokeWidth="2" />
          <rect x="25" y="15" width="170" height="55" rx="3" fill="#10B981" stroke="#047857" strokeWidth="1" />
          <rect x="30" y="20" width="160" height="20" fill="#064E3B" opacity="0.6" />
          <rect x="30" y="45" width="160" height="20" fill="#064E3B" opacity="0.6" />
          <text x="35" y="34" fill="#6EE7B7" fontSize="10" fontFamily="monospace" fontWeight="bold">
            {isSimulating ? 'Tinkercad LCD1602' : 'System Standby'}
          </text>
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <rect x={pin.x - 4} y={pin.y - 12} width="8" height="16" fill="#B0BEC5" />
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#37474F" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 10. OLED SSD1306 0.96" Display
  if (id === 'oled-ssd1306') {
    const gnd = { id: 'gnd', label: 'GND', x: 35, y: 110 };
    const vcc = { id: 'vcc', label: 'VCC', x: 65, y: 110 };
    const scl = { id: 'scl', label: 'SCL', x: 95, y: 110 };
    const sda = { id: 'sda', label: 'SDA', x: 125, y: 110 };
    const pins = [gnd, vcc, scl, sda];

    return (
      <div
        className="relative select-none"
        style={{ width: '160px', height: '120px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="5" width="150" height="95" rx="5" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
          <rect x="15" y="15" width="130" height="70" rx="3" fill="#000000" stroke="#0284C7" strokeWidth="1" />
          <text x="80" y="45" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            {isSimulating ? 'OLED ONLINE' : 'SSD1306 Ready'}
          </text>
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <rect x={pin.x - 4} y={pin.y - 12} width="8" height="16" fill="#B0BEC5" />
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#37474F" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 11. Relay Module
  if (id === 'relay') {
    const vcc = { id: 'vcc', label: 'VCC', x: 25, y: 110 };
    const gnd = { id: 'gnd', label: 'GND', x: 50, y: 110 };
    const inPin = { id: 'in', label: 'IN', x: 75, y: 110 };
    const pins = [vcc, gnd, inPin];

    return (
      <div
        className="relative select-none"
        style={{ width: '150px', height: '120px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 150 120" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="5" width="140" height="95" rx="4" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="2" />
          <rect x="20" y="15" width="75" height="70" rx="3" fill="#2563EB" stroke="#60A5FA" strokeWidth="1" />
          <text x="57" y="45" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">5V RELAY</text>
          <rect x="105" y="15" width="30" height="70" fill="#1E293B" rx="2" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="9" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 12. ESP32-CAM / OV2640 Camera Module
  if (id === 'camera-ov2640') {
    const pins = [
      { id: '5v', label: '5V', x: 20, y: 190 },
      { id: 'gnd', label: 'GND', x: 45, y: 190 },
      { id: 'gpio12', label: 'IO12', x: 70, y: 190 },
      { id: 'gpio13', label: 'IO13', x: 95, y: 190 },
      { id: 'gpio14', label: 'IO14', x: 120, y: 190 },
      { id: 'gpio15', label: 'IO15', x: 145, y: 190 },
      { id: 'gpio2', label: 'IO2', x: 170, y: 190 },
      { id: 'gpio4', label: 'IO4 (Flash)', x: 195, y: 190 },
      { id: 'tx', label: 'TX', x: 220, y: 190 },
      { id: 'rx', label: 'RX', x: 245, y: 190 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '270px', height: '200px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 270 200" className="w-full h-full drop-shadow-2xl overflow-visible">
          {/* Main PCB Board */}
          <rect x="5" y="10" width="260" height="175" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="2" />
          <rect x="15" y="20" width="130" height="90" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
          <text x="80" y="40" fill="#38BDF8" fontSize="10" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            ESP32-CAM
          </text>
          <text x="80" y="55" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle">
            AI-THINKER
          </text>

          {/* Golden Flexible Ribbon Cable */}
          <path d="M 170,40 L 220,40 L 220,105 L 170,105 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <line x1="175" y1="45" x2="215" y2="45" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="175" y1="55" x2="215" y2="55" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 2" />

          {/* OV2640 Camera Lens Sensor */}
          <rect x="160" y="30" width="70" height="70" rx="6" fill="#09090B" stroke="#3F3F46" strokeWidth="1.5" />
          <circle cx="195" cy="65" r="26" fill="#18181B" stroke="#52525B" strokeWidth="2" />
          <circle cx="195" cy="65" r="18" fill="#09090B" />
          <circle cx="195" cy="65" r="10" fill="#0284C7" fillOpacity="0.8" />
          <circle cx="192" cy="62" r="3" fill="#FFFFFF" fillOpacity="0.8" />
          <text x="195" y="112" fill="#E2E8F0" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            OV2640 2MP
          </text>

          {/* Ultra-Bright Flash LED */}
          <rect x="25" y="70" width="20" height="20" rx="2" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
          <circle cx="35" cy="80" r="6" fill="#FACC15" />
          <text x="50" y="83" fill="#94A3B8" fontSize="7" fontWeight="bold">FLASH</text>

          {/* MicroSD Card Slot */}
          <rect x="80" y="70" width="60" height="50" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

          {/* Bottom Header Bar */}
          <rect x="10" y="180" width="250" height="15" rx="2" fill="#18181B" stroke="#09090B" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" stroke="#333" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 13. MQ-2 Gas & Smoke Sensor
  if (id === 'mq2-gas-sensor') {
    const pins = [
      { id: 'vcc', label: 'VCC (5V)', x: 30, y: 155 },
      { id: 'gnd', label: 'GND', x: 55, y: 155 },
      { id: 'do', label: 'DO', x: 80, y: 155 },
      { id: 'ao', label: 'AO', x: 105, y: 155 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '140px', height: '165px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 140 165" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Blue Breakout PCB */}
          <rect x="5" y="5" width="130" height="145" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          {/* Metal Mesh Gas Chamber Dome */}
          <circle cx="70" cy="65" r="42" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="70" cy="65" r="34" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="70" cy="65" r="22" fill="#94A3B8" />
          <text x="70" y="69" fill="#0F172A" fontSize="10" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            MQ-2
          </text>
          {/* Sensitivity Trimpot */}
          <rect x="25" y="115" width="22" height="22" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          <circle cx="36" cy="126" r="6" fill="#E2E8F0" />
          {/* Status LEDs */}
          <circle cx="85" cy="126" r="3.5" fill="#22C55E" filter="drop-shadow(0px 0px 4px #22C55E)" />
          <circle cx="105" cy="126" r="3.5" fill={isSimulating ? '#EF4444' : '#444'} />

          {/* Bottom Header */}
          <rect x="15" y="145" width="110" height="15" rx="2" fill="#18181B" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" stroke="#333" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 14. DHT22 (AM2302) Temperature & Humidity Sensor
  if (id === 'dht22') {
    const pins = [
      { id: 'vcc', label: 'VCC (3.3V-5V)', x: 25, y: 155 },
      { id: 'data', label: 'DATA', x: 50, y: 155 },
      { id: 'nc', label: 'NC', x: 75, y: 155 },
      { id: 'gnd', label: 'GND', x: 100, y: 155 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '130px', height: '165px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 130 165" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* White Plastic Grid Enclosure */}
          <rect x="10" y="5" width="110" height="140" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <text x="65" y="30" fill="#334155" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            DHT22
          </text>
          <text x="65" y="42" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">
            AM2302
          </text>
          {/* Sensor Vent Grids */}
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`translate(25, ${52 + i * 16})`}>
              <rect x="0" y="0" width="80" height="8" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
              <rect x="4" y="2" width="72" height="4" fill="#475569" />
            </g>
          ))}
          {/* Pin Header Leads */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <line x1={pin.x} y1={145} x2={pin.x} y2={pin.y} stroke="#94A3B8" strokeWidth="3" />
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" stroke="#333" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 15. DHT11 Sensor
  if (id === 'dht11') {
    const pins = [
      { id: 'vcc', label: 'VCC (5V)', x: 25, y: 145 },
      { id: 'data', label: 'DATA', x: 50, y: 145 },
      { id: 'nc', label: 'NC', x: 75, y: 145 },
      { id: 'gnd', label: 'GND', x: 100, y: 145 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '125px', height: '155px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 125 155" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Blue Plastic Housing */}
          <rect x="10" y="5" width="105" height="130" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <text x="62" y="32" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            DHT11
          </text>
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x="25" y={48 + i * 16} width="75" height="8" rx="2" fill="#0369A1" />
          ))}
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <line x1={pin.x} y1={135} x2={pin.x} y2={pin.y} stroke="#94A3B8" strokeWidth="3" />
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 16. MPU6050 6-Axis Gyroscope & Accelerometer
  if (id === 'mpu6050') {
    const pins = [
      { id: 'vcc', label: 'VCC (3.3V-5V)', x: 15, y: 155 },
      { id: 'gnd', label: 'GND', x: 35, y: 155 },
      { id: 'scl', label: 'SCL', x: 55, y: 155 },
      { id: 'sda', label: 'SDA', x: 75, y: 155 },
      { id: 'xda', label: 'XDA', x: 95, y: 155 },
      { id: 'xcl', label: 'XCL', x: 115, y: 155 },
      { id: 'ad0', label: 'AD0', x: 135, y: 155 },
      { id: 'int', label: 'INT', x: 155, y: 155 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '175px', height: '165px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 175 165" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Blue PCB */}
          <rect x="5" y="10" width="165" height="135" rx="6" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="2" />
          {/* MPU6050 Chip */}
          <rect x="62" y="45" width="50" height="50" rx="3" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
          <text x="87" y="72" fill="#E2E8F0" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            MPU6050
          </text>
          <text x="87" y="115" fill="#93C5FD" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            GY-521 6-DOF
          </text>
          {/* Power LED */}
          <circle cx="140" cy="30" r="3.5" fill="#EF4444" filter="drop-shadow(0px 0px 4px #EF4444)" />
          {/* Bottom Header Pins */}
          <rect x="8" y="145" width="158" height="15" rx="2" fill="#18181B" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4" fill="#E4E4E7" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="7.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 17. Soil Moisture Sensor (Tinkercad 1:1 Style)
  if (id === 'soil-moisture') {
    const vcc = { id: 'vcc', label: 'VCC (+5V)', x: 30, y: 15 };
    const gnd = { id: 'gnd', label: 'GND', x: 50, y: 15 };
    const sig = { id: 'ao', label: 'SIG (Analog)', x: 70, y: 15 };
    const pins = [vcc, gnd, sig];

    return (
      <div
        className="relative select-none"
        style={{ width: '100px', height: '200px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Red PCB Top Head */}
          <path
            d="M 15,10 L 85,10 A 8,8 0 0 1 93,18 L 93,65 L 7,65 L 7,18 A 8,8 0 0 1 15,10 Z"
            fill="#DC2626"
            stroke="#B91C1C"
            strokeWidth="1.5"
          />
          {/* Top 3 Header Pad Holes */}
          <circle cx="30" cy="18" r="4.5" fill="#CA8A04" stroke="#713F12" strokeWidth="1" />
          <circle cx="30" cy="18" r="2.5" fill="#18181B" />
          <circle cx="50" cy="18" r="4.5" fill="#CA8A04" stroke="#713F12" strokeWidth="1" />
          <circle cx="50" cy="18" r="2.5" fill="#18181B" />
          <circle cx="70" cy="18" r="4.5" fill="#CA8A04" stroke="#713F12" strokeWidth="1" />
          <circle cx="70" cy="18" r="2.5" fill="#18181B" />

          {/* White SMD Components on Red Head */}
          <rect x="42" y="28" width="16" height="12" rx="1.5" fill="#FFFFFF" />
          <rect x="25" y="32" width="6" height="4" fill="#E2E8F0" />
          <rect x="69" y="32" width="6" height="4" fill="#E2E8F0" />
          <circle cx="82" cy="30" r="3" fill="#FFFFFF" />
          {/* Droplet Logo & Text */}
          <text x="50" y="52" fill="#FFFFFF" fontSize="5.5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            Soil Moisture Sensor
          </text>

          {/* Dual Long Fork PCB Probes */}
          {/* Left Fork Prong */}
          <path
            d="M 12,65 L 12,175 L 22,192 L 34,192 L 40,175 L 40,65 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Silver/Gold conductive trace down left probe */}
          <path d="M 20,68 L 20,175 L 28,186 L 32,186 L 32,68" fill="#F8FAFC" stroke="#CA8A04" strokeWidth="1" />

          {/* Right Fork Prong */}
          <path
            d="M 60,65 L 60,175 L 66,192 L 78,192 L 88,175 L 88,65 Z"
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Silver/Gold conductive trace down right probe */}
          <path d="M 68,68 L 68,175 L 72,186 L 80,186 L 80,68" fill="#F8FAFC" stroke="#CA8A04" strokeWidth="1" />

          {/* Clickable Header Pins at Top */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="5" fill="transparent" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 18. IR Obstacle Avoidance Sensor
  if (id === 'ir-obstacle') {
    const pins = [
      { id: 'vcc', label: 'VCC', x: 30, y: 155 },
      { id: 'gnd', label: 'GND', x: 55, y: 155 },
      { id: 'out', label: 'OUT', x: 80, y: 155 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '110px', height: '165px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 110 165" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="25" width="100" height="125" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          {/* IR Emitter (Clear) & Photodiode (Black) */}
          <circle cx="35" cy="20" r="10" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="75" cy="20" r="10" fill="#09090B" stroke="#3F3F46" strokeWidth="1.5" />
          <text x="55" y="65" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">IR SENSOR</text>
          {/* Sensitivity Pot */}
          <rect x="40" y="80" width="30" height="24" rx="3" fill="#2563EB" />
          <circle cx="55" cy="92" r="7" fill="#E2E8F0" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" stroke="#333" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 19. HC-05 Bluetooth Serial Module
  if (id === 'hc05-bluetooth') {
    const pins = [
      { id: 'state', label: 'STATE', x: 25, y: 175 },
      { id: 'rxd', label: 'RXD', x: 50, y: 175 },
      { id: 'txd', label: 'TXD', x: 75, y: 175 },
      { id: 'gnd', label: 'GND', x: 100, y: 175 },
      { id: 'vcc', label: 'VCC', x: 125, y: 175 },
      { id: 'en', label: 'EN', x: 150, y: 175 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '175px', height: '185px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 175 185" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Blue PCB */}
          <rect x="5" y="10" width="165" height="155" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          {/* Bluetooth Metal Shielding Can */}
          <rect x="25" y="45" width="125" height="75" rx="4" fill="#09090B" stroke="#3F3F46" strokeWidth="1.5" />
          <text x="87" y="85" fill="#38BDF8" fontSize="12" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            HC-05 BT
          </text>
          {/* Gold Meandered PCB Antenna */}
          <path d="M 35,25 L 45,25 L 45,35 L 55,35 L 55,25 L 65,25 L 65,35 L 75,35" stroke="#F59E0B" strokeWidth="2" fill="none" />
          {/* State LED */}
          <circle cx="140" cy="28" r="3.5" fill={isSimulating ? '#3B82F6' : '#444'} filter={isSimulating ? 'drop-shadow(0px 0px 5px #3B82F6)' : 'none'} />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" stroke="#333" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 20. L298N Dual H-Bridge Motor Driver
  if (id === 'l298n-motor-driver') {
    const pins = [
      { id: 'ena', label: 'ENA', x: 25, y: 190 },
      { id: 'in1', label: 'IN1', x: 50, y: 190 },
      { id: 'in2', label: 'IN2', x: 75, y: 190 },
      { id: 'in3', label: 'IN3', x: 100, y: 190 },
      { id: 'in4', label: 'IN4', x: 125, y: 190 },
      { id: 'enb', label: 'ENB', x: 150, y: 190 },
      { id: '12v', label: '12V', x: 175, y: 190 },
      { id: 'gnd', label: 'GND', x: 200, y: 190 },
      { id: '5v', label: '5V', x: 225, y: 190 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '250px', height: '200px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 250 200" className="w-full h-full drop-shadow-2xl overflow-visible">
          {/* Iconic Red PCB */}
          <rect x="5" y="10" width="240" height="175" rx="8" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          {/* Big Black Aluminum Heat Sink */}
          <rect x="65" y="25" width="120" height="60" rx="4" fill="#09090B" stroke="#27272A" strokeWidth="2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={i} x1={78 + i * 16} y1="28" x2={78 + i * 16} y2="82" stroke="#3F3F46" strokeWidth="3" />
          ))}
          <text x="125" y="115" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            L298N DUAL DRIVER
          </text>
          {/* Blue Screw Terminals for Motors */}
          <rect x="15" y="45" width="30" height="50" rx="3" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1" />
          <rect x="205" y="45" width="30" height="50" rx="3" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4.5" fill="#E4E4E7" stroke="#333" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 21. RFID-RC522 Contactless Card Reader
  if (id === 'rfid-rc522') {
    const pins = [
      { id: '3v3', label: '3.3V', x: 20, y: 180 },
      { id: 'rst', label: 'RST', x: 40, y: 180 },
      { id: 'gnd', label: 'GND', x: 60, y: 180 },
      { id: 'irq', label: 'IRQ', x: 80, y: 180 },
      { id: 'miso', label: 'MISO', x: 100, y: 180 },
      { id: 'mosi', label: 'MOSI', x: 120, y: 180 },
      { id: 'sck', label: 'SCK', x: 140, y: 180 },
      { id: 'sda', label: 'SDA (SS)', x: 160, y: 180 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '180px', height: '190px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 180 190" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="10" width="170" height="165" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          {/* RFID PCB Antenna Loops */}
          <rect x="25" y="25" width="130" height="90" rx="10" fill="none" stroke="#F59E0B" strokeWidth="2" />
          <rect x="35" y="35" width="110" height="70" rx="8" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="90" y="75" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            RFID-RC522
          </text>
          <text x="90" y="90" fill="#E0F2FE" fontSize="8" fontFamily="monospace" textAnchor="middle">
            13.56 MHz
          </text>
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4" fill="#E4E4E7" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="7.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 22. PIR Motion Sensor (Tinkercad 1:1 Style)
  if (id === 'pir-motion') {
    const gnd = { id: 'gnd', label: 'GND', x: 42, y: 140 };
    const vcc = { id: 'vcc', label: '5V Power', x: 60, y: 140 };
    const out = { id: 'out', label: 'OUT (Signal)', x: 78, y: 140 };
    const pins = [gnd, vcc, out];

    return (
      <div
        className="relative select-none"
        style={{ width: '120px', height: '145px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 120 145" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Green PCB Board */}
          <rect x="8" y="15" width="104" height="110" rx="4" fill="#15803D" stroke="#166534" strokeWidth="1.8" />
          <text x="18" y="55" fill="#DCFCE7" fontSize="5.5" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 18 55)">
            PARALLAX
          </text>
          <text x="100" y="70" fill="#DCFCE7" fontSize="5.5" fontFamily="monospace" fontWeight="bold" transform="rotate(90 100 70)">
            PIR Sensor
          </text>

          {/* White Faceted Fresnel Dome Lens */}
          <circle cx="60" cy="70" r="38" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="60" cy="70" r="30" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="60" cy="70" r="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
          <circle cx="60" cy="70" r="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
          <circle cx="60" cy="70" r="6" fill="#E2E8F0" />
          {/* Radial Facet lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
            const rad = (ang * Math.PI) / 180;
            return (
              <line
                key={`facet-${ang}`}
                x1={60 + 6 * Math.cos(rad)}
                y1={70 + 6 * Math.sin(rad)}
                x2={60 + 38 * Math.cos(rad)}
                y2={70 + 38 * Math.sin(rad)}
                stroke="#CBD5E1"
                strokeWidth="0.8"
              />
            );
          })}

          {/* 3 Bottom Lead Pins */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <line x1={pin.x} y1={125} x2={pin.x} y2={pin.y} stroke="#94A3B8" strokeWidth="2.5" />
              <circle cx={pin.x} cy={pin.y} r="3.5" fill="#334155" stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="7.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 23. Slideswitch (SPDT)
  if (id === 'slideswitch') {
    const isRight = properties.state === 'RIGHT';
    const term1 = { id: 'term1', label: 'Terminal 1', x: 15, y: 38 };
    const common = { id: 'common', label: 'Common (Wiper)', x: 35, y: 38 };
    const term2 = { id: 'term2', label: 'Terminal 2', x: 55, y: 38 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '45px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 45" className="w-full h-full drop-shadow-lg overflow-visible">
          {/* Solder lugs */}
          <line x1="15" y1="28" x2="15" y2="38" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="35" y1="28" x2="35" y2="38" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="55" y1="28" x2="55" y2="38" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Switch body */}
          <rect x="5" y="10" width="60" height="20" rx="3" fill="#212121" stroke="#000" strokeWidth="1.2" />
          {/* Sliding actuator handle */}
          <g
            className="cursor-pointer transition-transform duration-150"
            onClick={() => onPropertyChange('state', isRight ? 'LEFT' : 'RIGHT')}
            transform={`translate(${isRight ? 36 : 14}, 4)`}
          >
            <rect x="0" y="0" width="20" height="14" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
            <line x1="5" y1="3" x2="5" y2="11" stroke="#64748B" strokeWidth="1" />
            <line x1="10" y1="3" x2="10" y2="11" stroke="#64748B" strokeWidth="1" />
            <line x1="15" y1="3" x2="15" y2="11" stroke="#64748B" strokeWidth="1" />
          </g>

          {[term1, common, term2].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#78909C" stroke="#37474F" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 24. Light Bulb (Incandescent with live glow)
  if (id === 'light-bulb') {
    const isLit = isSimulating && isPowered;
    const term1 = { id: 'term1', label: 'Terminal 1', x: 22, y: 78 };
    const term2 = { id: 'term2', label: 'Terminal 2', x: 38, y: 78 };

    return (
      <div
        className="relative select-none"
        style={{ width: '60px', height: '85px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 60 85" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Terminal Leads */}
          <line x1="22" y1="62" x2="22" y2="78" stroke="#90A4AE" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="62" x2="38" y2="78" stroke="#90A4AE" strokeWidth="2.5" strokeLinecap="round" />

          {/* Active Radiant Glow Halo */}
          {isLit && (
            <circle cx="30" cy="28" r="35" fill="#FEF08A" fillOpacity="0.4" filter="blur(8px)" />
          )}

          {/* Glass Bulb Dome */}
          <path
            d="M 12,28 C 12,12 48,12 48,28 C 48,38 40,46 38,54 L 22,54 C 20,46 12,38 12,28 Z"
            fill={isLit ? '#FEF08A' : '#F8FAFC'}
            fillOpacity={isLit ? '0.95' : '0.75'}
            stroke={isLit ? '#F59E0B' : '#CBD5E1'}
            strokeWidth="1.5"
          />
          {/* Internal Tungsten Filament */}
          <path
            d="M 24,40 L 27,24 L 33,24 L 36,40"
            fill="none"
            stroke={isLit ? '#FF0000' : '#64748B'}
            strokeWidth="1.5"
          />
          {/* Metallic Screw Base */}
          <rect x="20" y="54" width="20" height="12" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

          {[term1, term2].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4" fill="#78909C" stroke="#37474F" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 25. 9V Battery (Tinkercad 1:1 Horizontal Style)
  if (id === 'battery-9v') {
    const positive = { id: 'positive', label: 'Positive (+9V)', x: 8, y: 36 };
    const negative = { id: 'negative', label: 'Negative (GND)', x: 8, y: 64 };

    return (
      <div
        className="relative select-none"
        style={{ width: '150px', height: '100px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 150 100" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Snap Terminals on the left */}
          {/* Octagonal Female Terminal (-) */}
          <polygon points="12,60 18,54 26,54 32,60 32,68 26,74 18,74 12,68" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="22" cy="64" r="3.5" fill="#475569" />
          <line x1="8" y1="64" x2="22" y2="64" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />

          {/* Round Male Terminal (+) */}
          <circle cx="22" cy="36" r="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="22" cy="36" r="3.5" fill="#475569" />
          <line x1="8" y1="36" x2="22" y2="36" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />

          {/* Battery Body */}
          {/* Left Orange/Brown Section */}
          <path d="M 28,15 L 60,15 L 60,85 L 28,85 A 4,4 0 0 1 24,81 L 24,19 A 4,4 0 0 1 28,15 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.2" />
          <text x="36" y="38" fill="#78350F" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
          <text x="36" y="66" fill="#78350F" fontSize="13" fontWeight="bold" textAnchor="middle">-</text>

          {/* Right Charcoal/Black Section */}
          <path d="M 60,15 L 140,15 A 4,4 0 0 1 144,19 L 144,81 A 4,4 0 0 1 140,85 L 60,85 Z" fill="#27272A" stroke="#18181B" strokeWidth="1.2" />
          {/* Big White '9V' rotated vertically */}
          <text x="96" y="56" fill="#FFFFFF" fontSize="24" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" transform="rotate(-90 96 56)">
            9V
          </text>

          {/* Interactive Terminals */}
          {[positive, negative].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4.5" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 26. Breadboards (Full 830-point, Small 400-point, Mini 170-point)
  if (id.includes('breadboard')) {
    const isSmall = id === 'breadboard-small';
    const isMini = id === 'breadboard-mini';
    const totalCols = isMini ? 17 : isSmall ? 30 : 63;
    const colSpacing = 9;
    const rowSpacing = 8;
    const leftMargin = 38;
    const width = isMini ? 220 : isSmall ? 340 : 640;
    const height = isMini ? 140 : 180;

    const columnNumbers = isMini
      ? [1, 5, 10, 15, 17]
      : isSmall
      ? [1, 5, 10, 15, 20, 25, 30]
      : [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    const rowsTop = ['a', 'b', 'c', 'd', 'e'];
    const rowsBottom = ['f', 'g', 'h', 'i', 'j'];

    return (
      <div
        className="relative select-none"
        style={{ width: `${width}px`, height: `${height}px`, transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-2xl overflow-visible">
          {/* Outer Plastic Casing with Interlocking Tabs */}
          <rect x="2" y="2" width={width - 4} height={height - 4} rx="8" fill="#F1F3F5" stroke="#CBD5E1" strokeWidth="2" />
          {/* Inner Recessed Face */}
          <rect x="8" y="8" width={width - 16} height={height - 16} rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

          {/* Top Power Rails */}
          {!isMini && (
            <g className="opacity-90">
              {/* Minus (Blue) Rail */}
              <text x="20" y="22" fill="#3B82F6" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">-</text>
              <line x1="28" y1="20" x2={width - 28} y2="20" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3,1" />
              <text x={width - 20} y="22" fill="#3B82F6" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">-</text>

              {/* Plus (Red) Rail */}
              <text x="20" y="34" fill="#EF4444" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">+</text>
              <line x1="28" y1="32" x2={width - 28} y2="32" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3,1" />
              <text x={width - 20} y="34" fill="#EF4444" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">+</text>

              {/* Power Rail Sockets (Top) */}
              {[...Array(totalCols)].map((_, colIdx) => (
                <React.Fragment key={`tp-socket-${colIdx}`}>
                  <rect x={leftMargin + colIdx * colSpacing - 1.2} y="19" width="2.4" height="2.4" rx="0.5" fill="#334155" />
                  <rect x={leftMargin + colIdx * colSpacing - 1.2} y="31" width="2.4" height="2.4" rx="0.5" fill="#334155" />
                </React.Fragment>
              ))}
            </g>
          )}

          {/* Top Column Number Labels */}
          {columnNumbers.map((num) => {
            const cx = leftMargin + (num - 1) * colSpacing;
            return (
              <text key={`top-num-${num}`} x={cx} y={isMini ? 20 : 46} fill="#64748B" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {num}
              </text>
            );
          })}

          {/* Top Row Letters (Left & Right) */}
          {rowsTop.map((rowLetter, rIdx) => {
            const cy = (isMini ? 28 : 55) + rIdx * rowSpacing;
            return (
              <React.Fragment key={`lbl-top-${rowLetter}`}>
                <text x="24" y={cy + 2.5} fill="#64748B" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {rowLetter.toUpperCase()}
                </text>
                <text x={width - 24} y={cy + 2.5} fill="#64748B" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {rowLetter.toUpperCase()}
                </text>
              </React.Fragment>
            );
          })}

          {/* Top Section Terminal Sockets (Rows A - E) */}
          {rowsTop.map((_, rIdx) => {
            const cy = (isMini ? 28 : 55) + rIdx * rowSpacing;
            return [...Array(totalCols)].map((__, colIdx) => {
              const cx = leftMargin + colIdx * colSpacing;
              return (
                <rect key={`sock-t-${rIdx}-${colIdx}`} x={cx - 1.3} y={cy - 1.3} width="2.6" height="2.6" rx="0.5" fill="#1E293B" stroke="#94A3B8" strokeWidth="0.4" />
              );
            });
          })}

          {/* Center Divider Trough */}
          <rect x="16" y={height / 2 - 3.5} width={width - 32} height="7" rx="1.5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />

          {/* Bottom Section Terminal Sockets (Rows F - J) */}
          {rowsBottom.map((_, rIdx) => {
            const cy = height / 2 + 8 + rIdx * rowSpacing;
            return [...Array(totalCols)].map((__, colIdx) => {
              const cx = leftMargin + colIdx * colSpacing;
              return (
                <rect key={`sock-b-${rIdx}-${colIdx}`} x={cx - 1.3} y={cy - 1.3} width="2.6" height="2.6" rx="0.5" fill="#1E293B" stroke="#94A3B8" strokeWidth="0.4" />
              );
            });
          })}

          {/* Bottom Row Letters (Left & Right) */}
          {rowsBottom.map((rowLetter, rIdx) => {
            const cy = height / 2 + 8 + rIdx * rowSpacing;
            return (
              <React.Fragment key={`lbl-btm-${rowLetter}`}>
                <text x="24" y={cy + 2.5} fill="#64748B" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {rowLetter.toUpperCase()}
                </text>
                <text x={width - 24} y={cy + 2.5} fill="#64748B" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {rowLetter.toUpperCase()}
                </text>
              </React.Fragment>
            );
          })}

          {/* Bottom Column Number Labels */}
          {columnNumbers.map((num) => {
            const cx = leftMargin + (num - 1) * colSpacing;
            return (
              <text key={`btm-num-${num}`} x={cx} y={height / 2 + 8 + 4 * rowSpacing + (isMini ? 10 : 12)} fill="#64748B" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {num}
              </text>
            );
          })}

          {/* Bottom Power Rails */}
          {!isMini && (
            <g className="opacity-90">
              {/* Plus (Red) Rail */}
              <text x="20" y={height - 30} fill="#EF4444" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">+</text>
              <line x1="28" y1={height - 32} x2={width - 28} y2={height - 32} stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3,1" />
              <text x={width - 20} y={height - 30} fill="#EF4444" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">+</text>

              {/* Minus (Blue) Rail */}
              <text x="20" y={height - 18} fill="#3B82F6" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">-</text>
              <line x1="28" y1={height - 20} x2={width - 28} y2={height - 20} stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3,1" />
              <text x={width - 20} y={height - 18} fill="#3B82F6" fontSize="11" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">-</text>

              {/* Power Rail Sockets (Bottom) */}
              {[...Array(totalCols)].map((_, colIdx) => (
                <React.Fragment key={`bp-socket-${colIdx}`}>
                  <rect x={leftMargin + colIdx * colSpacing - 1.2} y={height - 33} width="2.4" height="2.4" rx="0.5" fill="#334155" />
                  <rect x={leftMargin + colIdx * colSpacing - 1.2} y={height - 21} width="2.4" height="2.4" rx="0.5" fill="#334155" />
                </React.Fragment>
              ))}
            </g>
          )}
        </svg>
      </div>
    );
  }

  // 27. Multimeter
  if (id === 'multimeter') {
    const mode = properties.mode ?? 'VOLTAGE';
    const pos = { id: 'pos', label: 'Positive (+)', x: 45, y: 78 };
    const neg = { id: 'neg', label: 'Negative (-)', x: 105, y: 78 };

    const readout = isSimulating
      ? isPowered
        ? mode === 'CURRENT'
          ? '125.0 mA'
          : mode === 'RESISTANCE'
          ? '220.0 Ω'
          : '5.00 V'
        : '0.00 V'
      : '0.00 V';

    return (
      <div
        className="relative select-none"
        style={{ width: '150px', height: '85px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 150 85" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Yellow Holster */}
          <rect x="5" y="6" width="140" height="68" rx="6" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
          {/* LCD Screen */}
          <rect x="14" y="14" width="85" height="42" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
          <text x="56" y="42" fill="#0F172A" fontSize="16" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {readout}
          </text>
          {/* Rotary Dial */}
          <g
            className="cursor-pointer"
            onClick={() => {
              const nextMode = mode === 'VOLTAGE' ? 'CURRENT' : mode === 'CURRENT' ? 'RESISTANCE' : 'VOLTAGE';
              onPropertyChange('mode', nextMode);
            }}
          >
            <circle cx="120" cy="35" r="14" fill="#CA8A04" stroke="#A16207" strokeWidth="1.2" />
            <circle cx="120" cy="35" r="9" fill="#18181B" />
            <line
              x1="120"
              y1="35"
              x2={mode === 'VOLTAGE' ? 120 : mode === 'CURRENT' ? 128 : 112}
              y2={mode === 'VOLTAGE' ? 24 : 32}
              stroke="#EAB308"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {[pos, neg].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4" fill={p.id === 'pos' ? '#DC2626' : '#18181B'} stroke="#64748B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 28. Power Supply
  if (id === 'power-supply') {
    const voltage = properties.voltage ?? 5.0;
    const current = properties.current ?? 2.0;
    const pos = { id: 'pos', label: 'Positive (+)', x: 45, y: 125 };
    const neg = { id: 'neg', label: 'Negative (-)', x: 115, y: 125 };

    return (
      <div
        className="relative select-none"
        style={{ width: '160px', height: '135px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 160 135" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="6" width="150" height="118" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          {/* Volt Meter */}
          <rect x="14" y="14" width="75" height="30" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          <text x="51" y="35" fill="#1E293B" fontSize="14" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {voltage.toFixed(1)} V
          </text>
          <circle cx="120" cy="29" r="13" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          {/* Amp Meter */}
          <rect x="14" y="52" width="75" height="30" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          <text x="51" y="73" fill="#1E293B" fontSize="14" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {current.toFixed(1)} A
          </text>
          <circle cx="120" cy="67" r="13" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          {/* Power Switch */}
          <rect x="16" y="94" width="22" height="14" rx="2" fill="#1E293B" />
          {/* Terminals */}
          {[pos, neg].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="5" fill={p.id === 'pos' ? '#DC2626' : '#18181B'} stroke="#64748B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="9" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 29. Function Generator
  if (id === 'function-generator') {
    const freq = properties.frequency ?? 1000;
    const amp = properties.amplitude ?? 5.0;
    const waveType = properties.waveType ?? 'SINE';
    const outPin = { id: 'out', label: 'Main Output (BNC)', x: 60, y: 125 };
    const gndPin = { id: 'gnd', label: 'Ground (GND)', x: 120, y: 125 };

    return (
      <div
        className="relative select-none"
        style={{ width: '180px', height: '135px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 180 135" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="6" width="170" height="118" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          {/* Displays */}
          <rect x="12" y="14" width="60" height="22" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          <text x="42" y="30" fill="#1E293B" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {(freq / 1000).toFixed(2)} kHz
          </text>
          <rect x="12" y="42" width="60" height="22" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
          <text x="42" y="58" fill="#1E293B" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {amp.toFixed(2)} V
          </text>
          {/* Waveform Buttons */}
          {['SINE', 'TRIANGLE', 'SQUARE'].map((w, idx) => (
            <g
              key={w}
              className="cursor-pointer"
              onClick={() => onPropertyChange('waveType', w)}
              transform={`translate(${82 + idx * 28}, 14)`}
            >
              <rect
                x="0"
                y="0"
                width="24"
                height="22"
                rx="2"
                fill={waveType === w ? '#0284C7' : '#E2E8F0'}
                stroke="#94A3B8"
                strokeWidth="1"
              />
              <text x="12" y="15" fill={waveType === w ? '#FFFFFF' : '#334155'} fontSize="8" fontWeight="bold" textAnchor="middle">
                {w[0]}
              </text>
            </g>
          ))}
          {/* Output BNC Sockets */}
          {[outPin, gndPin].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="5" fill={p.id === 'out' ? '#DC2626' : '#18181B'} stroke="#64748B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="9" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 30. Oscilloscope
  if (id === 'oscilloscope') {
    const pos = { id: 'pos', label: 'Channel 1 Probe (+)', x: 55, y: 135 };
    const neg = { id: 'neg', label: 'Ground Clip (-)', x: 115, y: 135 };

    return (
      <div
        className="relative select-none"
        style={{ width: '170px', height: '145px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 170 145" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Yellow Chassis */}
          <rect x="5" y="6" width="160" height="128" rx="6" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
          {/* Graticule Grid Screen */}
          <rect x="14" y="14" width="142" height="98" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          {/* Grid lines */}
          {[...Array(6)].map((_, i) => (
            <line key={`h-${i}`} x1="14" y1={28 + i * 14} x2="156" y2={28 + i * 14} stroke="#BAE6FD" strokeWidth="0.8" />
          ))}
          {[...Array(9)].map((_, i) => (
            <line key={`v-${i}`} x1={28 + i * 14} y1="14" x2={28 + i * 14} y2="112" stroke="#BAE6FD" strokeWidth="0.8" />
          ))}
          {/* Live Oscilloscope Trace */}
          <path
            d="M 14,63 Q 28,25 42,63 T 70,63 T 98,63 T 126,63 T 156,63"
            fill="none"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={isSimulating ? 'animate-pulse' : ''}
          />
          {[pos, neg].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="5" fill={p.id === 'pos' ? '#DC2626' : '#18181B'} stroke="#64748B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="9" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 31. Integrated Circuits & Digital Logic (DIP-6, DIP-8, DIP-14, DIP-16)
  if (id.startsWith('ic-') || id.startsWith('logic-')) {
    const isDip6 = id === 'ic-optocoupler-4n35';
    const isDip8 = ['ic-timer-555', 'ic-opamp-741', 'ic-comparator-lm393'].includes(id);
    const isDip16 = ['ic-motor-driver-l293d', 'logic-74hc75', 'logic-74hc283', 'logic-74hc595', 'logic-74hc4017', 'logic-cd4511', 'logic-pcf8574'].includes(id);
    // Otherwise DIP-14
    const totalPins = isDip6 ? 6 : isDip8 ? 8 : isDip16 ? 16 : 14;
    const pinsPerSide = totalPins / 2;
    const spacing = 18;
    const padMargin = 22;
    const width = padMargin * 2 + (pinsPerSide - 1) * spacing;
    const height = 75;

    let chipLabel = compDef.name;
    if (id === 'ic-timer-555') chipLabel = '555';
    else if (id === 'ic-timer-556') chipLabel = '556';
    else if (id === 'ic-opamp-741') chipLabel = 'opAmp';
    else if (id === 'ic-comparator-lm339') chipLabel = 'LM339';
    else if (id === 'ic-comparator-lm393') chipLabel = 'LM393';
    else if (id === 'ic-optocoupler-4n35') chipLabel = '4N35';
    else if (id === 'ic-motor-driver-l293d') chipLabel = 'L293D';
    else if (id === 'logic-cd4511') chipLabel = 'CD4511';
    else if (id === 'logic-pcf8574') chipLabel = 'PCF8574';
    else if (id.startsWith('logic-74hc')) chipLabel = id.replace('logic-74hc', '74HC').toUpperCase();

    return (
      <div
        className="relative select-none"
        style={{ width: `${width}px`, height: `${height}px`, transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Silver Lead Frame Pins */}
          {[...Array(pinsPerSide)].map((_, i) => {
            const px = padMargin + i * spacing;
            return (
              <React.Fragment key={`pin-frame-${i}`}>
                {/* Top Pin */}
                <rect x={px - 2.5} y="4" width="5" height="12" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
                {/* Bottom Pin */}
                <rect x={px - 2.5} y={height - 16} width="5" height="12" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
              </React.Fragment>
            );
          })}

          {/* Main Dual In-line Epoxy Body */}
          <rect x="8" y="14" width={width - 16} height={height - 28} rx="3" fill="#22252A" stroke="#141619" strokeWidth="1.5" />
          {/* Beveled Top Surface Highlight */}
          <rect x="11" y="17" width={width - 22} height={height - 34} rx="2" fill="#2B3037" />

          {/* Pin 1 Orientation Notch on Left */}
          <path d={`M 8,${height / 2 - 6} A 6,6 0 0,1 8,${height / 2 + 6} Z`} fill="#181A1E" />
          {/* Pin 1 Circular Indentation Dot */}
          <circle cx="20" cy="24" r="3" fill="#181A1E" stroke="#374151" strokeWidth="0.5" />

          {/* Laser-Etched IC Part Label */}
          <text
            x={width / 2}
            y={height / 2 + 3}
            fill="#E2E8F0"
            fontSize="10.5"
            fontFamily="monospace"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            {chipLabel}
          </text>

          {/* Interactive Clickable Pins */}
          {compDef.pins.map((pin, pIdx) => {
            const isTop = pIdx < pinsPerSide;
            const colIndex = isTop ? pIdx : totalPins - 1 - pIdx;
            const px = padMargin + colIndex * spacing;
            const py = isTop ? 6 : height - 6;

            return (
              <g
                key={pin.id}
                className="cursor-pointer"
                onClick={(e) => onPinClick(e, pin.id, pin.label, px, py)}
                onMouseEnter={() => setHoveredPinId(pin.id)}
                onMouseLeave={() => setHoveredPinId(null)}
              >
                <circle cx={px} cy={py} r="4" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                {hoveredPinId === pin.id && (
                  <circle cx={px} cy={py} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 32. TO-92 Transistors (NPN, PNP, Small Signal nMOS, Small Signal pMOS)
  if (id.startsWith('transistor-') && (id.includes('npn') || id.includes('pnp') || id.includes('signal'))) {
    const isNpn = id.includes('npn');
    const isPnp = id.includes('pnp');
    const isNmos = id.includes('nmos');
    const label = isNpn ? 'N' : isPnp ? 'P' : isNmos ? 'NMOS' : 'PMOS';
    const sub = isNpn ? 'C B E' : isPnp ? 'E B C' : isNmos ? 'D G S' : 'S G D';

    return (
      <div
        className="relative select-none"
        style={{ width: '60px', height: '75px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 60 75" className="w-full h-full drop-shadow-lg overflow-visible">
          {/* 3 Silver Leads */}
          <line x1="16" y1="46" x2="16" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="46" x2="30" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="44" y1="46" x2="44" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

          {/* TO-92 Body (Curved back, flat front) */}
          <path d="M 12,18 C 12,6 48,6 48,18 L 48,46 C 48,48 12,48 12,46 Z" fill="#22252A" stroke="#111827" strokeWidth="1.5" />
          <rect x="14" y="20" width="32" height="24" rx="2" fill="#2C323B" />
          <text x="30" y="32" fill="#FFFFFF" fontSize={label.length > 2 ? '6' : '9'} fontWeight="900" textAnchor="middle">{label}</text>
          <text x="30" y="40" fill="#94A3B8" fontSize="4.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{sub}</text>

          {/* Interactive Pins */}
          {compDef.pins.map((pin, idx) => {
            const px = 16 + idx * 14;
            const py = 68;
            return (
              <g
                key={pin.id}
                className="cursor-pointer"
                onClick={(e) => onPinClick(e, pin.id, pin.label, px, py)}
                onMouseEnter={() => setHoveredPinId(pin.id)}
                onMouseLeave={() => setHoveredPinId(null)}
              >
                <circle cx={px} cy={py} r="4" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
                {hoveredPinId === pin.id && (
                  <circle cx={px} cy={py} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 33. TO-220 Power Transistors & Voltage Regulators
  if (id.includes('power') || id.includes('tip120') || id.includes('voltage-regulator')) {
    const is5V = id.includes('5v');
    const is3V3 = id.includes('3v3');
    const isTip = id.includes('tip120');
    const isPmos = id.includes('pmos');
    const label = is5V ? 'LM7805' : is3V3 ? 'LM1117' : isTip ? 'TIP120' : isPmos ? 'IRF9540' : 'IRF540N';
    const sub = is5V ? '5V' : is3V3 ? '3.3V' : isTip ? 'NPN DARL' : isPmos ? 'pMOS' : 'nMOS';

    return (
      <div
        className="relative select-none"
        style={{ width: '65px', height: '95px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 65 95" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Metal Heatsink Tab */}
          <rect x="18" y="6" width="29" height="22" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="32.5" cy="16" r="3.5" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />
          {/* Main Plastic Body */}
          <rect x="14" y="24" width="37" height="36" rx="2.5" fill="#22252A" stroke="#111827" strokeWidth="1.5" />
          <text x="32.5" y="42" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">{label}</text>
          <text x="32.5" y="52" fill="#94A3B8" fontSize="5" fontWeight="bold" textAnchor="middle">{sub}</text>

          {/* 3 Heavy Silver Leads */}
          <line x1="20" y1="60" x2="20" y2="88" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="32.5" y1="60" x2="32.5" y2="88" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="60" x2="45" y2="88" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

          {compDef.pins.map((pin, idx) => {
            const px = idx === 0 ? 20 : idx === 1 ? 32.5 : 45;
            const py = 88;
            return (
              <g
                key={pin.id}
                className="cursor-pointer"
                onClick={(e) => onPinClick(e, pin.id, pin.label, px, py)}
                onMouseEnter={() => setHoveredPinId(pin.id)}
                onMouseLeave={() => setHoveredPinId(null)}
              >
                <circle cx={px} cy={py} r="4" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
                {hoveredPinId === pin.id && (
                  <circle cx={px} cy={py} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 34. Relays (SPDT, DPDT)
  if (id === 'relay-spdt' || id === 'relay-dpdt') {
    const isDpdt = id === 'relay-dpdt';
    const width = isDpdt ? 120 : 100;
    const height = 75;

    return (
      <div
        className="relative select-none"
        style={{ width: `${width}px`, height: `${height}px`, transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="4" y="6" width={width - 8} height={height - 12} rx="4" fill={isDpdt ? '#EAB308' : '#22252A'} stroke={isDpdt ? '#CA8A04' : '#111827'} strokeWidth="2" />
          <text x="14" y="22" fill={isDpdt ? '#1E293B' : '#FFFFFF'} fontSize="8" fontWeight="bold">
            {isDpdt ? 'KS2E-M-DC5' : 'LU-5-R'}
          </text>
          <text x="14" y="32" fill={isDpdt ? '#475569' : '#94A3B8'} fontSize="6">
            5V DC / 3A 125VAC
          </text>
          {/* Schematic Diagram Graphic */}
          <path d={`M ${width - 45},20 L ${width - 32},20 L ${width - 24},32 L ${width - 14},32`} fill="none" stroke={isDpdt ? '#1E293B' : '#FFFFFF'} strokeWidth="1.2" />

          {/* Interactive Terminals */}
          {compDef.pins.map((pin, idx) => {
            const px = 16 + idx * ((width - 32) / (compDef.pins.length - 1));
            const py = height - 12;
            return (
              <g
                key={pin.id}
                className="cursor-pointer"
                onClick={(e) => onPinClick(e, pin.id, pin.label, px, py)}
                onMouseEnter={() => setHoveredPinId(pin.id)}
                onMouseLeave={() => setHoveredPinId(null)}
              >
                <circle cx={px} cy={py} r="4" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
                {hoveredPinId === pin.id && (
                  <circle cx={px} cy={py} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // 35. Connectors (8 Pin Header, USB-A)
  if (id === 'connector-header-8pin') {
    return (
      <div
        className="relative select-none"
        style={{ width: '32px', height: '160px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 32 160" className="w-full h-full drop-shadow-lg overflow-visible">
          <rect x="8" y="4" width="16" height="152" rx="2" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
          {[...Array(8)].map((_, i) => {
            const py = 14 + i * 19;
            return (
              <g
                key={`hdr-pin-${i}`}
                className="cursor-pointer"
                onClick={(e) => onPinClick(e, `pin${i + 1}`, `Pin ${i + 1}`, 16, py)}
                onMouseEnter={() => setHoveredPinId(`pin${i + 1}`)}
                onMouseLeave={() => setHoveredPinId(null)}
              >
                <rect x="11.5" y={py - 4.5} width="9" height="9" rx="1" fill="#3F3F46" stroke="#52525B" strokeWidth="0.8" />
                <rect x="14" y={py - 2} width="4" height="4" fill="#09090B" />
                {hoveredPinId === `pin${i + 1}` && (
                  <circle cx="16" cy={py} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (id === 'connector-usb-a') {
    const wirePins = [
      { id: 'vbus', label: 'VBUS (+5V)', color: '#DC2626', y: 15 },
      { id: 'dm', label: 'D- (Data-)', color: '#F1F5F9', y: 25 },
      { id: 'dp', label: 'D+ (Data+)', color: '#16A34A', y: 35 },
      { id: 'gnd', label: 'GND (Ground)', color: '#18181B', y: 45 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '120px', height: '60px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Metal USB Shield */}
          <rect x="8" y="18" width="26" height="24" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          <rect x="16" y="23" width="4" height="4" fill="#1E293B" />
          <rect x="16" y="33" width="4" height="4" fill="#1E293B" />
          {/* Black Overmold Grip */}
          <rect x="34" y="14" width="42" height="32" rx="3" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
          {/* USB Trident Logo */}
          <path d="M 48,30 L 64,30" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="48" cy="30" r="2" fill="#94A3B8" />
          <line x1="64" y1="30" x2="60" y2="24" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="57" y="23" width="3" height="3" fill="#94A3B8" />
          <line x1="64" y1="30" x2="60" y2="36" stroke="#94A3B8" strokeWidth="1.2" />
          <circle cx="58" cy="36" r="1.5" fill="#94A3B8" />
          {/* Strain Relief */}
          <rect x="76" y="22" width="12" height="16" rx="2" fill="#27272A" />

          {/* 4 Color Wires */}
          {wirePins.map((wp) => (
            <g
              key={wp.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, wp.id, wp.label, 110, wp.y)}
              onMouseEnter={() => setHoveredPinId(wp.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <line x1="88" y1="30" x2="110" y2={wp.y} stroke={wp.color} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="110" cy={wp.y} r="3.5" fill={wp.color} stroke="#64748B" strokeWidth="1" />
              {hoveredPinId === wp.id && (
                <circle cx="110" cy={wp.y} r="7.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 36. Ceramic Capacitor
  if (id === 'capacitor') {
    const pin1 = { id: 'pin1', label: 'Terminal 1', x: 16, y: 55 };
    const pin2 = { id: 'pin2', label: 'Terminal 2', x: 34, y: 55 };

    return (
      <div
        className="relative select-none"
        style={{ width: '50px', height: '60px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="16" y1="28" x2="16" y2="55" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="28" x2="34" y2="55" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ceramic Disc */}
          <circle cx="25" cy="20" r="16" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <text x="25" y="23" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">104</text>
          {[pin1, pin2].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 37. Polarized Capacitor (Electrolytic)
  if (id === 'capacitor-polarized') {
    const anode = { id: 'anode', label: 'Anode (+)', x: 16, y: 70 };
    const cathode = { id: 'cathode', label: 'Cathode (-)', x: 34, y: 70 };

    return (
      <div
        className="relative select-none"
        style={{ width: '50px', height: '75px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 50 75" className="w-full h-full drop-shadow-lg overflow-visible">
          {/* Long Anode & Short Cathode Leads */}
          <line x1="16" y1="45" x2="16" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="45" x2="34" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Black Cylindrical Aluminum Can */}
          <rect x="8" y="6" width="34" height="42" rx="4" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
          {/* Silver Negative Stripe */}
          <rect x="28" y="6" width="12" height="42" fill="#E2E8F0" rx="1" />
          <text x="34" y="24" fill="#18181B" fontSize="9" fontWeight="900" textAnchor="middle">-</text>
          <text x="34" y="38" fill="#18181B" fontSize="9" fontWeight="900" textAnchor="middle">-</text>
          <text x="18" y="28" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">100µF</text>
          {[anode, cathode].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 38. Diode (1N4007)
  if (id === 'diode') {
    const anode = { id: 'anode', label: 'Anode (A)', x: 10, y: 15 };
    const cathode = { id: 'cathode', label: 'Cathode (K)', x: 60, y: 15 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '30px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 30" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="8" y1="15" x2="62" y2="15" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="20" y="7" width="30" height="16" rx="3" fill="#18181B" stroke="#09090B" strokeWidth="1.2" />
          {/* Silver Cathode Band */}
          <rect x="42" y="7" width="6" height="16" fill="#E2E8F0" />
          {[anode, cathode].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 39. Zener Diode
  if (id === 'diode-zener') {
    const anode = { id: 'anode', label: 'Anode (A)', x: 10, y: 15 };
    const cathode = { id: 'cathode', label: 'Cathode (K)', x: 60, y: 15 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '30px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 30" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="8" y1="15" x2="62" y2="15" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Orange Glass Body */}
          <rect x="22" y="8" width="26" height="14" rx="2" fill="#EA580C" fillOpacity="0.9" stroke="#C2410C" strokeWidth="1" />
          {/* Black Cathode Band */}
          <rect x="40" y="8" width="5" height="14" fill="#18181B" />
          {[anode, cathode].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 40. Inductor
  if (id === 'inductor') {
    const pin1 = { id: 'pin1', label: 'Pin 1', x: 8, y: 20 };
    const pin2 = { id: 'pin2', label: 'Pin 2', x: 62, y: 20 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '40px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 40" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="8" y1="20" x2="18" y2="20" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="20" x2="62" y2="20" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Coiled Copper Wire Loops */}
          <path
            d="M 18,20 Q 22,8 26,20 Q 30,8 34,20 Q 38,8 42,20 Q 46,8 50,20 Q 52,8 54,20"
            fill="none"
            stroke="#D97706"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {[pin1, pin2].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 41. Photoresistor (LDR)
  if (id === 'ldr-sensor') {
    const pin1 = { id: 'pin1', label: 'Terminal 1', x: 16, y: 55 };
    const pin2 = { id: 'pin2', label: 'Terminal 2', x: 34, y: 55 };

    return (
      <div
        className="relative select-none"
        style={{ width: '50px', height: '60px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 50 60" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="16" y1="28" x2="16" y2="55" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="28" x2="34" y2="55" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ceramic Disc Head with Serpentine Track */}
          <circle cx="25" cy="18" r="14" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <path d="M 17,14 L 33,14 L 33,18 L 17,18 L 17,22 L 33,22" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          {[pin1, pin2].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 42. Temperature Sensor (TMP36 TO-92 - Tinkercad 1:1 Style)
  if (id === 'temp-sensor-tmp36') {
    const vcc = { id: 'vcc', label: 'VCC (+5V)', x: 12, y: 70 };
    const out = { id: 'out', label: 'Vout (Analog)', x: 30, y: 70 };
    const gnd = { id: 'gnd', label: 'GND (Ground)', x: 48, y: 70 };
    const pins = [vcc, out, gnd];

    return (
      <div
        className="relative select-none"
        style={{ width: '60px', height: '75px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 60 75" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Splayed Metal Wire Leads */}
          <path d="M 22,44 L 18,56 L 12,70" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 30,44 L 30,70" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 38,44 L 42,56 L 48,70" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />

          {/* TO-92 Black Epoxy Package */}
          <path d="M 12,18 C 12,6 48,6 48,18 L 48,46 C 48,48 12,48 12,46 Z" fill="#22252A" stroke="#111827" strokeWidth="1.5" />
          <rect x="14" y="20" width="32" height="24" rx="2" fill="#2C323B" />
          <text x="30" y="35" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            TMP
          </text>

          {pins.map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 43. Tilt Sensor (SW-200D)
  if (id === 'tilt-sensor') {
    const pin1 = { id: 'pin1', label: 'Terminal 1', x: 18, y: 70 };
    const pin2 = { id: 'pin2', label: 'Terminal 2', x: 32, y: 70 };

    return (
      <div
        className="relative select-none"
        style={{ width: '50px', height: '75px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 50 75" className="w-full h-full drop-shadow-md overflow-visible">
          <line x1="18" y1="46" x2="18" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="46" x2="32" y2="70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Green cylinder heat shrink */}
          <rect x="12" y="6" width="26" height="42" rx="6" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
          <text x="25" y="28" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">TILT</text>
          {[pin1, pin2].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 44. DC Motor
  if (id === 'dc-motor') {
    const pos = { id: 'positive', label: 'Positive (+)', x: 18, y: 75 };
    const neg = { id: 'negative', label: 'Negative (-)', x: 52, y: 75 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '80px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 80" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Gold Rotary Shaft */}
          <rect x="31" y="4" width="8" height="16" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
          {/* Metallic Silver Cylindrical Body */}
          <rect x="12" y="18" width="46" height="48" rx="8" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
          <circle cx="35" cy="42" r="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          {/* Terminal solder lugs */}
          <line x1="18" y1="66" x2="18" y2="75" stroke="#94A3B8" strokeWidth="3" />
          <line x1="52" y1="66" x2="52" y2="75" stroke="#94A3B8" strokeWidth="3" />
          {[pos, neg].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#333" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 45. Hobby Gearmotor (Yellow TT Motor - Tinkercad 1:1 Style)
  if (id === 'gearmotor' || id === 'hobby-gearmotor') {
    const pos = { id: 'positive', label: 'Motor (+)', x: 18, y: 110 };
    const neg = { id: 'negative', label: 'Motor (-)', x: 62, y: 110 };
    const pins = [pos, neg];

    return (
      <div
        className="relative select-none"
        style={{ width: '80px', height: '125px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 80 125" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Top White D-Shaft Axle */}
          <rect x="36" y="2" width="8" height="14" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          
          {/* Bright Yellow Gearbox Body */}
          <rect x="10" y="14" width="60" height="70" rx="3" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="40" cy="46" r="16" fill="#CA8A04" fillOpacity="0.3" />

          {/* Bottom Attached Metallic DC Motor Canister */}
          <rect x="18" y="84" width="44" height="28" rx="3" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
          {/* Bottom Axle Tip */}
          <rect x="37" y="112" width="6" height="10" rx="1" fill="#94A3B8" />

          {/* Red and Black Solder Lugs */}
          <rect x="14" y="98" width="6" height="12" rx="1" fill="#DC2626" />
          <rect x="60" y="98" width="6" height="12" rx="1" fill="#18181B" />

          {pins.map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4.5" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 46. 7-Segment Display
  if (id === 'seven-segment') {
    return (
      <div
        className="relative select-none"
        style={{ width: '80px', height: '110px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 80 110" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Black Display Block */}
          <rect x="10" y="10" width="60" height="90" rx="4" fill="#18181B" stroke="#09090B" strokeWidth="2" />
          <rect x="16" y="16" width="48" height="78" rx="2" fill="#09090B" />
          {/* 7 Segment Bars */}
          <rect x="26" y="24" width="28" height="5" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          <rect x="50" y="28" width="5" height="24" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          <rect x="50" y="54" width="5" height="24" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          <rect x="26" y="76" width="28" height="5" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          <rect x="24" y="54" width="5" height="24" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          <rect x="24" y="28" width="5" height="24" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          <rect x="26" y="50" width="28" height="5" rx="2" fill={isSimulating ? '#DC2626' : '#27272A'} />
          {/* Decimal Point */}
          <circle cx="58" cy="78" r="3" fill={isSimulating ? '#DC2626' : '#27272A'} />
        </svg>
      </div>
    );
  }

  // 47. 1.5V AA Battery (Tinkercad 1:1 Cyan Holder Style)
  if (id === 'battery-1_5v') {
    const pos = { id: 'positive', label: 'Positive (+)', x: 26, y: 10 };
    const neg = { id: 'negative', label: 'Negative (-)', x: 44, y: 10 };
    const pins = [pos, neg];

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '150px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 150" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Top Metal Terminal Contacts with Red and Black wire leads */}
          <rect x="20" y="4" width="12" height="12" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          <rect x="38" y="4" width="12" height="12" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          <circle cx="26" cy="10" r="3" fill="#DC2626" />
          <circle cx="44" cy="10" r="3" fill="#18181B" />

          {/* Cyan/Teal Battery Holder Body */}
          <rect x="8" y="16" width="54" height="125" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.8" />
          {/* Internal Battery Cell Recess */}
          <rect x="14" y="24" width="42" height="108" rx="3" fill="#18181B" />
          <rect x="14" y="24" width="42" height="98" rx="3" fill="#0284C7" fillOpacity="0.3" />

          {/* White 'AA 1.5V' Text Rotated Vertically */}
          <text x="35" y="78" fill="#FFFFFF" fontSize="13" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" transform="rotate(-90 35 78)">
            AA 1.5V
          </text>

          {/* Interactive Terminals */}
          {pins.map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4.5" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 48. CR2032 3V Coin Cell Battery (Tinkercad 1:1 Holder Style)
  if (id === 'battery-coin') {
    const pos = { id: 'positive', label: 'Positive (+3V)', x: 35, y: 6 };
    const neg = { id: 'negative', label: 'Negative (GND)', x: 35, y: 64 };
    const pins = [pos, neg];

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '70px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 70" className="w-full h-full drop-shadow-lg overflow-visible">
          {/* Top Red Contact Prong (+) */}
          <polygon points="32,2 38,2 36,12 34,12" fill="#DC2626" />
          {/* Bottom Black Contact Prong (-) */}
          <polygon points="32,68 38,68 36,58 34,58" fill="#18181B" />

          {/* Black Plastic Outer Bracket Ring */}
          <circle cx="35" cy="35" r="28" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
          {/* Inner Silver Coin Cell Disc */}
          <circle cx="35" cy="35" r="23" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />

          {/* Laser-etched white labels */}
          <text x="35" y="24" fill="#64748B" fontSize="10" fontWeight="900" textAnchor="middle">+</text>
          <text x="35" y="34" fill="#475569" fontSize="4.5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            COIN BATTERY
          </text>
          <text x="35" y="42" fill="#475569" fontSize="5" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
            CR 2032
          </text>
          <text x="35" y="50" fill="#475569" fontSize="4.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            3.0V
          </text>

          {/* Interactive Terminals */}
          {pins.map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="4" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7.5" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 48B. Multimeter (Tinkercad 1:1 Style)
  if (id === 'multimeter') {
    const pos = { id: 'pos', label: 'Positive (Red)', x: 45, y: 46 };
    const neg = { id: 'neg', label: 'Negative (Black)', x: 65, y: 46 };
    const pins = [pos, neg];

    return (
      <div
        className="relative select-none"
        style={{ width: '130px', height: '55px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 130 55" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Yellow Chassis Housing */}
          <rect x="5" y="5" width="120" height="36" rx="3" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
          {/* LCD Display Screen (Left) */}
          <rect x="10" y="10" width="80" height="26" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
          <rect x="12" y="12" width="76" height="22" rx="1" fill="#CBD5E1" />
          <text x="50" y="28" fill="#0F172A" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            {isSimulating ? '0.00 V' : 'OFF'}
          </text>

          {/* Rotary Dial on Right */}
          <circle cx="106" cy="23" r="10" fill="#EAB308" stroke="#713F12" strokeWidth="1" />
          <circle cx="106" cy="23" r="7" fill="#713F12" />
          <circle cx="106" cy="23" r="2.5" fill="#FFFFFF" />

          {/* Bottom Probe Sockets */}
          <rect x="40" y="38" width="10" height="8" rx="1" fill="#DC2626" />
          <rect x="60" y="38" width="10" height="8" rx="1" fill="#18181B" />

          {pins.map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill={p.id === 'pos' ? '#DC2626' : '#18181B'} stroke="#CBD5E1" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 49. Solar Cell
  if (id === 'solar-cell') {
    const pos = { id: 'positive', label: 'Positive (+)', x: 20, y: 8 };
    const neg = { id: 'negative', label: 'Negative (-)', x: 50, y: 8 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '70px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 70" className="w-full h-full drop-shadow-lg overflow-visible">
          <rect x="5" y="12" width="60" height="52" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <rect x="8" y="15" width="54" height="46" rx="2" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1" />
          {/* Photovoltaic Grid lines */}
          <line x1="26" y1="15" x2="26" y2="61" stroke="#60A5FA" strokeWidth="0.8" />
          <line x1="44" y1="15" x2="44" y2="61" stroke="#60A5FA" strokeWidth="0.8" />
          <line x1="8" y1="38" x2="62" y2="38" stroke="#60A5FA" strokeWidth="0.8" />
          {[pos, neg].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill={p.id === 'positive' ? '#DC2626' : '#18181B'} stroke="#333" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 50. Potato Battery
  if (id === 'potato-battery') {
    const cu = { id: 'copper', label: 'Copper Electrode (+)', x: 22, y: 10 };
    const zn = { id: 'zinc', label: 'Zinc Electrode (-)', x: 48, y: 10 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '65px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 65" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Copper Nail (+) and Zinc Nail (-) */}
          <line x1="22" y1="8" x2="22" y2="28" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="8" x2="48" y2="28" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          {/* Organic Potato Body */}
          <ellipse cx="35" cy="40" rx="28" ry="20" fill="#B45309" stroke="#92400E" strokeWidth="1.5" />
          <ellipse cx="33" cy="38" rx="24" ry="16" fill="#D97706" fillOpacity="0.6" />
          <circle cx="24" cy="38" r="2" fill="#78350F" />
          <circle cx="44" cy="44" r="1.5" fill="#78350F" />
          {[cu, zn].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill={p.id === 'copper' ? '#D97706' : '#94A3B8'} stroke="#333" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 51. Lemon Battery
  if (id === 'lemon-battery') {
    const cu = { id: 'copper', label: 'Copper Electrode (+)', x: 22, y: 10 };
    const zn = { id: 'zinc', label: 'Zinc Electrode (-)', x: 48, y: 10 };

    return (
      <div
        className="relative select-none"
        style={{ width: '70px', height: '65px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 70 65" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Copper Nail (+) and Zinc Nail (-) */}
          <line x1="22" y1="8" x2="22" y2="28" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="8" x2="48" y2="28" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          {/* Organic Lemon Body */}
          <ellipse cx="35" cy="40" rx="27" ry="21" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
          <circle cx="10" cy="40" r="3" fill="#EAB308" />
          <circle cx="60" cy="40" r="3" fill="#EAB308" />
          {[cu, zn].map((p) => (
            <g
              key={p.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, p.id, p.label, p.x, p.y)}
              onMouseEnter={() => setHoveredPinId(p.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={p.x} cy={p.y} r="3.5" fill={p.id === 'copper' ? '#D97706' : '#94A3B8'} stroke="#333" strokeWidth="1" />
              {hoveredPinId === p.id && (
                <circle cx={p.x} cy={p.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 52. NeoPixel Ring 12
  if (id === 'neopixel-ring-12') {
    return (
      <div
        className="relative select-none"
        style={{ width: '120px', height: '120px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Circular Black PCB Ring */}
          <circle cx="60" cy="60" r="52" fill="#18181B" stroke="#27272A" strokeWidth="2" />
          <circle cx="60" cy="60" r="32" fill="#F8FAFC" stroke="#27272A" strokeWidth="2" />
          {/* 12 Circular NeoPixel LEDs */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const lx = 60 + 42 * Math.cos(angle);
            const ly = 60 + 42 * Math.sin(angle);
            return (
              <circle
                key={`np-${i}`}
                cx={lx}
                cy={ly}
                r="4.5"
                fill={isSimulating ? '#00E676' : '#E2E8F0'}
                stroke="#64748B"
                strokeWidth="1"
                filter={isSimulating ? 'drop-shadow(0px 0px 4px #00E676)' : 'none'}
              />
            );
          })}
          <text x="60" y="63" fill="#334155" fontSize="8" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">NEOPIXEL</text>
        </svg>
      </div>
    );
  }

  // 53. 4x4 Keypad Matrix
  if (id === 'keypad-4x4') {
    return (
      <div
        className="relative select-none"
        style={{ width: '130px', height: '150px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 130 150" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="5" y="5" width="120" height="135" rx="6" fill="#18181B" stroke="#09090B" strokeWidth="2" />
          {/* 4x4 Buttons */}
          {['1','2','3','A','4','5','6','B','7','8','9','C','*','0','#','D'].map((keyLabel, idx) => {
            const row = Math.floor(idx / 4);
            const col = idx % 4;
            const bx = 16 + col * 26;
            const by = 16 + row * 26;
            return (
              <g key={keyLabel}>
                <rect x={bx} y={by} width="20" height="20" rx="3" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
                <text x={bx + 10} y={by + 14} fill="#F8FAFC" fontSize="10" fontWeight="bold" textAnchor="middle">{keyLabel}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // Fallback Generic Component
  return (
    <div
      className="relative select-none p-3 bg-white rounded-lg border-2 border-slate-400 shadow-md text-slate-800 text-xs font-bold text-center flex items-center justify-center min-w-[120px]"
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
    >
      <span>{compDef.name}</span>
    </div>
  );
};
