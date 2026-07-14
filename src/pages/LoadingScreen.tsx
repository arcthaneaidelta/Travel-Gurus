import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import './LoadingScreen.css';

interface Props {
  onFinish: () => void;
}

const LoadingScreen = ({ onFinish }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="loading-container flex-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Ambient background orbs */}
      <div className="loading-orb orb-1"></div>
      <div className="loading-orb orb-2"></div>
      <div className="loading-orb orb-3"></div>

      <motion.div
        className="loading-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="logo-container">
          {/* Animated plane arc */}
          <motion.div
            className="plane-arc"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="arc-svg">
              <motion.path
                d="M10 50 Q60 -10 110 50"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              />
            </svg>
          </motion.div>

          <motion.div
            className="icon-wrapper-loading"
            initial={{ x: -60, y: 40, opacity: 0, rotate: -30 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.3 }}
          >
            <Plane size={40} strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            className="logo-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Travel Gurus
          </motion.h1>
          <motion.p
            className="logo-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            AI-Powered Lead Intelligence
          </motion.p>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
