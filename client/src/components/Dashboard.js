import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuoteBox from './QuoteBox';
import MoodTracker from './MoodTracker';
// Import new icons
import { FaRobot, FaPenFancy, FaWind, FaUserCircle } from 'react-icons/fa'; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="dashboard-container fade-in">
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Quote Section */}
        <QuoteBox />

        <div className="welcome-section">
          <h1>Welcome to MindCare</h1>
          <p>Your safe space for connection, reflection, and growth.</p>
        </div>
        
        {/* Mood Tracker */}
        <MoodTracker />

        {/* Feature Cards Grid */}
        <h3 className="section-title">Explore Your Tools</h3>
        <div className="dashboard-options">
          
          <div className="feature-card" onClick={() => navigate('/chat')}>
            <div className="icon-wrapper blue"><FaRobot /></div>
            <h3>AI Companion</h3>
            <p>Chat with our empathetic support assistant.</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/board')}>
            <div className="icon-wrapper purple"><FaPenFancy /></div>
            <h3>Anonymous Board</h3>
            <p>Share your thoughts safely with the community.</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/breathe')}>
            <div className="icon-wrapper teal"><FaWind /></div>
            <h3>Breathing Room</h3>
            <p>Relax with a guided breathing exercise.</p>
          </div>

          <div className="feature-card" onClick={() => navigate('/profile')}>
            <div className="icon-wrapper orange"><FaUserCircle /></div>
            <h3>My Profile</h3>
            <p>View your account and history.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;