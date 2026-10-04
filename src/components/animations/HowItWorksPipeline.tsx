import React, { useState } from 'react';
import { CreditCard, Cpu, Binary, Layers, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  {
    id: 'transaction',
    step: '01',
    name: 'Transaction',
    subtitle: 'Ingestion & Telemetry',
    icon: CreditCard,
    accentColor: '#38BDF8',
    description: 'Incoming ISO 20022 payment payload captures cardholder velocity, terminal ASN, geo-coordinates, and hardware TLS signature within 0.6ms.',
    math: 'x = [Amount, Velocity_1h, DevRisk, IPRisk, GeoDist]'
  },
  {
    id: 'feature',
    step: '02',
    name: 'Feature Engineering',
    subtitle: 'Dimensional Profiling',
    icon: Layers,
    accentColor: '#06B6D4',
    description: 'Continuous circadian spending baselines and multi-account correlation graphs normalize multi-modal variables into an 8-dimensional normalized input vector.',
    math: 'x̃_i = 2 · (x_i - min(x_i)) / (max(x_i) - min(x_i)) - 1'
  },
  {
    id: 'encoding',
    step: '03',
    name: 'Quantum Encoding',
    subtitle: 'ZZFeatureMap Hilbert Projection',
    icon: Binary,
    accentColor: '#8B5CF6',
    description: 'Embeds normalized classical inputs into 8-qubit quantum states using non-linear unitary transformations, creating an exponential state space of 2⁸ = 256 complex amplitudes.',
    math: '|Ψ(x)⟩ = U_Φ(x) |0⟩^⊗8 = exp(i ∑_j x_j Z_j + ∑_{j<k} (π-x_j)(π-x_k) Z_j Z_k)'
  },
  {
    id: 'variational',
    step: '04',
    name: 'Variational Analysis',
    subtitle: 'Parametric Ansatz U(θ)',
    icon: Cpu,
    accentColor: '#A855F7',
    description: 'Alternating single-qubit Ry/Rz rotations and entangling CNOT bridges isolate subtle cross-vector fraud collusion that bypasses classical decision trees.',
    math: 'U(θ) = ∏_{l=1}^L [ ⊗_i R_y(θ_{l,i}) · ∏_{(j,k)} CNOT_{j,k} ]'
  },
  {
    id: 'risk',
    step: '05',
    name: 'Risk Score',
    subtitle: 'Pauli-Z Observable Readout',
    icon: CheckCircle2,
    accentColor: '#10B981',
    description: 'Measures Pauli-Z expectation values across 10,000 QPU shots, synthesizing a deterministic 0–100% fraud probability and audit-ready SHAP explanation.',
    math: 'R(x) = σ( W · ⟨Ψ(x)| Z_1 ⊗ ... ⊗ Z_8 |Ψ(x)⟩ + b )'
  }
];

export function HowItWorksPipeline() {
  const [activeStageId, setActiveStageId] = useState<string>('encoding');
  const activeStage = STAGES.find(s => s.id === activeStageId) || STAGES[2];

  return (
    <div className="space-y-6">
      
      {/* Horizontal Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {STAGES.map((stage, idx) => {
          const isSelected = stage.id === activeStageId;
          const Icon = stage.icon;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              onMouseEnter={() => setActiveStageId(stage.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 relative group overflow-hidden ${
                isSelected
                  ? 'bg-[#0D1524] border-cyan-500/50 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-[#0A0F18]/70 border-white/[0.06] hover:border-white/20 hover:bg-[#0D131F]'
              }`}
            >
              {/* Active glow line at top */}
              {isSelected && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: stage.accentColor }}
                />
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-slate-300">
                  {stage.step}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isSelected ? `${stage.accentColor}20` : 'rgba(255,255,255,0.03)',
                    color: isSelected ? stage.accentColor : '#94A3B8'
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className="font-semibold text-sm text-white group-hover:text-cyan-300 transition-colors">
                {stage.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                {stage.subtitle}
              </p>

              {/* Arrow separator indicator for desktop */}
              {idx < STAGES.length - 1 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 pointer-events-none">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Illuminated Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="glass-panel p-6 sm:p-7 rounded-xl border border-white/[0.08] relative overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ backgroundColor: activeStage.accentColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-xs font-mono font-semibold rounded"
                  style={{
                    backgroundColor: `${activeStage.accentColor}20`,
                    color: activeStage.accentColor
                  }}
                >
                  Stage {activeStage.step}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeStage.subtitle}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                {activeStage.name}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {activeStage.description}
              </p>
            </div>

            <div className="lg:col-span-5 p-4 rounded-lg bg-black/60 border border-white/5 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Algorithmic Formulation
              </span>
              <div className="font-mono text-xs text-cyan-300 p-3 bg-black/80 rounded border border-white/5 overflow-x-auto leading-relaxed">
                {activeStage.math}
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">
                Hardware execution latency: &lt; 0.8ms per stage
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
