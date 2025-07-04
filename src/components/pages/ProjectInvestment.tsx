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

/**
 * Project Investment Page Component
 * Detailansicht der Investitionen eines Windpark-Projekts
 */
const ProjectInvestment: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
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
          <Typography variant="body1" gutterBottom>
            Hier werden die Investitionsinformationen für das Windpark-Projekt "{project.name}" angezeigt.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectInvestment; 