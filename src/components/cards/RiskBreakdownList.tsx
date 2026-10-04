import React from 'react';
import { AnalysisInput, RiskTier } from '../../types';

interface RiskBreakdownProps {
  input: AnalysisInput;
  riskTier: RiskTier;
}

export function RiskBreakdownList({ input, riskTier }: RiskBreakdownProps) {
  // Compute normalized values and explanations for the 6 fields
  const breakdownItems = [
    {
      label: 'Device Risk',
      value: `${input.deviceRisk} / 100`,
      percent: input.deviceRisk,
      severity: input.deviceRisk > 60 ? 'high' : input.deviceRisk > 30 ? 'medium' : 'low',
      explanation: input.deviceRisk > 60
        ? 'Headless browser TLS signature with spoofed canvas fingerprint detected.'
        : input.deviceRisk > 30
        ? 'Unfamiliar browser user-agent string; partial hardware signature match.'
        : 'Hardware-pinned FIDO2 biometric token and trusted mobile secure enclave.'
    },
    {
      label: 'IP Risk',
      value: `${input.ipRisk} / 100`,
      percent: input.ipRisk,
      severity: input.ipRisk > 60 ? 'high' : input.ipRisk > 30 ? 'medium' : 'low',
      explanation: input.ipRisk > 60
        ? 'Origin ASN flagged as an active Tor relay or commercial proxy service.'
        : input.ipRisk > 30
        ? 'Hosting provider datacenter IP; ASN reputation exhibits minor anomaly.'
        : 'Verified residential ISP routing with clean historical ASN reputation.'
    },
    {
      label: 'Previous Transaction Velocity',
      value: `${input.velocity} tx / hr`,
      percent: Math.min(100, Math.round((input.velocity / 8) * 100)),
      severity: input.velocity >= 5 ? 'high' : input.velocity >= 3 ? 'medium' : 'low',
      explanation: input.velocity >= 5
        ? `${input.velocity} transactions in past 60 minutes indicates automated card stuffing script.`
        : input.velocity >= 3
        ? 'Elevated velocity compared to cardholder weekly baseline.'
        : 'Single standard transaction within normal daily cadence.'
    },
    {
      label: 'Behavior Deviation',
      value: `${input.behaviorDeviation} / 100`,
      percent: input.behaviorDeviation,
      severity: input.behaviorDeviation > 60 ? 'high' : input.behaviorDeviation > 30 ? 'medium' : 'low',
      explanation: input.behaviorDeviation > 60
        ? 'Extreme circadian variance; purchase time window contradicts 12-month card profile.'
        : input.behaviorDeviation > 30
        ? 'Moderate category deviation; occasional non-core merchant interaction.'
        : 'Fully conforms to established cardholder category affinity and spending schedule.'
    },
    {
      label: 'Transaction Amount',
      value: `$${input.amount.toFixed(2)}`,
      percent: Math.min(100, Math.round((input.amount / 3500) * 100)),
      severity: input.amount > 2000 ? 'high' : input.amount > 400 ? 'medium' : 'low',
      explanation: input.amount > 2000
        ? 'High-ticket settlement value significantly exceeds median purchase size ($68.00).'
        : input.amount > 400
        ? 'Above-average volume for merchant category; warrants quantum entropy check.'
        : 'Nominal amount matching routine consumer spending habits.'
    },
    {
      label: 'Location Anomaly',
      value: `${input.locationAnomalyKm.toLocaleString()} km`,
      percent: Math.min(100, Math.round((input.locationAnomalyKm / 10000) * 100)),
      severity: input.locationAnomalyKm > 4000 ? 'high' : input.locationAnomalyKm > 500 ? 'medium' : 'low',
      explanation: input.locationAnomalyKm > 4000
        ? `Transaction initiated ${input.locationAnomalyKm.toLocaleString()} km from home origin without travel notice on file.`
        : input.locationAnomalyKm > 500
        ? 'Interstate displacement detected outside standard commute zone.'
        : 'Terminal located within primary metropolitan residence area.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {breakdownItems.map((item, idx) => {
        const barColor = item.severity === 'high'
          ? 'bg-rose-500'
          : item.severity === 'medium'
          ? 'bg-amber-500'
          : 'bg-emerald-500';

        const textColor = item.severity === 'high'
          ? 'text-rose-400'
          : item.severity === 'medium'
          ? 'text-amber-400'
          : 'text-emerald-400';

        return (
          <div key={idx} className="p-4 rounded-xl bg-[#080D16] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">
                {item.label}
              </span>
              <span className={`font-mono font-bold tabular-nums ${textColor}`}>
                {item.value}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                style={{ width: `${Math.max(4, item.percent)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-0.5">
              {item.explanation}
            </p>
          </div>
        );
      })}
    </div>
  );
}
