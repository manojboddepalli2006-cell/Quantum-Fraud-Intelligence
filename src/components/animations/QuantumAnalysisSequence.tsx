import React, { useState, useEffect } from 'react';
import { Cpu, XCircle, Check, Loader2, Binary } from 'lucide-react';
import { AnalysisStep } from '../../types';
import { QuantumStageVisualizer } from '../3d/QuantumStageVisualizer';
import { useTheme } from '../../context/ThemeContext';

interface QuantumAnalysisSequenceProps {
  onComplete: () => void;
  onCancel: () => void;
  tentativeRiskScore?: number;
}

const STAGES: {
  key: AnalysisStep;
  step: string;
  title: string;
  desc: string;
  math: string;
}[] = [
  {
    key: 'preprocessing',
    step: '01',
    title: 'Feature Preprocessing',
    desc: 'Normalizing transaction telemetry, velocity vectors, and TLS device hashes.',
    math: 'Standardizing 9-vector dimensional inputs x ∈ ℝ⁹'
  },
  {
    key: 'encoding',
    step: '02',
    title: 'Quantum Encoding',
    desc: 'Mapping classical feature vectors into 8-qubit Hilbert space via ZZFeatureMap.',
    math: '|Ψ(x)⟩ = U_Φ(x)|0⟩^⊗8  ·  Angle phase embedding'
  },
  {
    key: 'variational',
    step: '03',
    title: 'Variational Analysis',
    desc: 'Executing parameterized ansatz U(θ) through entangling CNOT layers.',
    math: 'U(θ) = ∏_l [ ⊗_i R_y(θ_i) · ∏ CNOT_{j,k} ] depth 3'
  },
  {
    key: 'measurement',
    step: '04',
    title: 'Measurement',
    desc: 'Collapsing state vectors into Pauli-Z expectation values across 10,000 QPU shots.',
    math: 'Evaluating observables ⟨Z_0 Z_1⟩ ... ⟨Z_6 Z_7⟩'
  },
  {
    key: 'risk_engine',
    step: '05',
    title: 'Risk Engine',
    desc: 'Synthesizing quantum kernel correlation matrix into deterministic risk score.',
    math: 'R(x) = σ(W · ⟨Ψ|M|Ψ⟩ + b) → Calibrating decision boundary'
  }
];

export function QuantumAnalysisSequence({
  onComplete,
  onCancel,
  tentativeRiskScore = 87
}: QuantumAnalysisSequenceProps) {
  const { setActiveAnalysisStep } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    setActiveAnalysisStep('preprocessing');
    const startTime = Date.now();
    const timer = setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 40);

    // 4-second sequence progression across 5 stages (800ms per stage)
    const s1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setActiveAnalysisStep('encoding');
    }, 800);
    const s2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setActiveAnalysisStep('variational');
    }, 1600);
    const s3 = setTimeout(() => {
      setCurrentStepIndex(3);
      setActiveAnalysisStep('measurement');
    }, 2400);
    const s4 = setTimeout(() => {
      setCurrentStepIndex(4);
      setActiveAnalysisStep('risk_engine');
    }, 3200);
    const s5 = setTimeout(() => {
      clearInterval(timer);
      onComplete();
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
      clearTimeout(s5);
    };
  }, [onComplete, setActiveAnalysisStep]);

  const currentStage = STAGES[currentStepIndex];
  const progressPercent = Math.min(100, Math.round(((elapsedMs) / 4000) * 100));

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/40 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 animate-pulse">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              Quantum Variational Risk Execution
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Hardware Target: 127 Superconducting Transmons · Target Q-Volume: 4096
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right font-mono">
            <span className="text-xs text-slate-400 block">Elapsed Time</span>
            <span className="text-base font-bold text-cyan-400 tabular-nums">
              {(elapsedMs / 1000).toFixed(2)}s / 4.00s
            </span>
          </div>

          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-500/30 rounded-md transition-colors min-h-[36px]"
          >
            <XCircle className="w-4 h-4" />
            Cancel Scan
          </button>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            Active Stage {currentStage.step}: {currentStage.title}
          </span>
          <span className="tabular-nums font-semibold text-white">{progressPercent}%</span>
        </div>

        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-500 transition-all duration-150 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main 2-Column Section: 5 Progress Steps + Dedicated 3D Morphing Stage Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
        
        {/* Left Column: 5 Sequential Stages */}
        <div className="lg:col-span-6 space-y-2.5">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={stage.key}
                className={`p-3.5 rounded-xl border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/50 ring-1 ring-cyan-500/30 shadow-md'
                    : isCompleted
                    ? 'bg-[#080D16] border-emerald-500/30 opacity-90'
                    : 'bg-black/20 border-white/[0.04] opacity-40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {stage.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      {stage.title}
                    </h4>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Done
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-600">Pending</span>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {stage.desc}
                </p>

                {isCurrent && (
                  <div className="mt-2 text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-1 rounded border border-cyan-500/20">
                    {stage.math}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: 3D Visualization beside the progress steps */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <QuantumStageVisualizer
            stage={currentStage.key}
            riskScore={tentativeRiskScore}
            className="w-full h-full min-h-[300px]"
          />
        </div>

      </div>

      {/* Real-time State Math Output Ticker */}
      <div className="p-3 bg-black/60 rounded-lg border border-white/5 font-mono text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Binary className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-[11px] text-cyan-300 truncate">
            {currentStepIndex === 0 && 'Applying robust MinMax feature standardizer (p=0.95)...'}
            {currentStepIndex === 1 && '|Ψ(x)⟩ = U_Φ(x)|0⟩^⊗8  ·  ZZ-entanglement phase encoding'}
            {currentStepIndex === 2 && 'Optimizing variational parameter array θ with SPSA optimizer'}
            {currentStepIndex === 3 && 'Sampling Pauli observables Z_0 Z_1, Z_2 Z_3 (shots=10,000)'}
            {currentStepIndex === 4 && 'Evaluating quantum kernel Gram matrix against historical fraud manifold'}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2">
          Gate Fidelity: 99.96%
        </span>
      </div>
    </div>
  );
}
