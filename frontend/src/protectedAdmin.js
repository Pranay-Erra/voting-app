import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAdminAuthenticated = () => {
  const token = localStorage.getItem('adminAuthToken');
  console.log("Admin auth token:", token); // Debugging line
  return token !== null;
};

const ProtectedAdmin = () => {
  const isAuthenticated = isAdminAuthenticated();
  console.log("Is admin authenticated:", isAuthenticated); // Debugging line
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default ProtectedAdmin;
