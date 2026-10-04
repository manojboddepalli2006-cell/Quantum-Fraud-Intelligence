import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  subtext?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  change,
  changeType = 'positive',
  icon: Icon,
  subtext
}: MetricCardProps) {
  return (
    <div className="glass-panel p-5 rounded-lg border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200">
      <div className="flex items-center justify-between pb-3">
        <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded bg-white/[0.04] border border-white/5 flex items-center justify-center text-cyan-400">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 pt-1">
        <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-xs text-slate-400 font-mono">
            {unit}
          </span>
        )}
      </div>

      {(change || subtext) && (
        <div className="flex items-center gap-2 pt-2.5 text-xs">
          {change && (
            <span
              className={`font-mono text-[11px] font-medium tabular-nums ${
                changeType === 'positive'
                  ? 'text-emerald-400'
                  : changeType === 'negative'
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {change}
            </span>
          )}
          {subtext && (
            <span className="text-slate-500 text-[11px] truncate">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
