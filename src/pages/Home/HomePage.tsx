import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Atom,
  Fingerprint,
  Sparkles,
  Lock,
  ChevronRight,
  TrendingDown,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroQuantumOrb } from '../../components/3d/HeroQuantumOrb';
import { InteractiveGlobeNetwork } from '../../components/3d/InteractiveGlobeNetwork';
import { HowItWorksPipeline } from '../../components/animations/HowItWorksPipeline';
import { BlochSphereCanvas } from '../../components/3d/BlochSphereCanvas';

export function HomePage() {
  // Live animated telemetry for Live Risk Visualization
  const [liveVelocity, setLiveVelocity] = useState(1482);
  const [liveIntercepted, setLiveIntercepted] = useState(1248);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveVelocity((v) => v + Math.floor(Math.random() * 5 - 2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-28 pb-20 overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION (Cinematic full-width hero)
         ========================================================================= */}
      <section className="relative pt-6 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>QUANTUM-ENHANCED FRAUD INTELLIGENCE</span>
            </div>

            {/* Brand Title Accent */}
            <div className="text-sm font-mono tracking-widest text-slate-400 uppercase">
              Q-FraudX
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Stop Fraud Before It Becomes a Loss.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl text-balance">
              Q-FraudX combines quantum-inspired feature analysis, behavioral intelligence and real-time risk scoring to detect suspicious financial activity before conventional systems can.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/analyzer"
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] min-h-[44px]"
              >
                <Cpu className="w-4 h-4" />
                Analyze Transaction
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/technology"
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-lg flex items-center gap-2 transition-all min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Explore Quantum Engine
              </Link>
            </div>

            {/* Micro Trust Bullet */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sub-120ms Latency SLA
              </span>
              <span className="text-slate-600">·</span>
              <span>ISO 20022 Ready</span>
              <span className="text-slate-600">·</span>
              <span>PCI-DSS Level 1</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Quantum-Security Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="glass-panel p-2 sm:p-4 rounded-2xl border border-white/[0.08] relative overflow-hidden">
              <HeroQuantumOrb />
            </div>
          </motion.div>

        </div>

        {/* =========================================================================
            HERO METRICS (Animated numbers upon entering viewport)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-panel p-6 rounded-xl border border-white/[0.08] hover:border-white/20 transition-colors">
            <span className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums tracking-tight block">
              99.2%
            </span>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mt-1">
              Detection Accuracy
            </span>
            <span className="text-[11px] text-slate-400 font-sans block mt-1">
              Validated on 1.4M live card authorizations
            </span>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/[0.08] hover:border-white/20 transition-colors">
            <span className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums tracking-tight block">
              &lt;120ms
            </span>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mt-1">
              Risk Analysis
            </span>
            <span className="text-[11px] text-slate-400 font-sans block mt-1">
              3.4ms mean QPU hardware gate time
            </span>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/[0.08] hover:border-white/20 transition-colors">
            <span className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums tracking-tight block">
              5
            </span>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mt-1">
              Quantum Analysis Stages
            </span>
            <span className="text-[11px] text-slate-400 font-sans block mt-1">
              From raw telemetry to Pauli-Z readout
            </span>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/[0.08] hover:border-white/20 transition-colors">
            <span className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums tracking-tight block">
              24/7
            </span>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mt-1">
              Continuous Intelligence
            </span>
            <span className="text-[11px] text-slate-400 font-sans block mt-1">
              Autonomous multi-vector defense
            </span>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          TRUST / TECHNOLOGY STRIP (Minimal clean logos / icons)
         ========================================================================= */}
      <section className="py-6 border-y border-white/[0.06] bg-black/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          
          <div className="flex items-center gap-3 justify-center text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase font-display tracking-wide block">
                Quantum Computing
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                127-Qubit Transmon
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase font-display tracking-wide block">
                Machine Learning
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Variational Classifiers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Fingerprint className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase font-display tracking-wide block">
                Behavioral Analytics
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Circadian Profiling
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-slate-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white uppercase font-display tracking-wide block">
                Real-Time Risk Engine
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Sub-120ms Interception
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (Interactive 3D Horizontal Process)
         ========================================================================= */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            End-To-End Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Every transaction travels through a 5-stage quantum pipeline. Hover or tap any stage to inspect the underlying mathematical operations and circuit transformations.
          </p>
        </div>

        <HowItWorksPipeline />
      </section>

      {/* =========================================================================
          LIVE RISK VISUALIZATION (Simulated transaction activity & 3D globe)
         ========================================================================= */}
      <section className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/[0.08] space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Simulated Global Clearing Stream</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Live Risk &amp; Threat Telemetry
            </h2>
          </div>

          <Link
            to="/fraud-detection"
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            Launch Full Threat Console <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D Global Network Visualizer */}
          <div className="lg:col-span-6 p-4 rounded-xl bg-black/60 border border-white/5 space-y-3">
            <InteractiveGlobeNetwork />
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span>Origin ASN Reputations</span>
              <span className="text-emerald-400">0 Collusive Breaches</span>
            </div>
          </div>

          {/* Telemetry Metrics & Anomaly Detection Signals */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* 4 Quick Stream Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[11px] block">TRANSACTION VELOCITY</span>
                <span className="text-2xl font-display font-bold text-white tabular-nums">
                  {liveVelocity} tx/sec
                </span>
                <span className="text-[10px] text-slate-500 block">Peak burst: 2,410 tx/s</span>
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[11px] block">PREVENTED TODAY</span>
                <span className="text-2xl font-display font-bold text-rose-400 tabular-nums">
                  $14,829,120
                </span>
                <span className="text-[10px] text-slate-500 block">{liveIntercepted} blocked rings</span>
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[11px] block">RISK DISTRIBUTION</span>
                <div className="flex items-center gap-2 pt-1 font-semibold text-xs">
                  <span className="text-emerald-400">97.8% Low</span>
                  <span className="text-amber-400">1.8% Med</span>
                  <span className="text-rose-400">0.4% High</span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">Across 6 global hubs</span>
              </div>

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 text-[11px] block">ANOMALY LATENCY</span>
                <span className="text-2xl font-display font-bold text-cyan-400 tabular-nums">
                  3.4 ms
                </span>
                <span className="text-[10px] text-slate-500 block">Gate measurement time</span>
              </div>
            </div>

            {/* Live Anomaly Detection Feed */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block font-semibold">
                Live Anomaly Interception Log
              </span>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-rose-950/20 border border-rose-500/20 text-rose-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    Belize City (Tor Exit Node) · Velocity 8 tx/hr
                  </span>
                  <span className="font-bold shrink-0 ml-2">95% RISK (BLOCKED)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-amber-950/20 border border-amber-500/20 text-amber-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    Zurich Luxury Bullion · Geolocation Delta 6,100km
                  </span>
                  <span className="font-bold shrink-0 ml-2">68% RISK (CHALLENGED)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                  <span className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Seattle NFC Coffee · FIDO2 Enclave Verified
                  </span>
                  <span className="font-bold shrink-0 ml-2">4% RISK (APPROVED)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          FEATURE SECTION (Three premium sections with distinct visual treatments)
         ========================================================================= */}
      <section className="space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Core Technological Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Defense Engineered for High-Order Threat Vectors
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Three distinct layers of protection designed to intercept synthetic identities, distributed Sybil rings, and credential stuffing before clearing settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Quantum Intelligence */}
          <div className="glass-panel p-7 rounded-2xl border border-cyan-500/20 space-y-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Atom className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                Quantum Intelligence
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Projects multi-variable payment vectors into a 127-qubit Hilbert space. By computing quantum kernels through entangling CNOT layers, Q-FraudX detects non-linear collusive patterns that escape standard gradient-boosted trees.
              </p>
            </div>

            {/* Visual Treatment 1: Mini Bloch Sphere State */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Qubit Entanglement Layer</span>
                <span className="text-cyan-400">⟨Z⟩ = 0.94</span>
              </div>
              <BlochSphereCanvas riskScore={15} className="w-full h-36" interactive={false} />
            </div>

            <Link
              to="/technology"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Explore QPU Architecture <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 2: Behavioral Detection */}
          <div className="glass-panel p-7 rounded-2xl border border-violet-500/20 space-y-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-violet-950/70 border border-violet-500/40 flex items-center justify-center text-violet-400">
                <Fingerprint className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                Behavioral Detection
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Builds dynamic circadian spending profiles and cryptographically measures biometric device enclave entropy. Headless browser bots, anti-detect canvases, and emulator farms are identified instantly.
              </p>
            </div>

            {/* Visual Treatment 2: Behavioral Deviation Matrix */}
            <div className="p-4 bg-black/60 rounded-xl border border-white/5 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Circadian Phase Variance</span>
                <span className="text-violet-400 font-bold">Δ = 0.04 (Normal)</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>TLS 1.3 Cipher Suite</span>
                  <span className="text-emerald-400">HARDWARE PINNED</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-violet-400 rounded-full" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Cardholder Velocity</span>
                  <span className="text-slate-300">1.2 tx / 24h</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>

            <Link
              to="/analyzer"
              className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              Test Live Simulator <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3: Explainable Risk */}
          <div className="glass-panel p-7 rounded-2xl border border-emerald-500/20 space-y-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                Explainable Risk
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Full transparency for banking risk committees and regulators. Decomposes non-linear decisions into exact Quantum Shapley values (Q-SHAP) and automatic adverse action codes compliant with the EU AI Act.
              </p>
            </div>

            {/* Visual Treatment 3: Regulatory SHAP Breakdown */}
            <div className="p-4 bg-black/60 rounded-xl border border-white/5 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>EU AI Act Auditability</span>
                <span className="text-emerald-400">CONFORMANT</span>
              </div>
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Velocity Shapley:</span>
                  <span className="text-rose-400 font-semibold">+0.38</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Biometric Enclave:</span>
                  <span className="text-emerald-400 font-semibold">-0.42</span>
                </div>
              </div>
            </div>

            <Link
              to="/explainable-ai"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Inspect Q-SHAP Engine <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          FINAL CTA (Large cinematic section with subtle quantum particle field)
         ========================================================================= */}
      <section className="relative glass-panel p-8 sm:p-16 rounded-3xl border border-cyan-500/30 overflow-hidden text-center space-y-6">
        {/* Ambient subtle particle field background */}
        <div className="absolute inset-0 quantum-grid-bg opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-violet-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
            Next-Generation Clearing Defense
          </span>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Ready to see fraud differently?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl mx-auto">
            Protect your cardholders with sub-120ms quantum variational risk scoring. Connect your payment rail in under 48 hours with zero clearing friction.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/analyzer"
              className="px-8 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-2 transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98] min-h-[44px]"
            >
              <Cpu className="w-4 h-4" />
              Analyze a Transaction
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/technology"
              className="px-8 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-lg flex items-center gap-2 transition-all min-h-[44px]"
            >
              Explore the Technology
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
