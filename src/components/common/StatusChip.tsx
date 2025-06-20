import React from 'react';
import { Chip } from '@mui/material';
import { getStatusChipProps } from '../../utils/formatters';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
}

/**
 * Status Chip Component
 * Wiederverwendbare Komponente für Status-Anzeige mit einheitlichem Design
 */
const StatusChip: React.FC<StatusChipProps> = ({ 
  status, 
  size = 'small', 
  variant = 'filled' 
}) => {
  const chipProps = getStatusChipProps(status);

  return (
    <Chip
      label={status}
      size={size}
      variant={variant}
      {...chipProps}
    />
  );
};

export default StatusChip; 