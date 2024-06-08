import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  // console.log("Auth token:", token); // Debugging line
  return token !== null;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
