// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { NavigateContext } from './contexts/NavigateContext';
import axiosInstance from './utils/axiosInterceptor';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);
  
  return (
    
    
    <BrowserRouter>
  
      <AppRoutes loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
   
    </BrowserRouter>
  );
}

export default App;
