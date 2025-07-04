import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  Edit as EditIcon,
} from '@mui/icons-material';

import { ProjectDetailPageProps, Windpark } from '../../types';
import { utilityButton } from '../../styles/buttonStyles';
import { formatDateForInput } from '../../utils/formatters';
import ProjectHeader from '../common/ProjectHeader';
import ProjectTabs from '../common/TabPanel';
import MapView from '../common/MapView';

/**
 * Project Detail Page Component
 * Detailansicht eines Windpark-Projekts mit Tab-Navigation
 */
const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack, onTabChange, currentTab }) => {
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
            Projekt-Informationen
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Projektname"
                value={project.name}
                InputProps={{ readOnly: true }}
                placeholder="z.B. Windpark Nordsee Alpha"
              />
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Baubeginn"
                  type="date"
                  value={formatDateForInput(project.baubeginn)}
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Inbetriebnahme"
                  type="date"
                  value={formatDateForInput(project.inbetriebnahme)}
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <MapView 
                projectName={project.name}
                flaeche={[
                  [52.623003, 9.572096],
                  [52.621316, 9.543625],
                  [52.613982, 9.551056],
                  [52.613336, 9.550976],
                  [52.612206, 9.554778],
                  [52.613568, 9.554962],
                  [52.613960, 9.560125],
                  [52.610526, 9.559818],
                  [52.609900, 9.569861]
                ]} // Beispiel-Polygon für Windpark-Fläche
                windkraftanlagen={[
                  [52.612176, 9.565374],
                  [52.616375, 9.560333],
                  [52.614994, 9.552927],
                  [52.620847, 9.566043],
                  [52.619959, 9.553068]
                ]} // Beispiel-Positionen für Windkraftanlagen
              />
            </Grid>
          </Grid>

          {/* Anlagen Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'none' }}>
              Anlagen
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
              sx={utilityButton}
            >
              Bearbeiten
            </Button>
          </Box>

          <Box sx={{ mb: 4 }}>
            {project.anlagen.map((anlage, index) => (
              <Box
                key={anlage.id}
                sx={{
                  mb: 2,
                  '&:last-child': { mb: 0 }
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Hersteller"
                      value={anlage.hersteller}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Modell"
                      value={anlage.modell}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Anzahl"
                      value={anlage.anzahl}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectDetailPage;
 