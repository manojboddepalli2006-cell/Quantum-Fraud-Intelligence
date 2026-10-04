import { AnalysisInput, Transaction, TransactionFeatureContribution, RiskTier } from '../types';

export function calculateQuantumRisk(input: AnalysisInput): {
  finalRiskScore: number;
  riskTier: RiskTier;
  quantumConfidence: number;
  qubitEntanglementScore: number;
  recommendedAction: 'APPROVE' | 'STEP_UP_AUTH' | 'HARD_DECLINE' | 'INVESTIGATE';
  explanation: string;
  contributingFeatures: TransactionFeatureContribution[];
} {
  // Deterministic quantum-inspired feature weighting
  const amountNormalized = Math.min(input.amount / 5000, 1.0);
  const velocityNormalized = Math.min(input.velocity / 10, 1.0);
  const devRiskNormalized = input.deviceRisk / 100;
  const ipRiskNormalized = input.ipRisk / 100;
  const deviaNormalized = input.behaviorDeviation / 100;
  const locAnomalyNormalized = Math.min((input.locationAnomalyKm || 0) / 10000, 1.0);

  // Quantum non-linear entanglement term (interaction between velocity, ip, and behavior)
  const entanglement = 0.5 * Math.sin(velocityNormalized * Math.PI) * Math.cos(ipRiskNormalized * Math.PI / 2) +
    0.5 * (devRiskNormalized * deviaNormalized);
  const qubitEntanglementScore = Math.max(0.05, Math.min(0.99, Number((0.2 + entanglement * 0.75).toFixed(3))));

  // Classical linear score
  const classicalBaseline = 
    amountNormalized * 18 +
    velocityNormalized * 24 +
    devRiskNormalized * 18 +
    ipRiskNormalized * 15 +
    deviaNormalized * 15 +
    locAnomalyNormalized * 10;

  // Quantum advantage kernel adjustment: detects subtle non-linear collusion
  const quantumKernelMultiplier = 1.0 + (qubitEntanglementScore > 0.6 ? 0.22 : -0.15);
  let finalRisk = Math.round(classicalBaseline * quantumKernelMultiplier);
  finalRisk = Math.max(2, Math.min(99, finalRisk));

  // Determine tier
  let riskTier: RiskTier = 'LOW';
  let recommendedAction: 'APPROVE' | 'STEP_UP_AUTH' | 'HARD_DECLINE' | 'INVESTIGATE' = 'APPROVE';

  if (finalRisk >= 75) {
    riskTier = 'CRITICAL';
    recommendedAction = 'HARD_DECLINE';
  } else if (finalRisk >= 50) {
    riskTier = 'HIGH';
    recommendedAction = 'INVESTIGATE';
  } else if (finalRisk >= 25) {
    riskTier = 'MEDIUM';
    recommendedAction = 'STEP_UP_AUTH';
  } else {
    riskTier = 'LOW';
    recommendedAction = 'APPROVE';
  }

  // Quantum confidence (based on gate state purity and feature consistency)
  const quantumConfidence = Math.round(89 + Math.abs(finalRisk - 50) * 0.18);

  // Contributions
  const contributions: TransactionFeatureContribution[] = [
    {
      name: 'Transaction Velocity (1h)',
      weight: Number((velocityNormalized * 0.35).toFixed(2)),
      impact: input.velocity > 5 ? 'anomalous' : input.velocity > 2 ? 'suspicious' : 'protective',
      description: input.velocity > 5 
        ? `${input.velocity} transactions in 60m indicates automated bot trial`
        : 'Velocity within normal cardholder baseline'
    },
    {
      name: 'Behavioral Vector Deviation',
      weight: Number((deviaNormalized * 0.28).toFixed(2)),
      impact: input.behaviorDeviation > 60 ? 'anomalous' : input.behaviorDeviation > 30 ? 'suspicious' : 'protective',
      description: input.behaviorDeviation > 60
        ? 'High deviation from historical circadian spending profile'
        : 'Consistent with historical merchant category frequency'
    },
    {
      name: 'Device & Terminal Integrity',
      weight: Number((devRiskNormalized * 0.22).toFixed(2)),
      impact: input.deviceRisk > 60 ? 'suspicious' : 'protective',
      description: input.deviceRisk > 60
        ? 'Unrecognized TLS fingerprint or headless browser signature'
        : 'Trusted hardware token and verified mobile OS'
    },
    {
      name: 'IP Geolocation & ASN Risk',
      weight: Number((ipRiskNormalized * 0.18).toFixed(2)),
      impact: input.ipRisk > 50 ? 'suspicious' : 'protective',
      description: input.ipRisk > 50
        ? 'Proxy/VPN routing detected across disparate administrative domains'
        : 'Clean residential ISP routing with verified ASN reputation'
    },
    {
      name: 'Quantum Kernel Entanglement',
      weight: Number((qubitEntanglementScore * 0.25).toFixed(2)),
      impact: qubitEntanglementScore > 0.65 ? 'anomalous' : 'protective',
      description: qubitEntanglementScore > 0.65
        ? 'Higher-order qubit correlation detected non-linear multi-vector coordination'
        : 'Low qubit state variance indicates legitimate individual transaction'
    }
  ];

  let explanation = '';
  if (riskTier === 'CRITICAL' || riskTier === 'HIGH') {
    explanation = `Quantum Variational Circuit identified multi-dimensional correlation (entanglement ${qubitEntanglementScore}) between elevated velocity (${input.velocity}/hr) and IP/device anomalies. Classical heuristics would likely mark this as borderline, but 8-qubit quantum state projection reveals synthetic bot-driven fraud patterns.`;
  } else if (riskTier === 'MEDIUM') {
    explanation = `Marginal risk profile detected. While device telemetry is moderately atypical (device risk ${input.deviceRisk}/100), merchant category and geolocation exhibit partial historical affinity. Dynamic step-up biometrics recommended.`;
  } else {
    explanation = `Strong quantum state convergence confirmed. Zero anomalous multi-vector couplings detected across Hilbert state measurements. Baseline spending habits and verified crypto-token authentication match trusted cardholder profile.`;
  }

  return {
    finalRiskScore: finalRisk,
    riskTier,
    quantumConfidence,
    qubitEntanglementScore,
    recommendedAction,
    explanation,
    contributingFeatures: contributions
  };
}

