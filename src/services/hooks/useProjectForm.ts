import { useState } from 'react';
import { NewProjectFormData, Anlage, ValidationErrors } from '../../types';
import { isNotEmpty, isPositive } from '../../utils/formatters';

/**
 * Custom Hook für Projekt-Formular-Management
 * Kapselt Form State, Validation und Submission-Logik
 */
export const useProjectForm = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setShowValidation(true);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submits the form data to the API
   */
  const submitForm = async (onSuccess?: (data: any) => void) => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

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
      
      if (onSuccess) {
        onSuccess(savedProject);
      }
      
      return true;
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      // TODO: Hier könnten wir einen Fehler-State setzen
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form Data
    formData,
    anlagen,
    errors,
    showValidation,
    isSubmitting,
    
    // Form Actions
    handleInputChange,
    handleAnlageChange,
    addAnlage,
    removeAnlage,
    validateForm,
    submitForm
  };
}; 