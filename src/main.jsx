import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from './context/ThemeContext.jsx'; // Adjust the import path as necessary
createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={customTheme}>
  <CssBaseline /> {/* Optional: Resets CSS to match theme */}
  <App />
</ThemeProvider>
)
