import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Radio } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 relative">
      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[var(--border-glass)] max-w-lg w-full space-y-6 relative overflow-hidden shadow-2xl">
        {/* Animated Beacon Icon */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 relative">
          <Radio className="w-8 h-8 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[var(--bg-secondary)]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-500 dark:text-rose-400 font-bold block">
            Error 404 · QPU State Decoherence
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
            Signal Lost
          </h1>
          <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed">
            Looks like this route does not exist.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-black/5 dark:bg-black/60 border border-[var(--border-glass)] text-xs font-mono text-[var(--text-muted)] text-left space-y-1">
          <div className="flex justify-between">
            <span>Routing Protocol:</span>
            <span className="text-cyan-500 dark:text-cyan-400 font-semibold">Hilbert Phase Divergence</span>
          </div>
          <div className="flex justify-between">
            <span>Qubit Observable:</span>
            <span className="text-[var(--text-primary)]">⟨Z⟩ = Null</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Command Center</span>
          </button>
        </div>
      </div>
    </div>
  );
}
