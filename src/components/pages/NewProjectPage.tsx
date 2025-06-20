import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Container,
  Alert,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { de } from 'date-fns/locale';

import { NewProjectPageProps, Anlage, NewProjectFormData, ValidationErrors } from '../../types';
import { herstellerModelle } from '../../data/testData';
import { isNotEmpty, isPositive } from '../../utils/formatters';

/**
 * New Project Page Component
 * Formular zur Erstellung neuer Windpark-Projekte
 */
const NewProjectPage: React.FC<NewProjectPageProps> = ({ onSave, onCancel }) => {
  // Form State
  const [formData, setFormData] = useState<NewProjectFormData>({
    name: '',
    standort: '',
    baubeginn: null,
    inbetriebnahme: null,
    status: 'Entwurf'
  });

  // Anlagen State
  const [anlagen, setAnlagen] = useState<Anlage[]>([
    { id: '1', hersteller: '', modell: '', anzahl: 1 }
  ]);

  // Validation State
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showValidation, setShowValidation] = useState(false);

  /**
   * Handles input changes for form fields
   */
  const handleInputChange = (field: keyof NewProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Handles changes to Anlage fields
   */
  const handleAnlageChange = (index: number, field: keyof Anlage, value: any) => {
    setAnlagen(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      // Reset modell when hersteller changes
      if (field === 'hersteller') {
        updated[index].modell = '';
      }
      
      return updated;
    });

    // Clear validation errors for this anlage
    const errorKey = `anlage_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  /**
   * Adds a new Anlage to the form
   */
  const addAnlage = () => {
    const newId = Date.now().toString();
    setAnlagen(prev => [
      ...prev,
      { id: newId, hersteller: '', modell: '', anzahl: 1 }
    ]);
  };

  /**
   * Removes an Anlage from the form
   */
  const removeAnlage = (index: number) => {
    if (anlagen.length > 1) {
      setAnlagen(prev => prev.filter((_, i) => i !== index));
      
      // Remove validation errors for removed anlage
      const updatedErrors = { ...errors };
      Object.keys(updatedErrors).forEach(key => {
        if (key.startsWith(`anlage_${index}_`)) {
          delete updatedErrors[key];
        }
      });
      setErrors(updatedErrors);
    }
  };

  /**
   * Validates the entire form
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Nur Name ist verpflichtend
    if (!isNotEmpty(formData.name)) {
      newErrors.name = 'Projektname ist erforderlich';
    }
    
    // Date validation nur wenn beide Daten vorhanden sind
    if (formData.baubeginn && formData.inbetriebnahme) {
      if (formData.baubeginn >= formData.inbetriebnahme) {
        newErrors.inbetriebnahme = 'Inbetriebnahme muss nach Baubeginn liegen';
      }
    }

    // Anlagen validation nur wenn Hersteller oder Modell angegeben wurden
    anlagen.forEach((anlage, index) => {
      if (anlage.hersteller && !isNotEmpty(anlage.hersteller)) {
        newErrors[`anlage_${index}_hersteller`] = 'Hersteller ist erforderlich';
      }
      
      if (anlage.modell && !isNotEmpty(anlage.modell)) {
        newErrors[`anlage_${index}_modell`] = 'Modell ist erforderlich';
      }
      
      if (anlage.anzahl && !isPositive(anlage.anzahl)) {
        newErrors[`anlage_${index}_anzahl`] = 'Anzahl muss positiv sein';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Bereite die Daten für den API-Request vor
      const projectData = {
        name: formData.name,
        standort: formData.standort || null,
        baubeginn: formData.baubeginn || null,
        inbetriebnahme: formData.inbetriebnahme || null,
        status: formData.status,
        anlagen: anlagen
          .filter(anlage => anlage.hersteller) // Nur Anlagen mit Hersteller
          .map(anlage => ({
            hersteller: anlage.hersteller,
            modell: anlage.modell,
            anzahl: anlage.anzahl
          }))
      };

      const url = 'http://localhost:8000/api/v1/projects';
      console.log('Sende POST-Request an:', url);
      console.log('Sende POST-Request an /projects mit Daten:', projectData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Fehler beim POST-Request:', errorData);
        throw new Error(errorData.detail || 'Fehler beim Speichern des Projekts');
      }

      const savedProject = await response.json();
      console.log('Erfolgreiche Response vom POST-Request:', savedProject);
      onSave(savedProject);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      // Hier könnten wir einen Fehler-State setzen und dem Benutzer eine Meldung anzeigen
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Neues Windpark-Projekt Anlegen
            </Typography>
          </Box>
        <Paper elevation={3} sx={{ p: 4 }}>

          {/* Validation Alert */}
          {showValidation && Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Bitte korrigieren Sie die markierten Felder bevor Sie fortfahren.
            </Alert>
          )}

          {/* Windpark Information */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Projekt-Informationen
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Projektname"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
                placeholder="z.B. Windpark Nordsee Alpha"
              />
              <Box sx={{ mt: 3 }}>
                <DatePicker
                  label="Baubeginn"
                  value={formData.baubeginn}
                  onChange={(date) => handleInputChange('baubeginn', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.baubeginn,
                      helperText: errors.baubeginn,
                      placeholder: 'z.B. 01.01.2024'
                    }
                  }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <DatePicker
                  label="Inbetriebnahme"
                  value={formData.inbetriebnahme}
                  onChange={(date) => handleInputChange('inbetriebnahme', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.inbetriebnahme,
                      helperText: errors.inbetriebnahme,
                      placeholder: 'z.B. 01.01.2025'
                    }
                  }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Standort"
                value={formData.standort}
                onChange={(e) => handleInputChange('standort', e.target.value)}
                error={!!errors.standort}
                helperText={errors.standort}
                placeholder="z.B. Husum, Schleswig-Holstein"
              />
            </Grid>
          </Grid>

          {/* Anlagen Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Anlagen
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addAnlage}
              size="small"
            >
              Anlage hinzufügen
            </Button>
          </Box>
          <Box sx={{ mb: 4 }}>
            {anlagen.map((anlage, index) => (
              <Box
                key={anlage.id}
                sx={{
                  mb: 2,
                  '&:last-child': { mb: 0 }
                }}
              >
                {/* Dropdown für Hersteller */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <FormControl 
                      fullWidth 
                      error={!!errors[`anlage_${index}_hersteller`]}
                    >
                      <InputLabel>Hersteller *</InputLabel>
                      <Select
                        value={anlage.hersteller}
                        label="Hersteller *"
                        onChange={(e) => handleAnlageChange(index, 'hersteller', e.target.value)}
                      >
                        {Object.keys(herstellerModelle).map(hersteller => (
                          <MenuItem key={hersteller} value={hersteller}>
                            {hersteller}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[`anlage_${index}_hersteller`] && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                          {errors[`anlage_${index}_hersteller`]}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  {/* Dropdown für Modell */}
                  <Grid item xs={12} md={4}>
                    <FormControl 
                      fullWidth 
                      error={!!errors[`anlage_${index}_modell`]} 
                      disabled={!anlage.hersteller}
                    >
                      <InputLabel>Modell *</InputLabel>
                      <Select
                        value={anlage.modell}
                        label="Modell *"
                        onChange={(e) => handleAnlageChange(index, 'modell', e.target.value)}
                      >
                        {anlage.hersteller && herstellerModelle[anlage.hersteller]?.map(modell => (
                          <MenuItem key={modell} value={modell}>
                            {modell}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[`anlage_${index}_modell`] && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                          {errors[`anlage_${index}_modell`]}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  {/* Input: Anzahl der Anlagen */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Anzahl"
                      type="number"
                      value={anlage.anzahl}
                      onChange={(e) => handleAnlageChange(index, 'anzahl', parseInt(e.target.value) || 1)}
                      error={!!errors[`anlage_${index}_anzahl`]}
                      helperText={errors[`anlage_${index}_anzahl`]}
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Grid>
                  {/* Löschen-Button */}
                  <Grid item xs={12} md={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <IconButton
                        onClick={() => removeAnlage(index)}
                        color={anlagen.length > 1 ? "error" : "default"} // Button ist rot, sobald mehr als eine Anlage vorhanden ist
                        size="small"
                        disabled={anlagen.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              size="large"
              sx={{ px: 4 }}
            >
              Abbrechen
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              size="large"
              sx={{
                px: 4,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                },
              }}
            >
              Projekt Speichern
            </Button>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default NewProjectPage;