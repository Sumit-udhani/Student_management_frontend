// theme.js
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1A73E8',
    },
    secondary: {
      main: '#F1F3F4',
    },
    background: {
      default: '',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#202124',
      secondary: '#5F6368',
    },
    success: {
      main: '#34A853',
    },
    error: {
      main: '#EA4335',
    },
    divider: '#E0E0E0',
  },
});

export default customTheme;
