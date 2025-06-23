import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Container,
  Grid,
  TextField,
} from '@mui/material';

import { ProjectDetailPageProps } from '../../types';
import ProjectHeader from '../common/ProjectHeader';
import ProjectTabs from '../common/TabPanel';
import PPATable, { PPATarif } from '../common/PPATable';
import { formatNumberWithoutDecimals, formatCentAmount } from '../../utils/formatters';

/**
 * Project Tariffs Page Component
 * Detailansicht der Tarife eines Windpark-Projekts
 */
const ProjectTariffs: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
    // Beispielwerte
    const referenzertragKWh = 2000000; 
    const standortguete = 80;
    const marktwert = 5.25; // Beispiel: 5,25 Cent
    const marktpraemie = 2.50; // Beispiel: 2,50 Cent
    
    // Berechneter Wert
    const zuschlagswert = marktwert + marktpraemie;

    // Beispiel PPA-Daten
    const ppaTarife: PPATarif[] = [
      {
        id: 1,
        tarif: 6.5,
        laufzeit: 15,
        abnahmevolumen: 80,
        preisformel: 'Fix',
        gegenpartei: 'Stadtwerke München',
        herkunftsnachweis: true
      },
      {
        id: 2,
        tarif: 7.2,
        laufzeit: 10,
        abnahmevolumen: 60,
        preisformel: 'indexiert',
        gegenpartei: 'EnBW',
        herkunftsnachweis: false
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
      {/* EEG-Tarif */}
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textTransform: 'none' }}>
            EEG-Tarif
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Referenzertrag"
                value={`${formatNumberWithoutDecimals(referenzertragKWh)} kWh`}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField sx={{ mt: 3 }}
                fullWidth
                label="Marktwert"
                value={`${formatCentAmount(marktwert)} Cent`}
                InputProps={{
                  readOnly: true
                }}
              />              
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Standortgüte"
                value={`${standortguete.toFixed(1)} %`}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField sx={{ mt: 3 }}
                fullWidth
                label="Marktprämie"
                value={`${formatCentAmount(marktpraemie)} Cent`}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>

          {/* Zuschlagswert - berechneter Wert */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Zuschlagswert
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
              {formatCentAmount(zuschlagswert)} Cent
            </Typography>
          </Box>
        </Box>

        {/* PPA-Tarife */}
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textTransform: 'none' }}>
            PPA-Tarife
          </Typography>
          
          <PPATable ppaTarife={ppaTarife} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectTariffs; 