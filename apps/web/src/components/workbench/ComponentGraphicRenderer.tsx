import React from 'react';
import { ComponentDefinition } from '@circuit/shared';
import { Activity, Radio, Monitor, Gauge, Key, Wifi, Zap } from 'lucide-react';

interface ComponentGraphicProps {
  compDef: ComponentDefinition;
  properties: Record<string, any>;
  onPropertyChange: (key: string, value: any) => void;
  isSimulating?: boolean;
}

export const ComponentGraphicRenderer: React.FC<ComponentGraphicProps> = ({
  compDef,
  properties,
  onPropertyChange,
  isSimulating,
}) => {
  const { id } = compDef;

  // 1. Single LED Bulb
  if (id === 'led') {
    return (
      <div className="flex flex-col items-center justify-center p-2 bg-slate-950/80 rounded-xl border border-slate-800">
        <div className="relative mb-2">
          {/* LED Translucent Dome */}
          <div
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              isSimulating
                ? 'bg-rose-500 shadow-[0_0_24px_#f43f5e] border-rose-300 animate-pulse'
                : 'bg-rose-950/60 border-rose-800'
            }`}
          />
          {/* LED Anode Lead / Cathode Lead simulation wires */}
          <div className="flex justify-between w-6 mx-auto mt-1">
            <div className="w-0.5 h-3 bg-slate-400" title="Anode (+)" />
            <div className="w-0.5 h-2 bg-slate-400" title="Cathode (-)" />
          </div>
        </div>
      </div>
    );
  }

  // 2. RGB LED Bulb (4 Leads)
  if (id === 'rgb-led') {
    const r = properties.colorR ?? 255;
    const g = properties.colorG ?? 100;
    const b = properties.colorB ?? 0;

    return (
      <div className="flex flex-col items-center justify-center p-2 bg-slate-950/80 rounded-xl border border-slate-800">
        <div
          style={{
            backgroundColor: isSimulating ? `rgb(${r}, ${g}, ${b})` : '#1e293b',
            boxShadow: isSimulating ? `0 0 24px rgb(${r}, ${g}, ${b})` : 'none',
          }}
          className="w-12 h-12 rounded-full border-2 border-slate-600 transition-all mb-2"
        />
        <div className="flex justify-between w-10 mx-auto space-x-1">
          <div className="w-0.5 h-3 bg-rose-500" title="R" />
          <div className="w-0.5 h-4 bg-slate-400" title="GND" />
          <div className="w-0.5 h-3 bg-emerald-500" title="G" />
          <div className="w-0.5 h-3 bg-blue-500" title="B" />
        </div>
      </div>
    );
  }

  // 3. Ultrasonic HC-SR04 Transducer Graphic
  if (id === 'ultrasonic-hcsr04') {
    const distance = properties.distanceCm ?? 50;

    return (
      <div className="w-[200px] p-2.5 bg-[#0d233a] rounded-xl border-2 border-[#163a61] shadow-lg font-mono text-white select-none">
        <div className="text-[10px] font-bold text-cyan-300 text-center tracking-wider mb-2">
          HC-SR04 ULTRASONIC
        </div>

        {/* Dual Metallic Mesh Transducers (T and R) */}
        <div className="flex justify-between px-3 my-2">
          {/* Trigger Transducer (T) */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 border-2 border-slate-300 flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900/60 flex items-center justify-center text-[9px] font-bold text-slate-300">
              T
            </div>
          </div>

          {/* Receiver Transducer (R) */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 border-2 border-slate-300 flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900/60 flex items-center justify-center text-[9px] font-bold text-slate-300">
              R
            </div>
          </div>
        </div>

        {/* Interactive Distance Slider */}
        <div className="mt-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Target Distance:</span>
            <span className="text-accent-cyan font-bold">{distance} cm</span>
          </div>
          <input
            type="range"
            min="2"
            max="400"
            value={distance}
            onChange={(e) => onPropertyChange('distanceCm', parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>
    );
  }

  // 4. Micro Servo SG90 Motor Graphic
  if (id === 'servo') {
    const angle = properties.angle ?? 90;

    return (
      <div className="w-[190px] p-2.5 bg-[#0284c7]/90 rounded-xl border-2 border-sky-600 shadow-lg font-mono text-white select-none">
        <div className="text-[10px] font-extrabold text-slate-100 text-center tracking-wider mb-2">
          SG90 MICRO SERVO
        </div>

        {/* Rotating Servo Horn Arm */}
        <div className="relative w-20 h-20 mx-auto my-1 bg-slate-900 rounded-full border-2 border-sky-400 flex items-center justify-center shadow-inner">
          <div
            style={{ transform: `rotate(${angle - 90}deg)` }}
            className="w-16 h-3 bg-slate-100 rounded-full border border-slate-400 transition-transform duration-200 flex items-center justify-end pr-1 shadow-md origin-center"
          >
            <div className="w-2 h-2 rounded-full bg-sky-600" />
          </div>
        </div>

        {/* Interactive Servo Angle Slider */}
        <div className="mt-2 p-1.5 rounded-lg bg-slate-950 border border-slate-800">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Shaft Angle:</span>
            <span className="text-amber-400 font-bold">{angle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={angle}
            onChange={(e) => onPropertyChange('angle', parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>
    );
  }

  // 5. SSD1306 0.96" I2C OLED Display Graphic
  if (id === 'oled-ssd1306') {
    const text = properties.displayText ?? 'SSD1306 OLED Ready';

    return (
      <div className="w-[220px] p-2.5 bg-slate-950 rounded-xl border-2 border-slate-800 shadow-xl font-mono text-white select-none">
        <div className="flex justify-between text-[9px] text-slate-400 border-b border-slate-800 pb-1 mb-2">
          <span className="font-bold text-slate-200">0.96" OLED I2C</span>
          <span className="text-cyan-400 font-mono">128x64</span>
        </div>

        {/* OLED Pixel Screen */}
        <div className="w-full h-20 bg-black rounded-lg border border-cyan-500/50 p-2 text-cyan-300 font-mono text-[10px] shadow-inner flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between text-[8px] text-cyan-600 border-b border-cyan-900/60 pb-0.5">
            <span>Virtual IoT System</span>
            <span>{isSimulating ? 'ONLINE' : 'STANDBY'}</span>
          </div>
          <div className="text-cyan-200 font-bold tracking-widest leading-relaxed">
            {isSimulating ? text : '[ Waiting Signal ]'}
          </div>
        </div>
      </div>
    );
  }

  // 6. 4x4 Matrix Keypad Graphic
  if (id === 'keypad-4x4') {
    const keys = ['1', '2', '3', 'A', '4', '5', '6', 'B', '7', '8', '9', 'C', '*', '0', '#', 'D'];
    const activeKey = properties.lastKeyPressed ?? 'None';

    return (
      <div className="w-[200px] p-2.5 bg-slate-900 rounded-xl border-2 border-slate-700 shadow-xl font-mono text-white select-none">
        <div className="text-[10px] font-bold text-amber-300 text-center tracking-wider mb-2">
          4x4 MATRIX KEYPAD
        </div>
        <div className="grid grid-cols-4 gap-1">
          {keys.map((k) => (
            <button
              key={k}
              onClick={(e) => {
                e.stopPropagation();
                onPropertyChange('lastKeyPressed', k);
              }}
              className={`p-2 text-center rounded border font-bold text-xs transition-all ${
                activeKey === k
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_10px_#f59e0b]'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 7. RC522 RFID Reader Graphic
  if (id === 'rfid-rc522') {
    const cardPresent = properties.cardPresent ?? false;
    const uid = properties.detectedUid ?? 'A1:B2:C3:D4';

    return (
      <div className="w-[210px] p-2.5 bg-[#8b0000] rounded-xl border-2 border-[#b22222] shadow-xl font-mono text-white select-none">
        <div className="text-[10px] font-bold text-amber-200 text-center tracking-wider mb-1">
          RC522 RFID READER
        </div>

        {/* Antenna Coil Silkscreen */}
        <div className="w-full h-16 my-2 rounded-lg border-2 border-amber-400/60 bg-red-950/60 flex items-center justify-center text-[9px] text-amber-300 font-bold">
          [ 13.56 MHz ANTENNA COIL ]
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPropertyChange('cardPresent', !cardPresent);
          }}
          className={`w-full py-1.5 rounded-lg border text-[10px] font-bold tracking-wider transition-all ${
            cardPresent
              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-[0_0_12px_#f59e0b]'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {cardPresent ? `Tag Tapped: ${uid}` : 'Tap RFID Card'}
        </button>
      </div>
    );
  }

  // Fallback for general sensors & passive components
  return (
    <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
      <div className="text-[10px] font-bold text-slate-300 truncate max-w-[140px]">
        {compDef.name}
      </div>
    </div>
  );
};
