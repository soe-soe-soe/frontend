import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorStateProps {
  error: string;
}

/**
 * Wiederverwendbare Error-State Komponente
 */
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <Box sx={{ 
      mb: 2, 
      p: 2, 
      backgroundColor: 'error.light', 
      borderRadius: 1 
    }}>
      <Typography color="error">{error}</Typography>
    </Box>
  );
};

export default ErrorState; 