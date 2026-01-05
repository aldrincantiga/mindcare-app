import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// We will create these components next
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 
import Board from './components/Board';
import Chatbot from './components/Chatbot';
import Profile from './components/Profile';
import Breathing from './components/Breathing';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple Navigation */}
        <Navbar />

        {/* The Routes */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/board" element= {<PrivateRoute> <Board /> </PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute> <Chatbot /> </PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
            <Route path="/breathe" element={<PrivateRoute> <Breathing /> </PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;