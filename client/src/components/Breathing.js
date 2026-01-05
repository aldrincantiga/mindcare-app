// client/src/components/Breathing.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Breathing = () => {
  const navigate = useNavigate();
  const [instruction, setInstruction] = useState("Breathe In...");

  useEffect(() => {
    // This cycle matches the CSS animation (10 seconds total)
    // 0-4s: Breathe In
    // 4-6s: Hold
    // 6-10s: Breathe Out
    const interval = setInterval(() => {
      setInstruction("Breathe In...");
      
      setTimeout(() => {
        setInstruction("Hold...");
      }, 4000); // After 4 seconds

      setTimeout(() => {
        setInstruction("Breathe Out...");
      }, 6000); // After 6 seconds (4s In + 2s Hold)

    }, 10000); // Repeat every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="breathing-container">
       <button className="back-btn" onClick={() => navigate('/')}>&larr; Back</button>
      
      <h1>Relax & Breathe</h1>
      
      <div className="circle-container">
        <div className="breathing-circle"></div>
        <p className="instruction-text">{instruction}</p>
      </div>
      
      <p style={{ marginTop: '30px', color: '#888' }}>
        Follow the circle. Breathe in as it grows, hold, and breathe out as it shrinks.
      </p>
    </div>
  );
};

export default Breathing;