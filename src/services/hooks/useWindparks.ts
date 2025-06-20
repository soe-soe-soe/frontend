import { useState, useEffect } from 'react';
import { Windpark } from '../../types';
import { apiService } from '../api';

/**
 * Custom Hook für Windpark-Daten
 * Kapselt die Logik für das Laden und Verwalten von Windpark-Daten
 */
export const useWindparks = (fallbackData?: Windpark[]) => {
  const [windparks, setWindparks] = useState<Windpark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWindparks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getProjects();
      setWindparks(response);
    } catch (err) {
      setError('Fehler beim Laden der Windparkprojekte');
      console.error(err);
      
      // Fallback zu Testdaten falls verfügbar
      if (fallbackData && fallbackData.length > 0) {
        setWindparks(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshWindparks = () => {
    loadWindparks();
  };

  useEffect(() => {
    loadWindparks();
  }, []);

  // Verwende API-Daten oder Fallback-Daten
  const displayWindparks = windparks.length > 0 ? windparks : (fallbackData || []);

  return {
    windparks: displayWindparks,
    loading,
    error,
    refreshWindparks,
    hasApiData: windparks.length > 0
  };
}; 