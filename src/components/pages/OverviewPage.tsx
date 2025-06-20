import React from 'react';
import {
  Grid,
  Button,
  Box,
  Typography,
  Container,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { OverviewPageProps } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { primaryActionButton } from '../../styles/buttonStyles';
import KPICard from '../common/KPICard';
import ProjectTable from '../common/ProjectTable';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import { useWindparks } from '../../services/hooks';

/**
 * Overview Page Component
 * Hauptseite mit KPI-Dashboard und Projekttabelle
 */
const OverviewPage: React.FC<OverviewPageProps> = ({ testWindparks, kpis, onNewProject, onProjectSelect, handleApiCall }) => {
  const { windparks, loading, error, refreshWindparks, hasApiData } = useWindparks(testWindparks);

  return (
    <Container maxWidth="xl">

      {/* Loading/Error States */}
      {loading && <LoadingState message="Lade Windparkprojekte..." />}
      {error && <ErrorState error={error} />}

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Laufende Kalkulationen"
            value={kpis.laufendeKalkulationen.toString()}
            icon={<AssessmentIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Ø Gewinn p.a."
            value={formatCurrency(kpis.durchschnittlicherGewinn)}
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Ø EK-Quote"
            value={formatPercentage(kpis.durchschnittlicheEkQuote)}
            icon={<AccountBalanceIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>

        {/* Projects Table, inkl. Überschrift und Buttons */}
      <Paper elevation={1} sx={{ 
        p: 3, // Padding innen
        borderColor: 'divider',
        borderRadius: 2
      }}>
        {/* Section Header for Table */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
            }}
          >
            Windparks
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {windparks.length} {windparks.length === 1 ? 'Projekt' : 'Projekte'} insgesamt
          </Typography>
        </Box>

        {/* Projects Table */}
        <Box sx={{ mb: 4 }}>
          <ProjectTable windparks={windparks} onProjectSelect={onProjectSelect} />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            mt: 4,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={onNewProject}
            sx={primaryActionButton}
          >
            Neues Projekt Anlegen
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OverviewPage;