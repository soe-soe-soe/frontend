import React from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Info as InfoIcon
} from '@mui/icons-material';


import { NewProjectPageProps } from '../../types';
import { herstellerModelle } from '../../data/testData';
import { useProjectForm } from '../../services/hooks';
import { primaryActionButton, secondaryActionButton, utilityButton } from '../../styles/buttonStyles';
import { formatDateForInput } from '../../utils/formatters';
import ValidationState from '../common/ValidationState';
import ProjectHeader from '../common/ProjectHeader';

/**
 * New Project Page Component
 * Formular zur Erstellung neuer Windpark-Projekte
 */
const NewProjectPage: React.FC<NewProjectPageProps> = ({ onSave, onCancel }) => {
  const {
    formData,
    anlagen,
    errors,
    showValidation,
    isSubmitting,
    handleInputChange,
    handleAnlageChange,
    addAnlage,
    removeAnlage,
    submitForm
  } = useProjectForm();

  const handleSave = async () => {
    const success = await submitForm(onSave);
  };

  return (
    <Container maxWidth="lg">

        {/* Validation State */}
        <ValidationState errors={errors} showValidation={showValidation} />

        {/* Header */}
        <ProjectHeader 
          name="Neues Windpark-Projekt anlegen" 
          onBack={onCancel}
          showBackButton={true}
        />

          {/* Form */}
          <Paper elevation={3} sx={{ p: 4 }}>

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
                <TextField
                  fullWidth
                  label="Baubeginn"
                  type="date"
                  value={formatDateForInput(formData.baubeginn)}
                  onChange={(e) => handleInputChange('baubeginn', e.target.value ? new Date(e.target.value) : null)}
                  error={!!errors.baubeginn}
                  helperText={errors.baubeginn}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Inbetriebnahme"
                  type="date"
                  value={formatDateForInput(formData.inbetriebnahme)}
                  onChange={(e) => handleInputChange('inbetriebnahme', e.target.value ? new Date(e.target.value) : null)}
                  error={!!errors.inbetriebnahme}
                  helperText={errors.inbetriebnahme}
                  InputLabelProps={{ shrink: true }}
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
              sx={utilityButton}
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
              sx={secondaryActionButton}
            >
              Abbrechen
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              size="large"
              sx={primaryActionButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Speichere...' : 'Projekt Speichern'}
            </Button>
          </Box>
          
        </Paper>
      </Container>
  );
};

export default NewProjectPage;