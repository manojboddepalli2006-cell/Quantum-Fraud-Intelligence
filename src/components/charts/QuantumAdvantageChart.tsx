import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const BENCHMARK_DATA = [
  { metric: 'Zero-Day Patterns', classical: 64.2, quantum: 94.8 },
  { metric: 'Sybil Bot Rings', classical: 71.5, quantum: 97.4 },
  { metric: 'Cross-Border Smurfing', classical: 68.0, quantum: 92.1 },
  { metric: 'Latency Efficiency', classical: 82.0, quantum: 96.5 },
  { metric: 'False Positive Suppression', classical: 58.4, quantum: 98.8 }
];

export function QuantumAdvantageChart() {
  return (
    <div className="w-full h-64 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={BENCHMARK_DATA}
          margin={{ top: 12, right: 10, left: -20, bottom: 20 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="metric"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            interval={0}
            angle={-10}
            textAnchor="end"
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D131F',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F1F5F9'
            }}
            formatter={(value: any) => [`${value}%`, '']}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', paddingBottom: '12px' }}
          />
          <Bar
            dataKey="classical"
            name="Classical ML (XGBoost/DNN)"
            fill="#334155"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="quantum"
            name="Q-FraudX (Variational Quantum Kernel)"
            fill="#06B6D4"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
