import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-[var(--border-glass)] mt-24 text-[var(--text-muted)] text-xs transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3.5 pr-4">
            <div className="flex items-center gap-2.5">
              <Logo className="w-7 h-7" />
              <span className="font-display font-bold text-[var(--text-primary)] text-lg tracking-tight">Q-FraudX</span>
            </div>
            <p className="text-cyan-500 dark:text-cyan-400 font-mono text-xs font-semibold">
              Quantum Intelligence. Real-Time Fraud Defense.
            </p>
            <p className="text-[var(--text-muted)] text-xs leading-relaxed max-w-sm">
              Stop financial fraud before it becomes a loss. Powered by superconducting quantum variational classifiers, continuous behavioral intelligence, and sub-120ms risk scoring.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] pt-1">
              <Lock className="w-3 h-3 text-cyan-400/80" />
              <span>NIST Post-Quantum Cryptography &amp; SOC2 Type II Certified</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-3.5 text-xs tracking-wider uppercase font-mono">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="hover:text-cyan-400 transition-colors">
                  Transaction Analyzer
                </Link>
              </li>
              <li>
                <Link to="/fraud-detection" className="hover:text-cyan-400 transition-colors">
                  Fraud Detection Feed
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  SOC Intelligence
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="hover:text-cyan-400 transition-colors">
                  Audit Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Technology */}
          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-3.5 text-xs tracking-wider uppercase font-mono">Technology</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/technology" className="hover:text-cyan-400 transition-colors">
                  Superconducting QPU
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-cyan-400 transition-colors">
                  Variational Classifier (VQC)
                </Link>
              </li>
              <li>
                <Link to="/explainable-ai" className="hover:text-cyan-400 transition-colors">
                  Quantum Shapley (Q-SHAP)
                </Link>
              </li>
              <li>
                <Link to="/explainable-ai" className="hover:text-cyan-400 transition-colors">
                  Bloch State Tomography
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Documentation & Contact */}
          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-3.5 text-xs tracking-wider uppercase font-mono">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#documentation" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-cyan-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="mailto:soc-support@q-fraudx.ai" className="hover:text-cyan-400 transition-colors">
                  Contact SOC Operations
                </a>
              </li>
              <li>
                <span className="text-[11px] text-[var(--text-muted)] font-mono block pt-1">
                  API SLA: 99.99% @ &lt; 5ms
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border separator & copyright */}
        <div className="pt-8 border-t border-[var(--border-glass)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} Q-FraudX Quantum Intelligence Corp. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Security Whitepaper</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">ISO 20022 Schema</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Status Dashboard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
