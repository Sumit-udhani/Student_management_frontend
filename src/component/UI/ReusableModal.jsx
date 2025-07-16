// src/components/common/ReusableModal.jsx
import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#1E293B',
  border: '2px solid #334155',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function ReusableModal({ open, onClose, title, children }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
     
        {title && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="white">{title}</Typography>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

     
        {children}
      </Box>
    </Modal>
  );
}

export default ReusableModal;
