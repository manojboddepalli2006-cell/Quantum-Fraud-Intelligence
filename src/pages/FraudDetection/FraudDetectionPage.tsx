import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, RiskTier } from '../../types';
import { INITIAL_TRANSACTIONS } from '../../data/mockTransactions';
import { RiskNetwork3D, NetworkNode } from '../../components/3d/RiskNetwork3D';
import { RiskVelocityChart } from '../../components/charts/RiskVelocityChart';
import {
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  Zap,
  Filter,
  CheckCircle2,
  Ban,
  Clock,
  MapPin,
  Smartphone,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  Globe2,
  Activity,
  Flame
} from 'lucide-react';

export function FraudDetectionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_TRANSACTIONS[0].id);
  const [filterTier, setFilterTier] = useState<string>('All');
  
  // Real-time live counter increments
  const [monitoredCount, setMonitoredCount] = useState(14892);
  const [highRiskCount, setHighRiskCount] = useState(148);
  const [reviewCount, setReviewCount] = useState(412);
  const [blockedCount, setBlockedCount] = useState(96);

  useEffect(() => {
    const timer = setInterval(() => {
      setMonitoredCount((prev) => prev + Math.floor(Math.random() * 4 + 1));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Map transactions to 3D network nodes
  const networkNodes: NetworkNode[] = useMemo(() => {
    return transactions.map((t, idx) => {
      // Generate deterministic 3D positions in a spherical cluster
      const angle = (idx / transactions.length) * Math.PI * 2;
      const radius = 2.4 + (idx % 3) * 0.4;
      const y = Math.sin(idx * 1.8) * 1.6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * (radius * 0.7);

      let tier: 'Safe' | 'Review' | 'High Risk' = 'Safe';
      if (t.riskTier === 'CRITICAL' || t.riskTier === 'HIGH') {
        tier = 'High Risk';
      } else if (t.riskTier === 'MEDIUM') {
        tier = 'Review';
      }

      return {
        id: t.id,
        merchant: t.merchant,
        amount: t.amount,
        riskScore: t.finalRiskScore,
        tier,
        pos: [x, y, z]
      };
    });
  }, [transactions]);

  // Selected Transaction for Alert Panel
  const selectedTx = useMemo(() => {
    return transactions.find((t) => t.id === selectedId) || transactions[0];
  }, [transactions, selectedId]);

  // Related transactions in the same cluster / risk category
  const relatedTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.id !== selectedTx.id && (t.riskTier === selectedTx.riskTier || t.location.country === selectedTx.location.country))
      .slice(0, 2);
  }, [transactions, selectedTx]);

  // Filtered list for the Live Transaction Feed
  const filteredFeed = useMemo(() => {
    return transactions.filter((t) => {
      if (filterTier === 'All') return true;
      if (filterTier === 'Safe') return t.riskTier === 'LOW';
      if (filterTier === 'Review') return t.riskTier === 'MEDIUM';
      if (filterTier === 'High Risk') return t.riskTier === 'HIGH' || t.riskTier === 'CRITICAL';
      return true;
    });
  }, [transactions, filterTier]);

  // Functional Alert Actions
  const handleUpdateStatus = (id: string, action: 'Block' | 'Review' | 'Approve') => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (action === 'Block') {
            setBlockedCount((c) => c + 1);
            return { ...t, status: 'BLOCKED', riskTier: 'CRITICAL' as RiskTier };
          }
          if (action === 'Review') {
            setReviewCount((c) => c + 1);
            return { ...t, status: 'CHALLENGED', riskTier: 'MEDIUM' as RiskTier };
          }
          if (action === 'Approve') {
            return { ...t, status: 'APPROVED', riskTier: 'LOW' as RiskTier, finalRiskScore: 4 };
          }
        }
        return t;
      })
    );
  };

  // Inject a live simulated suspicious burst to demonstrate live pulsing
  const handleInjectThreat = () => {
    const newId = `TX-Q-${Date.now().toString().slice(-6)}`;
    const newTx: Transaction = {
      id: newId,
      timestamp: 'Just now',
      amount: 1840.50,
      currency: 'USD',
      cardholder: 'Sybil Bot Target #91',
      cardLast4: '4410',
      cardNetwork: 'Visa',
      merchant: 'Apex Crypto Gateway OTC',
      category: 'Cryptocurrency',
      location: {
        city: 'Nicosia',
        country: 'Cyprus',
        countryCode: 'CY',
        distanceFromHomeKm: 8300
      },
      deviceRisk: 91,
      velocity1h: 9,
      ipRisk: 84,
      behaviorDeviation: 95,
      qubitEntanglementScore: 0.96,
      finalRiskScore: 96,
      riskTier: 'CRITICAL',
      quantumConfidence: 98,
      quantumStatePhase: 2.96,
      status: 'BLOCKED',
      recommendedAction: 'HARD_DECLINE',
      explanation: 'PULSE ALERT: High-speed automated Sybil network attack intercepted across 9 cloud puppeteer endpoints. Entanglement score 0.96 confirmed synthetic card testing.',
      contributingFeatures: [
        { name: 'Velocity Burst (9 tx/hr)', weight: 0.46, impact: 'anomalous', description: 'Automated rapid-fire trial sequence' },
        { name: 'Headless Browser Signature', weight: 0.35, impact: 'anomalous', description: 'Canvas fingerprint spoofing detected' },
        { name: 'High-Risk Offshore IP', weight: 0.28, impact: 'suspicious', description: 'Unregulated offshore crypto exchange gateway' }
      ]
    };

    setTransactions([newTx, ...transactions]);
    setSelectedId(newId);
    setHighRiskCount((c) => c + 1);
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* =========================================================================
          HEADER (Live indicators & Status)
         ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              LIVE
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400">
              Autonomous Real-Time Interception Rail
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Fraud Detection Center
          </h1>
          <p className="text-sm text-slate-300">
            Monitor transaction risk signals in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quantum Engine Online */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0F18] border border-white/10 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-200 font-semibold">Quantum Engine Online</span>
          </div>

          <button
            onClick={handleInjectThreat}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm shadow-rose-500/20 active:scale-[0.98]"
          >
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            Simulate Threat Surge
          </button>
        </div>
      </div>

      {/* =========================================================================
          RISK SUMMARY METRICS (Subtle animated updates)
         ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 text-xs font-mono">
        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
            Transactions Monitored
          </span>
          <span className="text-2xl font-display font-bold text-white tabular-nums block">
            {monitoredCount.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 block">Streaming continuous</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-rose-500/20 bg-rose-950/10 space-y-1">
          <span className="text-rose-400 text-[10px] uppercase tracking-wider block">
            High Risk Flagged
          </span>
          <span className="text-2xl font-display font-bold text-rose-400 tabular-nums block">
            {highRiskCount}
          </span>
          <span className="text-[10px] text-rose-500 block">Critical mitigation queue</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-1">
          <span className="text-amber-400 text-[10px] uppercase tracking-wider block">
            Under Review
          </span>
          <span className="text-2xl font-display font-bold text-amber-400 tabular-nums block">
            {reviewCount}
          </span>
          <span className="text-[10px] text-amber-500 block">Step-up challenges active</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
            Blocked Settlements
          </span>
          <span className="text-2xl font-display font-bold text-white tabular-nums block">
            {blockedCount}
          </span>
          <span className="text-[10px] text-emerald-400 block">$2.4M hard decline</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1 col-span-2 md:col-span-1">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
            Detection Accuracy
          </span>
          <span className="text-2xl font-display font-bold text-emerald-400 tabular-nums block">
            99.2%
          </span>
          <span className="text-[10px] text-slate-500 block">0.024% false positive rate</span>
        </div>
      </div>

      {/* =========================================================================
          MAIN 3D VISUALIZATION: Large 3D Risk Network
         ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-display font-bold text-white">
              Global Transaction Constellation Network
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Interactive Node Topology · Thin animated connections highlight collusive paths
          </span>
        </div>

        <RiskNetwork3D
          nodes={networkNodes}
          selectedId={selectedId}
          onSelectNode={(id) => setSelectedId(id)}
          className="w-full h-80 sm:h-96"
        />
      </div>

      {/* =========================================================================
          ALERT PANEL & LIVE TRANSACTION FEED (2-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Transaction Feed with Filtering (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live Transaction Feed
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Click any row to open the active alert panel
              </span>
            </div>

            {/* Filter Tabs: All, Safe, Review, High Risk */}
            <div className="flex items-center gap-1 text-xs font-mono">
              {['All', 'Safe', 'Review', 'High Risk'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTier(tab)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterTier === tab
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling Feed Container */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredFeed.map((tx) => {
              const isSelected = tx.id === selectedId;
              const isHigh = tx.riskTier === 'CRITICAL' || tx.riskTier === 'HIGH';
              const isMed = tx.riskTier === 'MEDIUM';

              const tierColor = isHigh
                ? 'text-rose-400'
                : isMed
                ? 'text-amber-400'
                : 'text-emerald-400';

              const statusBadge = tx.status === 'BLOCKED'
                ? 'text-rose-400 bg-rose-950/40 border-rose-500/30'
                : tx.status === 'CHALLENGED'
                ? 'text-amber-400 bg-amber-950/40 border-amber-500/30'
                : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';

              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedId(tx.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D1524] border-cyan-500/60 ring-1 ring-cyan-500/30 shadow-md'
                      : 'bg-[#080D16] border-white/[0.05] hover:border-white/15 hover:bg-[#0A101C]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      {isHigh ? (
                        <ShieldX className="w-4 h-4 text-rose-400 shrink-0" />
                      ) : isMed ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      <span className="font-semibold text-white text-sm">
                        {tx.merchant}
                      </span>
                    </div>

                    <span className="font-mono font-bold text-white tabular-nums text-sm">
                      ${tx.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300">{tx.location.city}, {tx.location.countryCode}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-500">{tx.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className={`font-bold tabular-nums ${tierColor}`}>
                        {tx.finalRiskScore}% Risk
                      </span>
                      <span className={`px-2 py-0.2 rounded text-[10px] border ${statusBadge}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: ALERT PANEL (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <h3 className="font-display font-bold text-white text-base">
                  Security Alert Inspector
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {selectedTx.id}
              </span>
            </div>

            {/* Large Risk Score */}
            <div className="flex items-baseline justify-between p-4 rounded-xl bg-black/60 border border-white/5">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Measured Quantum Risk
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-4xl font-display font-extrabold tabular-nums ${
                      selectedTx.riskTier === 'CRITICAL' || selectedTx.riskTier === 'HIGH'
                        ? 'text-rose-400'
                        : selectedTx.riskTier === 'MEDIUM'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {selectedTx.finalRiskScore}%
                  </span>
                  <span className="text-xs font-mono font-bold uppercase text-slate-300">
                    {selectedTx.riskTier} RISK
                  </span>
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-slate-400 block text-[11px]">Entanglement:</span>
                <span className="text-cyan-400 font-bold">{selectedTx.qubitEntanglementScore}</span>
              </div>
            </div>

            {/* Why It Was Flagged */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
                Why It Was Flagged
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans bg-black/40 p-3.5 rounded-xl border border-white/5">
                {selectedTx.explanation}
              </p>
            </div>

            {/* Recommended Action */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 font-mono text-xs">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                Recommended Action
              </span>
              <span className="text-white font-bold block text-sm">
                {selectedTx.finalRiskScore >= 75
                  ? 'Block transaction and request additional authentication.'
                  : selectedTx.finalRiskScore >= 50
                  ? 'Challenge with biometric push notification.'
                  : 'Approve transaction. Risk factors nominal.'}
              </span>
            </div>

            {/* Related Transactions in cluster */}
            {relatedTransactions.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Related Network Cluster Transactions
                </span>
                <div className="space-y-1.5">
                  {relatedTransactions.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setSelectedId(rel.id)}
                      className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono hover:border-cyan-500/40 cursor-pointer transition-colors"
                    >
                      <div className="truncate mr-2">
                        <span className="text-slate-200 block truncate">{rel.merchant}</span>
                        <span className="text-[10px] text-slate-500">{rel.id} · {rel.location.city}</span>
                      </div>
                      <span className="text-cyan-400 font-bold tabular-nums">
                        ${rel.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Functional Decision Buttons: Block, Review, Approve */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
              <button
                onClick={() => handleUpdateStatus(selectedTx.id, 'Block')}
                className="flex-1 py-2.5 px-3 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/30 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Ban className="w-3.5 h-3.5" />
                Block
              </button>

              <button
                onClick={() => handleUpdateStatus(selectedTx.id, 'Review')}
                className="flex-1 py-2.5 px-3 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/30 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Review
              </button>

              <button
                onClick={() => handleUpdateStatus(selectedTx.id, 'Approve')}
                className="flex-1 py-2.5 px-3 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          THREAT INTELLIGENCE (5 Core Telemetry Modules)
         ========================================================================= */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Threat Intelligence Telemetry
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Real-Time Anomaly Decomposition
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Risk Velocity Chart */}
          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
              01. Risk Velocity Timeline (60m)
            </span>
            <RiskVelocityChart />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span>Peak: 320 tx/min</span>
              <span className="text-rose-400">Spike detected @ 10:30 UTC</span>
            </div>
          </div>

          {/* 2. Anomaly Distribution */}
          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
              02. Anomaly Vector Distribution
            </span>
            
            <div className="space-y-2 text-xs font-mono pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Sybil Bot Bursts (5+ tx/hr)</span>
                  <span className="text-rose-400 font-bold">48%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-[48%] h-full bg-rose-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Headless Browser Fingerprinting</span>
                  <span className="text-amber-400 font-bold">29%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-[29%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Geolocation Intercontinental Leap</span>
                  <span className="text-sky-400 font-bold">15%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-sky-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Circadian Spending Deviation</span>
                  <span className="text-violet-400 font-bold">8%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-[8%] h-full bg-violet-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Geographic Risk */}
          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
              03. High-Risk Geographic Origins
            </span>

            <div className="space-y-2 text-xs font-mono pt-1">
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-200">Singapore (Tor ASN 4128)</span>
                <span className="text-rose-400 font-bold">87% Avg Risk</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-200">Nicosia (Offshore Crypto)</span>
                <span className="text-rose-400 font-bold">94% Avg Risk</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-200">Zurich (Unverified Proxy)</span>
                <span className="text-amber-400 font-bold">68% Avg Risk</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                <span className="text-slate-200">Stockholm (Cloud VPS)</span>
                <span className="text-yellow-400 font-bold">32% Avg Risk</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
