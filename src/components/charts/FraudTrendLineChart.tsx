import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { TimeRange } from './VolumeFraudAreaChart';

interface FraudTrendProps {
  timeRange: TimeRange;
}

const TREND_DATA_BY_RANGE: Record<TimeRange, Array<{ label: string; rate: number; preventedUsd: number }>> = {
  '24H': [
    { label: '00:00', rate: 98.9, preventedUsd: 182000 },
    { label: '04:00', rate: 99.1, preventedUsd: 140000 },
    { label: '08:00', rate: 99.3, preventedUsd: 480000 },
    { label: '12:00', rate: 99.4, preventedUsd: 790000 },
    { label: '16:00', rate: 99.2, preventedUsd: 840000 },
    { label: '20:00', rate: 99.5, preventedUsd: 680000 },
    { label: '23:59', rate: 99.2, preventedUsd: 310000 }
  ],
  '7D': [
    { label: 'Mon', rate: 98.8, preventedUsd: 1840000 },
    { label: 'Tue', rate: 99.1, preventedUsd: 2100000 },
    { label: 'Wed', rate: 99.3, preventedUsd: 2450000 },
    { label: 'Thu', rate: 99.2, preventedUsd: 2310000 },
    { label: 'Fri', rate: 99.4, preventedUsd: 3100000 },
    { label: 'Sat', rate: 99.5, preventedUsd: 3820000 },
    { label: 'Sun', rate: 99.2, preventedUsd: 2750000 }
  ],
  '30D': [
    { label: 'W1', rate: 98.9, preventedUsd: 11200000 },
    { label: 'W2', rate: 99.2, preventedUsd: 13400000 },
    { label: 'W3', rate: 99.3, preventedUsd: 14800000 },
    { label: 'W4', rate: 99.4, preventedUsd: 16200000 }
  ],
  '90D': [
    { label: 'M1', rate: 98.7, preventedUsd: 46200000 },
    { label: 'M2', rate: 99.1, preventedUsd: 52400000 },
    { label: 'M3', rate: 99.3, preventedUsd: 58900000 }
  ]
};

export function FraudTrendLineChart({ timeRange }: FraudTrendProps) {
  const data = TREND_DATA_BY_RANGE[timeRange];

  return (
    <div className="w-full h-64 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="label"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            yAxisId="rate"
            domain={[97, 100]}
            stroke="#06B6D4"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            yAxisId="loss"
            orientation="right"
            stroke="#10B981"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${Math.round(v / 1000)}k`}
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
          <Line
            yAxisId="rate"
            type="monotone"
            dataKey="rate"
            name="Fraud Detection Rate (%)"
            stroke="#06B6D4"
            strokeWidth={2.5}
            dot={{ fill: '#06B6D4', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="loss"
            type="monotone"
            dataKey="preventedUsd"
            name="Fraud Loss Prevented ($)"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={{ fill: '#10B981', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
