import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuantumComputer3D } from '../../components/3d/QuantumComputer3D';
import { QuantumLab3D } from '../../components/3d/QuantumLab3D';
import {
  Cpu,
  Atom,
  Zap,
  Layers,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  XCircle,
  Binary,
  GitBranch,
  Sparkles,
  BarChart3,
  Search,
  Eye,
  Workflow
} from 'lucide-react';

interface ArchStep {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  technicalDetails: string;
  latency: string;
}

const ARCHITECTURE_STEPS: ArchStep[] = [
  {
    id: 'tx-data',
    name: 'Transaction Data',
    subtitle: 'Raw Telemetry Ingestion',
    description: 'Ingests sub-millisecond card authorization payload across EMV chip data, ISO 8583 fields, device TLS hashes, and geo-IP telemetry.',
    technicalDetails: 'Streaming pipeline parses 14+ raw JSON fields into normalized continuous tensors within 0.2ms.',
    latency: '0.2 ms'
  },
  {
    id: 'feat-eng',
    name: 'Feature Engineering',
    subtitle: 'Continuous Vector Scaling',
    description: 'Scales raw financial numbers (dollar amounts, transaction velocities, geographical distance leaps) into normalized [0, 1] interval features.',
    technicalDetails: 'Robust MinMax & logarithmic transforms eliminate skew from outlier transaction amounts.',
    latency: '0.4 ms'
  },
  {
    id: 'q-enc',
    name: 'Quantum Encoding',
    subtitle: 'Hilbert Space Phase Embedding',
    description: 'Embeds normalized classical feature vectors into the quantum state of 8 superconducting transmon qubits via angle embedding.',
    technicalDetails: 'Applies Hadamard gates and parameterized R_z(x) rotations to prepare |Ψ(x)⟩ in 2⁸ = 256 state space.',
    latency: '0.6 ms'
  },
  {
    id: 'vqc',
    name: 'Variational Quantum Circuit',
    subtitle: 'Parameterized Ansatz U(θ)',
    description: 'Executes depth-3 entangling layers of CNOT gates and rotation operators to capture non-linear collusion between velocity and device signatures.',
    technicalDetails: 'Parameterized angles θ are optimized via quantum kernel estimation to detect synthetic fraud patterns.',
    latency: '1.2 ms'
  },
  {
    id: 'meas',
    name: 'Measurement',
    subtitle: 'Pauli-Z Wavefunction Collapse',
    description: 'Measures expectation values ⟨Z_i⟩ across 10,000 repeated quantum shots to project complex quantum state into observable real eigenvalues.',
    technicalDetails: 'Hardware-calibrated readout resonators mitigate measurement noise with 99.8% fidelity.',
    latency: '0.5 ms'
  },
  {
    id: 'risk-eng',
    name: 'Risk Engine',
    subtitle: 'Calibrated Sigmoidal Scoring',
    description: 'Synthesizes measured quantum kernel expectation values with historical clearing baselines to generate a deterministic 0–100% risk score.',
    technicalDetails: 'Applies learned calibration weights: R(x) = σ(W · ⟨Z⟩ + b), ensuring compliance with ISO 20022 clearing SLA.',
    latency: '0.3 ms'
  },
  {
    id: 'decision',
    name: 'Decision',
    subtitle: 'Automated Real-Time Action',
    description: 'Dispatches hard automated decline, biometric challenge (3D Secure step-up), or instant nominal approval to clearing networks.',
    technicalDetails: 'Total end-to-end pipeline latency completes in 3.4ms, well within the 100ms card network authorization window.',
    latency: '0.2 ms'
  }
];

