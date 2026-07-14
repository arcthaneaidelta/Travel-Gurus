import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './pages/LoadingScreen';
import LandingPage from './pages/LandingPage';
import AgentDashboard from './pages/AgentDashboard';
import ManagementDashboard from './pages/ManagementDashboard';
import OfficeMonitor from './pages/OfficeMonitor';
import Layout from './layouts/Layout';

import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/management" element={<ManagementDashboard />} />
        </Route>

        {/* Office Monitor is standalone full-screen - no sidebar/topbar */}
        <Route path="/monitor" element={<OfficeMonitor />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <AnimatedRoutes />
      )}
    </BrowserRouter>
  );
}

export default App;
