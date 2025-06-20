import { SxProps, Theme } from '@mui/material/styles';

/**
 * Wiederverwendbare Button-Styles
 */
export const primaryActionButton: SxProps<Theme> = {
  px: 3,
  py: 1.5,
  fontSize: '1rem',
  fontWeight: 500,
  borderRadius: 2,
  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
  boxShadow: '0 2px 12px rgba(25, 118, 210, 0.25)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.35)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.3s ease',
};

/**
 * Style für sekundäre Action-Buttons (z.B. Abbrechen)
 */
export const secondaryActionButton: SxProps<Theme> = {
  px: 3,
  py: 1.5,
  fontSize: '1rem',
  fontWeight: 500,
  borderRadius: 2,
  boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.3s ease',
};

/**
 * Style für kleine Utility-Buttons (z.B. "Anlage hinzufügen")
 */
export const utilityButton: SxProps<Theme> = {
  // Behält den aktuellen MUI outlined small Button Stil bei
  // Keine besonderen Überschreibungen - nutzt Standard MUI Styling
}; 