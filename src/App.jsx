import React from 'react';
    import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import HomePage from '@/pages/HomePage';
    import HyDESearchPage from '@/pages/HyDESearchPage';
    import DatasetPage from '@/pages/DatasetPage';
    import DashboardPage from '@/pages/DashboardPage';
    import { Toaster } from '@/components/ui/toaster';
    import { TooltipProvider } from '@/components/ui/tooltip';

    function AnimatedRoutes() {
      const location = useLocation();
      return (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<HyDESearchPage />} />
            <Route path="/datasets" element={<DatasetPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </AnimatePresence>
      );
    }

    function App() {
      return (
        <Router>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-slate-900 to-indigo-950">
              <Header />
              <main className="flex-grow">
                <AnimatedRoutes />
              </main>
              <Footer />
              <Toaster />
            </div>
          </TooltipProvider>
        </Router>
      );
    }

    export default App;