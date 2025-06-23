import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatCurrency } from '../../utils/formatters';

interface CostTableItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  totalCost: number;
}

interface CostTableProps {
  items: CostTableItem[];
  totalSum: number;
  columns?: {
    name?: string;
    unitPrice?: string;
    quantity?: string;
    totalCost?: string;
  };
}

const CostTable: React.FC<CostTableProps> = ({ 
  items, 
  totalSum,
  columns = {
    name: 'Hersteller & Typ',
    unitPrice: 'Einzelpreis',
    quantity: 'Stückzahl',
    totalCost: 'Gesamtkosten'
  }
}) => {
  return (
    <TableContainer sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F8FAFC' }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight="bold">
                {columns.name}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                {columns.unitPrice}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                {columns.quantity}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" fontWeight="bold">
                {columns.totalCost}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {item.name}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(item.unitPrice)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight="medium">
                  {item.quantity}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(item.totalCost)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CostTable; 