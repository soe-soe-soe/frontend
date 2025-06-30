import React from 'react';
import { Box, Typography } from '@mui/material';

interface OutputFieldNumberProps {
  label: string;
  value: string;
  sx?: object;
}

const OutputFieldNumber: React.FC<OutputFieldNumberProps> = ({
  label,
  value,
  sx = {}
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1,
        pl: 6,
        pr: 2,
        mb: 2,
        borderRadius: 1,
        backgroundColor: 'white',
        ...sx
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: '1rem',
          color: 'text.primary',
          fontWeight: 400
        }}
      >
        {label}
      </Typography>
      
      <Typography
        sx={{
          fontSize: '1rem',
          color: 'text.secondary',
          fontFamily: 'monospace',
          textAlign: 'right',
          whiteSpace: 'pre-line'
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default OutputFieldNumber; 