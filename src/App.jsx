// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

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
