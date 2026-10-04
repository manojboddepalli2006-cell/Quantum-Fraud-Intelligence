import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuantumBackground } from './components/3d/QuantumBackground';

import { HomePage } from './pages/Home/HomePage';
import { AnalyzerPage } from './pages/TransactionAnalyzer/AnalyzerPage';
import { FraudDetectionPage } from './pages/FraudDetection/FraudDetectionPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { TransactionsPage } from './pages/TransactionHistory/TransactionsPage';
import { ExplainableAiPage } from './pages/ExplainableAI/ExplainableAiPage';
import { TechnologyPage } from './pages/Technology/TechnologyPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
          <Route path="/fraud-detection" element={<FraudDetectionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/explainable-ai" element={<ExplainableAiPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col relative selection:bg-cyan-500/20 selection:text-cyan-300 transition-colors duration-400">
          {/* Photorealistic 3D Quantum Computer Environment Background */}
          <QuantumBackground />

          {/* Global Sticky Navigation with Theme Toggle */}
          <Navbar />

          {/* Main Content Area with Page Transitions */}
          <main className="flex-1 relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <AnimatedRoutes />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
