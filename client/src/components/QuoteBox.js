import React, { useState, useEffect } from 'react';

const quotes = [
  "You are enough just as you are.",
  "This too shall pass.",
  "One day at a time.",
  "Your feelings are valid.",
  "Breathe. You've got this.",
  "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
  "It’s okay not to be okay.",
  "Small steps are still progress."
];

const QuoteBox = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote when component loads
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px',
      borderRadius: '15px',
      textAlign: 'center',
      marginBottom: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: 0, fontStyle: 'italic' }}>" {quote} "</h3>
    </div>
  );
};

export default QuoteBox;