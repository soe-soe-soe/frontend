import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { KPICardProps } from '../../types';

/**
 * KPI Card Component
 * Zeigt eine einzelne Kennzahl in einer ansprechenden Card-Darstellung an
 */
const KPICard: React.FC<KPICardProps> = ({ title, value, icon }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        color: 'white',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon && (
            <Box sx={{ 
              mr: 2, 
              color: '#0369a1', // Dunkelblau
              display: 'flex',
              alignItems: 'center',
            }}>
              {icon}
            </Box>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 500,
              opacity: 0.9,
              fontSize: '0.95rem',
              color: '#64748B',
            }}
          >
            {title}
          </Typography>
        </Box>
        
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.1rem' },
            lineHeight: 1.2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: 'text.primary',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KPICard;