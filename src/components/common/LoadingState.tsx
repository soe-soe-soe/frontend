import React from 'react';
import { Box, Typography } from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

/**
 * Wiederverwendbare Loading-State Komponente
 */
const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Wird geladen..." 
}) => {
  return (
    <Box sx={{ mb: 2, textAlign: 'center' }}>
      <Typography>{message}</Typography>
    </Box>
  );
};

export default LoadingState; 