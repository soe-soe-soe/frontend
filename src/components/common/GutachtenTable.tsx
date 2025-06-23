import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  useTheme
} from '@mui/material';

interface Gutachten {
  id: number;
  aktiv: boolean;
  typ: string;
  erstelltAm: Date;
}

interface GutachtenTableProps {
  gutachten: Gutachten[];
}

/**
 * Gutachten Table Component
 * Zeigt alle Gutachten in einer responsiven Tabelle an
 */
const GutachtenTable: React.FC<GutachtenTableProps> = ({ gutachten }) => {
  const theme = useTheme();

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F8FAFC' }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Aktiv
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Typ
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Erstellt am
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gutachten.map((item) => (
            <TableRow
              key={item.id}
              hover
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Chip
                  label={item.aktiv ? 'Ja' : 'Nein'}
                  size="small"
                  color={item.aktiv ? 'success' : 'default'}
                  variant={item.aktiv ? 'filled' : 'outlined'}
                  sx={{ minWidth: '60px' }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {item.typ}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {formatDate(item.erstelltAm)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GutachtenTable; 