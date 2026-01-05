// client/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check the token EVERY time this component tries to render
  const isAuthenticated = !!localStorage.getItem('token');

  // If logged in, show the child component (e.g., Chatbot)
  // If not, redirect to Login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;