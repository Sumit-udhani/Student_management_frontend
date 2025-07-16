import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9090/auth/login', formData);
      const { token, userId } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      
      setLoggedIn(true);

    
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom sx={{color:'white'}}>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          // fullWidth
          margin="normal"
          required
          sx={{color:'white'}}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          // fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Box>
  );
}

export default Login;
