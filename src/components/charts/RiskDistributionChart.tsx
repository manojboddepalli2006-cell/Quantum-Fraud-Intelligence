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

const RISK_DATA = [
  { hour: '00:00', legitimate: 12400, challenged: 420, blocked: 94 },
  { hour: '04:00', legitimate: 8200, challenged: 310, blocked: 82 },
  { hour: '08:00', legitimate: 24500, challenged: 680, blocked: 145 },
  { hour: '12:00', legitimate: 42100, challenged: 1120, blocked: 218 },
  { hour: '16:00', legitimate: 48900, challenged: 1340, blocked: 310 },
  { hour: '20:00', legitimate: 38200, challenged: 980, blocked: 240 },
  { hour: '23:59', legitimate: 19800, challenged: 560, blocked: 130 }
];

export function RiskDistributionChart() {
  return (
    <div className="w-full h-64 select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={RISK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="legitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="challengedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="hour"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val / 1000}k`}
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
          <Area
            type="monotone"
            dataKey="legitimate"
            name="Legitimate (<25%)"
            stroke="#06B6D4"
            fillOpacity={1}
            fill="url(#legitGradient)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="challenged"
            name="Challenged (25-74%)"
            stroke="#F59E0B"
            fillOpacity={1}
            fill="url(#challengedGradient)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="blocked"
            name="Blocked (>=75%)"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#blockedGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
