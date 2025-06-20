import React from 'react';
import { Alert } from '@mui/material';

interface ValidationStateProps {
  errors: Record<string, string>;
  showValidation: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info';
}

/**
 * Wiederverwendbare Validation-State Komponente
 * Zeigt Validierungsfehler in einem Alert an
 */
const ValidationState: React.FC<ValidationStateProps> = ({ 
  errors, 
  showValidation, 
  message = "Bitte korrigieren Sie die markierten Felder bevor Sie fortfahren.",
  severity = "error"
}) => {
  // Nur anzeigen wenn Validation aktiv ist und Fehler vorhanden sind
  if (!showValidation || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <Alert severity={severity} sx={{ mb: 3 }}>
      {message}
    </Alert>
  );
};

export default ValidationState; 