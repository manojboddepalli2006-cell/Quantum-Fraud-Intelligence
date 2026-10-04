import React, { useState } from 'react';
import { QuantumCircuitCanvas } from '../../components/3d/QuantumCircuitCanvas';
import { BlochSphereCanvas } from '../../components/3d/BlochSphereCanvas';
import {
  Eye,
  Cpu,
  Binary,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Layers,
  Activity,
  Atom,
  ChevronRight
} from 'lucide-react';

const FEATURE_CONTRIBUTIONS = [
  { name: 'Behavior Deviation', percent: 31, color: '#8B5CF6', tag: 'Circadian Anomaly' },
  { name: 'Device Risk', percent: 24, color: '#06B6D4', tag: 'Headless Browser Hash' },
  { name: 'IP Risk', percent: 18, color: '#38BDF8', tag: 'Tor Exit Proxy ASN' },
  { name: 'Transaction Velocity', percent: 15, color: '#F59E0B', tag: '6 Auth Attempts / 60m' },
  { name: 'Location Anomaly', percent: 8, color: '#EC4899', tag: '9,840 km Intercontinental Leap' },
  { name: 'Amount Anomaly', percent: 4, color: '#10B981', tag: 'Above Median Spend Threshold' }
];

const QUBIT_STATES = [
  {
    qubit: 'Qubit 0',
    feature: 'Behavior Deviation Vector',
    prob0: 19,
    prob1: 81,
    phase: 'θ = 2.45 rad',
    stateStr: '|Ψ₀⟩ = 0.44|0⟩ + 0.90|1⟩'
  },
  {
    qubit: 'Qubit 1',
    feature: 'Device Hardware Entropy',
    prob0: 28,
    prob1: 72,
    phase: 'θ = 2.01 rad',
    stateStr: '|Ψ₁⟩ = 0.53|0⟩ + 0.85|1⟩'
  },
  {
    qubit: 'Qubit 2',
    feature: 'IP Geolocation & ASN Risk',
    prob0: 36,
    prob1: 64,
    phase: 'θ = 1.85 rad',
    stateStr: '|Ψ₂⟩ = 0.60|0⟩ + 0.80|1⟩'
  },
  {
    qubit: 'Qubit 3',
    feature: 'Transaction Velocity (1h)',
    prob0: 22,
    prob1: 78,
    phase: 'θ = 2.18 rad',
    stateStr: '|Ψ₃⟩ = 0.47|0⟩ + 0.88|1⟩'
  }
];

