import React, { useEffect, useState } from 'react';
import { RiskTier } from '../../types';

interface CircularRiskGaugeProps {
  score: number; // 0 to 100
  tier: RiskTier;
  confidence: number; // 0 to 100
  size?: number;
}

export function CircularRiskGauge({
  score,
  tier,
  confidence,
  size = 220
}: CircularRiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.round(score / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [score]);

  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const color = tier === 'CRITICAL' || tier === 'HIGH'
    ? '#EF4444'
    : tier === 'MEDIUM'
    ? '#F59E0B'
    : '#10B981';

  const glowColor = tier === 'CRITICAL' || tier === 'HIGH'
    ? 'rgba(239, 68, 68, 0.25)'
    : tier === 'MEDIUM'
    ? 'rgba(245, 158, 11, 0.2)'
    : 'rgba(16, 185, 129, 0.2)';

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: glowColor }}
      />

      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeOpacity={0.6}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className="font-display font-extrabold text-4xl sm:text-5xl tabular-nums tracking-tight transition-colors duration-300"
          style={{ color }}
        >
          {animatedScore}%
        </span>
        <span
          className="text-xs font-mono font-bold tracking-wider uppercase mt-1 px-2.5 py-0.5 rounded border"
          style={{
            color,
            borderColor: `${color}40`,
            backgroundColor: `${color}15`
          }}
        >
          {tier} RISK
        </span>
        <span className="text-[11px] font-mono text-slate-400 mt-1.5">
          {confidence}% Confidence
        </span>
      </div>
    </div>
  );
}
