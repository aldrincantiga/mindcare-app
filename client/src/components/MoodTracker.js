import React, { useState, useEffect } from 'react';
import api from '../api';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null); // Which mood did they click?
  const [note, setNote] = useState(''); // What is the journal entry?

  // Fetch History on Load
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/moods', {
        headers: { 'x-auth-token': token }
      });
      setMoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Step 1: User clicks a mood button
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  // Step 2: User clicks "Save Entry"
  const handleSave = async () => {
    if (!selectedMood) return;

    const token = localStorage.getItem('token');
    try {
      await api.post('/moods', 
        { mood: selectedMood, note: note }, // Send both mood and note
        { headers: { 'x-auth-token': token } }
      );
      
      // Reset the form
      setSelectedMood(null);
      setNote('');
      fetchMoods(); // Refresh list
    } catch (err) {
      alert("Error saving mood");
    }
  };


  return (
    <div className="mood-container">
      <h3>How are you feeling today?</h3>
      
      {/* 1. If no mood selected, show buttons */}
      {!selectedMood ? (
        <div className="mood-buttons">
          <button className="mood-btn happy" onClick={() => handleMoodClick('Happy')}>😊 Happy</button>
          <button className="mood-btn neutral" onClick={() => handleMoodClick('Neutral')}>😐 Neutral</button>
          <button className="mood-btn sad" onClick={() => handleMoodClick('Sad')}>😔 Sad</button>
        </div>
      ) : (
        /* 2. If mood selected, show Journal Form */
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
          <h4 style={{ color: '#555' }}>
            You are feeling {selectedMood}. <br /> Want to write about it?
          </h4>
          
          <textarea 
            placeholder="Why do you feel this way? (Optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ 
              width: '100%', padding: '10px', borderRadius: '10px', 
              border: '1px solid #ddd', minHeight: '80px', margin: '15px 0' 
            }}
          />
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => setSelectedMood(null)} // Cancel
              style={{ background: '#ccc', padding: '10px 20px', border:'none', borderRadius:'8px', cursor:'pointer' }}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} // Save
              style={{ background: '#4A90E2', color: 'white', padding: '10px 20px', border:'none', borderRadius:'8px', cursor:'pointer' }}
            >
              Save Entry
            </button>
          </div>
        </div>
      )}

      {/* History List */}
      <div className="mood-history" style={{ marginTop: '30px' }}>
        <h4 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Mood Journal</h4>
        
        {moods.length === 0 && <p style={{color:'#999', fontStyle:'italic'}}>No entries yet.</p>}

        {moods.slice(0, 5).map((m) => (
          <div key={m._id} className="mood-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            
            {/* Header: Icon + Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold' }}>
                {m.mood === 'Happy' ? '😊' : m.mood === 'Sad' ? '😔' : '😐'} {m.mood}
              </span>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <small style={{ color: '#888' }}>{new Date(m.date).toLocaleDateString()}</small>
              </div>
            </div>

            {/* The Note */}
            {m.note && (
              <p style={{ background: '#f9f9f9', padding: '10px', borderRadius: '8px', width: '100%', color: '#555', fontSize: '0.95rem' }}>
                "{m.note}"
              </p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;