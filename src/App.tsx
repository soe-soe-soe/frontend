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
  WindPower as WindPowerIcon
} from '@mui/icons-material';

import { Windpark, KPIData, PageType } from './types';
import { initialWindparks } from './data/testData';
import OverviewPage from './components/pages/OverviewPage';
import NewProjectPage from './components/pages/NewProjectPage';
import ProjectDetailPage from './components/pages/ProjectDetailPage';
import ProjectIncome from './components/pages/ProjectIncome';
import ProjectTariffs from './components/pages/ProjectTariffs';
import ProjectCosts from './components/pages/ProjectCosts';
import ProjectProfitAndLoss from './components/pages/ProjectProfitAndLoss';
import ProjectInvestment from './components/pages/ProjectInvestment';
import { apiService } from './services/api';

/**
 * Hauptkomponente der Windprojekt Kalkulator Anwendung
 * Verwaltet den globalen State und die Navigation zwischen den Seiten
 */
const App: React.FC = () => {
  // State Management
  const [windparks, setWindparks] = useState<Windpark[]>(initialWindparks);
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const [currentProject, setCurrentProject] = useState<Windpark | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any>(null);

  //TEST: API Call
  const handleApiCall = async () => {
    setLoading(true);
    try {
      // API aufrufen
      const data = await apiService.getProjects();
      setApiData(data);
      
      // Windparks aus den API-Daten aktualisieren
      if (data && Array.isArray(data)) {
        setWindparks(data);
      }
      
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
   * Fügt ein neues Windpark-Projekt hinzu und navigiert zur Detailseite
   */
  const handleNewProject = (newWindpark: Windpark) => {
    setWindparks(prev => [...prev, newWindpark]);
    setCurrentProject(newWindpark);
    setCurrentPage('project-detail');
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
   * Navigiert zurück zur Projekt-Detailseite
   */
  const handleBackToProjectDetail = () => {
    setCurrentPage('project-detail');
  };

  /**
   * Navigiert zu einer spezifischen Tab-Seite
   */
  const handleTabNavigation = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: // Windpark
        setCurrentPage('project-detail');
        break;
      case 1: // Gutachten
        setCurrentPage('project-income');
        break;
      case 2: // Tarife
        setCurrentPage('project-tariffs');
        break;
      case 3: // Kosten
        setCurrentPage('project-costs');
        break;
      case 4: // GuV
        setCurrentPage('project-profit-loss');
        break;
      case 5: // Investition
        setCurrentPage('project-investment');
        break;
      default:
        setCurrentPage('project-detail');
    }
  };

  /**
   * Öffnet die Detailseite für ein ausgewähltes Projekt
   */
  const handleProjectSelect = (windpark: Windpark) => {
    setCurrentProject(windpark);
    setCurrentPage('project-detail');
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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ pt: 4, pb: 4 }}>
        {currentPage === 'overview' ? (
          <OverviewPage
            testWindparks={windparks}
            kpis={kpis}
            onNewProject={handleGoToNewProject}
            onProjectSelect={handleProjectSelect}
            handleApiCall={handleApiCall}
          />
        ) : currentPage === 'new-project' ? (
          <NewProjectPage
            onSave={handleNewProject}
            onCancel={handleBackToOverview}
          />
        ) : currentPage === 'project-detail' ? (
          currentProject && (
            <ProjectDetailPage
              project={currentProject}
              onBack={handleBackToOverview}
              onTabChange={handleTabNavigation}
              currentTab={0}
            />
          )
        ) : currentPage === 'project-income' ? (
          currentProject && (
            <ProjectIncome
              project={currentProject}
              onBack={handleBackToProjectDetail}
              onTabChange={handleTabNavigation}
              currentTab={1}
            />
          )
        ) : currentPage === 'project-tariffs' ? (
          currentProject && (
            <ProjectTariffs
              project={currentProject}
              onBack={handleBackToProjectDetail}
              onTabChange={handleTabNavigation}
              currentTab={2}
            />
          )
        ) : currentPage === 'project-costs' ? (
          currentProject && (
            <ProjectCosts
              project={currentProject}
              onBack={handleBackToProjectDetail}
              onTabChange={handleTabNavigation}
              currentTab={3}
            />
          )
        ) : currentPage === 'project-profit-loss' ? (
          currentProject && (
            <ProjectProfitAndLoss
              project={currentProject}
              onBack={handleBackToProjectDetail}
              onTabChange={handleTabNavigation}
              currentTab={4}
            />
          )
        ) : currentPage === 'project-investment' ? (
          currentProject && (
            <ProjectInvestment
              project={currentProject}
              onBack={handleBackToProjectDetail}
              onTabChange={handleTabNavigation}
              currentTab={5}
            />
          )
        ) : null}
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