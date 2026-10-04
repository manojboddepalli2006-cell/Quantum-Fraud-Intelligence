import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const VELOCITY_TIMELINE = [
  { time: '10:00', velocity: 120, highRisk: 6 },
  { time: '10:10', velocity: 145, highRisk: 8 },
  { time: '10:20', velocity: 198, highRisk: 14 },
  { time: '10:30', velocity: 320, highRisk: 42 }, // Sybil burst
  { time: '10:40', velocity: 280, highRisk: 28 },
  { time: '10:50', velocity: 160, highRisk: 11 },
  { time: '11:00', velocity: 140, highRisk: 7 }
];

export function RiskVelocityChart() {
  return (
    <div className="w-full h-44 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={VELOCITY_TIMELINE} margin={{ top: 8, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="highRiskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#64748B"
            fontSize={10}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            stroke="#64748B"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D131F',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#F1F5F9'
            }}
          />
          <Area
            type="monotone"
            dataKey="velocity"
            name="Tx Velocity (tx/min)"
            stroke="#06B6D4"
            fill="url(#velocityGrad)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="highRisk"
            name="High Risk Anomaly Spike"
            stroke="#EF4444"
            fill="url(#highRiskGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
