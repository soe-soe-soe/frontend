import React, { useState, useEffect } from 'react';
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
import { OverviewPageProps, Windpark } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import KPICard from '../common/KPICard';
import ProjectTable from '../common/ProjectTable';
import { apiService } from '../../services/api';

/**
 * Overview Page Component
 * Hauptseite mit KPI-Dashboard und Projekttabelle
 */
const OverviewPage: React.FC<OverviewPageProps> = ({ testWindparks, kpis, onNewProject, handleApiCall }) => {
  const [apiWindparks, setApiWindparks] = useState<Windpark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWindparks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getProjects();
      setApiWindparks(response);
    } catch (err) {
      setError('Fehler beim Laden der Windparkprojekte');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWindparks();
  }, []);
  
  const windparks = (apiWindparks?.length ?? 0) > 0 ? apiWindparks : testWindparks;

  return (
    <Container maxWidth="xl">


      {/* Loading/Error States */}
      {loading && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography>Lade Windparkprojekte...</Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: 'error.light', borderRadius: 1 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

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
          <ProjectTable windparks={windparks} />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            mt: 4,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={onNewProject}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Neues Projekt Anlegen
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OverviewPage;