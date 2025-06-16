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
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { ProjectTableProps } from '../../types';
import {
  formatCurrency,
  formatPercentage,
  getStatusChipProps,
  calculateTotalAnlagen
} from '../../utils/formatters';

/**
 * Project Table Component
 * Zeigt alle Windpark-Projekte in einer responsiven Tabelle an
 */
const ProjectTable: React.FC<ProjectTableProps> = ({ windparks }) => {
  const theme = useTheme();

  // Desktop Table Layout
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F8FAFC' }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Projekt
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                Status
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                Anlagen
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                Gewinn p.a.
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                Investitionsvolumen
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                EK-Quote
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                FK-Zins
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                RoI
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight="bold">
                Aktionen
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {windparks.map((windpark) => {
            const gesamtAnlagen = calculateTotalAnlagen(windpark.anlagen);
            const chipProps = getStatusChipProps(windpark.status);
            return (
              <TableRow
                key={windpark.id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {windpark.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {windpark.standort}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                <Chip
                  label={windpark.status}
                  size="small"
                  variant="filled"
                  {...chipProps}
                />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {gesamtAnlagen}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(windpark.gewinnProAnnum)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(windpark.investitionsvolumen)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {formatPercentage(windpark.ekQuote)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {formatPercentage(windpark.fkZins)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium" color="success.main">
                    {formatPercentage(windpark.roi)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    <Tooltip title="Bearbeiten">
                      <IconButton
                        size="small"
                        color="primary"
                        disabled
                        sx={{ opacity: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Löschen">
                      <IconButton
                        size="small"
                        color="error"
                        disabled
                        sx={{ opacity: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;