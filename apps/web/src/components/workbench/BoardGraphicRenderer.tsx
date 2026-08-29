import React from 'react';
import { BoardDefinition } from '@circuit/shared';

interface BoardGraphicProps {
  boardDef: BoardDefinition;
  label: string;
  isSimulating?: boolean;
}

export const BoardGraphicRenderer: React.FC<BoardGraphicProps> = ({ boardDef, label, isSimulating }) => {
  const { id } = boardDef;

  // 1. ESP32 DevKit V1 Board Graphic
  if (id === 'board-esp32-devkit') {
    return (
      <div className="relative w-[300px] h-[360px] bg-[#12141a] rounded-xl border border-slate-700 p-3 shadow-2xl overflow-hidden font-mono select-none">
        {/* Micro-USB Port at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-700 rounded-b-md border border-slate-500 flex items-center justify-center">
          <div className="w-6 h-2 bg-slate-900 rounded-[2px]" />
        </div>

        {/* Board Main Title & Branding Silkscreen */}
        <div className="mt-5 text-center">
          <div className="text-[11px] font-bold text-slate-100 tracking-wider">ESP32 DevKit V1</div>
          <div className="text-[9px] text-accent-cyan tracking-widest font-sans font-semibold">Wi-Fi + Bluetooth MCU</div>
        </div>

        {/* ESP-WROOM-32 Metallic Shield Module */}
        <div className="mx-auto my-3 w-40 h-32 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 rounded-lg border-2 border-slate-300 p-2 shadow-md relative flex flex-col justify-between">
          <div className="w-8 h-4 bg-black/60 rounded text-[7px] text-amber-400 flex items-center justify-center font-bold">
            FCC ID
          </div>

          {/* Wi-Fi Meander Antenna trace at top of chip */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-2 bg-amber-600/40 rounded-t border-t border-amber-500" />

          <div className="text-center text-slate-900 font-extrabold text-[10px] tracking-widest">
            ESP-WROOM-32
          </div>
          <div className="text-[8px] text-slate-800 text-center font-mono">Espressif 240MHz</div>
        </div>

        {/* EN and BOOT Tactile Buttons */}
        <div className="flex justify-between px-6 my-2">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-inner">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <span className="text-[8px] text-slate-400 font-bold">EN</span>
          </div>

          {/* Onboard Status LED */}
          <div className="flex flex-col items-center space-y-1">
            <div
              className={`w-3 h-3 rounded-full border transition-all ${
                isSimulating ? 'bg-blue-500 shadow-[0_0_12px_#3b82f6] border-blue-300 animate-pulse' : 'bg-slate-800 border-slate-600'
              }`}
            />
            <span className="text-[8px] text-slate-400 font-bold">LED2</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-inner">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <span className="text-[8px] text-slate-400 font-bold">BOOT</span>
          </div>
        </div>

        {/* Dual Row Female Header Pins Background Labels */}
        <div className="flex justify-between text-[8px] text-slate-500 px-2 mt-4">
          <span>3V3 GND GPIO2 GPIO4...</span>
          <span>...GPIO21 GPIO22 RX TX</span>
        </div>
      </div>
    );
  }

  // 2. Arduino UNO R3 Board Graphic
  if (id === 'board-arduino-uno') {
    return (
      <div className="relative w-[320px] h-[240px] bg-[#00609c] rounded-2xl border-2 border-[#004b7a] p-3 shadow-2xl font-mono select-none overflow-hidden text-white">
        {/* USB Type-B Port Metallic Connector */}
        <div className="absolute top-2 left-0 w-10 h-14 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-200 rounded-r-md border-y border-r border-slate-500 shadow-md flex items-center justify-center">
          <div className="w-6 h-8 bg-slate-900 rounded-sm border border-slate-600" />
        </div>

        {/* DC Power Barrel Jack */}
        <div className="absolute bottom-2 left-0 w-12 h-14 bg-slate-900 rounded-r-lg border-y border-r border-slate-700 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-slate-950 border border-amber-600" />
        </div>

        {/* Board Title Silkscreen */}
        <div className="ml-14 mt-1">
          <div className="text-sm font-extrabold tracking-wider text-slate-100 font-sans">
            ARDUINO <span className="text-cyan-300">UNO</span>
          </div>
          <div className="text-[8px] text-cyan-200 tracking-widest uppercase">ATmega328P Microcontroller</div>
        </div>

        {/* ATmega328P DIP IC Chip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-10 bg-slate-900 rounded-md border border-slate-700 flex items-center justify-between px-3 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="text-[9px] font-bold text-slate-300 tracking-widest">ATMEGA328P-PU</span>
          <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
        </div>

        {/* Onboard Pin 13 LED Indicator */}
        <div className="absolute top-12 right-24 flex items-center space-x-1">
          <span className="text-[8px] font-bold text-slate-200">L</span>
          <div
            className={`w-2.5 h-2.5 rounded-full border transition-all ${
              isSimulating ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b] border-amber-200 animate-pulse' : 'bg-slate-800 border-slate-600'
            }`}
          />
        </div>

        {/* RX/TX LEDs */}
        <div className="absolute top-20 right-24 flex flex-col space-y-1 text-[7px] text-slate-300 font-bold">
          <div className="flex items-center space-x-1">
            <span>TX</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>
          <div className="flex items-center space-x-1">
            <span>RX</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>
        </div>

        {/* Digital Header Bar Label at Top */}
        <div className="absolute top-1 right-4 text-[8px] text-white/80 font-bold">
          DIGITAL (PWM ~)
        </div>

        {/* Power / Analog Header Bar Label at Bottom */}
        <div className="absolute bottom-1 right-4 text-[8px] text-white/80 font-bold">
          POWER / ANALOG IN
        </div>
      </div>
    );
  }

  // 3. Arduino Mega 2560 Board Graphic
  if (id === 'board-arduino-mega') {
    return (
      <div className="relative w-[360px] h-[240px] bg-[#005a9c] rounded-2xl border-2 border-[#004070] p-3 shadow-2xl font-mono select-none overflow-hidden text-white">
        <div className="absolute top-2 left-0 w-10 h-14 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-200 rounded-r-md border-slate-500 shadow-md flex items-center justify-center">
          <div className="w-6 h-8 bg-slate-900 rounded-sm" />
        </div>
        <div className="ml-14 mt-1">
          <div className="text-sm font-extrabold tracking-wider text-slate-100 font-sans">
            ARDUINO <span className="text-amber-300">MEGA 2560</span>
          </div>
          <div className="text-[8px] text-cyan-200 tracking-widest uppercase">54 Digital GPIOs • 16 Analog Inputs</div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center shadow-lg transform rotate-45">
          <span className="text-[8px] font-bold text-slate-300 transform -rotate-45">ATmega2560</span>
        </div>
      </div>
    );
  }

  // 4. Raspberry Pi Pico Graphic
  if (id === 'board-raspberry-pi-pico') {
    return (
      <div className="relative w-[280px] h-[340px] bg-[#008050] rounded-xl border-2 border-[#005530] p-3 shadow-2xl font-mono select-none overflow-hidden text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 bg-slate-300 rounded-b-md border border-slate-500 flex items-center justify-center">
          <div className="w-5 h-2 bg-slate-900" />
        </div>
        <div className="mt-5 text-center">
          <div className="text-xs font-bold text-slate-100 tracking-wider">Raspberry Pi Pico</div>
          <div className="text-[8px] text-emerald-200 tracking-widest font-sans font-semibold">RP2040 Dual ARM Cortex-M0+</div>
        </div>
        <div className="mx-auto my-6 w-20 h-20 bg-black rounded-lg border border-slate-700 flex items-center justify-center shadow-lg">
          <span className="text-[9px] font-bold text-emerald-400">RP2040</span>
        </div>
      </div>
    );
  }

  // 5. STM32 BluePill Graphic
  if (id === 'board-stm32-nucleo') {
    return (
      <div className="relative w-[280px] h-[320px] bg-[#1a365d] rounded-xl border-2 border-[#102a43] p-3 shadow-2xl font-mono select-none overflow-hidden text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 bg-slate-400 rounded-b-md flex items-center justify-center">
          <div className="w-5 h-2 bg-slate-900" />
        </div>
        <div className="mt-5 text-center">
          <div className="text-xs font-bold text-slate-100 tracking-wider">STM32 BluePill</div>
          <div className="text-[8px] text-blue-300 tracking-widest font-sans font-semibold">ARM Cortex-M3 72MHz</div>
        </div>
        <div className="mx-auto my-6 w-24 h-24 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center shadow-lg">
          <span className="text-[9px] font-bold text-blue-400">STM32F103</span>
        </div>
      </div>
    );
  }

  // Default fallback board graphic
  return (
    <div className="w-[280px] h-[200px] bg-slate-900 rounded-xl border border-slate-700 p-3 text-slate-200">
      <div className="text-xs font-bold">{label}</div>
    </div>
  );
};
