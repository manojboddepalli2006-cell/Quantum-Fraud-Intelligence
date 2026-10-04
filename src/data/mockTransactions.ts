import { Transaction, QuantumSystemMetrics } from '../types';

export const SYSTEM_METRICS: QuantumSystemMetrics = {
  activeQubits: 127,
  quantumVolume: 4096,
  coherenceTimeUs: 420.5,
  gateFidelity: 99.96,
  analysisLatencyMs: 3.4,
  dailyTransactionsAnalyzed: 1489240,
  fraudInterceptedUsd: 14829120,
  falsePositiveRate: 0.024,
  accuracyVsClassical: 31.8
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-Q-904128',
    timestamp: '2 mins ago',
    amount: 842.73,
    currency: 'USD',
    cardholder: 'Alexander Wright',
    cardLast4: '4192',
    cardNetwork: 'Visa',
    merchant: 'Global Electronics Co.',
    category: 'Consumer Electronics',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      distanceFromHomeKm: 9840
    },
    deviceRisk: 72,
    velocity1h: 6,
    ipRisk: 64,
    behaviorDeviation: 81,
    qubitEntanglementScore: 0.84,
    finalRiskScore: 87,
    riskTier: 'CRITICAL',
    quantumConfidence: 96,
    quantumStatePhase: 2.73,
    status: 'BLOCKED',
    recommendedAction: 'HARD_DECLINE',
    explanation: 'Cross-entropy state measurement detected quantum entanglement of 0.84 between 6x burst velocity, Singapore Tor exit node, and sudden $842 hardware order on a card dormant for 60 days.',
    contributingFeatures: [
      { name: 'Velocity Burst (6 tx/hr)', weight: 0.38, impact: 'anomalous', description: 'Exceeds cardholder historical peak by 500%' },
      { name: 'Behavior Deviation', weight: 0.32, impact: 'anomalous', description: 'Category and time-of-day discrepancy' },
      { name: 'Untrusted ASN (Tor Node)', weight: 0.24, impact: 'suspicious', description: 'High-risk relay network detected' },
      { name: 'Device Fingerprint', weight: 0.18, impact: 'suspicious', description: 'Emulated Android Chrome environment' }
    ]
  },
  {
    id: 'TX-Q-904127',
    timestamp: '5 mins ago',
    amount: 48.50,
    currency: 'USD',
    cardholder: 'Sarah Jenkins',
    cardLast4: '7104',
    cardNetwork: 'Mastercard',
    merchant: 'Starling Specialty Coffee',
    category: 'Dining & Cafes',
    location: {
      city: 'Seattle',
      country: 'United States',
      countryCode: 'US',
      distanceFromHomeKm: 4
    },
    deviceRisk: 12,
    velocity1h: 1,
    ipRisk: 8,
    behaviorDeviation: 6,
    qubitEntanglementScore: 0.08,
    finalRiskScore: 4,
    riskTier: 'LOW',
    quantumConfidence: 99,
    quantumStatePhase: 0.12,
    status: 'APPROVED',
    recommendedAction: 'APPROVE',
    explanation: 'Homogeneous quantum ground state. Biometric NFC tap from primary registered iPhone 15 Pro, home metropolitan area, regular morning commuter time window.',
    contributingFeatures: [
      { name: 'Known Physical Terminal', weight: -0.42, impact: 'protective', description: 'Terminal ID seen 48 times in 12 months' },
      { name: 'Device Biometric Token', weight: -0.38, impact: 'protective', description: 'FIDO2 hardware secure enclave verified' },
      { name: 'Velocity Normal', weight: -0.15, impact: 'protective', description: 'Single routine charge' }
    ]
  },
  {
    id: 'TX-Q-904126',
    timestamp: '9 mins ago',
    amount: 3200.00,
    currency: 'USD',
    cardholder: 'David Lin',
    cardLast4: '3819',
    cardNetwork: 'Amex',
    merchant: 'Zurich Vaults & Bullion',
    category: 'Luxury & Bullion',
    location: {
      city: 'Zurich',
      country: 'Switzerland',
      countryCode: 'CH',
      distanceFromHomeKm: 6100
    },
    deviceRisk: 61,
    velocity1h: 3,
    ipRisk: 52,
    behaviorDeviation: 68,
    qubitEntanglementScore: 0.69,
    finalRiskScore: 68,
    riskTier: 'HIGH',
    quantumConfidence: 93,
    quantumStatePhase: 2.14,
    status: 'FLAGGED',
    recommendedAction: 'INVESTIGATE',
    explanation: 'Quantum variational circuit flagged rapid high-ticket bullion procurement via residential Swiss proxy. Cardholder is an executive who travels, but transaction velocity pattern differs from previous trips.',
    contributingFeatures: [
      { name: 'High Ticket Value', weight: 0.35, impact: 'anomalous', description: '8.4x higher than standard card single-purchase median' },
      { name: 'Proxy Geolocation Mismatch', weight: 0.28, impact: 'suspicious', description: 'Browser timezone GMT-4 while IP routes through Switzerland' },
      { name: 'Q-Kernel Correlation', weight: 0.22, impact: 'anomalous', description: 'High cross-correlation with recent credential stuffing attack vectors' }
    ]
  },
  {
    id: 'TX-Q-904125',
    timestamp: '14 mins ago',
    amount: 142.10,
    currency: 'USD',
    cardholder: 'Elena Rostova',
    cardLast4: '9920',
    cardNetwork: 'Visa',
    merchant: 'Nordic Cloud Hosting Ltd',
    category: 'Cloud Infrastructure',
    location: {
      city: 'Stockholm',
      country: 'Sweden',
      countryCode: 'SE',
      distanceFromHomeKm: 180
    },
    deviceRisk: 38,
    velocity1h: 2,
    ipRisk: 31,
    behaviorDeviation: 34,
    qubitEntanglementScore: 0.31,
    finalRiskScore: 32,
    riskTier: 'MEDIUM',
    quantumConfidence: 91,
    quantumStatePhase: 1.01,
    status: 'CHALLENGED',
    recommendedAction: 'STEP_UP_AUTH',
    explanation: 'Moderate perturbation in quantum phase space. Server hosting purchase matches tech developer profile, but initiates from unfamiliar browser user-agent string. Step-up push notification sent.',
    contributingFeatures: [
      { name: 'Browser User-Agent Shift', weight: 0.22, impact: 'suspicious', description: 'First observed Linux Chromium build' },
      { name: 'Category Familiarity', weight: -0.18, impact: 'protective', description: 'Cardholder regularly pays GitHub & AWS' },
      { name: 'Moderate Velocity', weight: 0.12, impact: 'neutral', description: '2 transactions in past 60 minutes' }
    ]
  },
  {
    id: 'TX-Q-904124',
    timestamp: '18 mins ago',
    amount: 12.99,
    currency: 'USD',
    cardholder: 'Marcus Sterling',
    cardLast4: '5512',
    cardNetwork: 'Visa',
    merchant: 'Netflix Inc. Recurring',
    category: 'Streaming & Media',
    location: {
      city: 'San Francisco',
      country: 'United States',
      countryCode: 'US',
      distanceFromHomeKm: 0
    },
    deviceRisk: 4,
    velocity1h: 1,
    ipRisk: 5,
    behaviorDeviation: 2,
    qubitEntanglementScore: 0.03,
    finalRiskScore: 3,
    riskTier: 'LOW',
    quantumConfidence: 99,
    quantumStatePhase: 0.09,
    status: 'APPROVED',
    recommendedAction: 'APPROVE',
    explanation: 'Pure vacuum ground state. Recurring monthly subscription billing with matching tokenized PAN and uninterrupted 36-month merchant history.',
    contributingFeatures: [
      { name: 'Subscription Token History', weight: -0.55, impact: 'protective', description: 'Consistent recurring billing token' },
      { name: 'Zero Velocity Anomaly', weight: -0.25, impact: 'protective', description: 'Scheduled off-peak batch processing' }
    ]
  },
  {
    id: 'TX-Q-904123',
    timestamp: '23 mins ago',
    amount: 1980.50,
    currency: 'USD',
    cardholder: 'Chen Wei',
    cardLast4: '1099',
    cardNetwork: 'Mastercard',
    merchant: 'Apex Crypto Gateway OTC',
    category: 'Cryptocurrency & Digital Assets',
    location: {
      city: 'Nicosia',
      country: 'Cyprus',
      countryCode: 'CY',
      distanceFromHomeKm: 8300
    },
    deviceRisk: 88,
    velocity1h: 9,
    ipRisk: 79,
    behaviorDeviation: 94,
    qubitEntanglementScore: 0.95,
    finalRiskScore: 94,
    riskTier: 'CRITICAL',
    quantumConfidence: 98,
    quantumStatePhase: 2.95,
    status: 'BLOCKED',
    recommendedAction: 'HARD_DECLINE',
    explanation: 'Critical quantum anomaly trigger. Sybil network fingerprint detected: 9 attempts across 4 different merchant terminals within 38 minutes utilizing automated headless puppeteer sessions.',
    contributingFeatures: [
      { name: 'Sybil Bot Velocity (9 tx/hr)', weight: 0.45, impact: 'anomalous', description: 'Automated rapid-fire trial sequence' },
      { name: 'Headless Browser Signature', weight: 0.35, impact: 'anomalous', description: 'Canvas fingerprint spoofing detected' },
      { name: 'High-Risk Offshore Merchant', weight: 0.28, impact: 'suspicious', description: 'Unregulated offshore crypto exchange gateway' }
    ]
  },
  {
    id: 'TX-Q-904122',
    timestamp: '31 mins ago',
    amount: 215.00,
    currency: 'USD',
    cardholder: 'Hannah Abbott',
    cardLast4: '6240',
    cardNetwork: 'Visa',
    merchant: 'Delta Air Lines In-Flight',
    category: 'Travel & Airlines',
    location: {
      city: 'Atlanta',
      country: 'United States',
      countryCode: 'US',
      distanceFromHomeKm: 1200
    },
    deviceRisk: 22,
    velocity1h: 1,
    ipRisk: 15,
    behaviorDeviation: 28,
    qubitEntanglementScore: 0.19,
    finalRiskScore: 18,
    riskTier: 'LOW',
    quantumConfidence: 95,
    quantumStatePhase: 0.56,
    status: 'APPROVED',
    recommendedAction: 'APPROVE',
    explanation: 'Low risk confirmation. Onboard satellite Wi-Fi telemetry correlates with cardholder confirmed flight manifest ticket issued 14 days prior.',
    contributingFeatures: [
      { name: 'Flight Manifest Corroboration', weight: -0.38, impact: 'protective', description: 'Airline ticket verified on same card' },
      { name: 'Low Velocity', weight: -0.22, impact: 'protective', description: 'Single in-flight purchase' }
    ]
  },
  {
    id: 'TX-Q-904121',
    timestamp: '42 mins ago',
    amount: 749.99,
    currency: 'USD',
    cardholder: 'Liam O’Connor',
    cardLast4: '8834',
    cardNetwork: 'Mastercard',
    merchant: 'Tokyo Camera Exchange',
    category: 'Photography & Optics',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      countryCode: 'JP',
      distanceFromHomeKm: 10400
    },
    deviceRisk: 55,
    velocity1h: 2,
    ipRisk: 42,
    behaviorDeviation: 59,
    qubitEntanglementScore: 0.48,
    finalRiskScore: 49,
    riskTier: 'MEDIUM',
    quantumConfidence: 92,
    quantumStatePhase: 1.54,
    status: 'CHALLENGED',
    recommendedAction: 'STEP_UP_AUTH',
    explanation: 'High distance from origin without international travel notice on file. Merchant reputation is high, but cardholder has no prior transaction in East Asia.',
    contributingFeatures: [
      { name: 'Intercontinental Displacement', weight: 0.31, impact: 'suspicious', description: '10,400km jump within 6 hours of domestic activity' },
      { name: 'Merchant Authenticity', weight: -0.19, impact: 'protective', description: 'Tier-1 physical merchant terminal with EMV Level 3 certification' }
    ]
  }
];

