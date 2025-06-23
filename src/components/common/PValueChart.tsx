import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { formatNumberWithoutDecimals } from '../../utils/formatters';

interface PValueChartProps {
  bruttoertrag: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  title?: string;
  height?: string;
}

const PValueChart: React.FC<PValueChartProps> = ({
  bruttoertrag,
  p50,
  p75,
  p90,
  p95,
  title = "Ertragsverteilung",
  height = '300px'
}) => {
  const theme = useTheme();

  // Daten für das Diagramm vorbereiten
  const data = [
    {
      id: 'P95',
      label: 'P95',
      value: p95,
      color: theme.palette.error.main
    },
    {
      id: 'P90',
      label: 'P90',
      value: p90,
      color: theme.palette.warning.main
    },
    {
      id: 'P75',
      label: 'P75',
      value: p75,
      color: theme.palette.success.main
    },
    {
      id: 'P50',
      label: 'P50',
      value: p50,
      color: theme.palette.secondary.main
    },
    {
      id: 'Bruttoertrag',
      label: 'Bruttoertrag',
      value: bruttoertrag,
      color: theme.palette.primary.main
    }
  ];

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      {/* Titel Label in der Umrandung */}
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
          zIndex: 1000,
        }}
      >
        {title}
      </Typography>
      
      <Box
        sx={{
          width: '100%',
          height: height,
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden',
          padding: 2,
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
            transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '&:focus-within': {
            borderColor: '#1976d2',
            borderWidth: '2px',
          }
        }}
      >
        <ResponsiveBar
          data={data}
          keys={['value']}
          indexBy="label"
          layout="horizontal"
          margin={{ top: 20, right: 80, bottom: 40, left: 100 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={(d) => d.data.color}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'kWh',
            legendPosition: 'middle',
            legendOffset: 32,
            format: (value) => formatNumberWithoutDecimals(value),
            tickValues: 5
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Ertrag',
            legendPosition: 'middle',
            legendOffset: -80
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="white"
          // Werte am Ende der Balken anzeigen
          enableLabel={true}
          label={(d) => `${formatNumberWithoutDecimals(d.value as number)} kWh`}
          labelPosition="end"
          labelOffset={-80}
          animate={true}
          motionConfig="gentle"
          role="application"
          ariaLabel="P-Werte Balkendiagramm"
          barAriaLabel={(e) => `${e.id}: ${formatNumberWithoutDecimals(e.value as number)} kWh`}
        />
      </Box>
    </Box>
  );
};

export default PValueChart; 