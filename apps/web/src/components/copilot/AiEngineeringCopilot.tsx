import React, { useState } from 'react';
import { useCircuitStore } from '../../store/useCircuitStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import { Bot, Sparkles, BookOpen, Wrench, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';

interface VivaQuestion {
  id: string;
  question: string;
  hint: string;
  answer: string;
}

export const AiEngineeringCopilot: React.FC<{ onOpenBuildGuide: () => void }> = ({ onOpenBuildGuide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    summary: string;
    diagnoses: string[];
    vivaQuestions: VivaQuestion[];
    buildSteps: string[];
  } | null>(null);

  const { components, wires, validationErrors } = useCircuitStore();
  const { firmwareCode } = useSimulationStore();

  const runAiInspection = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/ai/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          components,
          wires,
          firmware_code: firmwareCode,
          electrical_errors: validationErrors,
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const data = await res.json();
      setAnalysisResult({
        summary: data.summary,
        diagnoses: data.diagnoses,
        vivaQuestions: data.viva_questions,
        buildSteps: data.hardware_build_steps,
      });
    } catch (err) {
      // Fallback local response if API offline
      setAnalysisResult({
        summary: `Analyzed ${components.length} components & ${wires.length} wires. Electrical engine flagged ${validationErrors.length} potential issues.`,
        diagnoses: validationErrors.map(
          (e) => `[${e.severity}] ${e.title}: ${e.message} -> ${e.recommendation}`
        ),
        vivaQuestions: [
          {
            id: '1',
            question: 'Why is a series resistor required when powering an LED from a digital GPIO output?',
            hint: 'Recall Ohm\'s law V = I * R.',
            answer: 'To limit current below the LED\'s 20mA maximum rating and prevent diode burnout.',
          },
        ],
        buildSteps: [
          '1. Insert microcontroller into breadboard.',
          '2. Wire power (5V/GND) to rails.',
          '3. Connect LED anode via 220Ω resistor to GPIO pin.',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!analysisResult) runAiInspection();
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent-cyan to-blue-600 text-white font-semibold text-xs shadow-xl shadow-accent-cyan/30 hover:scale-105 transition-all"
      >
        <Bot className="w-4 h-4" />
        <span>AI Copilot & Tutor</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
      </button>

      {/* Slide-out Panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-[420px] bg-surface/95 border-l border-slate-800 shadow-2xl backdrop-blur-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          {/* Panel Header */}
          <div className="p-4 bg-panel/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-accent-cyan/20 flex items-center justify-center border border-accent-cyan/40">
                <Bot className="w-4 h-4 text-accent-cyan" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-100 tracking-wide">
                  AI ENGINEERING COPILOT
                </h3>
                <p className="text-[10px] text-slate-400">
                  Virtual Systems Tutor & Project Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* Inspect Action */}
            <button
              onClick={runAiInspection}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40 hover:bg-accent-cyan/30 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Analyzing Engineering Model...' : 'Re-Inspect Circuit & Firmware'}</span>
            </button>

            {/* Hardware Build Guide Button */}
            <button
              onClick={onOpenBuildGuide}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-panel border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-medium transition-all group"
            >
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-accent-amber" />
                <span>Generate Real-World Build Guide & BOM</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            {analysisResult && (
              <>
                {/* Engineering Analysis Summary */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center space-x-1.5 text-accent-cyan font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>System Analysis Summary</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* AI Diagnoses */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
                    <span>Engineering Diagnoses</span>
                  </h4>
                  {analysisResult.diagnoses.map((diag, index) => (
                    <div
                      key={index}
                      className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-[11px] text-slate-300 leading-relaxed"
                    >
                      {diag}
                    </div>
                  ))}
                </div>

                {/* Viva Quiz Questions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>AI Viva Questions</span>
                  </h4>
                  {analysisResult.vivaQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-3 rounded-xl bg-panel border border-slate-800 text-xs space-y-1.5"
                    >
                      <p className="font-semibold text-slate-200">{q.question}</p>
                      <p className="text-[11px] text-amber-400/90 italic">Hint: {q.hint}</p>
                      <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-400">
                        <span className="font-semibold text-accent-emerald">Answer: </span>
                        {q.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
