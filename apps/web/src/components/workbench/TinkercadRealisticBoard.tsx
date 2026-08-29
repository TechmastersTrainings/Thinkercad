import React from 'react';
import { BoardDefinition } from '@circuit/shared';
import { useSimulationStore } from '../../store/useSimulationStore';

interface BoardProps {
  boardDef: BoardDefinition;
  label: string;
  isSimulating: boolean;
  rotation?: number;
  onPinClick: (e: React.MouseEvent, pinId: string, pinLabel: string, pinX: number, pinY: number) => void;
  hoveredPinId: string | null;
  setHoveredPinId: (id: string | null) => void;
}

export const TinkercadRealisticBoard: React.FC<BoardProps> = ({
  boardDef,
  label,
  isSimulating,
  rotation = 0,
  onPinClick,
  hoveredPinId,
  setHoveredPinId,
}) => {
  const { id } = boardDef;
  const pin13State = useSimulationStore((state) => state.pinStates?.D13 ?? false);
  const pin0State = useSimulationStore((state) => state.pinStates?.D0 ?? false);
  const pin1State = useSimulationStore((state) => state.pinStates?.D1 ?? false);

  // 1. Arduino UNO R3
  if (id === 'board-arduino-uno') {
    const topDigitalPins = [
      { id: 'AREF', label: 'AREF', x: 142, y: 14 },
      { id: 'GND_TOP', label: 'GND', x: 156, y: 14 },
      { id: 'D13', label: 'D13 (SCK)', x: 170, y: 14, isPwm: false },
      { id: 'D12', label: 'D12 (MISO)', x: 184, y: 14, isPwm: false },
      { id: 'D11', label: '~11 (PWM/MOSI)', x: 198, y: 14, isPwm: true },
      { id: 'D10', label: '~10 (PWM/SS)', x: 212, y: 14, isPwm: true },
      { id: 'D9', label: '~9 (PWM)', x: 226, y: 14, isPwm: true },
      { id: 'D8', label: '8', x: 240, y: 14, isPwm: false },
      { id: 'D7', label: '7', x: 260, y: 14, isPwm: false },
      { id: 'D6', label: '~6 (PWM)', x: 274, y: 14, isPwm: true },
      { id: 'D5', label: '~5 (PWM)', x: 288, y: 14, isPwm: true },
      { id: 'D4', label: '4', x: 302, y: 14, isPwm: false },
      { id: 'D3', label: '~3 (PWM)', x: 316, y: 14, isPwm: true },
      { id: 'D2', label: '2', x: 330, y: 14, isPwm: false },
      { id: 'D1', label: 'TX -> 1', x: 344, y: 14, isPwm: false },
      { id: 'D0', label: 'RX <- 0', x: 358, y: 14, isPwm: false },
    ];

    const bottomPowerAnalogPins = [
      { id: 'IOREF', label: 'IOREF', x: 172, y: 246 },
      { id: 'RESET', label: 'RESET', x: 186, y: 246 },
      { id: '3V3', label: '3.3V', x: 200, y: 246 },
      { id: '5V', label: '5V Power', x: 214, y: 246 },
      { id: 'GND_BOT1', label: 'GND', x: 228, y: 246 },
      { id: 'GND', label: 'GND', x: 242, y: 246 },
      { id: 'VIN', label: 'Vin', x: 256, y: 246 },
      { id: 'A0', label: 'A0 Analog', x: 280, y: 246 },
      { id: 'A1', label: 'A1 Analog', x: 294, y: 246 },
      { id: 'A2', label: 'A2 Analog', x: 308, y: 246 },
      { id: 'A3', label: 'A3 Analog', x: 322, y: 246 },
      { id: 'A4', label: 'A4 (SDA)', x: 336, y: 246 },
      { id: 'A5', label: 'A5 (SCL)', x: 350, y: 246 },
    ];

    return (
      <div
        className="relative select-none"
        style={{
          width: '380px',
          height: '260px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 380 260" className="w-full h-full drop-shadow-2xl overflow-visible">
          {/* USB Cable Plug plugged into the board */}
          <g id="usb-cable" transform="translate(-100, 80)">
            {/* Strain relief boots */}
            <path d="M 0,16 L 16,16 L 16,36 L 0,36 Z" fill="#18181B" />
            <circle cx="4" cy="26" r="8" fill="#27272A" />
            <rect x="14" y="20" width="6" height="12" rx="2" fill="#3F3F46" />
            <rect x="20" y="18" width="6" height="16" rx="2" fill="#3F3F46" />
            {/* Main Plug Body */}
            <rect x="26" y="8" width="62" height="36" rx="4" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
            {/* USB Trident Logo engraved on plug */}
            <path d="M 52,26 L 66,26 M 66,26 L 62,22 M 66,26 L 62,30 M 57,26 L 57,20 L 61,20 M 57,26 L 57,32 L 61,32" stroke="#71717A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="61" cy="20" r="1.5" fill="#71717A" />
            <rect x="60" y="31" width="3" height="2" fill="#71717A" />
            <circle cx="52" cy="26" r="1.5" fill="#71717A" />
            {/* Metal Plug Collar */}
            <rect x="88" y="10" width="30" height="32" rx="1" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
            <rect x="94" y="15" width="8" height="6" rx="1" fill="#71717A" />
            <rect x="94" y="31" width="8" height="6" rx="1" fill="#71717A" />
          </g>

          {/* Arduino PCB Main Board Outline */}
          <path
            d="M 22,10 L 360,10 A 10,10 0 0 1 370,20 L 370,240 A 10,10 0 0 1 360,250 L 22,250 A 10,10 0 0 1 12,240 L 12,150 L 2,140 L 2,110 L 12,100 L 12,20 A 10,10 0 0 1 22,10 Z"
            fill="#0E71A7"
            stroke="#094A6E"
            strokeWidth="2.5"
          />

          {/* PCB Mounting Holes (4 Corner Screws) */}
          <g fill="#094A6E">
            <circle cx="60" cy="18" r="6" fill="#0E71A7" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="60" cy="18" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="60" cy="18" r="3.2" fill="#CBD5E1" />

            <circle cx="355" cy="40" r="6" fill="#0E71A7" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="355" cy="40" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="355" cy="40" r="3.2" fill="#CBD5E1" />

            <circle cx="60" cy="242" r="6" fill="#0E71A7" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="60" cy="242" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="60" cy="242" r="3.2" fill="#CBD5E1" />

            <circle cx="355" cy="225" r="6" fill="#0E71A7" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="355" cy="225" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="355" cy="225" r="3.2" fill="#CBD5E1" />
          </g>

          {/* USB Type-B Port Metallic Jack */}
          <g transform="translate(6, 85)">
            <rect x="0" y="0" width="46" height="42" rx="3" fill="#D4D4D8" stroke="#71717A" strokeWidth="1.5" />
            <rect x="6" y="6" width="34" height="30" rx="2" fill="#27272A" />
            <path d="M 12,12 L 28,12 L 24,30 L 16,30 Z" fill="#E4E4E7" />
          </g>

          {/* DC Barrel Power Jack */}
          <g transform="translate(2, 175)">
            <rect x="0" y="0" width="56" height="48" rx="4" fill="#18181B" stroke="#09090B" strokeWidth="2" />
            <rect x="8" y="10" width="40" height="28" rx="2" fill="#09090B" />
            <circle cx="28" cy="24" r="5.5" fill="#71717A" />
            <circle cx="28" cy="24" r="2.5" fill="#D4D4D8" />
          </g>

          {/* Reset Pushbutton (Orange/Red Tactile Switch with silver bezel) */}
          <g transform="translate(22, 20)">
            <rect x="0" y="0" width="22" height="22" rx="3" fill="#E4E4E7" stroke="#71717A" strokeWidth="1" />
            <circle cx="11" cy="11" r="7" fill="#C2410C" stroke="#9A3412" strokeWidth="1" />
            <circle cx="11" cy="11" r="5" fill="#EA580C" />
          </g>

          {/* 16MHz Crystal Oscillator (SPX16.000G) */}
          <g transform="translate(65, 140)">
            <rect x="0" y="0" width="36" height="15" rx="7.5" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
            <text x="18" y="10.5" fill="#71717A" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              SPX16.000G
            </text>
          </g>

          {/* Voltage Regulator (TO-252 Package) */}
          <g transform="translate(30, 155)">
            <rect x="0" y="0" width="20" height="18" rx="1.5" fill="#18181B" stroke="#000" strokeWidth="1" />
            <rect x="4" y="-3" width="12" height="4" fill="#A1A1AA" />
            <rect x="2" y="18" width="4" height="6" fill="#A1A1AA" />
            <rect x="14" y="18" width="4" height="6" fill="#A1A1AA" />
          </g>

          {/* Electrolytic Capacitors (Silver tops with polarity bar) */}
          <g transform="translate(68, 185)">
            <circle cx="9" cy="9" r="9" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
            <path d="M 0,9 A 9,9 0 0 0 18,9 Z" fill="#3F3F46" />
          </g>
          <g transform="translate(90, 185)">
            <circle cx="9" cy="9" r="9" fill="#E4E4E7" stroke="#A1A1AA" strokeWidth="1" />
            <path d="M 0,9 A 9,9 0 0 0 18,9 Z" fill="#3F3F46" />
          </g>

          {/* ICSP Header (2x3 pins) */}
          <g transform="translate(340, 130)">
            <rect x="0" y="0" width="16" height="24" rx="2" fill="#18181B" />
            <circle cx="4.5" cy="5" r="1.8" fill="#FACC15" />
            <circle cx="11.5" cy="5" r="1.8" fill="#FACC15" />
            <circle cx="4.5" cy="12" r="1.8" fill="#FACC15" />
            <circle cx="11.5" cy="12" r="1.8" fill="#FACC15" />
            <circle cx="4.5" cy="19" r="1.8" fill="#FACC15" />
            <circle cx="11.5" cy="19" r="1.8" fill="#FACC15" />
          </g>

          {/* Main ATmega328P-PU Microcontroller IC (DIP-28 Socket & Chip) */}
          <g transform="translate(145, 155)">
            {/* Socket */}
            <rect x="-2" y="-2" width="180" height="34" rx="3" fill="#09090B" stroke="#000" strokeWidth="1.5" />
            {/* DIP Pins along Top & Bottom */}
            {Array.from({ length: 14 }).map((_, i) => (
              <g key={i}>
                <rect x={6 + i * 12} y="-5" width="4" height="4" fill="#CBD5E1" />
                <rect x={6 + i * 12} y="31" width="4" height="4" fill="#CBD5E1" />
              </g>
            ))}
            {/* Chip Body */}
            <rect x="0" y="0" width="176" height="30" rx="2" fill="#1C1F23" stroke="#27272A" strokeWidth="1" />
            {/* Orientation Notch */}
            <path d="M 0,11 A 4,4 0 0 1 0,19 Z" fill="#09090B" />
            <circle cx="10" cy="22" r="1.5" fill="#71717A" />
            {/* Chip Laser Markings */}
            <text x="88" y="16" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              ATMEGA328P-PU
            </text>
            <text x="88" y="24" fill="#94A3B8" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">
              2134 ATMEL
            </text>
          </g>

          {/* Official Arduino Logo & Brand Silkscreen */}
          <g transform="translate(195, 110)">
            {/* Infinity Logo with + and - */}
            <path
              d="M -14,0 C -22,-9 -32,-9 -32,0 C -32,9 -22,9 -14,0 C -6,-9 4,-9 4,0 C 4,9 -6,9 -14,0 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="-25" y="2.5" fill="#FFF" fontSize="6.5" fontWeight="900" textAnchor="middle">-</text>
            <text x="-3" y="2.5" fill="#FFF" fontSize="6.5" fontWeight="900" textAnchor="middle">+</text>

            {/* ARDUINO UNO text */}
            <text x="14" y="-3" fill="#FFFFFF" fontSize="12" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">
              ARDUINO
            </text>
            <rect x="14" y="2" width="34" height="14" rx="2" fill="#FFFFFF" />
            <text x="31" y="13" fill="#0E71A7" fontSize="10" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
              UNO
            </text>
          </g>

          {/* Status LEDs (L, TX, RX, ON) */}
          <g transform="translate(130, 95)">
            {/* LED L (Pin 13) */}
            <rect x="0" y="0" width="8" height="12" rx="1" fill="#18181B" />
            <circle cx="4" cy="6" r="3.5" fill={isSimulating && pin13State ? '#FFD600' : '#444'} filter={isSimulating && pin13State ? 'drop-shadow(0px 0px 6px #FFD600)' : 'none'} />
            <text x="-5" y="8" fill="#FFF" fontSize="7" fontWeight="bold">L</text>

            {/* LED TX (Pin 1) */}
            <rect x="0" y="16" width="8" height="12" rx="1" fill="#18181B" />
            <circle
              cx="4"
              cy="22"
              r="3.5"
              fill={isSimulating && pin1State ? '#FFD600' : '#444'}
              filter={isSimulating && pin1State ? 'drop-shadow(0px 0px 6px #FFD600)' : 'none'}
            />
            <text x="-10" y="24" fill="#FFF" fontSize="7" fontWeight="bold">TX</text>

            {/* LED RX (Pin 0) */}
            <rect x="0" y="32" width="8" height="12" rx="1" fill="#18181B" />
            <circle
              cx="4"
              cy="38"
              r="3.5"
              fill={isSimulating && pin0State ? '#FFD600' : '#444'}
              filter={isSimulating && pin0State ? 'drop-shadow(0px 0px 6px #FFD600)' : 'none'}
            />
            <text x="-10" y="40" fill="#FFF" fontSize="7" fontWeight="bold">RX</text>

            {/* LED ON (Power) */}
            <rect x="200" y="16" width="8" height="12" rx="1" fill="#18181B" />
            <circle cx="204" cy="22" r="3.5" fill="#22C55E" filter="drop-shadow(0px 0px 5px #22C55E)" />
            <text x="212" y="24" fill="#FFF" fontSize="7" fontWeight="bold">ON</text>
          </g>

          {/* Silkscreen Pin Header Category Labels */}
          <text x="250" y="34" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            DIGITAL (PWM~)
          </text>
          <text x="214" y="228" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            POWER
          </text>
          <text x="315" y="228" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            ANALOG IN
          </text>

          {/* Individual Pin Labels - Top Header */}
          <g fontSize="6.5" fontFamily="monospace" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
            <text x="142" y="32">AREF</text>
            <text x="156" y="32">GND</text>
            <text x="170" y="32">13</text>
            <text x="184" y="32">12</text>
            <text x="198" y="32">~11</text>
            <text x="212" y="32">~10</text>
            <text x="226" y="32">~9</text>
            <text x="240" y="32">8</text>
            <text x="260" y="32">7</text>
            <text x="274" y="32">~6</text>
            <text x="288" y="32">~5</text>
            <text x="302" y="32">4</text>
            <text x="316" y="32">~3</text>
            <text x="330" y="32">2</text>
            <text x="344" y="32">TX1</text>
            <text x="358" y="32">RX0</text>
          </g>

          {/* Individual Pin Labels - Bottom Header */}
          <g fontSize="6.5" fontFamily="monospace" fill="#FFFFFF" fontWeight="bold" textAnchor="middle">
            <text x="172" y="234">IO</text>
            <text x="186" y="234">RST</text>
            <text x="200" y="234">3V3</text>
            <text x="214" y="234">5V</text>
            <text x="228" y="234">GND</text>
            <text x="242" y="234">GND</text>
            <text x="256" y="234">VIN</text>
            <text x="280" y="234">A0</text>
            <text x="294" y="234">A1</text>
            <text x="308" y="234">A2</text>
            <text x="322" y="234">A3</text>
            <text x="336" y="234">A4</text>
            <text x="350" y="234">A5</text>
          </g>

          {/* Top Female Header Block (Black with metallic sockets) */}
          <rect x="134" y="6" width="232" height="16" rx="2" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
          {topDigitalPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer group"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <rect x={pin.x - 4.5} y={pin.y - 4.5} width="9" height="9" rx="1.5" fill="#09090B" />
              <circle cx={pin.x} cy={pin.y} r="2.3" fill="#A1A1AA" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="1.8" className="animate-pulse" />
              )}
            </g>
          ))}

          {/* Bottom Female Header Block (Black with metallic sockets) */}
          <rect x="164" y="238" width="194" height="16" rx="2" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
          {bottomPowerAnalogPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer group"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <rect x={pin.x - 4.5} y={pin.y - 4.5} width="9" height="9" rx="1.5" fill="#09090B" />
              <circle cx={pin.x} cy={pin.y} r="2.3" fill="#A1A1AA" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="7" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="1.8" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>

        {hoveredPinId && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-slate-950 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow border border-slate-700 pointer-events-none z-30 whitespace-nowrap">
            Pin: {hoveredPinId}
          </div>
        )}
      </div>
    );
  }

  // 2. Arduino Mega 2560
  if (id === 'board-arduino-mega') {
    const topPins = [
      { id: 'AREF', label: 'AREF', x: 160, y: 14 },
      { id: 'GND_TOP', label: 'GND', x: 174, y: 14 },
      { id: 'D13', label: 'D13', x: 188, y: 14 },
      { id: 'D12', label: 'D12', x: 202, y: 14 },
      { id: 'D11', label: 'D11', x: 216, y: 14 },
      { id: 'D10', label: 'D10', x: 230, y: 14 },
      { id: 'D9', label: 'D9', x: 244, y: 14 },
      { id: 'D8', label: 'D8', x: 258, y: 14 },
      { id: 'D7', label: 'D7', x: 278, y: 14 },
      { id: 'D6', label: 'D6', x: 292, y: 14 },
      { id: 'D5', label: 'D5', x: 306, y: 14 },
      { id: 'D4', label: 'D4', x: 320, y: 14 },
      { id: 'D3', label: 'D3', x: 334, y: 14 },
      { id: 'D2', label: 'D2', x: 348, y: 14 },
      { id: 'D1', label: 'D1', x: 362, y: 14 },
      { id: 'D0', label: 'D0', x: 376, y: 14 },
    ];

    const botPins = [
      { id: '5V', label: '5V', x: 220, y: 246 },
      { id: '3V3', label: '3.3V', x: 206, y: 246 },
      { id: 'GND', label: 'GND', x: 234, y: 246 },
      { id: 'A0', label: 'A0', x: 280, y: 246 },
      { id: 'A1', label: 'A1', x: 294, y: 246 },
      { id: 'A2', label: 'A2', x: 308, y: 246 },
      { id: 'A3', label: 'A3', x: 322, y: 246 },
      { id: 'A4', label: 'A4', x: 336, y: 246 },
      { id: 'A5', label: 'A5', x: 350, y: 246 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '430px', height: '260px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 430 260" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="10" y="10" width="410" height="240" rx="10" fill="#006C75" stroke="#004B52" strokeWidth="2" />
          <rect x="0" y="20" width="54" height="60" rx="3" fill="#B4BCC6" stroke="#4B5563" />
          <rect x="0" y="160" width="60" height="52" rx="4" fill="#222" />
          <rect x="220" y="100" width="40" height="40" rx="2" fill="#111827" transform="rotate(45 240 120)" />
          <text x="75" y="145" fill="#FFFFFF" fontSize="13" fontWeight="900">MEGA 2560</text>
          <rect x="150" y="6" width="240" height="16" rx="2" fill="#1C1F23" />
          <rect x="195" y="238" width="180" height="16" rx="2" fill="#1C1F23" />
          {topPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="2.5" fill="#A4B0BE" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="6.5" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
          {botPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="2.5" fill="#A4B0BE" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="6.5" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 3. ESP32 DevKit V1
  if (id === 'board-esp32-devkit' || id === 'board-esp32') {
    const leftPins = [
      { id: '3V3', label: '3.3V', x: 10, y: 35 },
      { id: 'EN', label: 'EN', x: 10, y: 55 },
      { id: 'VP', label: 'VP (GPIO36)', x: 10, y: 75 },
      { id: 'VN', label: 'VN (GPIO39)', x: 10, y: 95 },
      { id: 'D34', label: 'GPIO34', x: 10, y: 115 },
      { id: 'D35', label: 'GPIO35', x: 10, y: 135 },
      { id: 'D32', label: 'GPIO32', x: 10, y: 155 },
      { id: 'D33', label: 'GPIO33', x: 10, y: 175 },
      { id: 'D25', label: 'GPIO25', x: 10, y: 195 },
      { id: 'D26', label: 'GPIO26', x: 10, y: 215 },
      { id: 'D27', label: 'GPIO27', x: 10, y: 235 },
      { id: 'D14', label: 'GPIO14', x: 10, y: 255 },
      { id: 'D12', label: 'GPIO12', x: 10, y: 275 },
      { id: 'GND', label: 'GND', x: 10, y: 295 },
      { id: 'D13', label: 'GPIO13', x: 10, y: 315 },
    ];

    const rightPins = [
      { id: 'D23', label: 'GPIO23 (MOSI)', x: 210, y: 35 },
      { id: 'D22', label: 'GPIO22 (SCL)', x: 210, y: 55 },
      { id: 'TX0', label: 'TX0 (GPIO1)', x: 210, y: 75 },
      { id: 'RX0', label: 'RX0 (GPIO3)', x: 210, y: 95 },
      { id: 'D21', label: 'GPIO21 (SDA)', x: 210, y: 115 },
      { id: 'D19', label: 'GPIO19 (MISO)', x: 210, y: 135 },
      { id: 'D18', label: 'GPIO18 (SCK)', x: 210, y: 155 },
      { id: 'D5', label: 'GPIO5', x: 210, y: 175 },
      { id: 'TX2', label: 'TX2 (GPIO17)', x: 210, y: 195 },
      { id: 'RX2', label: 'RX2 (GPIO16)', x: 210, y: 215 },
      { id: 'D4', label: 'GPIO4', x: 210, y: 235 },
      { id: 'D2', label: 'GPIO2 (LED)', x: 210, y: 255 },
      { id: 'D15', label: 'GPIO15', x: 210, y: 275 },
      { id: 'GND_R', label: 'GND', x: 210, y: 295 },
      { id: 'VIN', label: 'VIN (5V)', x: 210, y: 315 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '220px', height: '350px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 220 350" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="0" y="10" width="220" height="330" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <rect x="80" y="0" width="60" height="24" rx="2" fill="#B4BCC6" stroke="#4B5563" />
          <rect x="35" y="45" width="150" height="140" rx="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="45" y="45" width="130" height="28" fill="#7C2D12" />
          <text x="110" y="105" fill="#0F172A" fontSize="13" fontWeight="900" textAnchor="middle">
            ESP-WROOM-32
          </text>
          <circle cx="110" cy="307" r="4" fill={isSimulating ? '#3B82F6' : '#27272A'} filter={isSimulating ? 'drop-shadow(0px 0px 5px #3B82F6)' : 'none'} />
          {leftPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="3" fill="#E4E4E7" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="7" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
          {rightPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="3" fill="#E4E4E7" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="7" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 4. Raspberry Pi Pico (RP2040)
  if (id === 'board-raspberry-pi-pico') {
    const leftPins = [
      { id: 'GP0', label: 'GP0', x: 10, y: 30 },
      { id: 'GP1', label: 'GP1', x: 10, y: 50 },
      { id: 'GND', label: 'GND', x: 10, y: 70 },
      { id: 'GP2', label: 'GP2', x: 10, y: 90 },
      { id: 'GP3', label: 'GP3', x: 10, y: 110 },
      { id: '3V3', label: '3V3 Out', x: 10, y: 270 },
    ];
    const rightPins = [
      { id: 'VBUS', label: 'VBUS 5V', x: 190, y: 30 },
      { id: 'VSYS', label: 'VSYS', x: 190, y: 50 },
      { id: 'GND_R', label: 'GND', x: 190, y: 70 },
      { id: '3V3_EN', label: '3V3 EN', x: 190, y: 90 },
      { id: 'GP28', label: 'GP28 (ADC2)', x: 190, y: 110 },
      { id: 'GP25', label: 'GP25 (LED)', x: 190, y: 270 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '200px', height: '320px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 200 320" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="0" y="10" width="200" height="300" rx="6" fill="#008050" stroke="#005530" strokeWidth="2" />
          <rect x="70" y="0" width="60" height="22" rx="2" fill="#B4BCC6" stroke="#4B5563" />
          <rect x="65" y="110" width="70" height="70" rx="4" fill="#111827" />
          <text x="100" y="150" fill="#00E676" fontSize="11" fontWeight="bold" textAnchor="middle">RP2040</text>
          <text x="100" y="220" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">Raspberry Pi Pico</text>
          {leftPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="3.5" fill="#FBBF24" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="7.5" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
          {rightPins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="3.5" fill="#FBBF24" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="7.5" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 5. STM32 BluePill / Nucleo
  if (id === 'board-stm32-nucleo') {
    const pins = [
      { id: '3V3', label: '3.3V', x: 10, y: 30 },
      { id: 'GND', label: 'GND', x: 10, y: 50 },
      { id: 'PA0', label: 'PA0', x: 10, y: 70 },
      { id: 'PA1', label: 'PA1', x: 10, y: 90 },
      { id: 'PC13', label: 'PC13 (LED)', x: 190, y: 30 },
      { id: '5V', label: '5V', x: 190, y: 50 },
      { id: 'PB0', label: 'PB0', x: 190, y: 70 },
      { id: 'PB1', label: 'PB1', x: 190, y: 90 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '200px', height: '300px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-xl overflow-visible">
          <rect x="0" y="10" width="200" height="280" rx="6" fill="#1E3A8A" stroke="#172554" strokeWidth="2" />
          <rect x="70" y="0" width="60" height="20" rx="2" fill="#B4BCC6" />
          <rect x="65" y="100" width="70" height="70" rx="4" fill="#0F172A" transform="rotate(45 100 135)" />
          <text x="100" y="140" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">STM32F103</text>
          <text x="100" y="210" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">STM32 BluePill</text>
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="3" fill="#E2E8F0" />
              {hoveredPinId === pin.id && <circle cx={pin.x} cy={pin.y} r="7" fill="#00E676" fillOpacity="0.4" stroke="#00E676" strokeWidth="1.5" className="animate-pulse" />}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 6. BBC micro:bit
  if (id === 'board-microbit') {
    const pins = [
      { id: 'P0', label: '0', x: 30, y: 155 },
      { id: 'P1', label: '1', x: 75, y: 155 },
      { id: 'P2', label: '2', x: 120, y: 155 },
      { id: '3V', label: '3V', x: 165, y: 155 },
      { id: 'GND', label: 'GND', x: 195, y: 155 },
    ];

    return (
      <div
        className="relative select-none"
        style={{
          width: '220px',
          height: '180px',
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 220 180" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Micro-USB Cable plugged into top */}
          <g id="microbit-usb-cable" transform="translate(95, -50)">
            <rect x="10" y="0" width="10" height="20" rx="2" fill="#18181B" />
            <circle cx="15" cy="5" r="7" fill="#27272A" />
            <rect x="2" y="16" width="26" height="28" rx="3" fill="#27272A" stroke="#18181B" strokeWidth="1.2" />
            {/* Micro-USB Metal plug tip */}
            <path d="M 6,44 L 24,44 L 22,58 L 8,58 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
          </g>

          {/* Main PCB */}
          <rect x="5" y="10" width="210" height="160" rx="12" fill="#18181B" stroke="#09090B" strokeWidth="2" />
          {/* Red Corner Triangles */}
          <path d="M 5,45 L 5,10 L 45,10 Z" fill="#DC2626" />
          <path d="M 215,45 L 215,10 L 175,10 Z" fill="#DC2626" />
          {/* micro:bit Logo */}
          <ellipse cx="110" cy="28" rx="14" ry="8" fill="none" stroke="#DC2626" strokeWidth="2.5" />
          {/* 5x5 LED Matrix */}
          {[...Array(5)].map((_, r) =>
            [...Array(5)].map((_, c) => (
              <circle key={`${r}-${c}`} cx={80 + c * 15} cy={48 + r * 14} r="3" fill="#E4E4E7" stroke="#71717A" strokeWidth="0.8" />
            ))
          )}
          {/* Pushbuttons A & B */}
          <g className="cursor-pointer">
            <circle cx="35" cy="75" r="10" fill="#27272A" stroke="#71717A" strokeWidth="1.5" />
            <text x="35" y="105" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
          </g>
          <g className="cursor-pointer">
            <circle cx="185" cy="75" r="10" fill="#27272A" stroke="#71717A" strokeWidth="1.5" />
            <text x="185" y="105" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
          </g>
          {/* Gold Edge Connector */}
          <rect x="5" y="138" width="210" height="32" rx="3" fill="#CA8A04" />
          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="8" fill="#18181B" stroke="#CA8A04" strokeWidth="1.5" />
              <text x={pin.x} y={pin.y + 4} fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                {pin.label}
              </text>
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="12" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // 7. ATtiny85 Microcontroller DIP-8
  if (id === 'board-attiny85') {
    const pins = [
      { id: 'PB5', label: '1 (PB5)', x: 25, y: 15 },
      { id: 'PB3', label: '2 (PB3)', x: 55, y: 15 },
      { id: 'PB4', label: '3 (PB4)', x: 85, y: 15 },
      { id: 'GND', label: '4 (GND)', x: 115, y: 15 },
      { id: 'PB0', label: '5 (PB0)', x: 115, y: 95 },
      { id: 'PB1', label: '6 (PB1)', x: 85, y: 95 },
      { id: 'PB2', label: '7 (PB2)', x: 55, y: 95 },
      { id: 'VCC', label: '8 (VCC)', x: 25, y: 95 },
    ];

    return (
      <div
        className="relative select-none"
        style={{ width: '140px', height: '110px', transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 140 110" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* 8 DIP Lead Pins */}
          {[25, 55, 85, 115].map((x, i) => (
            <React.Fragment key={i}>
              <rect x={x - 4} y="5" width="8" height="18" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
              <rect x={x - 4} y="87" width="8" height="18" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.8" />
            </React.Fragment>
          ))}

          {/* Main IC Plastic Package Body */}
          <rect x="10" y="20" width="120" height="70" rx="4" fill="#27272A" stroke="#18181B" strokeWidth="1.5" />
          {/* Orientation Notch & Pin 1 Index Dot */}
          <path d="M 10,45 C 18,45 18,65 10,65 Z" fill="#18181B" />
          <circle cx="25" cy="75" r="3.5" fill="#71717A" />

          <text x="70" y="52" fill="#FFFFFF" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">
            ATTINY85
          </text>
          <text x="70" y="66" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">
            20PU
          </text>

          {pins.map((pin) => (
            <g
              key={pin.id}
              className="cursor-pointer"
              onClick={(e) => onPinClick(e, pin.id, pin.label, pin.x, pin.y)}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              <circle cx={pin.x} cy={pin.y} r="4" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
              {hoveredPinId === pin.id && (
                <circle cx={pin.x} cy={pin.y} r="8" fill="#00E676" fillOpacity="0.45" stroke="#00E676" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-[300px] h-[200px] bg-[#1E293B] rounded-xl border-2 border-slate-700 p-4 text-white">
      <div className="font-bold text-sm">{label}</div>
    </div>
  );
};
