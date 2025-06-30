import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface CollapsibleColumnButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
  tooltip?: string;
}

/**
 * Collapsible Column Button Component
 * Wiederverwendbarer Button zum Auf-/Zuklappen von Tabellenspalten
 */
const CollapsibleColumnButton: React.FC<CollapsibleColumnButtonProps> = ({
  isExpanded,
  onToggle,
  tooltip = 'Details anzeigen/verbergen'
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        size="small"
        onClick={onToggle}
        sx={{
          ml: 1,
          color: 'text.secondary',
          '&:hover': {
            color: 'primary.main',
          }
        }}
      >
        {isExpanded ? (
          <ChevronLeftIcon fontSize="small" />
        ) : (
          <ChevronRightIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CollapsibleColumnButton; 