export function ExplainableAiPage() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="space-y-12 pb-20">
      
      {/* =========================================================================
          HEADER
         ========================================================================= */}
      <div className="space-y-1.5 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Eye className="w-4 h-4" />
          <span>Explainable Quantum Decision Logic</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Explainable Quantum Intelligence
        </h1>
        <p className="text-sm text-slate-300">
          Understand the signals behind every fraud decision.
        </p>
      </div>

      {/* =========================================================================
          MAIN VISUAL: Large Interactive 3D Quantum Circuit
         ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-display font-bold text-white">
              End-to-End Variational Quantum Circuit (VQC)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            10,000 QPU Measurement Shots · Coherence T₁: 420 µs
          </span>
        </div>

        <QuantumCircuitCanvas className="w-full h-80 sm:h-96" />
      </div>

      {/* =========================================================================
          FEATURE CONTRIBUTION & NATURAL LANGUAGE EXPLANATION (2-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Feature Contribution Animated Bars (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-6 flex flex-col justify-between">
          <div className="pb-2 border-b border-white/[0.06]">
            <h3 className="text-lg font-display font-bold text-white">
              Feature Contribution Analysis
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Quantum Shapley decomposition of multi-vector decision weights
            </p>
          </div>

          <div className="space-y-4">
            {FEATURE_CONTRIBUTIONS.map((feat) => (
              <div key={feat.name} className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 font-semibold">{feat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[10px] hidden sm:inline">{feat.tag}</span>
                    <span className="font-bold text-white tabular-nums">{feat.percent}%</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${feat.percent}%`,
                      backgroundColor: feat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span>Method: Exact Cooperative Q-SHAP</span>
            <span className="text-cyan-400">Total Contribution: 100%</span>
          </div>
        </div>

        {/* Right: Natural Language Explanation & Model Confidence (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Natural Language Explanation Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/30 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Automated Executive Summary</span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Decision Rationale
              </span>
              <p className="text-sm text-slate-100 font-sans leading-relaxed font-medium">
                "The transaction was classified as high risk primarily because its device behavior and transaction velocity differ significantly from the user's historical pattern."
              </p>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Classical heuristic models often dismiss individual baseline variances. In contrast, quantum entanglement detects subtle cross-factor collusion between non-linear device hashes and rapid transaction velocity within seconds.
            </p>
          </div>

          {/* Model Confidence Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Quantum Assessment
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-4xl font-display font-extrabold text-cyan-400 tabular-nums">
                    87%
                  </span>
                  <span className="text-sm font-mono font-bold text-white">
                    Model Confidence
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span className="text-[11px] font-mono font-semibold text-slate-300 block">
                What does this confidence score mean?
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Confidence measures how clearly the quantum wavefunction settled into its final state across 10,000 repeated QPU shots. An 87% confidence rating confirms strong mathematical separation from benign cardholder behavior.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          QUANTUM STATES (Visual representation of Qubit 0, 1, 2, 3)
         ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <div>
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Atom className="w-4 h-4 text-cyan-400" />
              Quantum State Tomography (4-Qubit Register)
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Individual state amplitudes: Probability |0⟩ (Nominal) vs Probability |1⟩ (Fraud)
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Pauli-Z Basis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUBIT_STATES.map((q) => (
            <div key={q.qubit} className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 block">
                    {q.qubit}
                  </span>
                  <span className="text-[11px] text-slate-300 font-sans block truncate max-w-[150px]">
                    {q.feature}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                  {q.phase}
                </span>
              </div>

              {/* Quantum state formula */}
              <div className="text-[10px] font-mono text-violet-300 bg-black/60 p-2 rounded border border-white/5">
                {q.stateStr}
              </div>

              {/* Probability Split Bar: |0> vs |1> */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-emerald-400">|0⟩ {q.prob0}%</span>
                  <span className="text-rose-400">|1⟩ {q.prob1}%</span>
                </div>

                <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-900">
                  <div style={{ width: `${q.prob0}%` }} className="bg-emerald-500 h-full transition-all" />
                  <div style={{ width: `${q.prob1}%` }} className="bg-rose-500 h-full transition-all" />
                </div>

                <div className="flex justify-between text-[9px] text-slate-500">
                  <span>Nominal</span>
                  <span>Anomalous</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          VARIATIONAL ANALYSIS VISUALIZATION (4 Stages: Vector -> State -> Ansatz -> Output)
         ========================================================================= */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
          <div>
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Variational Analysis Transformation Flow
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Trace how continuous financial variables map through Hilbert space transformations
            </p>
          </div>
          <span className="text-xs font-mono text-violet-400">
            4-Stage Pipeline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Phase 1: Feature Vector */}
          <div className="p-4 rounded-xl bg-[#080D16] border border-white/10 space-y-2 relative">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
              01. Feature Vector
            </span>
            <h4 className="text-sm font-semibold text-white">Classical Inputs x ∈ ℝ⁹</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Standardizes amount, velocity, IP risk, and device entropy into normalized continuous real numbers.
            </p>
            <div className="text-[10px] font-mono text-cyan-300 bg-black/60 p-2 rounded border border-white/5 mt-2">
              x = [0.84, 0.72, 0.64, 0.81, ...]
            </div>
          </div>

          {/* Phase 2: Encoded State */}
          <div className="p-4 rounded-xl bg-[#080D16] border border-white/10 space-y-2 relative">
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block font-bold">
              02. Encoded State
            </span>
            <h4 className="text-sm font-semibold text-white">Hilbert Embedding |Ψ(x)⟩</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Applies Hadamard gates and parameterized angle rotations to project data into 128-dimensional quantum space.
            </p>
            <div className="text-[10px] font-mono text-sky-300 bg-black/60 p-2 rounded border border-white/5 mt-2">
              |Ψ(x)⟩ = ⊗_j R_z(x_j) H|0⟩
            </div>
          </div>

          {/* Phase 3: Variational Transformation */}
          <div className="p-4 rounded-xl bg-[#080D16] border border-white/10 space-y-2 relative">
            <span className="text-[10px] font-mono text-violet-400 uppercase tracking-wider block font-bold">
              03. Variational Ansatz
            </span>
            <h4 className="text-sm font-semibold text-white">Parameterized U(θ)</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Interlaces 2-qubit CNOT gates to induce non-linear entanglement between velocity and hardware signatures.
            </p>
            <div className="text-[10px] font-mono text-violet-300 bg-black/60 p-2 rounded border border-white/5 mt-2">
              U(θ) = ∏_l [ R_y(θ_l) · CNOT ]
            </div>
          </div>

          {/* Phase 4: Measured Output */}
          <div className="p-4 rounded-xl bg-[#080D16] border border-white/10 space-y-2 relative">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
              04. Measured Output
            </span>
            <h4 className="text-sm font-semibold text-white">Expectation ⟨Z⟩</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Collapses quantum wavefunctions into deterministic expectation values to produce the final calibrated score.
            </p>
            <div className="text-[10px] font-mono text-emerald-300 bg-black/60 p-2 rounded border border-white/5 mt-2">
              R(x) = σ(W · ⟨Z⟩ + b) → 87%
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          EDUCATIONAL SECTION (Non-expert friendly, 4 Core Concepts)
         ========================================================================= */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xl font-display font-bold text-white">
              Understanding the Science (Non-Expert Guide)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Primer for Security &amp; Compliance Officers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Question 1: What is quantum encoding? */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold">
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">01</span>
              <span>Encoding</span>
            </div>
            <h3 className="text-base font-display font-bold text-white">
              What is quantum encoding?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Traditional algorithms examine numbers on flat spreadsheets. Quantum encoding takes your transaction details—like purchase amount and login speed—and converts them into angles inside a 3D sphere called a qubit. This allows the system to evaluate multiple relationships simultaneously rather than checking them one by one.
            </p>
          </div>

          {/* Question 2: What is variational analysis? */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-mono font-semibold">
              <span className="px-2 py-0.5 rounded bg-violet-950 border border-violet-500/30">02</span>
              <span>Variational Analysis</span>
            </div>
            <h3 className="text-base font-display font-bold text-white">
              What is variational analysis?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Think of variational analysis as an adaptive digital lens. A set of quantum gates rotates and intertwines the qubits, looking for subtle correlations between seemingly unrelated clues—such as a small time-zone mismatch paired with an unusual device font—that standard rules easily miss.
            </p>
          </div>

          {/* Question 3: What is measurement? */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">03</span>
              <span>Measurement</span>
            </div>
            <h3 className="text-base font-display font-bold text-white">
              What is quantum measurement?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              While in quantum superposition, qubits hold many possibilities. Measurement acts like taking a high-speed camera snapshot, collapsing the complex quantum cloud into a concrete, readable number between 0% and 100% that fraud analysts can immediately act on.
            </p>
          </div>

          {/* Question 4: How does this improve fraud detection? */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold">
              <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">04</span>
              <span>Business Advantage</span>
            </div>
            <h3 className="text-base font-display font-bold text-white">
              How does this improve fraud detection?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Organized fraud syndicates use automated botnets designed to pass simple threshold rules. Quantum-enhanced machine learning identifies complex multi-dimensional patterns, stopping sophisticated attacks while reducing false declines for genuine customers by over 70%.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
