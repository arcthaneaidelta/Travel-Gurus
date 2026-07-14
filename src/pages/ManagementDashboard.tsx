import { motion } from 'framer-motion';
import { stats } from '../mockData';
import { TrendingUp, Users, Target, Clock, ArrowUpRight, Download } from 'lucide-react';
import './ManagementDashboard.css';

const ManagementDashboard = () => {
  const statCards = [
    { icon: <Users size={22}/>, label: 'Total Active Leads', value: stats.activeLeads, trend: '+12%', color: 'blue' },
    { icon: <Target size={22}/>, label: 'Conversion Rate', value: stats.conversionRate, trend: '+2.4%', color: 'green' },
    { icon: <Clock size={22}/>, label: 'Avg Response Time', value: stats.avgResponse, trend: '-3 min', color: 'purple' },
    { icon: <TrendingUp size={22}/>, label: 'Projected Revenue', value: stats.revenue, trend: '+8%', color: 'gold' },
  ];

  const destinations = [
    { name: 'Europe', pct: 35 },
    { name: 'Caribbean', pct: 28 },
    { name: 'Maldives', pct: 22 },
    { name: 'Asia', pct: 15 },
  ];

  const agents = [
    { name: 'Agent Smith', pct: 92, leads: 42 },
    { name: 'Agent Davis', pct: 78, leads: 31 },
    { name: 'Agent Patel', pct: 65, leads: 24 },
    { name: 'Agent Kim', pct: 55, leads: 18 },
  ];

  return (
    <div className="mgmt-page">
      <header className="mgmt-header">
        <div>
          <h1>Management Overview</h1>
          <p>High-level performance metrics and analytics.</p>
        </div>
        <div className="mgmt-actions">
          <select className="mgmt-select">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="export-btn"><Download size={16}/> Export</button>
        </div>
      </header>

      {/* Stats Strip */}
      <div className="stats-strip">
        {statCards.map((s, i) => (
          <motion.div
            className="stat-card"
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-body">
              <span className="stat-label">{s.label}</span>
              <div className="stat-row">
                <span className="stat-value">{s.value}</span>
                <span className="stat-trend"><ArrowUpRight size={14}/> {s.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-row">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Leads by Destination</h3>
          <div className="horiz-bars">
            {destinations.map((d, i) => (
              <div className="hbar-row" key={d.name}>
                <span className="hbar-label">{d.name}</span>
                <div className="hbar-track">
                  <motion.div
                    className="hbar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.pct}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
                <span className="hbar-val">{d.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Agent Performance</h3>
          <div className="agent-perf-list">
            {agents.map((a, i) => (
              <div className="agent-perf-row" key={a.name}>
                <div className="agent-perf-left">
                  <div className="agent-perf-avatar">{a.name.split(' ')[1]?.charAt(0)}</div>
                  <div>
                    <span className="agent-perf-name">{a.name}</span>
                    <span className="agent-perf-leads">{a.leads} leads</span>
                  </div>
                </div>
                <div className="agent-perf-right">
                  <div className="agent-perf-track">
                    <motion.div
                      className="agent-perf-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${a.pct}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                  <span className="agent-perf-pct">{a.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
