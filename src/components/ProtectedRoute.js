// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!isLoggedIn || role !== 'customer') {
    alert('Please log in to continue');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
