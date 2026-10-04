import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisInput, Transaction, AnalysisStep } from '../../types';
import { PRESET_ANALYZER_CASES } from '../../data/mockTransactions';
import { createTransactionFromInput, calculateQuantumRisk } from '../../utils/quantumRiskEngine';
import { QuantumAnalysisSequence } from '../../components/animations/QuantumAnalysisSequence';
import { CircularRiskGauge } from '../../components/charts/CircularRiskGauge';
import { RiskBreakdownList } from '../../components/cards/RiskBreakdownList';
import { BlochSphereCanvas } from '../../components/3d/BlochSphereCanvas';
import { FeatureAttributionChart } from '../../components/charts/FeatureAttributionChart';
import { useTheme } from '../../context/ThemeContext';
import {
  Cpu,
  Atom,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  Play,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileCheck2,
  MapPin,
  Clock,
  Smartphone,
  CreditCard,
  Building2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const INITIAL_FORM: AnalysisInput = {
  amount: 842.73,
  merchant: 'Global Electronics Co.',
  transactionType: 'E-Commerce Checkout',
  location: 'Singapore, SG',
  deviceId: 'EMULATOR-ANDROID-HEADLESS-X4',
  transactionTime: '10:42 PM',
  velocity: 6,
  ipRisk: 64,
  deviceRisk: 72,
  behaviorDeviation: 81,
  locationAnomalyKm: 9840,
  cardholder: 'Alexander Wright'
};

export function AnalyzerPage() {
  const navigate = useNavigate();
  const { setActiveAnalysisStep, setLatestRiskScore, setLatestRiskTier } = useTheme();
  const [formData, setFormData] = useState<AnalysisInput>(INITIAL_FORM);
  const [analysisState, setAnalysisState] = useState<AnalysisStep>('idle');
  const [result, setResult] = useState<Transaction | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  // Compute tentative risk for the 3D sequence preview
  const tentativeRisk = calculateQuantumRisk(formData).finalRiskScore;

  const handleScenarioSelect = (scenarioData: AnalysisInput) => {
    setFormData(scenarioData);
    setResult(null);
    setValidationError(null);
    setActiveAnalysisStep('idle');
    setLatestRiskScore(null);
    setLatestRiskTier(null);
  };

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0 || isNaN(formData.amount)) {
      setValidationError('Please specify a transaction amount greater than $0.00');
      return;
    }
    if (!formData.merchant.trim()) {
      setValidationError('Merchant name is required');
      return;
    }
    if (!formData.location.trim()) {
      setValidationError('Transaction location is required');
      return;
    }

    setValidationError(null);
    setAnalysisState('preprocessing');
    setActiveAnalysisStep('preprocessing');
  };

  const handleSequenceComplete = () => {
    // Deterministic calculation
    const computedTx = createTransactionFromInput(formData);
    setResult(computedTx);
    setAnalysisState('complete');
    setActiveAnalysisStep('complete');
    setLatestRiskScore(computedTx.finalRiskScore);
    setLatestRiskTier(computedTx.riskTier);
  };

  const handleCancel = () => {
    setAnalysisState('idle');
    setActiveAnalysisStep('idle');
  };

  const handleAnalyzeAnother = () => {
    setAnalysisState('idle');
    setActiveAnalysisStep('idle');
    setResult(null);
  };

  const handleResetForm = () => {
    setAnalysisState('idle');
    setActiveAnalysisStep('idle');
    setResult(null);
    setFormData(INITIAL_FORM);
    setValidationError(null);
    setLatestRiskScore(null);
    setLatestRiskTier(null);
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* =========================================================================
          PAGE HEADER
         ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Atom className="w-4 h-4 animate-spin-slow" />
            <span>Interactive QPU Simulation Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Transaction Analyzer
          </h1>
          <p className="text-sm text-slate-300">
            Run a quantum-enhanced risk analysis on a financial transaction.
          </p>
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0A0F18] border border-white/10 text-xs font-mono self-start md:self-auto shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-slate-200 font-semibold">Quantum Engine Online</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400 tabular-nums">127 Transmons Active</span>
        </div>
      </div>

      {/* =========================================================================
          ACTIVE ANALYSIS 4-SECOND EXPERIENCE
         ========================================================================= */}
      {analysisState !== 'idle' && analysisState !== 'complete' && (
        <QuantumAnalysisSequence
          onComplete={handleSequenceComplete}
          onCancel={handleCancel}
          tentativeRiskScore={tentativeRisk}
        />
      )}

      {/* =========================================================================
          ANALYSIS RESULT SECTION
         ========================================================================= */}
      {analysisState === 'complete' && result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Result Card: Large Score, Circular Gauge, Level, Action */}
          <div className="glass-panel p-6 sm:p-9 rounded-2xl border border-cyan-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Circular Animated Risk Visualization */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
                <CircularRiskGauge
                  score={result.finalRiskScore}
                  tier={result.riskTier}
                  confidence={result.quantumConfidence}
                  size={240}
                />
              </div>

              {/* Result Details & Status */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Risk Assessment Level:
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded border ${
                      result.riskTier === 'CRITICAL' || result.riskTier === 'HIGH'
                        ? 'text-rose-400 bg-rose-950/40 border-rose-500/40'
                        : result.riskTier === 'MEDIUM'
                        ? 'text-amber-400 bg-amber-950/40 border-amber-500/40'
                        : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
                    }`}
                  >
                    {result.riskTier} RISK ({result.finalRiskScore}%)
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    ID: {result.id}
                  </span>
                </div>

                {/* Primary Recommendation */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1.5">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
                    Recommended Action
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-tight">
                    {result.finalRiskScore >= 75
                      ? 'Block transaction and request additional authentication.'
                      : result.finalRiskScore >= 50
                      ? 'Flag for human analyst investigation and hold settlement.'
                      : result.finalRiskScore >= 25
                      ? 'Challenge with step-up biometric verification.'
                      : 'Approve transaction. Verified trusted nominal profile.'}
                  </h3>
                  <p className="text-xs text-slate-300 pt-1 font-sans leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-slate-500 block text-[10px]">CONFIDENCE</span>
                    <span className="text-cyan-400 font-bold text-sm tabular-nums">
                      {result.quantumConfidence}%
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-slate-500 block text-[10px]">ENTANGLEMENT</span>
                    <span className="text-white font-bold text-sm tabular-nums">
                      {result.qubitEntanglementScore}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-slate-500 block text-[10px]">PHASE SHIFT</span>
                    <span className="text-violet-400 font-bold text-sm tabular-nums">
                      θ = {result.quantumStatePhase} rad
                    </span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleAnalyzeAnother}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 transition-colors shadow-md min-h-[40px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Analyze Another
                  </button>

                  <button
                    onClick={() => setShowExplanationModal(true)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-1.5 transition-colors min-h-[40px]"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                    View Explanation
                  </button>

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-1.5 transition-colors min-h-[40px]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    Open Dashboard
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* =========================================================================
              RISK BREAKDOWN SECTION (6 fields: Device, IP, Velocity, Behavior, Amount, Location)
             ========================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Multi-Vector Risk Breakdown
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Continuous scoring of normalized observables mapped into Hilbert state projection
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                6 Verified Quantum Inputs
              </span>
            </div>

            <RiskBreakdownList input={formData} riskTier={result.riskTier} />
          </div>

          {/* =========================================================================
              TRANSACTION SUMMARY
             ========================================================================= */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              Transaction Summary
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-1">MERCHANT</span>
                <span className="font-semibold text-white truncate block">
                  {formData.merchant}
                </span>
                <span className="text-[10px] text-slate-400">{formData.transactionType}</span>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-1">AMOUNT</span>
                <span className="font-bold text-white text-base tabular-nums block">
                  ${formData.amount.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400">USD Settlement</span>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-1">LOCATION</span>
                <span className="font-semibold text-white truncate block">
                  {formData.location}
                </span>
                <span className="text-[10px] text-slate-400">{formData.locationAnomalyKm.toLocaleString()} km anomaly</span>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-500 block text-[10px] mb-1">TIME</span>
                <span className="font-semibold text-white block">
                  {formData.transactionTime}
                </span>
                <span className="text-[10px] text-slate-400">{formData.velocity} tx/hr</span>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-slate-500 block text-[10px] mb-1">DEVICE ID</span>
                <span className="font-semibold text-cyan-300 truncate block">
                  {formData.deviceId}
                </span>
                <span className="text-[10px] text-slate-400">Risk: {formData.deviceRisk}/100</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          INPUT AREA: TRANSACTION FORM & 3 SAMPLE SCENARIO BUTTONS
         ========================================================================= */}
      {analysisState !== 'preprocessing' && analysisState !== 'encoding' && analysisState !== 'variational' && analysisState !== 'measurement' && analysisState !== 'risk_engine' && (
        <form onSubmit={handleStartAnalysis} className="glass-panel p-6 sm:p-9 rounded-2xl border border-white/[0.08] space-y-8">
          
          {/* Scenario Selector Header */}
          <div className="space-y-3 pb-6 border-b border-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Sample scenarios — not real transactions
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Click any button to populate deterministic telemetry
              </span>
            </div>

            {/* Three Sample Scenario Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_ANALYZER_CASES.map((preset) => {
                const isSelected = formData.merchant === preset.data.merchant;
                const isLow = preset.name === 'LOW RISK';
                const isMed = preset.name === 'MEDIUM RISK';
                const isHigh = preset.name === 'HIGH RISK';

                const buttonActiveStyle = isLow
                  ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300 ring-1 ring-emerald-500/40'
                  : isMed
                  ? 'border-amber-500/60 bg-amber-950/30 text-amber-300 ring-1 ring-amber-500/40'
                  : 'border-rose-500/60 bg-rose-950/30 text-rose-300 ring-1 ring-rose-500/40';

                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleScenarioSelect(preset.data)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 min-h-[44px] ${
                      isSelected
                        ? buttonActiveStyle
                        : 'bg-[#080D16] border-white/[0.06] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono tracking-wider">
                        {preset.badge}
                      </span>
                      <span className="text-xs font-mono font-bold tabular-nums">
                        ${preset.data.amount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-display font-bold text-white">
                Transaction Input Parameters
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 1. Transaction Amount */}
              <div className="space-y-1.5">
                <label htmlFor="input-amount" className="text-xs font-mono text-slate-300 block">
                  Transaction Amount (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    $
                  </span>
                  <input
                    id="input-amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-[#05070B] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* 2. Merchant */}
              <div className="space-y-1.5">
                <label htmlFor="input-merchant" className="text-xs font-mono text-slate-300 block">
                  Merchant Name *
                </label>
                <input
                  id="input-merchant"
                  type="text"
                  value={formData.merchant}
                  onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#05070B] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="e.g. Global Electronics Co."
                  required
                />
              </div>

              {/* 3. Transaction Type */}
              <div className="space-y-1.5">
                <label htmlFor="input-type" className="text-xs font-mono text-slate-300 block">
                  Transaction Type
                </label>
                <select
                  id="input-type"
                  value={formData.transactionType}
                  onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#05070B] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                >
                  <option value="E-Commerce Checkout">E-Commerce Checkout</option>
                  <option value="In-Store POS (NFC Tap)">In-Store POS (NFC Tap)</option>
                  <option value="Wire Transfer / Luxury Goods">Wire Transfer / Luxury Goods</option>
                  <option value="Crypto Gateway Onramp">Crypto Gateway Onramp</option>
                  <option value="Recurring Cloud Subscription">Recurring Cloud Subscription</option>
                </select>
              </div>

              {/* 4. Location */}
              <div className="space-y-1.5">
                <label htmlFor="input-location" className="text-xs font-mono text-slate-300 block">
                  Location (City, Country) *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#05070B] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="e.g. Singapore, SG"
                    required
                  />
                </div>
              </div>

              {/* 5. Device ID */}
              <div className="space-y-1.5">
                <label htmlFor="input-device" className="text-xs font-mono text-slate-300 block">
                  Device ID &amp; TLS Hash
                </label>
                <div className="relative">
                  <Smartphone className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-device"
                    type="text"
                    value={formData.deviceId}
                    onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#05070B] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="e.g. EMULATOR-ANDROID-HEADLESS-X4"
                  />
                </div>
              </div>

              {/* 6. Transaction Time */}
              <div className="space-y-1.5">
                <label htmlFor="input-time" className="text-xs font-mono text-slate-300 block">
                  Transaction Time (UTC)
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-time"
                    type="text"
                    value={formData.transactionTime}
                    onChange={(e) => setFormData({ ...formData, transactionTime: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#05070B] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="e.g. 10:42 PM"
                  />
                </div>
              </div>

            </div>

            {/* Telemetry Sliders: Velocity, IP Risk, Device Risk */}
            <div className="pt-4 border-t border-white/[0.06] space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Continuous Telemetry Vector Adjusters
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 7. Previous Transaction Velocity */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Previous Velocity (1h):</span>
                    <span className="text-cyan-400 font-bold tabular-nums">{formData.velocity} tx / hr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={formData.velocity}
                    onChange={(e) => setFormData({ ...formData, velocity: parseInt(e.target.value) || 1 })}
                    className="w-full accent-cyan-400 cursor-pointer"
                    aria-label="Previous Transaction Velocity"
                  />
                  <span className="text-[10px] text-slate-500 font-mono block">Baseline: 1–2 tx/hr</span>
                </div>

                {/* 8. IP Risk */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">IP &amp; ASN Risk:</span>
                    <span className="text-cyan-400 font-bold tabular-nums">{formData.ipRisk} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.ipRisk}
                    onChange={(e) => setFormData({ ...formData, ipRisk: parseInt(e.target.value) || 0 })}
                    className="w-full accent-cyan-400 cursor-pointer"
                    aria-label="IP Risk"
                  />
                  <span className="text-[10px] text-slate-500 font-mono block">Tor, VPN &amp; proxy score</span>
                </div>

                {/* 9. Device Risk */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Device Risk:</span>
                    <span className="text-cyan-400 font-bold tabular-nums">{formData.deviceRisk} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.deviceRisk}
                    onChange={(e) => setFormData({ ...formData, deviceRisk: parseInt(e.target.value) || 0 })}
                    className="w-full accent-cyan-400 cursor-pointer"
                    aria-label="Device Risk"
                  />
                  <span className="text-[10px] text-slate-500 font-mono block">TLS &amp; headless browser entropy</span>
                </div>

              </div>
            </div>
          </div>

          {/* =========================================================================
              ANALYZE BUTTON (Hover, press, loading, disabled states)
             ========================================================================= */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Cryostat Temperature: 15 mK · Quantum Volume: 4096</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors min-h-[48px]"
              >
                Reset Fields
              </button>

              <button
                type="submit"
                disabled={analysisState !== 'idle' && analysisState !== 'complete'}
                className="flex-1 sm:flex-initial px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] group"
              >
                <Atom className="w-4 h-4 animate-spin-slow group-hover:rotate-180 transition-transform duration-500" />
                <span>Analyze Transaction</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </form>
      )}

      {/* =========================================================================
          EXPLANATION MODAL (Full Q-SHAP & Hilbert space audit inspection)
         ========================================================================= */}
      {showExplanationModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0A0F18] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <Atom className="w-4 h-4" />
                <span>Quantum Explainability &amp; Hilbert Projection</span>
              </div>
              <button
                onClick={() => setShowExplanationModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                Esc / Close
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">
                Quantum State Vector &amp; Shapley Attributions
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {result.explanation}
              </p>
            </div>

            <div className="p-4 bg-black/60 rounded-xl border border-white/5">
              <BlochSphereCanvas riskScore={result.finalRiskScore} className="w-full h-52" />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                Quantum Feature Attribution Weights (SHAP Values)
              </h4>
              <FeatureAttributionChart features={result.contributingFeatures} />
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowExplanationModal(false)}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
