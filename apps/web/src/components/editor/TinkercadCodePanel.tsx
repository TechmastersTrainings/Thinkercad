import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { Code2, Download, Terminal, Trash2, Send, X, ChevronDown } from 'lucide-react';

const SKETCH_TEMPLATES: Record<string, { label: string; code: string }> = {
  blink: {
    label: 'LED Blink (Pin 13)',
    code: `// Arduino UNO Digital LED Blink
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("System Ready: Tinkercad 3D LED Blink Loop Started");
}

void loop() {
  digitalWrite(13, HIGH);
  Serial.println("Pin 13 -> HIGH (5V)");
  delay(500);
  
  digitalWrite(13, LOW);
  Serial.println("Pin 13 -> LOW (0V)");
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
  Serial.println("SG90 Servo Motor Driver Initialized on Pin D9");
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
    label: 'Ultrasonic Distance Meter',
    code: `#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  Serial.println("HC-SR04 Ultrasonic Distance Sensor Online");
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
};

export const TinkercadCodePanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [serialInputText, setSerialInputText] = useState('');
  const [isSerialOpen, setIsSerialOpen] = useState(true);
  const [codeMode, setCodeMode] = useState<'text' | 'blocks' | 'blocks-text'>('text');
  const [baudRate, setBaudRate] = useState('9600');

  const { firmwareCode, updateFirmware, serialLogs, clearLogs } = useSimulationStore();

  if (!isOpen) return null;

  const handleSendSerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInputText.trim()) return;
    useSimulationStore.setState((state) => ({
      serialLogs: [...state.serialLogs, `[TX Send] > ${serialInputText.trim()}\n`],
    }));
    setSerialInputText('');
  };

  const handleDownloadCode = () => {
    const blob = new Blob([firmwareCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sketch.ino';
    a.click();
  };

  return (
    <div className="w-[520px] h-full bg-[#FFFFFF] border-l border-[#CFD4D9] flex flex-col shadow-2xl z-20 shrink-0 font-sans select-text animate-in slide-in-from-right duration-200">
      {/* Tinkercad Code Header Bar */}
      <div className="px-3 py-2 bg-[#F4F6F8] border-b border-[#CFD4D9] flex items-center justify-between select-none">
        {/* Code Mode Selector & Presets */}
        <div className="flex items-center space-x-2">
          {/* Mode Dropdown */}
          <div className="relative">
            <select
              value={codeMode}
              onChange={(e) => setCodeMode(e.target.value as any)}
              className="bg-white border border-[#BDC5CC] text-[#222222] font-bold text-xs rounded px-2.5 py-1 pr-6 appearance-none focus:outline-none focus:border-[#00C853] cursor-pointer shadow-sm"
            >
              <option value="text">Text (C++)</option>
              <option value="blocks">Blocks</option>
              <option value="blocks-text">Blocks + Text</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#666666] absolute right-2 top-2 pointer-events-none" />
          </div>

          {/* Template Preset Dropdown */}
          <select
            onChange={(e) => {
              const tmpl = SKETCH_TEMPLATES[e.target.value];
              if (tmpl) updateFirmware(tmpl.code);
            }}
            className="px-2 py-1 text-xs bg-white border border-[#BDC5CC] rounded text-[#333333] focus:outline-none focus:border-[#00C853]"
          >
            <option value="">-- Code Presets --</option>
            {Object.entries(SKETCH_TEMPLATES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls: Download Code & Close */}
        <div className="flex items-center space-x-2 select-none">
          <button
            onClick={handleDownloadCode}
            className="flex items-center space-x-1 px-2.5 py-1 bg-white border border-[#BDC5CC] hover:bg-[#E8ECEF] text-[#333333] font-semibold rounded text-xs transition-colors"
            title="Download Code Sketch (.ino)"
          >
            <Download className="w-3.5 h-3.5 text-[#00A859]" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#E0E0E0] text-[#666666] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="flex-1 min-h-[280px] select-text">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          theme="vs"
          value={firmwareCode}
          onChange={(v) => updateFirmware(v || '')}
          options={{
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            selectOnLineNumbers: true,
            quickSuggestions: true,
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            contextmenu: true,
          }}
        />
      </div>

      {/* Tinkercad Bottom Serial Monitor Drawer */}
      <div className="border-t border-[#CFD4D9] bg-[#F4F6F8]">
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#E8ECEF] border-b border-[#CFD4D9]">
          <button
            onClick={() => setIsSerialOpen(!isSerialOpen)}
            className="flex items-center space-x-1.5 font-bold text-xs text-[#333333] hover:text-[#00A859] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00A859]" />
            <span>Serial Monitor</span>
          </button>

          <div className="flex items-center space-x-2">
            <select
              value={baudRate}
              onChange={(e) => setBaudRate(e.target.value)}
              className="px-2 py-0.5 text-[11px] bg-white border border-[#BDC5CC] rounded text-[#333333]"
            >
              <option value="9600">9600 baud</option>
              <option value="115200">115200 baud</option>
              <option value="57600">57600 baud</option>
            </select>
            <button
              onClick={clearLogs}
              className="p-1 text-[#666666] hover:text-rose-600 transition-colors"
              title="Clear Serial Monitor Logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {isSerialOpen && (
          <div className="flex flex-col h-[180px]">
            <div className="flex-1 p-3 bg-[#1E1E1E] font-mono text-xs text-[#00E676] overflow-y-auto space-y-1 select-text scrollbar-thin">
              {serialLogs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendSerial} className="flex items-center p-1.5 bg-[#E8ECEF] border-t border-[#CFD4D9]">
              <input
                type="text"
                placeholder="Send serial command..."
                value={serialInputText}
                onChange={(e) => setSerialInputText(e.target.value)}
                className="flex-1 px-2.5 py-1 bg-white border border-[#BDC5CC] focus:border-[#00C853] rounded text-xs font-mono text-[#222222] focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-[#00A859] hover:bg-[#00C853] text-white font-bold rounded text-xs transition-colors flex items-center space-x-1 shadow-sm"
              >
                <Send className="w-3 h-3" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
