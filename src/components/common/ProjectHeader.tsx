import React from 'react';
import {
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import StatusChip from './StatusChip';

interface ProjectHeaderProps {
  name: string;
  status?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

/**
 * Project Header Component
 * Wiederverwendbarer Header für Projekt-Seiten mit Name und Status
 */
const ProjectHeader: React.FC<ProjectHeaderProps> = ({ name, status, onBack, showBackButton = false }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showBackButton && onBack && (
          <IconButton
            onClick={onBack}
            size="small"
            sx={{ mr: 1, padding: 0.5 }}
            aria-label="Zurück zur Übersicht"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}
        <Typography 
          variant="h6" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            textTransform: 'uppercase',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
            color: '#1a1a1a'
          }}
        >
          {name}
        </Typography>
        {status && (
          <StatusChip status={status} variant="outlined" />
        )}
      </Box>
    </Box>
  );
};

export default ProjectHeader; 