import React from 'react';
import { Transaction } from '../../types';
import { X, ShieldAlert, ShieldCheck, MapPin, CreditCard, Cpu, Clock, CheckCircle2, Ban } from 'lucide-react';
import { BlochSphereCanvas } from '../3d/BlochSphereCanvas';
import { FeatureAttributionChart } from '../charts/FeatureAttributionChart';

interface TransactionInspectorModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: 'APPROVED' | 'BLOCKED') => void;
}

export function TransactionInspectorModal({
  transaction,
  onClose,
  onUpdateStatus
}: TransactionInspectorModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!transaction) return null;

  const isCritical = transaction.riskTier === 'CRITICAL';
  const isHigh = transaction.riskTier === 'HIGH';
  const isLow = transaction.riskTier === 'LOW';

  const riskBadgeClass = isCritical
    ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    : isHigh
    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    : isLow
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0A0F18] border border-white/10 rounded-xl shadow-2xl p-6 my-8 space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-tx-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-xs font-mono font-semibold rounded border ${riskBadgeClass}`}>
                {transaction.riskTier} RISK · {transaction.finalRiskScore}%
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {transaction.id}
              </span>
            </div>
            <h2 id="modal-tx-title" className="text-xl font-display font-bold text-white mt-1">
              {transaction.merchant}
            </h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Category: {transaction.category} · {transaction.timestamp}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount & Quick Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block">Total Amount</span>
            <span className="text-xl font-display font-bold text-white tabular-nums">
              ${transaction.amount.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-500 block font-mono">Currency: {transaction.currency}</span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block">Cardholder</span>
            <span className="text-sm font-semibold text-white truncate block">
              {transaction.cardholder}
            </span>
            <span className="text-[10px] text-slate-500 block font-mono">
              {transaction.cardNetwork} •••• {transaction.cardLast4}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block">Location</span>
            <span className="text-sm font-semibold text-white truncate block">
              {transaction.location.city}, {transaction.location.countryCode}
            </span>
            <span className="text-[10px] text-slate-500 block font-mono">
              {transaction.location.distanceFromHomeKm}km from home
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[11px] font-mono text-slate-400 block">Quantum Confidence</span>
            <span className="text-xl font-display font-bold text-cyan-400 tabular-nums">
              {transaction.quantumConfidence}%
            </span>
            <span className="text-[10px] text-slate-500 block font-mono">
              Entanglement: {transaction.qubitEntanglementScore}
            </span>
          </div>
        </div>

        {/* 3D Bloch Sphere & Natural Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>Qubit State Vector Projection</span>
            </div>
            <BlochSphereCanvas
              riskScore={transaction.finalRiskScore}
              className="w-full h-48"
              interactive={true}
            />
            <p className="text-[11px] text-slate-400 text-center font-mono">
              Angle θ = {(transaction.quantumStatePhase).toFixed(2)} rad · Ground state convergence
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider">
              Quantum Variational Verdict
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0D131F] p-3 rounded border border-white/5">
              {transaction.explanation}
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Velocity (1 hour):</span>
                <span className="text-white tabular-nums">{transaction.velocity1h} transactions</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Device Integrity Score:</span>
                <span className="text-white tabular-nums">{transaction.deviceRisk} / 100</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Network ASN / IP Risk:</span>
                <span className="text-white tabular-nums">{transaction.ipRisk} / 100</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Behavior Deviation:</span>
                <span className="text-white tabular-nums">{transaction.behaviorDeviation} / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contributing Features SHAP */}
        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-3">
          <h4 className="text-xs font-mono uppercase text-slate-300 tracking-wider">
            Explainable AI: Feature Attributions
          </h4>
          <FeatureAttributionChart features={transaction.contributingFeatures} />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
          <span className="text-xs text-slate-400 font-mono">
            Recommended Action: <strong className="text-white">{transaction.recommendedAction}</strong>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onUpdateStatus?.(transaction.id, 'APPROVED');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Force Approve
            </button>
            <button
              onClick={() => {
                onUpdateStatus?.(transaction.id, 'BLOCKED');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/30 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Hard Freeze & Block
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
