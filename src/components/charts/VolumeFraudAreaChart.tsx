import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

export type TimeRange = '24H' | '7D' | '30D' | '90D';

interface VolumeFraudProps {
  timeRange: TimeRange;
}

const DATA_BY_RANGE: Record<TimeRange, Array<{ label: string; volume: number; fraud: number }>> = {
  '24H': [
    { label: '00:00', volume: 14200, fraud: 112 },
    { label: '04:00', volume: 8900, fraud: 78 },
    { label: '08:00', volume: 29400, fraud: 210 },
    { label: '12:00', volume: 48600, fraud: 380 },
    { label: '16:00', volume: 56200, fraud: 440 },
    { label: '20:00', volume: 42100, fraud: 310 },
    { label: '23:59', volume: 22800, fraud: 165 }
  ],
  '7D': [
    { label: 'Mon', volume: 210000, fraud: 1480 },
    { label: 'Tue', volume: 245000, fraud: 1620 },
    { label: 'Wed', volume: 280000, fraud: 1940 },
    { label: 'Thu', volume: 265000, fraud: 1780 },
    { label: 'Fri', volume: 340000, fraud: 2840 },
    { label: 'Sat', volume: 390000, fraud: 3410 },
    { label: 'Sun', volume: 310000, fraud: 2240 }
  ],
  '30D': [
    { label: 'Week 1', volume: 1240000, fraud: 8920 },
    { label: 'Week 2', volume: 1480000, fraud: 10450 },
    { label: 'Week 3', volume: 1620000, fraud: 12100 },
    { label: 'Week 4', volume: 1790000, fraud: 13800 }
  ],
  '90D': [
    { label: 'Month 1', volume: 5400000, fraud: 41200 },
    { label: 'Month 2', volume: 6100000, fraud: 46800 },
    { label: 'Month 3', volume: 6850000, fraud: 52100 }
  ]
};

export function VolumeFraudAreaChart({ timeRange }: VolumeFraudProps) {
  const data = DATA_BY_RANGE[timeRange];

  return (
    <div className="w-full h-72 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="label"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${Math.round(v / 1000)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D131F',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F1F5F9'
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', paddingBottom: '12px' }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="volume"
            name="Transaction Volume"
            stroke="#06B6D4"
            fill="url(#volGrad)"
            strokeWidth={2}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="fraud"
            name="Intercepted Fraud Attempts"
            stroke="#EF4444"
            fill="url(#fraudGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
