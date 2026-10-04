import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnalysisStep, RiskTier } from '../types';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  // Global 3D Quantum Engine State
  activeAnalysisStep: AnalysisStep;
  setActiveAnalysisStep: (step: AnalysisStep) => void;
  latestRiskScore: number | null;
  setLatestRiskScore: (score: number | null) => void;
  latestRiskTier: RiskTier | null;
  setLatestRiskTier: (tier: RiskTier | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('qfraudx_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; // Default: Dark Quantum Lab
    }
    return 'dark';
  });

  const [activeAnalysisStep, setActiveAnalysisStep] = useState<AnalysisStep>('idle');
  const [latestRiskScore, setLatestRiskScore] = useState<number | null>(null);
  const [latestRiskTier, setLatestRiskTier] = useState<RiskTier | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('qfraudx_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        activeAnalysisStep,
        setActiveAnalysisStep,
        latestRiskScore,
        setLatestRiskScore,
        latestRiskTier,
        setLatestRiskTier
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
