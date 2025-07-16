import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

function AppRoutes({ loggedIn, setLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" replace /> : <Login setLoggedIn={setLoggedIn} />} />
      <Route path="/dashboard" element={loggedIn ? <Dashboard  setLoggedIn={setLoggedIn}/> : <Navigate to="/login" replace />} />
     
    </Routes>
  );
}

export default AppRoutes;
