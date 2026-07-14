import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, BarChart3, Tv, LogOut, Bell, Search, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import './Layout.css';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/agent', icon: <LayoutDashboard size={20} />, label: 'Agent Dashboard' },
    { path: '/management', icon: <BarChart3 size={20} />, label: 'Management' },
    { path: '/monitor', icon: <Tv size={20} />, label: 'Office Display' },
  ];

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <span className="sidebar-logo-icon">TG</span>
            <span className="sidebar-logo-text">Travel Gurus</span>
          </div>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* AI Badge */}
        <div className="ai-badge">
          <Sparkles size={16} />
          <span>AI Powered</span>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Main</span>
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <img src="https://ui-avatars.com/api/?name=Agent+Smith&background=5E9CB4&color=fff&size=80" alt="User" className="user-card-avatar" />
            <div className="user-card-info">
              <span className="user-card-name">Agent Smith</span>
              <span className="user-card-role">Senior Agent</span>
            </div>
          </div>
          <button className="nav-item logout-btn" onClick={() => navigate('/')}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search leads, customers, destinations..." />
            </div>
          </div>
          
          <div className="topbar-right">
            <button className="topbar-icon-btn">
              <Bell size={20} />
              <span className="notif-dot"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="page-wrapper"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export default Layout;
