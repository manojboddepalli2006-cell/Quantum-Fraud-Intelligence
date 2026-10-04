import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useTheme } from '../../context/ThemeContext';

export const NAV_ITEMS = [
  { path: '/', label: 'Overview' },
  { path: '/analyzer', label: 'Analyzer' },
  { path: '/fraud-detection', label: 'Detection' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/transactions', label: 'Transactions' },
  { path: '/explainable-ai', label: 'Explainable AI' },
  { path: '/technology', label: 'Technology' }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-panel)] backdrop-blur-xl border-b border-[var(--border-glass)] transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Q-FraudX Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90 shrink-0"
        >
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
              Q-FraudX
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation with Animated Sliding Highlight */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 relative">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-colors relative rounded-lg whitespace-nowrap z-10 ${
                    isActive
                      ? 'text-cyan-500 dark:text-cyan-300 font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/[0.02]'
                  }`
                }
              >
                {item.label}

                {/* Animated active sliding highlight */}
                {isActive && (
                  <motion.div
                    layoutId="navbarSlidingHighlight"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/35 rounded-lg -z-10 shadow-sm shadow-cyan-500/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Quantum Engine Online Status, Theme Toggle & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Desktop Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-[#0A0F18] border border-black/10 dark:border-white/10 text-xs font-mono shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[var(--text-primary)] text-[11px] whitespace-nowrap font-medium">
              Quantum Engine Online
            </span>
          </div>

          {/* Mobile Status: Only "● Online" */}
          <div className="flex sm:hidden items-center gap-1.5 px-2 py-1 rounded-md bg-black/5 dark:bg-[#0A0F18] border border-black/10 dark:border-white/10 text-[11px] font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">Online</span>
          </div>

          {/* Premium Theme Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] border border-black/10 dark:border-white/10 transition-all flex items-center justify-center relative min-w-[36px] min-h-[36px]"
            title={`Switch to ${isLight ? 'Dark Quantum Lab' : 'Light Lab'} mode`}
            aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} theme`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLight ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4 text-slate-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 text-amber-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* =========================================================================
          MOBILE MENU (Animated slide from side)
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-[var(--bg-secondary)] border-l border-[var(--border-glass)] p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-glass)]">
                  <div className="flex items-center gap-2">
                    <Logo className="w-6 h-6" />
                    <span className="font-display font-bold text-[var(--text-primary)] text-base">Q-FraudX</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-1.5">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={handleMobileNavClick}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40 font-bold'
                            : 'text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer with Theme Selection & Status */}
              <div className="pt-4 border-t border-[var(--border-glass)] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)]">Lab Atmosphere:</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/10 text-[var(--text-primary)] border border-[var(--border-glass)] text-xs font-medium"
                  >
                    {isLight ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                  <span>Hardware Engine:</span>
                  <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)]">
                  QPU: Rigetti Aspen-Q 127 Transmon
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