const TECH_STACK = [
  {
    title: 'Quantum Computing',
    desc: 'Superconducting transmon qubit circuits executing parameterized variational algorithms (VQC) with 99.96% 2-qubit gate fidelity.',
    icon: Atom,
    color: 'text-cyan-400'
  },
  {
    title: 'Machine Learning',
    desc: 'Quantum kernel methods (QKM) that construct non-linear decision hyperplanes impossible to separate with classical linear classifiers.',
    icon: Cpu,
    color: 'text-sky-400'
  },
  {
    title: 'Behavioral Analytics',
    desc: 'Circadian and merchant-affinity baselines that detect subtle shifts in cardholder habits without triggering false declines.',
    icon: Activity,
    color: 'text-violet-400'
  },
  {
    title: 'Anomaly Detection',
    desc: 'Higher-order tensor decomposition that catches distributed Sybil bot attacks across thousands of seemingly unrelated merchant terminals.',
    icon: Shield,
    color: 'text-rose-400'
  },
  {
    title: 'Real-Time Risk Scoring',
    desc: 'Sub-5 millisecond end-to-end inference rail seamlessly integrated into payment gateways and core banking switches.',
    icon: Zap,
    color: 'text-amber-400'
  },
  {
    title: 'Explainable AI',
    desc: 'Exact Quantum Shapley (Q-SHAP) value attributions providing regulatory compliance and human-interpretable reasons for every score.',
    icon: Eye,
    color: 'text-emerald-400'
  }
];

const INNOVATIONS = [
  {
    num: '01',
    title: 'Quantum-Inspired Feature Representation',
    desc: 'Instead of evaluating independent columns on a database, financial attributes are mapped onto angles in Hilbert space. This enables the engine to examine infinite-dimensional relationships simultaneously.'
  },
  {
    num: '02',
    title: 'Multi-Dimensional Behavioral Analysis',
    desc: 'Detects intricate, hidden correlations—such as an unusual device canvas fingerprint occurring alongside a 3-minute velocity spike—that classical decision trees routinely miss.'
  },
  {
    num: '03',
    title: 'Real-Time Risk Scoring',
    desc: 'Engineered for high-volume banking rails, our optimized quantum simulator and QPU proxy deliver audited risk scores in 3.4ms, keeping clearing times well under industry thresholds.'
  },
  {
    num: '04',
    title: 'Explainable Fraud Decisions',
    desc: 'Solves the "black box" dilemma. Every flagged transaction provides exact mathematical contribution percentages conforming to EU AI Act Articles 13 & 14 and FCRA adverse action rules.'
  },
  {
    num: '05',
    title: 'Adaptive Risk Intelligence',
    desc: 'Continuous parameter optimization allows the variational circuit to automatically adjust to evolving attack patterns, zero-day bot scripts, and novel synthetic identity maneuvers.'
  }
];

const DIFFERENTIATION = [
  {
    dimension: 'Feature representation',
    traditional: 'Flat scalar values and independent rule thresholds (e.g. amount > $500).',
    qfraudx: 'Multi-qubit Hilbert space phase vectors capturing non-linear entanglements.'
  },
  {
    dimension: 'Behavioral intelligence',
    traditional: 'Static rule-based velocity limits per card (e.g. max 3 transactions per hour).',
    qfraudx: 'Continuous circadian spending manifolds with adaptive behavioral variance tolerances.'
  },
  {
    dimension: 'Risk analysis',
    traditional: 'Simple logistic regression or deep neural networks prone to false-positive spikes.',
    qfraudx: 'Variational Quantum Circuits (VQC) with 70% lower false positive rates.'
  },
  {
    dimension: 'Explainability',
    traditional: 'Opaque black box scoring or generic fallback error codes with zero context.',
    qfraudx: 'Exact Quantum Shapley attributions itemizing each feature contribution percentage.'
  },
  {
    dimension: 'Adaptability',
    traditional: 'Manual rule re-writing by fraud teams taking weeks or months to deploy.',
    qfraudx: 'Autonomous variational parameter re-calibration in milliseconds.'
  }
];

