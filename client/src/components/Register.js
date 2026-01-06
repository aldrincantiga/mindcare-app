import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration Successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join our supportive community today.</p>
        
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Email Field */}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;