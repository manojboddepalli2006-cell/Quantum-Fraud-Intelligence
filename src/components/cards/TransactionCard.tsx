import React from 'react';
import { Transaction } from '../../types';
import { ArrowUpRight, ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, Eye } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  onSelect?: (tx: Transaction) => void;
  selected?: boolean;
}

export function TransactionCard({ transaction, onSelect, selected }: TransactionCardProps) {
  const isCritical = transaction.riskTier === 'CRITICAL';
  const isHigh = transaction.riskTier === 'HIGH';
  const isMedium = transaction.riskTier === 'MEDIUM';
  const isLow = transaction.riskTier === 'LOW';

  const riskColor = isCritical
    ? 'text-rose-400'
    : isHigh
    ? 'text-amber-400'
    : isMedium
    ? 'text-yellow-400'
    : 'text-emerald-400';

  const statusBorder = selected 
    ? 'border-cyan-500 bg-cyan-950/20' 
    : 'border-white/[0.06] hover:border-white/[0.12] bg-[#0A0F18]/60';

  return (
    <div
      onClick={() => onSelect && onSelect(transaction)}
      className={`p-4 rounded-lg border transition-all duration-150 cursor-pointer ${statusBorder}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(transaction);
        }
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5">
        <div className="flex items-center gap-2">
          {/* Status icon */}
          {isLow && <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
          {isMedium && <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />}
          {isHigh && <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />}
          {isCritical && <ShieldX className="w-4 h-4 text-rose-400 shrink-0" />}

          <div>
            <span className="font-semibold text-sm text-slate-100 block">
              {transaction.merchant}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span>{transaction.id}</span>
              <span aria-hidden="true">·</span>
              <span>{transaction.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline sm:items-end justify-between sm:flex-col">
          <span className="font-mono text-base font-bold text-white tabular-nums">
            ${transaction.amount.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-400">
            {transaction.location.city}, {transaction.location.countryCode}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span>{transaction.cardholder}</span>
          <span aria-hidden="true">·</span>
          <span>{transaction.cardNetwork} •••• {transaction.cardLast4}</span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-[11px] text-slate-400">
            Risk:
          </span>
          <span className={`text-xs font-bold tabular-nums ${riskColor}`}>
            {transaction.finalRiskScore}%
          </span>
          <span className="text-[10px] text-slate-500">
            (Q-Ent: {transaction.qubitEntanglementScore})
          </span>
        </div>
      </div>
    </div>
  );
}
