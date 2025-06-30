import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Container,
} from '@mui/material';

import { ProjectDetailPageProps } from '../../types';
import ProjectHeader from '../common/ProjectHeader';
import ProjectTabs from '../common/TabPanel';
import ProfitAndLossTable from '../common/ProfitAndLossTable';

export interface GuVYear {
  jahr: number;
  jahresenergieertrag: number;
  zinsertrag: number;
  gesamtertrag: number;
  laufenderAufwand: number;
  afa: number;
  zinsen: number;
  gesamtaufwand: number;
  ergebnisVorSteuern: number;
  gewerbesteuer: number;
  koerperschaftsteuer: number;
  ergebnisNachSteuern: number;
}

const ProjectProfitAndLoss: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
  // Mock-Daten für die GuV-Berechnung (20 Jahre)
  const data = Array.from({ length: 20 }, (_, index) => {
    const year = 1 + index;
    const jahresenergieertrag = 2500000 + Math.random() * 500000;
    const zinsertrag = 50000 + Math.random() * 20000;
    const gesamtertrag = jahresenergieertrag + zinsertrag;
    const laufenderAufwand = 800000 + Math.random() * 100000;
    const afa = 1200000;
    const zinsen = 300000 - (index * 15000); // Abnehmende Zinsen über die Jahre
    const gesamtaufwand = laufenderAufwand + afa + zinsen;
    const ergebnisVorSteuern = gesamtertrag - gesamtaufwand;
    const gewerbesteuer = Math.max(0, ergebnisVorSteuern * 0.14);
    const koerperschaftsteuer = Math.max(0, ergebnisVorSteuern * 0.15);
    const ergebnisNachSteuern = ergebnisVorSteuern - gewerbesteuer - koerperschaftsteuer;

    return {
      jahr: year,
      jahresenergieertrag,
      zinsertrag,
      gesamtertrag,
      laufenderAufwand,
      afa,
      zinsen,
      gesamtaufwand,
      ergebnisVorSteuern,
      gewerbesteuer,
      koerperschaftsteuer,
      ergebnisNachSteuern
    };
  });
  
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
            Gewinn- und Verlustrechnung
          </Typography>
          <ProfitAndLossTable data={data} />
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectProfitAndLoss; 