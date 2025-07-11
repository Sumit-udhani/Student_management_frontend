// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header({ title, onLogout }) {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start', gap: 40 }}>
        {onLogout && (
          <Button
            variant="contained"
            color="error"
            onClick={onLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
