import { SxProps, Theme } from '@mui/material/styles';

/**
 * Wiederverwendbare Button-Styles
 */
export const primaryActionButtonSx: SxProps<Theme> = {
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
}; 