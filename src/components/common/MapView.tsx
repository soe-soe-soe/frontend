import React from 'react';
import { Box, Typography } from '@mui/material';

interface MapViewProps {
  projectName: string;
  coordinates?: string;
  mapImageUrl?: string;
  onClick?: () => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  projectName, 
  coordinates = "54.4°N 9.0°E",
  mapImageUrl = "/map-background.jpg",
  onClick 
}) => {
  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      {/* Standort Label in der Umrandung */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: '-8px',
          left: '14px',
          backgroundColor: 'white',
          px: 1,
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: '0.75rem',
          zIndex: 1,
        }}
      >
        Standort
      </Typography>
      
      <Box
        onClick={onClick}
        sx={{
          width: '100%',
          height: '217px', // 3 TextFields (56px each) + 2 Abstände (24px each) = 168px + 16px für Label-Raum
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: 1,
          cursor: onClick ? 'pointer' : 'default',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url("${mapImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&:hover': onClick ? {
            borderColor: 'rgba(0, 0, 0, 0.87)',
            transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          } : {},
          '&:focus-within': {
            borderColor: '#1976d2',
            borderWidth: '2px',
            '& + .MuiFormLabel-root': {
              color: '#1976d2',
            }
          }
        }}
      >
        {/* Windpark-Pinnadel */}
        <Box
          sx={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            zIndex: 10,
          }}
        >
          {/* Pin */}
          <Box
            sx={{
              width: '24px',
              height: '30px',
              backgroundColor: '#ea4335',
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '4px',
                left: '4px',
                width: '14px',
                height: '14px',
                backgroundColor: 'white',
                borderRadius: '50%',
              }
            }}
          />
          
          {/* Projekt-Label */}
          <Box
            sx={{
              position: 'absolute',
              top: '-45px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#333' }}>
              {projectName}
            </Typography>
          </Box>
        </Box>

        {/* Koordinaten-Anzeige (wie bei Google Maps) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '10px',
            color: '#666',
          }}
        >
          {coordinates}
        </Box>
      </Box>
    </Box>
  );
};

export default MapView; 