import React, { useState, useMemo } from 'react';
import { VolumeFraudAreaChart, TimeRange } from '../../components/charts/VolumeFraudAreaChart';
import { RiskDonutChart } from '../../components/charts/RiskDonutChart';
import { FraudTrendLineChart } from '../../components/charts/FraudTrendLineChart';
import { DashboardGlobeRiskMap } from '../../components/3d/DashboardGlobeRiskMap';
import {
  Layers,
  ShieldAlert,
  ShieldCheck,
  Zap,
  TrendingDown,
  TrendingUp,
  Cpu,
  Globe2,
  Calendar,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Activity
} from 'lucide-react';

interface KpiData {
  totalTransactions: string;
  totalSubtext: string;
  fraudDetected: string;
  fraudDetectedChange: string;
  fraudPrevented: string;
  fraudPreventedChange: string;
  avgRiskScore: string;
  avgRiskChange: string;
  falsePositiveRate: string;
  fpChange: string;
  quantumThroughput: {
    processed: string;
    avgTime: string;
    featureDimensions: string;
    encodingEfficiency: string;
  };
  insights: Array<{ headline: string; detail: string; category: string; impact: 'alert' | 'positive' | 'neutral' }>;
}

const DASHBOARD_METRICS: Record<TimeRange, KpiData> = {
  '24H': {
    totalTransactions: '1,489,240',
    totalSubtext: '1,720 tx / min peak',
    fraudDetected: '1,492',
    fraudDetectedChange: '+14% vs baseline',
    fraudPrevented: '$14,829,120',
    fraudPreventedChange: '+$1.8M mitigated',
    avgRiskScore: '12.4%',
    avgRiskChange: '-1.2% nominal',
    falsePositiveRate: '0.024%',
    fpChange: '-74x vs classical ML',
    quantumThroughput: {
      processed: '1.48M calls',
      avgTime: '3.4 ms',
      featureDimensions: '128-D Hilbert space',
      encodingEfficiency: '99.96% gate fidelity'
    },
    insights: [
      {
        headline: 'High-risk activity increased 18% during evening hours.',
        detail: 'Credential stuffing trials concentrated between 21:00 and 02:00 UTC through offshore Tor exit nodes.',
        category: 'Temporal Anomaly',
        impact: 'alert'
      },
      {
        headline: 'Device anomalies contributed to 42% of flagged transactions.',
        detail: 'Headless Chromium user-agents and emulated Android canvas fingerprints flagged by hardware entropy checks.',
        category: 'Device Integrity',
        impact: 'alert'
      },
      {
        headline: 'Sybil bot clusters suppressed with 99.4% precision in Asia-Pacific.',
        detail: 'Variational CNOT entanglement isolated cross-account velocity bursts before clearing settlement.',
        category: 'Quantum Defense',
        impact: 'positive'
      }
    ]
  },
  '7D': {
    totalTransactions: '10,840,900',
    totalSubtext: 'Avg 1.54M / day',
    fraudDetected: '11,480',
    fraudDetectedChange: '+6.2% vs last week',
    fraudPrevented: '$98,420,500',
    fraudPreventedChange: '+$12.4M mitigated',
    avgRiskScore: '13.1%',
    avgRiskChange: '+0.4% steady',
    falsePositiveRate: '0.026%',
    fpChange: '-72x vs classical ML',
    quantumThroughput: {
      processed: '10.8M calls',
      avgTime: '3.5 ms',
      featureDimensions: '128-D Hilbert space',
      encodingEfficiency: '99.95% gate fidelity'
    },
    insights: [
      {
        headline: 'Cross-border smurfing ring dismantled in East European corridor.',
        detail: 'Over 480 micro-transactions ($140–$280) intercepted across 18 card issuers within 4 hours.',
        category: 'Network Ring',
        impact: 'positive'
      },
      {
        headline: 'Device anomalies contributed to 38% of weekly flagged volume.',
        detail: 'Persistent TLS fingerprint mismatches observed on international digital gift card gateways.',
        category: 'Device Integrity',
        impact: 'alert'
      },
      {
        headline: 'False-positive friction reduced 4.8x for legitimate business travelers.',
        detail: 'Dynamic flight manifest verification suppressed false alarms across transcontinental routes.',
        category: 'Cardholder Retention',
        impact: 'positive'
      }
    ]
  },
  '30D': {
    totalTransactions: '48,290,000',
    totalSubtext: 'Monthly settlement stream',
    fraudDetected: '51,200',
    fraudDetectedChange: '-2.4% net decrease',
    fraudPrevented: '$420,180,000',
    fraudPreventedChange: '+$48.2M mitigated',
    avgRiskScore: '12.8%',
    avgRiskChange: '-0.8% variance',
    falsePositiveRate: '0.025%',
    fpChange: '-75x vs classical ML',
    quantumThroughput: {
      processed: '48.2M calls',
      avgTime: '3.4 ms',
      featureDimensions: '128-D Hilbert space',
      encodingEfficiency: '99.96% gate fidelity'
    },
    insights: [
      {
        headline: 'Automated card testing attacks declined 24% month-over-month.',
        detail: 'Sub-5ms auto-blocking policies led threat actors to abandon targeted checkout domains.',
        category: 'Threat Landscape',
        impact: 'positive'
      },
      {
        headline: 'Offshore crypto gateways accounted for $182M in attempted fraudulent onramps.',
        detail: 'High-ticket accounts protected via step-up biometric challenge triggers.',
        category: 'Asset Protection',
        impact: 'alert'
      },
      {
        headline: 'QPU uptime maintained at 99.994% throughout monthly clearing cycle.',
        detail: 'Automated cryo-recalibration executed during zero-traffic millisecond windows.',
        category: 'Infrastructure',
        impact: 'neutral'
      }
    ]
  },
  '90D': {
    totalTransactions: '149,800,000',
    totalSubtext: 'Quarterly compliance audit',
    fraudDetected: '158,400',
    fraudDetectedChange: '-8.1% vs prior quarter',
    fraudPrevented: '$1,290,400,000',
    fraudPreventedChange: '+$180M vs prior quarter',
    avgRiskScore: '12.6%',
    avgRiskChange: '-1.4% improvement',
    falsePositiveRate: '0.024%',
    fpChange: '-76x vs classical ML',
    quantumThroughput: {
      processed: '149.8M calls',
      avgTime: '3.4 ms',
      featureDimensions: '128-D Hilbert space',
      encodingEfficiency: '99.97% gate fidelity'
    },
    insights: [
      {
        headline: 'Over $1.29 Billion in gross fraudulent attempts thwarted in Q3/Q4.',
        detail: 'Institution-wide chargeback ratios remained below 0.01%, safe from payment scheme penalty thresholds.',
        category: 'Executive Summary',
        impact: 'positive'
      },
      {
        headline: 'Synthesized synthetic identity rings suppressed across 42 financial institutions.',
        detail: 'Hilbert manifold decision boundaries correctly isolated falsified SSN bureau anomalies.',
        category: 'Identity Verification',
        impact: 'positive'
      },
      {
        headline: 'High-risk activity increased 18% during holiday promotional spikes.',
        detail: 'Multi-threaded botnets targeted high-velocity consumer electronics checkout pages.',
        category: 'Seasonal Threat',
        impact: 'alert'
      }
    ]
  }
};

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('24H');
  const metrics = DASHBOARD_METRICS[timeRange];

  return (
    <div className="space-y-10 pb-20">
      
      {/* =========================================================================
          HEADER (Time selector: 24H, 7D, 30D, 90D)
         ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Layers className="w-4 h-4" />
            <span>Financial Intelligence Command Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Fraud Intelligence Dashboard
          </h1>
          <p className="text-sm text-slate-300">
            Real-time visibility into transaction risk and detection performance.
          </p>
        </div>

        {/* Time Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080D16] border border-white/10 text-xs font-mono self-start md:self-auto shadow-sm">
          {(['24H', '7D', '30D', '90D'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
                timeRange === range
                  ? 'bg-cyan-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          KPI ROW (Animated numbers responsive to time range)
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* KPI 1: Total Transactions */}
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Total Transactions
          </span>
          <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums tracking-tight block">
            {metrics.totalTransactions}
          </span>
          <span className="text-[11px] text-slate-500 font-mono block">
            {metrics.totalSubtext}
          </span>
        </div>

        {/* KPI 2: Fraud Detected */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-1">
          <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">
            Fraud Detected
          </span>
          <span className="text-2xl sm:text-3xl font-display font-bold text-rose-400 tabular-nums tracking-tight block">
            {metrics.fraudDetected}
          </span>
          <span className="text-[11px] text-rose-400/80 font-mono block">
            {metrics.fraudDetectedChange}
          </span>
        </div>

        {/* KPI 3: Fraud Prevented */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
            Fraud Prevented
          </span>
          <span className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 tabular-nums tracking-tight block">
            {metrics.fraudPrevented}
          </span>
          <span className="text-[11px] text-emerald-400/80 font-mono block">
            {metrics.fraudPreventedChange}
          </span>
        </div>

        {/* KPI 4: Average Risk Score */}
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Average Risk Score
          </span>
          <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums tracking-tight block">
            {metrics.avgRiskScore}
          </span>
          <span className="text-[11px] text-cyan-400 font-mono block">
            {metrics.avgRiskChange}
          </span>
        </div>

        {/* KPI 5: False Positive Rate */}
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            False Positive Rate
          </span>
          <span className="text-2xl sm:text-3xl font-display font-bold text-cyan-400 tabular-nums tracking-tight block">
            {metrics.falsePositiveRate}
          </span>
          <span className="text-[11px] text-slate-500 font-mono block">
            {metrics.fpChange}
          </span>
        </div>

      </div>

      {/* =========================================================================
          MAIN ANALYTICS & RISK DISTRIBUTION (2-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Large Area Chart: Transaction Volume vs Fraud Attempts (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                Transaction Volume vs Fraud Attempts
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Comparative clearing volume and real-time blocked fraud attempts ({timeRange})
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              Live QPU Kernel Screening
            </span>
          </div>

          <VolumeFraudAreaChart timeRange={timeRange} />
        </div>

        {/* Sophisticated Donut Chart: Risk Distribution (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="pb-2 border-b border-white/[0.06]">
            <h3 className="text-lg font-display font-bold text-white">
              Risk Distribution
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Categorization by measured Hilbert threshold
            </p>
          </div>

          <RiskDonutChart timeRange={timeRange} />

          {/* Donut Legend */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-white/[0.06]">
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-emerald-400 block font-bold">Low Risk</span>
              <span className="text-slate-400 text-[11px]">&lt; 25%</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-amber-400 block font-bold">Review</span>
              <span className="text-slate-400 text-[11px]">25–74%</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-rose-400 block font-bold">High Risk</span>
              <span className="text-slate-400 text-[11px]">&gt;= 75%</span>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          FRAUD TREND & QUANTUM PERFORMANCE (2-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Fraud Trend Line Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-lg font-display font-bold text-white">
                Fraud Detection Rate &amp; Loss Prevented
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Longitudinal accuracy and total capital protected over {timeRange}
              </p>
            </div>
          </div>

          <FraudTrendLineChart timeRange={timeRange} />
        </div>

        {/* Quantum Performance Dedicated Visualization (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/30 space-y-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <Cpu className="w-4 h-4" />
              <span>Cryostat Cluster #4</span>
            </div>
            <h3 className="text-lg font-display font-bold text-white">
              Quantum Analysis Throughput
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Hardware QPU gate benchmarks during live clearing
            </p>
          </div>

          {/* 4 Quantitative Throughput Metrics */}
          <div className="grid grid-cols-2 gap-3.5 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                Transactions Processed
              </span>
              <span className="text-xl font-display font-bold text-white tabular-nums block">
                {metrics.quantumThroughput.processed}
              </span>
              <span className="text-[10px] text-cyan-400 block">10,000 shots / tx</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                Average Analysis Time
              </span>
              <span className="text-xl font-display font-bold text-emerald-400 tabular-nums block">
                {metrics.quantumThroughput.avgTime}
              </span>
              <span className="text-[10px] text-slate-500 block">Sub-5ms SLA met</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                Feature Dimensions
              </span>
              <span className="text-xl font-display font-bold text-violet-400 tabular-nums block">
                128-D
              </span>
              <span className="text-[10px] text-slate-500 block">Hilbert phase space</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
                Encoding Efficiency
              </span>
              <span className="text-xl font-display font-bold text-cyan-400 tabular-nums block">
                99.96%
              </span>
              <span className="text-[10px] text-slate-500 block">2-qubit CZ fidelity</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-slate-300 flex items-center justify-between">
            <span>Coherence Time T₁: 420.5 µs</span>
            <span className="text-emerald-400">Cryo Active: 15 mK</span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          3D RISK MAP & DETERMINISTIC INSIGHTS (2-Column Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 3D Risk Map (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              Global Regional Risk Dispersion
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Multi-Region Settlement Arcs
            </span>
          </div>

          <DashboardGlobeRiskMap className="w-full h-80" />
        </div>

        {/* Deterministic Insights (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Deterministic Intelligence Insights
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Automated statistical synthesis for {timeRange} horizon
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              Active Audit
            </span>
          </div>

          {/* 3 Concise Analyst-Style Insight Cards */}
          <div className="space-y-3">
            {metrics.insights.map((insight, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#080D16] border border-white/5 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {insight.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Confidence: 99.4%
                  </span>
                </div>

                <h4 className="font-semibold text-white text-sm">
                  {insight.headline}
                </h4>

                <p className="text-slate-400 text-xs leading-relaxed font-sans pt-0.5">
                  {insight.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>SOC Incident Protocol: ISO 20022</span>
            <span className="text-slate-400">Generated: Just now</span>
          </div>
        </div>

      </div>

    </div>
  );
}
