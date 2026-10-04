import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TimeRange } from './VolumeFraudAreaChart';

interface RiskDonutChartProps {
  timeRange: TimeRange;
}

const DONUT_DATA_BY_RANGE: Record<TimeRange, Array<{ name: string; value: number; color: string; percent: string }>> = {
  '24H': [
    { name: 'Low Risk', value: 92.4, color: '#10B981', percent: '92.4%' },
    { name: 'Medium Risk', value: 5.8, color: '#F59E0B', percent: '5.8%' },
    { name: 'High Risk', value: 1.8, color: '#EF4444', percent: '1.8%' }
  ],
  '7D': [
    { name: 'Low Risk', value: 91.8, color: '#10B981', percent: '91.8%' },
    { name: 'Medium Risk', value: 6.1, color: '#F59E0B', percent: '6.1%' },
    { name: 'High Risk', value: 2.1, color: '#EF4444', percent: '2.1%' }
  ],
  '30D': [
    { name: 'Low Risk', value: 90.9, color: '#10B981', percent: '90.9%' },
    { name: 'Medium Risk', value: 6.8, color: '#F59E0B', percent: '6.8%' },
    { name: 'High Risk', value: 2.3, color: '#EF4444', percent: '2.3%' }
  ],
  '90D': [
    { name: 'Low Risk', value: 91.2, color: '#10B981', percent: '91.2%' },
    { name: 'Medium Risk', value: 6.5, color: '#F59E0B', percent: '6.5%' },
    { name: 'High Risk', value: 2.3, color: '#EF4444', percent: '2.3%' }
  ]
};

export function RiskDonutChart({ timeRange }: RiskDonutChartProps) {
  const data = DONUT_DATA_BY_RANGE[timeRange];

  return (
    <div className="relative w-full h-64 flex items-center justify-center select-none">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={92}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0D131F',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F1F5F9'
            }}
            formatter={(value: any) => [`${value}%`, 'Share']}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          Risk
        </span>
        <span className="text-sm font-display font-bold text-white tracking-tight">
          Distribution
        </span>
        <span className="text-[10px] text-cyan-400 font-mono mt-0.5">
          {timeRange} Interval
        </span>
      </div>
    </div>
  );
}