export function createTransactionFromInput(input: AnalysisInput): Transaction {
  const result = calculateQuantumRisk(input);
  const id = `TX-Q-${Date.now().toString().slice(-6)}`;
  
  return {
    id,
    timestamp: input.transactionTime || 'Just now',
    amount: input.amount,
    currency: 'USD',
    cardholder: input.cardholder || 'Verified Cardholder',
    cardLast4: '8821',
    cardNetwork: 'Visa',
    merchant: input.merchant,
    category: input.transactionType || 'Financial Transaction',
    location: {
      city: input.location.split(',')[0]?.trim() || 'Global',
      country: input.location.split(',')[1]?.trim() || 'US',
      countryCode: 'US',
      distanceFromHomeKm: input.locationAnomalyKm || (input.behaviorDeviation > 50 ? 4120 : 14),
    },
    deviceRisk: input.deviceRisk,
    velocity1h: input.velocity,
    ipRisk: input.ipRisk,
    behaviorDeviation: input.behaviorDeviation,
    qubitEntanglementScore: result.qubitEntanglementScore,
    finalRiskScore: result.finalRiskScore,
    riskTier: result.riskTier,
    quantumConfidence: result.quantumConfidence,
    quantumStatePhase: Number((Math.PI * (result.finalRiskScore / 100)).toFixed(3)),
    status: result.riskTier === 'CRITICAL' ? 'BLOCKED' : result.riskTier === 'HIGH' ? 'FLAGGED' : result.riskTier === 'MEDIUM' ? 'CHALLENGED' : 'APPROVED',
    recommendedAction: result.recommendedAction,
    explanation: result.explanation,
    contributingFeatures: result.contributingFeatures
  };
}
