import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Box,
  Container,
} from '@mui/material';

import { ProjectDetailPageProps } from '../../types';
import ProjectHeader from '../common/ProjectHeader';
import ProjectTabs from '../common/TabPanel';
import { formatNumberWithoutDecimals, formatDateForInput, formatPercentage, formatEnergyKWh } from '../../utils/formatters';

/**
 * Project Income Page Component
 * Detailansicht der Erträge eines Windpark-Projekts
 */
const ProjectIncome: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
  // Beispiel-Erträge
  const bruttoertragKWh = 2500000; 
  const abzuege = 12.5;
  const nettoertragKWhP50 = bruttoertragKWh * (1 - abzuege / 100);
  const nettoertragKWhP75 = nettoertragKWhP50 * (95 / 100);

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
            Gutachten
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Typ"
                  value="Wind Pro"
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Erstellt am"
                  type="date"
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
          </Grid>

          {/* Erträge-Felder */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Bruttoertrag
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {formatEnergyKWh(bruttoertragKWh)}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Abzüge
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {formatPercentage(abzuege)}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Nettoertrag (P50)
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'green' }}>
                {formatEnergyKWh(nettoertragKWhP50)}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Nettoertrag (P75)
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'green'  }}>
                {formatEnergyKWh(nettoertragKWhP75)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectIncome; 