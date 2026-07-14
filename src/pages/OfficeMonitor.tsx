import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Trophy, Clock, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './OfficeMonitor.css';

const liveFeed = [
  { id: 1, text: 'New Inquiry: Maldives', time: '10m ago', status: 'new' },
  { id: 2, text: 'New Inquiry: Europe Tour', time: '2h ago', status: 'in-progress' },
  { id: 3, text: 'New Inquiry: Caribbean', time: '1d ago', status: 'in-progress' },
  { id: 4, text: 'New Inquiry: Surprise Me!', time: '2d ago', status: 'follow-up' },
  { id: 5, text: 'New Inquiry: Japan Cultural', time: '3d ago', status: 'new' },
];

const leaderboard = [
  { name: 'Agent Smith', leads: 42, trend: '+5' },
  { name: 'Agent Davis', leads: 31, trend: '+3' },
  { name: 'Agent Patel', leads: 24, trend: '+2' },
  { name: 'Agent Kim', leads: 18, trend: '+1' },
];

const OfficeMonitor = () => {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const statusColor: Record<string, string> = {
    'new': '#3B82F6',
    'in-progress': '#F59E0B',
    'follow-up': '#A78BFA',
  };

  return (
    <div className="monitor-fullscreen">
      {/* Background ambient glow */}
      <div className="monitor-ambient-1"></div>
      <div className="monitor-ambient-2"></div>

      {/* Back button */}
      <button className="monitor-back" onClick={() => navigate('/agent')}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      {/* Top Bar */}
      <header className="monitor-topbar">
        <div className="monitor-brand">
          <Sparkles size={24} className="monitor-brand-icon" />
          <span>Travel Gurus — Live Operations</span>
        </div>
        <div className="monitor-clock">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </header>

      {/* Main Grid */}
      <div className="monitor-grid">
        {/* Live Feed */}
        <motion.section 
          className="monitor-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="monitor-card-header">
            <Activity size={18} />
            <h2>Live Feed</h2>
            <span className="live-badge">
              <span className="live-dot"></span>
              LIVE
            </span>
          </div>
          <div className="feed-list">
            {liveFeed.map((item, i) => (
              <motion.div
                key={item.id}
                className="feed-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="feed-dot" style={{ background: statusColor[item.status] }}></div>
                <div className="feed-text">
                  <span>{item.text}</span>
                  <span className="feed-time">{item.time}</span>
                </div>
                <span className="feed-status" style={{ color: statusColor[item.status] }}>
                  {item.status.replace('-', ' ')}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Urgent Attention */}
        <motion.section 
          className="monitor-card urgent-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="monitor-card-header">
            <AlertTriangle size={18} />
            <h2>Urgent Attention</h2>
          </div>
          <div className="urgent-center">
            <div className="urgent-ring">
              <span className="urgent-number">2</span>
            </div>
            <p className="urgent-label">Overdue Follow-ups</p>
            <div className="urgent-items">
              <div className="urgent-item">
                <span className="urgent-lead">L-1039</span>
                <span className="urgent-detail">Agent Davis • 45m overdue</span>
              </div>
              <div className="urgent-item">
                <span className="urgent-lead">L-1042</span>
                <span className="urgent-detail">Agent Patel • 12m overdue</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Leaderboard */}
        <motion.section 
          className="monitor-card leaderboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="monitor-card-header">
            <Trophy size={18} />
            <h2>Top Agents Today</h2>
          </div>
          <div className="leader-list">
            {leaderboard.map((agent, i) => (
              <motion.div
                key={agent.name}
                className={`leader-row ${i === 0 ? 'leader-first' : ''}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="leader-rank">{i + 1}</div>
                <div className="leader-info">
                  <span className="leader-name">{agent.name}</span>
                  <div className="leader-bar-track">
                    <motion.div
                      className="leader-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(agent.leads / leaderboard[0].leads) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="leader-stats">
                  <span className="leader-leads">{agent.leads}</span>
                  <span className="leader-trend">+{agent.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Metrics */}
        <motion.section 
          className="monitor-card metrics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="monitor-card-header">
            <Clock size={18} />
            <h2>Today's Metrics</h2>
          </div>
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-value">47</span>
              <span className="metric-label">New Leads</span>
            </div>
            <div className="metric-box">
              <span className="metric-value">12</span>
              <span className="metric-label">Converted</span>
            </div>
            <div className="metric-box">
              <span className="metric-value">8m</span>
              <span className="metric-label">Avg Response</span>
            </div>
            <div className="metric-box">
              <span className="metric-value">$84K</span>
              <span className="metric-label">Pipeline Value</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default OfficeMonitor;
