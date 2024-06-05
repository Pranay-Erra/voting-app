import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Mock function to check if the user is authenticated
const isAuthenticated = () => {
  // Implement your authentication logic here, e.g., check localStorage or context
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
