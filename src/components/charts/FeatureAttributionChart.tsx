import React from 'react';
import { TransactionFeatureContribution } from '../../types';

interface FeatureAttributionProps {
  features: TransactionFeatureContribution[];
}

export function FeatureAttributionChart({ features }: FeatureAttributionProps) {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-white/5 font-mono">
        <span>Observable Feature</span>
        <span>Quantum Shapley Weight</span>
      </div>

      {features.map((feat, idx) => {
        const isProtective = feat.impact === 'protective';
        const isAnomalous = feat.impact === 'anomalous';
        const isSuspicious = feat.impact === 'suspicious';
        const absWeight = Math.min(100, Math.round(Math.abs(feat.weight) * 100));

        const barColor = isProtective 
          ? 'bg-emerald-500' 
          : isAnomalous 
          ? 'bg-rose-500' 
          : isSuspicious 
          ? 'bg-amber-500' 
          : 'bg-cyan-500';

        const textColor = isProtective 
          ? 'text-emerald-400' 
          : isAnomalous 
          ? 'text-rose-400' 
          : isSuspicious 
          ? 'text-amber-400' 
          : 'text-cyan-400';

        return (
          <div key={idx} className="space-y-1.5 group">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-200 font-medium group-hover:text-cyan-300 transition-colors">
                {feat.name}
              </span>
              <div className="flex items-center gap-2 font-mono">
                <span className={`text-[11px] font-semibold tabular-nums ${textColor}`}>
                  {feat.weight > 0 ? `+${feat.weight}` : feat.weight}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {feat.impact}
                </span>
              </div>
            </div>

            {/* Visual Bar representation */}
            <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden flex">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                style={{ width: `${absWeight}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-normal pl-0.5">
              {feat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
