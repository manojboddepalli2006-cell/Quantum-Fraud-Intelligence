import React, { useState, useMemo } from 'react';
import { Transaction, RiskTier } from '../../types';
import { INITIAL_TRANSACTIONS } from '../../data/mockTransactions';
import { CompactRiskSphere3D } from '../../components/3d/CompactRiskSphere3D';
import {
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  History,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Clock,
  MapPin,
  Smartphone,
  CreditCard,
  Building2,
  ExternalLink,
  Ban,
  CheckCircle2,
  Cpu
} from 'lucide-react';

// Enhanced transaction dataset with date groups
const EXTENDED_TRANSACTIONS: Transaction[] = [
  ...INITIAL_TRANSACTIONS.map((t, idx) => ({
    ...t,
    dateGroup: idx < 3 ? ('Today' as const) : idx < 6 ? ('7 Days' as const) : ('30 Days' as const)
  })),
  {
    id: 'TX-Q-904130',
    timestamp: '2 hours ago',
    amount: 520.00,
    currency: 'USD',
    cardholder: 'Marcus Vance',
    cardLast4: '3811',
    cardNetwork: 'Visa',
    merchant: 'Tokyo Station Duty Free',
    category: 'Duty Free & Travel',
    location: { city: 'Tokyo', country: 'Japan', countryCode: 'JP', distanceFromHomeKm: 8900 },
    deviceRisk: 42,
    velocity1h: 3,
    ipRisk: 38,
    behaviorDeviation: 54,
    qubitEntanglementScore: 0.44,
    finalRiskScore: 48,
    riskTier: 'MEDIUM',
    quantumConfidence: 94,
    quantumStatePhase: 1.5,
    status: 'CHALLENGED',
    recommendedAction: 'STEP_UP_AUTH',
    explanation: 'Overnight international purchase in Tokyo without active itinerary filing. Dynamic 3D Secure push requested.',
    contributingFeatures: [
      { name: 'Intercontinental Geolocation', weight: 0.28, impact: 'suspicious', description: 'Transoceanic displacement' },
      { name: 'Duty Free Terminal', weight: -0.15, impact: 'protective', description: 'Certified physical terminal' }
    ],
    dateGroup: 'Today'
  },
  {
    id: 'TX-Q-904131',
    timestamp: '4 hours ago',
    amount: 14.50,
    currency: 'USD',
    cardholder: 'Amara Okafor',
    cardLast4: '8820',
    cardNetwork: 'Mastercard',
    merchant: 'Subway Metro Transit',
    category: 'Public Transportation',
    location: { city: 'London', country: 'United Kingdom', countryCode: 'GB', distanceFromHomeKm: 6 },
    deviceRisk: 5,
    velocity1h: 1,
    ipRisk: 4,
    behaviorDeviation: 2,
    qubitEntanglementScore: 0.02,
    finalRiskScore: 3,
    riskTier: 'LOW',
    quantumConfidence: 99,
    quantumStatePhase: 0.09,
    status: 'APPROVED',
    recommendedAction: 'APPROVE',
    explanation: 'Routine contactless tap-to-pay commuter fare matching cardholder daily travel route.',
    contributingFeatures: [
      { name: 'Commuter Pattern', weight: -0.65, impact: 'protective', description: 'Daily transit cadence' },
      { name: 'NFC Enclave Token', weight: -0.35, impact: 'protective', description: 'Verified Apple Pay token' }
    ],
    dateGroup: 'Today'
  },
  {
    id: 'TX-Q-904132',
    timestamp: '2 days ago',
    amount: 4290.00,
    currency: 'USD',
    cardholder: 'Soren Lindqvist',
    cardLast4: '1904',
    cardNetwork: 'Amex',
    merchant: 'Geneva Luxury Horology',
    category: 'High-Value Jewelry',
    location: { city: 'Geneva', country: 'Switzerland', countryCode: 'CH', distanceFromHomeKm: 6200 },
    deviceRisk: 78,
    velocity1h: 5,
    ipRisk: 68,
    behaviorDeviation: 88,
    qubitEntanglementScore: 0.88,
    finalRiskScore: 89,
    riskTier: 'HIGH',
    quantumConfidence: 96,
    quantumStatePhase: 2.78,
    status: 'BLOCKED',
    recommendedAction: 'HARD_DECLINE',
    explanation: 'High ticket jewelry purchase through cloud proxy. Quantum phase angle indicates fraudulent credential takeover.',
    contributingFeatures: [
      { name: 'High Value Ticket ($4,290)', weight: 0.42, impact: 'anomalous', description: 'Exceeds standard 90-day card limit' },
      { name: 'Residential Proxy Route', weight: 0.38, impact: 'anomalous', description: 'Non-residential ASN detected' }
    ],
    dateGroup: '7 Days'
  },
  {
    id: 'TX-Q-904133',
    timestamp: '5 days ago',
    amount: 89.20,
    currency: 'USD',
    cardholder: 'Clara Oswald',
    cardLast4: '7112',
    cardNetwork: 'Visa',
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    location: { city: 'San Francisco', country: 'United States', countryCode: 'US', distanceFromHomeKm: 8 },
    deviceRisk: 8,
    velocity1h: 1,
    ipRisk: 5,
    behaviorDeviation: 6,
    qubitEntanglementScore: 0.05,
    finalRiskScore: 5,
    riskTier: 'LOW',
    quantumConfidence: 99,
    quantumStatePhase: 0.15,
    status: 'APPROVED',
    recommendedAction: 'APPROVE',
    explanation: 'Domestic in-store POS grocery transaction with chip & PIN authentication verified.',
    contributingFeatures: [
      { name: 'EMV Level 3 Chip', weight: -0.52, impact: 'protective', description: 'Contact EMV verification' },
      { name: 'Local Residence Radius', weight: -0.31, impact: 'protective', description: 'Within 8km from billing zip' }
    ],
    dateGroup: '7 Days'
  },
  {
    id: 'TX-Q-904134',
    timestamp: '18 days ago',
    amount: 1480.00,
    currency: 'USD',
    cardholder: 'Dmitri Volkov',
    cardLast4: '6621',
    cardNetwork: 'Mastercard',
    merchant: 'Cyprus Digital Forex OTC',
    category: 'Financial Brokerage',
    location: { city: 'Limassol', country: 'Cyprus', countryCode: 'CY', distanceFromHomeKm: 7900 },
    deviceRisk: 92,
    velocity1h: 8,
    ipRisk: 85,
    behaviorDeviation: 91,
    qubitEntanglementScore: 0.94,
    finalRiskScore: 94,
    riskTier: 'HIGH',
    quantumConfidence: 98,
    quantumStatePhase: 2.94,
    status: 'BLOCKED',
    recommendedAction: 'HARD_DECLINE',
    explanation: 'Repeated velocity attack targeting forex margin deposit using anti-detect browser headers.',
    contributingFeatures: [
      { name: 'Velocity 8 tx/hr', weight: 0.44, impact: 'anomalous', description: 'Automated script pattern' },
      { name: 'Forex Offshore MCC', weight: 0.32, impact: 'suspicious', description: 'Unregulated offshore venue' }
    ],
    dateGroup: '30 Days'
  },
  {
    id: 'TX-Q-904135',
    timestamp: '22 days ago',
    amount: 320.00,
    currency: 'USD',
    cardholder: 'Rachel Green',
    cardLast4: '4102',
    cardNetwork: 'Visa',
    merchant: 'Manhattan Hotel & Suites',
    category: 'Hospitality & Hotels',
    location: { city: 'New York', country: 'United States', countryCode: 'US', distanceFromHomeKm: 340 },
    deviceRisk: 28,
    velocity1h: 2,
    ipRisk: 22,
    behaviorDeviation: 38,
    qubitEntanglementScore: 0.28,
    finalRiskScore: 31,
    riskTier: 'MEDIUM',
    quantumConfidence: 92,
    quantumStatePhase: 0.98,
    status: 'CHALLENGED',
    recommendedAction: 'STEP_UP_AUTH',
    explanation: 'Hotel deposit authorization. Cardholder confirmed check-in via SMS 2FA notification.',
    contributingFeatures: [
      { name: 'Hotel Incidentals Hold', weight: 0.21, impact: 'neutral', description: 'Pre-auth security deposit' },
      { name: 'Cardholder Active Token', weight: -0.29, impact: 'protective', description: 'Frequent domestic traveler' }
    ],
    dateGroup: '30 Days'
  }
];

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(EXTENDED_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Blocked' | 'Review'>('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | '7 Days' | '30 Days'>('All');
  
  // Selected transaction for smooth side panel
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter logic
  const filteredList = useMemo(() => {
    return transactions.filter((tx) => {
      // Search: Merchant, Transaction ID, Location
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tx.merchant.toLowerCase().includes(q) ||
        tx.id.toLowerCase().includes(q) ||
        tx.location.city.toLowerCase().includes(q) ||
        tx.location.country.toLowerCase().includes(q);

      // Risk Filter: All, Low, Medium, High
      let matchesRisk = true;
      if (riskFilter === 'Low') matchesRisk = tx.riskTier === 'LOW';
      if (riskFilter === 'Medium') matchesRisk = tx.riskTier === 'MEDIUM';
      if (riskFilter === 'High') matchesRisk = tx.riskTier === 'HIGH' || tx.riskTier === 'CRITICAL';

      // Status Filter: Approved, Blocked, Review
      let matchesStatus = true;
      if (statusFilter === 'Approved') matchesStatus = tx.status === 'APPROVED';
      if (statusFilter === 'Blocked') matchesStatus = tx.status === 'BLOCKED';
      if (statusFilter === 'Review') matchesStatus = tx.status === 'CHALLENGED' || tx.status === 'FLAGGED';

      // Date Filter: Today, 7 Days, 30 Days
      let matchesDate = true;
      if (dateFilter === 'Today') matchesDate = tx.dateGroup === 'Today';
      if (dateFilter === '7 Days') matchesDate = tx.dateGroup === 'Today' || tx.dateGroup === '7 Days';
      if (dateFilter === '30 Days') matchesDate = true;

      return matchesSearch && matchesRisk && matchesStatus && matchesDate;
    });
  }, [transactions, searchQuery, riskFilter, statusFilter, dateFilter]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setRiskFilter('All');
    setStatusFilter('All');
    setDateFilter('All');
    setCurrentPage(1);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTx) {
        setSelectedTx(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTx]);

  return (
    <div className="space-y-8 pb-20 relative">
      
      {/* =========================================================================
          HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <History className="w-4 h-4" />
            <span>Immutable Quantum Cryptographic Ledger</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Transaction Intelligence
          </h1>
          <p className="text-sm text-slate-300">
            Review analyzed transactions and historical risk signals.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-[#080D16] px-3.5 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
          Total Analyzed: <span className="text-white font-bold">{transactions.length} Records</span>
        </div>
      </div>

      {/* =========================================================================
          SEARCH & FILTERS BAR
         ========================================================================= */}
      <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-4">
        
        {/* Search Input: Merchant, Transaction ID, Location */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Merchant, Transaction ID (e.g. TX-Q-904128), or Location (City, Country)..."
            aria-label="Search transactions by merchant, ID, or location"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05070B] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
        </div>

        {/* Filter Pills Grid: Risk, Status, Date */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono">
          
          {/* Risk Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider">Risk:</span>
            {(['All', 'Low', 'Medium', 'High'] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRiskFilter(r);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[32px] ${
                  riskFilter === r
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-[#05070B] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider">Status:</span>
            {(['All', 'Approved', 'Blocked', 'Review'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[32px] ${
                  statusFilter === s
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-[#05070B] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Date Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider">Date:</span>
            {(['All', 'Today', '7 Days', '30 Days'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDateFilter(d);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[32px] ${
                  dateFilter === d
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-[#05070B] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* =========================================================================
          TRANSACTION TABLE (Avoid generic spreadsheet look, subtle row hover motion)
         ========================================================================= */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            {/* Table Header */}
            <thead className="bg-[#080D16] border-b border-white/[0.08] text-slate-400 font-mono uppercase text-[10px] tracking-wider select-none">
              <tr>
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Merchant</th>
                <th className="px-5 py-4 text-right">Amount</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4 text-center">Risk</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/[0.04]">
              {paginatedTransactions.length === 0 ? (
                /* =========================================================================
                    EMPTY STATE (Polished empty state when no items match filters)
                   ========================================================================= */
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                        <Filter className="w-6 h-6 text-slate-500" />
                      </div>
                      <h3 className="font-display font-bold text-white text-base">
                        No transactions match your filters
                      </h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        We could not find any transaction records matching your current search query, risk tier, status, or date range.
                      </p>
                      <button
                        onClick={handleClearFilters}
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((tx) => {
                  const isSelected = selectedTx?.id === tx.id;
                  const isHigh = tx.riskTier === 'CRITICAL' || tx.riskTier === 'HIGH';
                  const isMed = tx.riskTier === 'MEDIUM';

                  const riskColor = isHigh
                    ? 'text-rose-400'
                    : isMed
                    ? 'text-amber-400'
                    : 'text-emerald-400';

                  const statusBadge = tx.status === 'BLOCKED'
                    ? 'text-rose-400 bg-rose-950/40 border-rose-500/30'
                    : tx.status === 'CHALLENGED' || tx.status === 'FLAGGED'
                    ? 'text-amber-400 bg-amber-950/40 border-amber-500/30'
                    : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className={`transition-all duration-150 cursor-pointer group hover:bg-[#0D1524] ${
                        isSelected ? 'bg-[#0D1524] ring-1 ring-inset ring-cyan-500/40' : ''
                      }`}
                    >
                      {/* 1. Transaction */}
                      <td className="px-5 py-4 font-mono">
                        <span className="font-semibold text-cyan-400 group-hover:underline block">
                          {tx.id}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {tx.cardNetwork} •••• {tx.cardLast4}
                        </span>
                      </td>

                      {/* 2. Merchant */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-white block">
                          {tx.merchant}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate block max-w-[180px]">
                          {tx.category}
                        </span>
                      </td>

                      {/* 3. Amount */}
                      <td className="px-5 py-4 text-right font-mono font-bold text-white tabular-nums text-sm">
                        ${tx.amount.toFixed(2)}
                      </td>

                      {/* 4. Location */}
                      <td className="px-5 py-4">
                        <span className="text-slate-200 block">
                          {tx.location.city}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {tx.location.country}
                        </span>
                      </td>

                      {/* 5. Risk */}
                      <td className="px-5 py-4 text-center font-mono">
                        <span className={`font-bold tabular-nums text-sm ${riskColor}`}>
                          {tx.finalRiskScore}%
                        </span>
                        <span className="text-[10px] text-slate-500 block uppercase">
                          {tx.riskTier}
                        </span>
                      </td>

                      {/* 6. Status */}
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${statusBadge}`}>
                          {tx.status === 'CHALLENGED' ? 'REVIEW' : tx.status}
                        </span>
                      </td>

                      {/* 7. Time */}
                      <td className="px-5 py-4 font-mono text-slate-400 text-[11px]">
                        {tx.timestamp}
                      </td>

                      {/* 8. Action */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTx(tx);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 font-mono text-[11px] transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* =========================================================================
            PAGINATION (Working pagination controls)
           ========================================================================= */}
        {filteredList.length > 0 && (
          <div className="p-4 bg-[#080D16] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div>
              Showing{' '}
              <span className="text-white font-bold">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="text-white font-bold">
                {Math.min(currentPage * itemsPerPage, filteredList.length)}
              </span>{' '}
              of <span className="text-white font-bold">{filteredList.length}</span> transactions
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 rounded bg-black/60 border border-white/5 text-slate-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          SMOOTH SIDE PANEL (Inspector Drawer with 3D Risk Sphere)
         ========================================================================= */}
      {selectedTx && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0A0F18]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-300">
          
          {/* Side Panel Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                Security Operations Inspector
              </span>
              <h2 className="text-base font-display font-bold text-white">
                {selectedTx.id}
              </h2>
            </div>
            <button
              onClick={() => setSelectedTx(null)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Compact Risk Sphere with Orbiting Signals */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              3D Dynamic State Vector
            </span>
            <CompactRiskSphere3D riskScore={selectedTx.finalRiskScore} className="w-full h-44" />
          </div>

          {/* Risk Score & Risk Category */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Calculated Risk Score
              </span>
              <span
                className={`text-3xl font-display font-extrabold tabular-nums ${
                  selectedTx.riskTier === 'CRITICAL' || selectedTx.riskTier === 'HIGH'
                    ? 'text-rose-400'
                    : selectedTx.riskTier === 'MEDIUM'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {selectedTx.finalRiskScore}%
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Risk Category
              </span>
              <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 inline-block mt-1">
                {selectedTx.riskTier} RISK
              </span>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block">
              Recommended Action
            </span>
            <h4 className="text-sm font-semibold text-white">
              {selectedTx.finalRiskScore >= 75
                ? 'Block transaction and request additional authentication.'
                : selectedTx.finalRiskScore >= 35
                ? 'Issue biometric step-up authentication challenge.'
                : 'Approve transaction. Verified nominal profile.'}
            </h4>
          </div>

          {/* Quantum Analysis Summary */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Quantum Analysis Summary
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-black/40 p-3.5 rounded-xl border border-white/5">
              {selectedTx.explanation}
            </p>
          </div>

          {/* Risk Factors (Contributing Features) */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Contributing Risk Factors
            </span>

            <div className="space-y-2 font-mono text-xs">
              {selectedTx.contributingFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200 font-semibold">{feat.name}</span>
                    <span
                      className={`font-bold tabular-nums ${
                        feat.impact === 'anomalous'
                          ? 'text-rose-400'
                          : feat.impact === 'suspicious'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {feat.weight > 0 ? `+${feat.weight}` : feat.weight}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Metadata Footer */}
          <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>Cardholder:</span>
              <span className="text-white">{selectedTx.cardholder}</span>
            </div>
            <div className="flex justify-between">
              <span>Settlement Amount:</span>
              <span className="text-white font-bold">${selectedTx.amount.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="text-white">{selectedTx.location.city}, {selectedTx.location.country}</span>
            </div>
          </div>

          {/* Action buttons inside drawer */}
          <div className="pt-2">
            <button
              onClick={() => setSelectedTx(null)}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-mono transition-colors"
            >
              Close Inspector
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
