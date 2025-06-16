import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  WindPower as WindPowerIcon
} from '@mui/icons-material';

import { Windpark, KPIData, PageType } from './types';
import { initialWindparks } from './data/testData';
import OverviewPage from './components/OverviewPage';
import NewProjectPage from './components/NewProjectPage';
import { apiService } from './services/api';

/**
 * Hauptkomponente der Windprojekt Kalkulator Anwendung
 * Verwaltet den globalen State und die Navigation zwischen den Seiten
 */
const App: React.FC = () => {
  // State Management
  const [windparks, setWindparks] = useState<Windpark[]>(initialWindparks);
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any>(null);

  //TEST: API Call
  const handleApiCall = async () => {
    setLoading(true);
    try {
      // API aufrufen
      const data = await apiService.getWindparks();
      setApiData(data);
      
      // Zusätzliche Ausgabe im Log
      console.debug('Daten erfolgreich geladen:', data);
      return data;
    } catch (error) {
      console.error('Fehler beim API-Aufruf:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Berechnet KPI-Daten basierend auf aktuellen Windparks
   */
  const kpis: KPIData = useMemo(() => {
    if (windparks.length === 0) {
      return {
        laufendeKalkulationen: 0,
        durchschnittlicherGewinn: 0,
        durchschnittlicheEkQuote: 0
      };
    }

    const laufendeKalkulationen = windparks.filter(wp => wp.status === 'Laufend').length;
    const durchschnittlicherGewinn = windparks.reduce((sum, wp) => sum + wp.gewinnProAnnum, 0) / windparks.length;
    const durchschnittlicheEkQuote = windparks.reduce((sum, wp) => sum + wp.ekQuote, 0) / windparks.length;

    return {
      laufendeKalkulationen,
      durchschnittlicherGewinn,
      durchschnittlicheEkQuote
    };
  }, [windparks]);

  /**
   * Fügt ein neues Windpark-Projekt hinzu
   */
  const handleNewProject = (newWindpark: Windpark) => {
    setWindparks(prev => [...prev, newWindpark]);
    setCurrentPage('overview');
    setSuccessMessage(`Projekt "${newWindpark.name}" wurde erfolgreich angelegt!`);
    setShowSuccessAlert(true);
  };

  /**
   * Navigiert zur neuen Projekt Seite
   */
  const handleGoToNewProject = () => {
    setCurrentPage('new-project');
  };

  /**
   * Navigiert zurück zur Übersichtsseite
   */
  const handleBackToOverview = () => {
    setCurrentPage('overview');
  };

  /**
   * Schließt die Erfolgs-Benachrichtigung
   */
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh',
      backgroundColor: '#F8FAFC'
    }}>
      {/* App Bar */}
      <AppBar 
        position="static"
        elevation={0} 
        sx={{
          backgroundColor: 'transparent',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          {/* Back Button für New Project Page */}
          {currentPage === 'new-project' && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackToOverview}
              sx={{ mr: 2 }}
              aria-label="Zurück zur Übersicht"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          
          {/* App Icon */}
          <WindPowerIcon sx={{ mr: 2 }} />
          
          {/* App Title */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600
            }}
          >
            Windprojekt Kalkulator
          </Typography>

          {/* Page Indicator */}
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {currentPage === 'overview' ? 'Projektübersicht' : 'Neues Projekt'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ pt: 4, pb: 4 }}>
        {currentPage === 'overview' ? (
          <OverviewPage
            testWindparks={windparks}
            kpis={kpis}
            onNewProject={handleGoToNewProject}
            handleApiCall={handleApiCall}
          />
        ) : (
          <NewProjectPage
            onSave={handleNewProject}
            onCancel={handleBackToOverview}
          />
        )}
      </Box>

      {/* Success Notification */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccessAlert} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'grey.100',
          borderTop: '1px solid',
          borderColor: 'grey.300',
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          © 2024 Windprojekt Kalkulator - Professionelle Windenergie-Kalkulationen
        </Typography>
      </Box>
    </Box>
  );
};

export default App;