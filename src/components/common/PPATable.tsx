import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  useTheme
} from '@mui/material';
import { formatCentAmount } from '../../utils/formatters';

interface PPATarif {
  id: number;
  tarif: number;
  laufzeit: number;
  abnahmevolumen: number;
  preisformel: string;
  gegenpartei: string;
  herkunftsnachweis: boolean;
}

interface PPATableProps {
  ppaTarife: PPATarif[];
}

/**
 * PPA Table Component
 * Zeigt PPA-Tarife in einer strukturierten Tabelle an
 * Design identisch mit ProjectTable
 */
const PPATable: React.FC<PPATableProps> = ({ ppaTarife }) => {
  const theme = useTheme();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F8FAFC' }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                PPA
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Laufzeit
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Abnahmevolumen
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Preisformel
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Gegenpartei
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Herkunftsnachweis
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ppaTarife.map((ppa) => (
            <TableRow
              key={ppa.id}
              hover
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {formatCentAmount(ppa.tarif)} ct/kWh
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {ppa.laufzeit} Jahre
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {ppa.abnahmevolumen}%
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {ppa.preisformel}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {ppa.gegenpartei}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" fontWeight="medium">
                  {ppa.herkunftsnachweis ? 'Ja' : 'Nein'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PPATable;
export type { PPATarif }; 