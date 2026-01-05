// client/src/components/Chatbot.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am MindCare. How are you feeling today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message to UI
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 2. Send to Backend
      const res = await api.post('/chat', { message: input });
      
      // 3. Add AI Reply to UI
      const botMessage = { role: 'assistant', content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '10px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '15px', borderBottom: '1px solid #ddd', background: '#f9f9f9', display: 'flex', justifyContent: 'space-between' }}>
        <h3>MindCare Chat</h3>
        <button onClick={() => navigate('/')}>Close</button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#fff' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ 
            textAlign: msg.role === 'user' ? 'right' : 'left', 
            marginBottom: '15px' 
          }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '10px 15px', 
              borderRadius: '15px', 
              background: msg.role === 'user' ? '#007bff' : '#eee', 
              color: msg.role === 'user' ? '#fff' : '#333',
              maxWidth: '80%'
            }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ fontStyle: 'italic', color: '#888' }}>MindCare is typing...</p>}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
          style={{ flex: 1, padding: '15px', border: 'none', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '0 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
};

export default Chatbot;