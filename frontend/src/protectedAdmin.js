import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAdminAuthenticated = () => {
  return localStorage.getItem('adminAuthToken') !== null;
};

const ProtectedAdmin = () => {
  return isAdminAuthenticated() ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default ProtectedAdmin;