export function TechnologyPage() {
  const navigate = useNavigate();
  const [selectedArchId, setSelectedArchId] = useState<string>('q-enc');

  const selectedArch = ARCHITECTURE_STEPS.find((s) => s.id === selectedArchId) || ARCHITECTURE_STEPS[2];

  return (
    <div className="space-y-16 pb-24">
      
      {/* =========================================================================
          HERO: Title, Subtitle & 3D Dilution Refrigerator Quantum Computer
         ========================================================================= */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Atom className="w-4 h-4" />
            <span>Superconducting Quantum Hardware &amp; Mathematical Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The Technology Behind Q-FraudX
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Where quantum-inspired computation meets real-time financial intelligence.
          </p>
        </div>

        {/* 3D Quantum Computer Chandelier */}
        <QuantumComputer3D className="w-full h-80 sm:h-96" />
      </div>

      {/* =========================================================================
          ARCHITECTURE: Interactive 7-Step Diagram
         ========================================================================= */}
      <div className="glass-panel p-6 sm:p-9 rounded-2xl border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
          <div>
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-cyan-400" />
              End-to-End Processing Architecture
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Click any component along the pipeline to inspect execution parameters
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Total Latency: 3.4 ms
          </span>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {ARCHITECTURE_STEPS.map((step, idx) => {
            const isSelected = step.id === selectedArchId;
            return (
              <button
                key={step.id}
                onClick={() => setSelectedArchId(step.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 min-h-[90px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500/60 ring-1 ring-cyan-500/40 text-cyan-300 shadow-lg'
                    : 'bg-[#080D16] border-white/5 text-slate-300 hover:border-white/20 hover:text-white'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                    0{idx + 1}
                  </span>
                  <span className="font-bold text-xs block leading-tight text-white">
                    {step.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                  {step.latency}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Component Explanation Box */}
        <div className="p-5 rounded-xl bg-black/60 border border-cyan-500/30 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-base font-display font-bold text-white">
                {selectedArch.name}: {selectedArch.subtitle}
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              Stage Latency: {selectedArch.latency}
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
            {selectedArch.description}
          </p>

          <div className="text-[11px] font-mono text-cyan-300/90 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/20">
            {selectedArch.technicalDetails}
          </div>
        </div>
      </div>

      {/* =========================================================================
          TECHNOLOGY STACK: 6 Core Pillars
         ========================================================================= */}
      <div className="space-y-6">
        <div className="space-y-1 pb-2 border-b border-white/[0.06]">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Core Technology Stack
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Six computational pillars powering the Q-FraudX intelligence platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_STACK.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3 hover:border-white/20 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          INNOVATION: 5 Unique Value Propositions
         ========================================================================= */}
      <div className="space-y-6">
        <div className="space-y-1 pb-2 border-b border-white/[0.06]">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Key Technical Innovations
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            How quantum-inspired computing solves classical fraud detection bottlenecks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INNOVATIONS.map((inv) => (
            <div
              key={inv.num}
              className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-2 relative"
            >
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
                INNOVATION {inv.num}
              </span>
              <h3 className="font-display font-bold text-white text-base">
                {inv.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                {inv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3D QUANTUM LAB: Immersive Interactive Section
         ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-display font-bold text-white">
              Interactive 3D Quantum Lab
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Transmon Processor Die Architecture
          </span>
        </div>

        <QuantumLab3D className="w-full h-80 sm:h-96" />
      </div>

      {/* =========================================================================
          DIFFERENTIATION: Traditional vs Q-FraudX
         ========================================================================= */}
      <div className="glass-panel p-6 sm:p-9 rounded-2xl border border-white/[0.08] space-y-6">
        <div className="pb-2 border-b border-white/[0.06]">
          <h2 className="text-xl font-display font-bold text-white">
            Architecture Differentiation
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Comparative analysis: Legacy rule engines vs Q-FraudX Quantum Intelligence
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#080D16] border-b border-white/10 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5 w-1/4">Dimension</th>
                <th className="px-5 py-3.5 w-3/8 text-slate-400">Traditional Fraud Detection</th>
                <th className="px-5 py-3.5 w-3/8 text-cyan-300">Q-FraudX Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {DIFFERENTIATION.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono font-semibold text-white">
                    {item.dimension}
                  </td>
                  <td className="px-5 py-4 text-slate-400 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{item.traditional}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-200 leading-relaxed bg-cyan-950/10">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item.qfraudx}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          FINAL CTA: Experience Quantum Fraud Intelligence
         ========================================================================= */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-cyan-500/40 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
            Ready to test next-generation risk modeling?
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Experience Quantum Fraud Intelligence
          </h2>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            Run a live multi-vector simulation with real-time Hilbert state encoding and automated explainability reports.
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate('/analyzer')}
            className="px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-sm inline-flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Atom className="w-4 h-4" />
            <span>Launch Analyzer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
