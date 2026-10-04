export type RiskTier = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface TransactionFeatureContribution {
  name: string;
  weight: number; // -1 to 1
  impact: 'protective' | 'neutral' | 'suspicious' | 'anomalous';
  description: string;
}

export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  currency: string;
  cardholder: string;
  cardLast4: string;
  cardNetwork: 'Visa' | 'Mastercard' | 'Amex';
  merchant: string;
  category: string;
  location: {
    city: string;
    country: string;
    countryCode: string;
    distanceFromHomeKm: number;
  };
  deviceRisk: number; // 0-100
  velocity1h: number; // transaction count in last 1 hour
  ipRisk: number; // 0-100
  behaviorDeviation: number; // 0-100
  qubitEntanglementScore: number; // 0.0 - 1.0 (quantum kernel correlation)
  finalRiskScore: number; // 0 - 100%
  riskTier: RiskTier;
  quantumConfidence: number; // 0 - 100%
  quantumStatePhase: number; // in radians
  status: 'APPROVED' | 'CHALLENGED' | 'BLOCKED' | 'FLAGGED';
  recommendedAction: 'APPROVE' | 'STEP_UP_AUTH' | 'HARD_DECLINE' | 'INVESTIGATE';
  explanation: string;
  contributingFeatures: TransactionFeatureContribution[];
  dateGroup?: 'Today' | '7 Days' | '30 Days';
}

export interface QuantumSystemMetrics {
  activeQubits: number;
  quantumVolume: number;
  coherenceTimeUs: number;
  gateFidelity: number; // e.g. 99.94%
  analysisLatencyMs: number; // e.g. 4.2ms
  dailyTransactionsAnalyzed: number;
  fraudInterceptedUsd: number;
  falsePositiveRate: number; // e.g. 0.03%
  accuracyVsClassical: number; // e.g. +31.4%
}

export interface AnalysisInput {
  amount: number;
  merchant: string;
  transactionType: string;
  location: string;
  deviceId: string;
  transactionTime: string;
  velocity: number;
  ipRisk: number;
  deviceRisk: number;
  behaviorDeviation: number;
  locationAnomalyKm: number;
  cardholder?: string;
}

export type AnalysisStep = 
  | 'idle'
  | 'preprocessing'
  | 'encoding'
  | 'variational'
  | 'measurement'
  | 'risk_engine'
  | 'complete'
  | 'cancelled';
