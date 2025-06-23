import React, { useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  totalCost?: string;
  sx?: object;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  totalCost,
  sx = {}
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ mb: 4, ...sx }}>
      {/* Header mit Button links, Titel und Gesamtkosten */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 1,
          px: 2,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          borderRadius: 1,
        }}
        onClick={handleToggle}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <IconButton
            size="small"
            sx={{
              color: expanded ? 'primary.main' : 'text.secondary',
              transition: 'transform 0.2s ease-in-out',
              transform: expanded ? 'rotate(0deg)' : 'rotate(0deg)',
              mr: 1,
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 500, 
              textTransform: 'none', 
              fontSize: '1.1rem',
              color: expanded ? 'primary.main' : 'text.primary',
              flex: 1
            }}
          >
            {title}
          </Typography>
          {totalCost && (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: expanded ? 'primary.main' : 'text.secondary',
                fontFamily: 'monospace'
              }}
            >
              {totalCost}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Aufklappbarer Inhalt */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CollapsibleSection; 