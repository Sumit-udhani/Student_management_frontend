import { TextField } from '@mui/material';
import React from 'react';

function Input({ label, name, value, onChange, type = 'text' ,fullWidth=false,sx = {}, ...rest }) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      required
      InputLabelProps={type === 'date' ? { shrink: true } : {}}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white', // normal border
            borderRadius: '8px',
          },
          '&:hover fieldset': {
            borderColor: '#ffffff', // on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffffff', // on focus
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white', // label color
        },
        '& .MuiInputBase-input': {
          color: 'white', // input text color
        },
      }}
      {...rest}
    />
  );
}

export default Input;
