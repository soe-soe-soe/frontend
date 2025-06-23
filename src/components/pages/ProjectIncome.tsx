import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Box,
  Container,
  InputAdornment,
} from '@mui/material';

import { ProjectDetailPageProps } from '../../types';
import ProjectHeader from '../common/ProjectHeader';
import ProjectTabs from '../common/TabPanel';
import GutachtenTable from '../common/GutachtenTable';
import { formatNumberWithoutDecimals, formatDateForInput, formatPercentage, formatEnergyKWh } from '../../utils/formatters';

/**
 * Project Income Page Component
 * Detailansicht des Gutachtens eines Windpark-Projekts
 */
const ProjectIncome: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
  // Beispielwerte
  const bruttoertragKWh = 2500000; 
  const abzuege = 12.5;
  const nettoertragKWhP50 = bruttoertragKWh * (1 - abzuege / 100);
  const nettoertragKWhP75 = nettoertragKWhP50 * (95 / 100);
  const gutachtenTyp = "Wind Pro";
  const erstelltAm = new Date('2024-03-15');
  const gutachtenListe = [
    {
      id: 1,
      aktiv: true,
      typ: "Wind Pro",
      erstelltAm: new Date('2024-03-15')
    },
    {
      id: 2,
      aktiv: false,
      typ: "WAsP",
      erstelltAm: new Date('2024-02-10')
    },
    {
      id: 3,
      aktiv: false,
      typ: "WindPRO",
      erstelltAm: new Date('2024-01-20')
    }
  ];

  return (
    <Container maxWidth="xl">

      {/* Header */}
      <ProjectHeader 
        name={project.name} 
        status={project.status} 
        onBack={onBack}
        showBackButton={true}
      />

      {/* Tabs */}
      <ProjectTabs onTabChange={onTabChange} currentTab={currentTab} />

      {/* Content */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textTransform: 'none' }}>
            Erträge
          </Typography>

          {/* Ertrags-Daten */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bruttoertrag"
                value={`${formatNumberWithoutDecimals(bruttoertragKWh)} kWh`}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField sx={{ mt: 3 }}
                fullWidth
                label="Nettoertrag (P50)"
                value={`${formatNumberWithoutDecimals(nettoertragKWhP50)} kWh`}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Gesamte Abzüge"
                value={`${abzuege.toFixed(1)} %`}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField sx={{ mt: 3 }}
                fullWidth
                label="Nettoertrag (P75)"
                value={`${formatNumberWithoutDecimals(nettoertragKWhP75)} kWh`}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>

          {/* Gutachten Section */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textTransform: 'none' }}>
              Gutachten
            </Typography>
            <GutachtenTable gutachten={gutachtenListe} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectIncome; 