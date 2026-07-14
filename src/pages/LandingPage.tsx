import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, ChevronRight, CheckCircle2, ArrowRight, Globe, Mail, MessageCircle, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const questions = [
  {
    id: 'destination',
    title: 'Where would you like to escape?',
    subtitle: 'Select a region or let our AI experts curate a surprise journey.',
    icon: <MapPin size={28} strokeWidth={1.5} />,
    type: 'select',
    options: ['The Caribbean', 'European Heritage', 'Maldives & Seychelles', 'Asian Horizons', 'Surprise Me!']
  },
  {
    id: 'dates',
    title: 'When do you wish to travel?',
    subtitle: 'Approximate timing is perfectly fine.',
    icon: <Calendar size={28} strokeWidth={1.5} />,
    type: 'select',
    options: ['Next 3 Months', '3-6 Months', '6-12 Months', 'I am flexible']
  },
  {
    id: 'travelers',
    title: 'Who is joining this journey?',
    subtitle: 'This helps us find the most suitable accommodations.',
    icon: <Users size={28} strokeWidth={1.5} />,
    type: 'select',
    options: ['Solo Adventure', 'Romantic Getaway', 'Family Vacation', 'Group Retreat']
  },
  {
    id: 'budget',
    title: 'What is your comfortable budget?',
    subtitle: 'Per person, including flights and luxury accommodations.',
    icon: <DollarSign size={28} strokeWidth={1.5} />,
    type: 'select',
    options: ['Essential (Under $2,500)', 'Premium ($2,500 - $5,000)', 'Luxury ($5,000 - $10,000)', 'Ultra Luxury ($10,000+)']
  }
];

const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (answer: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: answer });
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/agent');
      }, 3000);
    }, 2500);
  };

  return (
    <div className="landing-wrapper">
      {/* Navbar overlay */}
      <nav className={`landing-nav ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">Travel Gurus</div>
          <div className="nav-links">
            <a href="#destinations">Destinations</a>
            <a href="#experiences">Experiences</a>
            <a href="#about">About Us</a>
            <button className="agent-login-btn glass-light" onClick={() => navigate('/agent')}>
              Agent Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="ken-burns-bg"></div>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <h1>Discover the Extraordinary</h1>
            <p>AI-curated luxury travel experiences tailored exclusively for you.</p>
          </motion.div>
        </div>

        {/* Floating Booking Widget */}
        <div className="booking-widget-wrapper">
          <motion.div 
            className="booking-widget glass-dark-blur"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitting && !isSuccess ? (
                <motion.div
                  key={currentStep}
                  className="widget-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="widget-header">
                    <div className="step-count">Step {currentStep + 1} of {questions.length}</div>
                    <div className="question-content">
                      <div className="icon-wrapper-gold">{questions[currentStep].icon}</div>
                      <div>
                        <h2>{questions[currentStep].title}</h2>
                        <p>{questions[currentStep].subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="widget-options">
                    {questions[currentStep].options.map((option, idx) => (
                      <motion.button
                        key={option}
                        className={`widget-option-btn ${answers[questions[currentStep].id] === option ? 'selected' : ''}`}
                        onClick={() => handleSelect(option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {option}
                        <ArrowRight size={18} className="arrow-icon" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : isSubmitting ? (
                <motion.div 
                  key="analyzing"
                  className="widget-state-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                >
                  <div className="pulsing-circle-gold"></div>
                  <h2>Curating Your Journey...</h2>
                  <p>Our AI is matching you with the perfect travel expert based on your preferences.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="widget-state-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 size={64} className="success-icon-gold" />
                  </motion.div>
                  <h2>Request Sent</h2>
                  <p>Your dedicated travel advisor will contact you shortly.</p>
                  <p className="redirect-text">Redirecting to Agent Dashboard for demo...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="featured-section" id="destinations">
        <div className="featured-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2>AI-Curated Trending Destinations</h2>
            <p>Based on millions of data points, these are the most highly requested escapes this season.</p>
          </motion.div>

          <div className="destinations-grid">
            {[
              { name: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop' },
              { name: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
              { name: 'Amalfi Coast, Italy', img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop' }
            ].map((dest, i) => (
              <motion.div 
                className="destination-card"
                key={dest.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="dest-img">
                  <img src={dest.img} alt={dest.name} />
                  <div className="dest-overlay"></div>
                </div>
                <h3>{dest.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="footer-logo">Travel Gurus</div>
              <p className="footer-desc">
                Elevating travel to an art form. Experience the world’s most exquisite destinations, curated seamlessly by AI and our luxury travel experts.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon"><Globe size={20} /></a>
                <a href="#" className="social-icon"><Share2 size={20} /></a>
                <a href="#" className="social-icon"><MessageCircle size={20} /></a>
                <a href="#" className="social-icon"><Mail size={20} /></a>
              </div>
            </div>
            
            <div className="footer-links-col">
              <h4>Destinations</h4>
              <a href="#">The Maldives</a>
              <a href="#">Amalfi Coast</a>
              <a href="#">Kyoto</a>
              <a href="#">St. Barts</a>
              <a href="#">French Alps</a>
            </div>

            <div className="footer-links-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Travel Advisors</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
              <a href="#">Contact</a>
            </div>

            <div className="footer-newsletter">
              <h4>The Insider's List</h4>
              <p>Receive exclusive access to hidden gems and unlisted luxury properties.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email Address" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Travel Gurus. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
