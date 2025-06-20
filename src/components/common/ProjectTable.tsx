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
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { ProjectTableProps, Windpark } from '../../types';
import {
  formatCurrency,
  formatPercentage,
  calculateTotalAnlagen
} from '../../utils/formatters';
import StatusChip from './StatusChip';

/**
 * Project Table Component
 * Zeigt alle Windpark-Projekte in einer responsiven Tabelle an
 */
const ProjectTable: React.FC<ProjectTableProps> = ({ windparks, onProjectSelect }) => {
  const theme = useTheme();

  const handleRowClick = (windpark: Windpark) => {
    if (onProjectSelect) {
      onProjectSelect(windpark);
    }
  };

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
            return (
              <TableRow
                key={windpark.id}
                hover
                onClick={() => handleRowClick(windpark)}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    cursor: 'pointer',
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
                  <StatusChip status={windpark.status} />
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
                      <span>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled
                          sx={{ opacity: 0.5 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Löschen">
                      <span>
                        <IconButton
                          size="small"
                          color="error"
                          disabled
                          sx={{ opacity: 0.5 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </span>
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