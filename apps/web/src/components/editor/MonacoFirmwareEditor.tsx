import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { Play, Pause, Square, RotateCcw, Terminal, Code2, Trash2, Send, FileCode } from 'lucide-react';

const PRESET_SKETCHES: Record<string, { label: string; code: string }> = {
  blink: {
    label: 'LED Blink (D13)',
    code: `// Arduino UNO Digital LED Blink
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("System Ready: LED Blink Loop Started");
}

void loop() {
  digitalWrite(13, HIGH);
  Serial.println("GPIO D13 -> HIGH (5V)");
  delay(500);
  
  digitalWrite(13, LOW);
  Serial.println("GPIO D13 -> LOW (0V)");
  delay(500);
}
`,
  },
  servo: {
    label: 'Servo Motor Sweep',
    code: `#include <Servo.h>

Servo myServo;
int pos = 0;

void setup() {
  Serial.begin(9600);
  myServo.attach(9);
  Serial.println("SG90 Servo Driver Initialized on Pin D9");
}

void loop() {
  for (pos = 0; pos <= 180; pos += 45) {
    myServo.write(pos);
    Serial.print("Servo Angle set to: ");
    Serial.println(pos);
    delay(400);
  }
}
`,
  },
  ultrasonic: {
    label: 'Ultrasonic Distance Sensor',
    code: `#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.println("HC-SR04 Ultrasonic Distance Meter Ready");
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  int distanceCm = duration * 0.034 / 2;
  
  Serial.print("Target Distance: ");
  Serial.print(distanceCm);
  Serial.println(" cm");
  delay(500);
}
`,
  },
  oled: {
    label: 'SSD1306 OLED Display',
    code: `#include <Wire.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

void setup() {
  Serial.begin(9600);
  Serial.println("Initializing SSD1306 OLED Display over I2C...");
  Serial.println("Display Line 1: 'Virtual Lab Ready'");
  Serial.println("Display Line 2: 'Sensors Online'");
}

void loop() {
  delay(1000);
}
`,
  },
};

export const MonacoFirmwareEditor: React.FC = () => {
  const [serialInputText, setSerialInputText] = useState('');
  const {
    firmwareCode,
    updateFirmware,
    status,
    serialLogs,
    start,
    pause,
    stop,
    reset,
    clearLogs,
  } = useSimulationStore();

  const handleSendSerialCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInputText.trim()) return;
    useSimulationStore.setState((state) => ({
      serialLogs: [...state.serialLogs, `[TX Send] > ${serialInputText.trim()}\n`],
    }));
    setSerialInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-surface border-l border-slate-800">
      {/* Firmware Control & Preset Selection Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-panel border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-accent-cyan" />
          <span className="text-xs font-bold text-slate-200 tracking-wider font-mono">
            FIRMWARE
          </span>
          {/* Preset Sketch Selector Dropdown */}
          <select
            onChange={(e) => {
              const selected = PRESET_SKETCHES[e.target.value];
              if (selected) updateFirmware(selected.code);
            }}
            className="px-2 py-0.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-300 focus:outline-none focus:border-accent-cyan"
          >
            <option value="">-- Code Templates --</option>
            {Object.entries(PRESET_SKETCHES).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5">
          {status === 'RUNNING' ? (
            <button
              onClick={() => pause()}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={() => start()}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-500/20 text-accent-emerald border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run</span>
            </button>
          )}

          <button
            onClick={() => stop()}
            disabled={status === 'IDLE' || status === 'STOPPED'}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-all"
            title="Stop Simulation"
          >
            <Square className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => reset()}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
            title="Reset Board Vector"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Container */}
      <div className="flex-1 min-h-[250px]">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          theme="vs-dark"
          value={firmwareCode}
          onChange={(value) => updateFirmware(value || '')}
          options={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>

      {/* Embedded Serial Monitor Terminal */}
      <div className="h-[220px] flex flex-col bg-[#060911] border-t border-slate-800">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-[11px] font-mono text-slate-300 font-semibold">
              SERIAL MONITOR (UART 9600 BAUD)
            </span>
          </div>
          <button
            onClick={clearLogs}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        {/* Console Log Messages */}
        <div className="flex-1 p-3 font-mono text-xs text-slate-300 overflow-y-auto space-y-1 select-text scrollbar-thin">
          {serialLogs.map((log, index) => (
            <div key={index} className="leading-relaxed">
              {log}
            </div>
          ))}
        </div>

        {/* Serial Transmit Form */}
        <form onSubmit={handleSendSerialCommand} className="flex items-center border-t border-slate-800 p-1.5 bg-slate-900/90">
          <input
            type="text"
            placeholder="Send UART serial command..."
            value={serialInputText}
            onChange={(e) => setSerialInputText(e.target.value)}
            className="flex-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-accent-cyan"
          />
          <button
            type="submit"
            className="ml-1.5 px-2.5 py-1 bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan rounded-lg text-xs font-semibold hover:bg-accent-cyan/30 transition-all flex items-center space-x-1"
          >
            <Send className="w-3 h-3" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
