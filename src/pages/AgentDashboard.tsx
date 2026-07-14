import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leads, activities } from '../mockData';
import { Sparkles, MapPin, DollarSign, Send, Phone, Mail, MoreHorizontal, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const [selectedLead, setSelectedLead] = useState(leads[0]);
  const [activeTab, setActiveTab] = useState('insights');

  const statusColor: Record<string, string> = {
    'new': 'status-new',
    'in-progress': 'status-progress',
    'follow-up': 'status-followup',
  };

  return (
    <div className="agent-page">
      {/* Page Header with stats strip */}
      <header className="agent-header">
        <div className="agent-header-left">
          <h1>Welcome back, Agent Smith</h1>
          <p>You have <strong>4 active leads</strong> and <strong>2 follow-ups</strong> due today.</p>
        </div>
        <div className="quick-stats">
          <div className="qstat">
            <span className="qstat-val">24</span>
            <span className="qstat-label">Total Leads</span>
          </div>
          <div className="qstat">
            <span className="qstat-val">18.5%</span>
            <span className="qstat-label">Conversion</span>
          </div>
          <div className="qstat">
            <span className="qstat-val">14m</span>
            <span className="qstat-label">Avg Response</span>
          </div>
        </div>
      </header>

      {/* Main 2-column layout */}
      <div className="agent-grid">
        {/* LEFT - Leads List */}
        <section className="leads-panel">
          <div className="panel-top">
            <h3>Active Leads</h3>
            <span className="lead-count">{leads.length}</span>
          </div>
          
          <div className="leads-list-scroll">
            {leads.map((lead, idx) => (
              <motion.div
                key={lead.id}
                className={`lead-row ${selectedLead.id === lead.id ? 'selected' : ''}`}
                onClick={() => setSelectedLead(lead)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <div className="lead-row-main">
                  <div className="lead-avatar-sm">{lead.name.charAt(0)}</div>
                  <div className="lead-info">
                    <span className="lead-name">{lead.name}</span>
                    <span className="lead-dest"><MapPin size={12}/> {lead.destination}</span>
                  </div>
                </div>
                <div className="lead-row-meta">
                  <span className={`status-chip ${statusColor[lead.status]}`}>{lead.status.replace('-', ' ')}</span>
                  <span className="lead-time">{lead.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* RIGHT - Lead Detail + AI */}
        <section className="detail-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLead.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="detail-inner"
            >
              {/* Detail Header */}
              <div className="detail-top">
                <div className="detail-top-left">
                  <div className="lead-avatar-lg">{selectedLead.name.charAt(0)}</div>
                  <div>
                    <h2>{selectedLead.name}</h2>
                    <div className="detail-meta">
                      <span><MapPin size={14}/> {selectedLead.destination}</span>
                      <span><Calendar size={14}/> {selectedLead.dates}</span>
                      <span><DollarSign size={14}/> {selectedLead.budget}</span>
                    </div>
                  </div>
                </div>
                <div className="detail-actions">
                  <button className="action-pill"><Phone size={16}/> Call</button>
                  <button className="action-pill"><Mail size={16}/> Email</button>
                  <button className="action-pill-icon"><MoreHorizontal size={18}/></button>
                </div>
              </div>

              {/* Tabs */}
              <div className="detail-tabs">
                <button className={`dtab ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
                  <Sparkles size={15} /> AI Insights
                </button>
                <button className={`dtab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                  <MessageSquare size={15} /> Activity
                </button>
              </div>

              {/* Tab Content */}
              <div className="detail-body">
                {activeTab === 'insights' ? (
                  <motion.div className="ai-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="ai-card">
                      <div className="ai-card-header">
                        <div className="ai-pulse-dot"></div>
                        <span>AI Analysis — Live</span>
                      </div>
                      <p className="ai-text">{selectedLead.aiInsight}</p>
                    </div>
                    
                    <div className="suggested-section">
                      <h4>Recommended Next Steps</h4>
                      <div className="suggested-list">
                        <button className="suggest-btn">
                          <CheckCircle2 size={16} />
                          <span>Send personalized intro email</span>
                          <ArrowUpRight size={14} className="suggest-arrow" />
                        </button>
                        <button className="suggest-btn">
                          <CheckCircle2 size={16} />
                          <span>Request preferred flight times</span>
                          <ArrowUpRight size={14} className="suggest-arrow" />
                        </button>
                        <button className="suggest-btn">
                          <CheckCircle2 size={16} />
                          <span>Check supplier availability for dates</span>
                          <ArrowUpRight size={14} className="suggest-arrow" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div className="history-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="timeline">
                      {activities.map(act => (
                        <div key={act.id} className="tl-item">
                          <div className="tl-dot"></div>
                          <div className="tl-body">
                            <p>{act.text}</p>
                            <span>{act.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Comment Box */}
              <div className="comment-bar">
                <input type="text" placeholder="Add a note or update status..." />
                <button className="send-btn"><Send size={18}/></button>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

// Quick helper
const Calendar = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

export default AgentDashboard;