export const PRESET_ANALYZER_CASES = [
  {
    name: 'LOW RISK',
    badge: 'LOW RISK',
    description: 'Routine morning commute purchase with registered biometric NFC enclave and familiar local terminal',
    data: {
      amount: 48.50,
      merchant: 'Starling Specialty Coffee',
      transactionType: 'In-Store POS (NFC Tap)',
      location: 'Seattle, WA, United States',
      deviceId: 'SEC-ENCLAVE-IPHONE15-PRO',
      transactionTime: '08:42 AM',
      velocity: 1,
      ipRisk: 6,
      deviceRisk: 8,
      behaviorDeviation: 4,
      locationAnomalyKm: 4,
      cardholder: 'Sarah Jenkins'
    }
  },
  {
    name: 'MEDIUM RISK',
    badge: 'MEDIUM RISK',
    description: 'Foreign luxury order with unannounced intercontinental travel and modified browser fingerprint',
    data: {
      amount: 3200.00,
      merchant: 'Zurich Vaults & Bullion',
      transactionType: 'Wire Transfer / Luxury Goods',
      location: 'Zurich, Switzerland',
      deviceId: 'MAC-DEV-CHROME-LINUX-99B',
      transactionTime: '03:15 PM',
      velocity: 3,
      ipRisk: 52,
      deviceRisk: 58,
      behaviorDeviation: 68,
      locationAnomalyKm: 6100,
      cardholder: 'David Lin'
    }
  },
  {
    name: 'HIGH RISK',
    badge: 'HIGH RISK',
    description: 'Rapid multi-attempt transaction burst through Singapore Tor exit node with headless browser signature',
    data: {
      amount: 842.73,
      merchant: 'Global Electronics Co.',
      transactionType: 'E-Commerce Checkout',
      location: 'Singapore, SG',
      deviceId: 'EMULATOR-ANDROID-HEADLESS-X4',
      transactionTime: '10:42 PM',
      velocity: 6,
      ipRisk: 64,
      deviceRisk: 72,
      behaviorDeviation: 81,
      locationAnomalyKm: 9840,
      cardholder: 'Alexander Wright'
    }
  }
];
