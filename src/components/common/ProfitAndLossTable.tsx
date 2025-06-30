import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import CollapsibleColumnButton from './CollapsibleColumnButton';
import { GuVYear } from '../pages/ProjectProfitAndLoss';

interface ProfitAndLossTableProps {
  data: GuVYear[];
}

/**
 * Profit and Loss Table Component
 * GuV-Tabelle mit erweiterbaren Spaltengruppen
 */
const ProfitAndLossTable: React.FC<ProfitAndLossTableProps> = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({
    ertrag: false,
    aufwand: false,
    steuern: false
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getTotalSteuern = (year: GuVYear) => {
    return year.gewerbesteuer + year.koerperschaftsteuer;
  };

  if (data.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
        Keine Daten verfügbar
      </Typography>
    );
  }

  return (
    <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
      <Table 
        stickyHeader 
        sx={{ 
          minWidth: 800,
          '& .MuiTableCell-stickyHeader': {
            backgroundColor: '#F8FAFC',
            borderBottom: '2px solid',
            borderBottomColor: 'divider',
          }
        }}
      >
        <TableHead>
          <TableRow>
            {/* Jahr Spalte */}
            <TableCell 
              sx={{ 
                minWidth: 80,
                position: 'sticky',
                left: 0,
                zIndex: 3,
                backgroundColor: '#F8FAFC',
                borderRight: '1px solid',
                borderRightColor: 'divider',
                py: 1.5
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Jahr
              </Typography>
            </TableCell>
            
            {/* Erträge Detail-Spalten */}
            {expandedSections.ertrag && (
              <>
                <TableCell align="right" sx={{ 
                  minWidth: 140, 
                  py: 1.5,
                  borderLeft: '1px solid #e0e0e0'
                }}>
                  <Typography variant="body2" color="textSecondary">
                    Energieertrag
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 110, py: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    Zinsertrag
                  </Typography>
                </TableCell>
              </>
            )}
            
            {/* Gesamtertrag Spalte */}
            <TableCell 
              align="right" 
              sx={{ 
                minWidth: 150,
                borderRight: expandedSections.ertrag ? '1px solid #e0e0e0' : 'none',
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {expandedSections.ertrag && (
                  <CollapsibleColumnButton
                    isExpanded={expandedSections.ertrag}
                    onToggle={() => toggleSection('ertrag')}
                    tooltip="Erträge Details"
                  />
                )}
                <Typography variant="subtitle2" fontWeight="bold">
                  Gesamtertrag
                </Typography>
                {!expandedSections.ertrag && (
                  <CollapsibleColumnButton
                    isExpanded={expandedSections.ertrag}
                    onToggle={() => toggleSection('ertrag')}
                    tooltip="Erträge Details"
                  />
                )}
              </Box>
            </TableCell>
            
            {/* Aufwand Detail-Spalten */}
            {expandedSections.aufwand && (
              <>
                <TableCell align="right" sx={{ 
                  minWidth: 140, 
                  py: 1.5,
                  borderLeft: '1px solid #e0e0e0'
                }}>
                  <Typography variant="body2" color="textSecondary">
                    Lfd. Aufwand
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 140, py: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    Abschreibungen
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 110, py: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    Zinsen
                  </Typography>
                </TableCell>
              </>
            )}
            
            {/* Gesamtaufwand Spalte */}
            <TableCell 
              align="right" 
              sx={{ 
                minWidth: 150,
                borderRight: expandedSections.aufwand ? '1px solid #e0e0e0' : 'none',
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {expandedSections.aufwand && (
                  <CollapsibleColumnButton
                    isExpanded={expandedSections.aufwand}
                    onToggle={() => toggleSection('aufwand')}
                    tooltip="Aufwand Details"
                  />
                )}
                <Typography variant="subtitle2" fontWeight="bold">
                  Gesamtaufwand
                </Typography>
                {!expandedSections.aufwand && (
                  <CollapsibleColumnButton
                    isExpanded={expandedSections.aufwand}
                    onToggle={() => toggleSection('aufwand')}
                    tooltip="Aufwand Details"
                  />
                )}
              </Box>
            </TableCell>
            
            {/* Ergebnis vor Steuern */}
            <TableCell align="right" sx={{ minWidth: 150, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Ergebnis v. Steuern
              </Typography>
            </TableCell>
            
            {/* Steuer Detail-Spalten */}
            {expandedSections.steuern && (
              <>
                <TableCell align="right" sx={{ 
                  minWidth: 140, 
                  py: 1.5,
                  borderLeft: '1px solid #e0e0e0'
                }}>
                  <Typography variant="body2" color="textSecondary">
                    Gewerbesteuer
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 140, py: 1.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    Körperschaftsteuer
                  </Typography>
                </TableCell>
              </>
            )}
            
            {/* Steuern Gesamt */}
            <TableCell 
              align="right" 
              sx={{ 
                minWidth: 150,
                borderRight: expandedSections.steuern ? '1px solid #e0e0e0' : 'none',
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {expandedSections.steuern && (
                  <CollapsibleColumnButton
                    isExpanded={expandedSections.steuern}
                    onToggle={() => toggleSection('steuern')}
                    tooltip="Steuer Details"
                  />
                )}
                <Typography variant="subtitle2" fontWeight="bold">
                  Steuern
                </Typography>
                {!expandedSections.steuern && (
                  <CollapsibleColumnButton
                    isExpanded={expandedSections.steuern}
                    onToggle={() => toggleSection('steuern')}
                    tooltip="Steuer Details"
                  />
                )}
              </Box>
            </TableCell>
            
            {/* Ergebnis nach Steuern */}
            <TableCell align="right" sx={{ minWidth: 150, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Ergebnis n. Steuern
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {data.map((year) => (
            <TableRow key={year.jahr} hover>
              {/* Jahr */}
              <TableCell 
                sx={{ 
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  backgroundColor: 'background.paper',
                  borderRight: '1px solid',
                  borderRightColor: 'divider'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600
                  }}
                >
                  {year.jahr}
                </Typography>
              </TableCell>
              
              {/* Erträge Detail-Zellen */}
              {expandedSections.ertrag && (
                <>
                  <TableCell align="right" sx={{ borderLeft: '1px solid #e0e0e0' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.jahresenergieertrag)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.zinsertrag)}
                    </Typography>
                  </TableCell>
                </>
              )}
              
              {/* Gesamtertrag */}
              <TableCell 
                align="right" 
                sx={{ 
                  borderRight: expandedSections.ertrag ? '1px solid #e0e0e0' : 'none'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    fontWeight: 600
                  }}
                >
                  {formatCurrency(year.gesamtertrag)}
                </Typography>
              </TableCell>
              
              {/* Aufwand Detail-Zellen */}
              {expandedSections.aufwand && (
                <>
                  <TableCell align="right" sx={{ borderLeft: '1px solid #e0e0e0' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.laufenderAufwand)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.afa)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.zinsen)}
                    </Typography>
                  </TableCell>
                </>
              )}
              
              {/* Gesamtaufwand */}
              <TableCell 
                align="right" 
                sx={{ 
                  borderRight: expandedSections.aufwand ? '1px solid #e0e0e0' : 'none'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    fontWeight: 600
                  }}
                >
                  {formatCurrency(year.gesamtaufwand)}
                </Typography>
              </TableCell>
              
              {/* Ergebnis vor Steuern */}
              <TableCell align="right">
                <Typography 
                  variant="body2" 
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: year.ergebnisVorSteuern >= 0 ? 'success.main' : 'error.main'
                  }}
                >
                  {formatCurrency(year.ergebnisVorSteuern)}
                </Typography>
              </TableCell>
              
              {/* Steuer Detail-Zellen */}
              {expandedSections.steuern && (
                <>
                  <TableCell align="right" sx={{ borderLeft: '1px solid #e0e0e0' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.gewerbesteuer)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontWeight: 400,
                        color: 'text.secondary'
                      }}
                    >
                      {formatCurrency(year.koerperschaftsteuer)}
                    </Typography>
                  </TableCell>
                </>
              )}
              
              {/* Steuern Gesamt */}
              <TableCell 
                align="right" 
                sx={{ 
                  borderRight: expandedSections.steuern ? '1px solid #e0e0e0' : 'none'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace',
                    fontWeight: 600
                  }}
                >
                  {formatCurrency(getTotalSteuern(year))}
                </Typography>
              </TableCell>
              
              {/* Ergebnis nach Steuern */}
              <TableCell align="right">
                <Typography 
                  variant="body2" 
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: year.ergebnisNachSteuern >= 0 ? 'success.main' : 'error.main'
                  }}
                >
                  {formatCurrency(year.ergebnisNachSteuern)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfitAndLossTable; 