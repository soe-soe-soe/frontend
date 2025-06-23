import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface ProjectTabsProps {
  onTabChange?: (tabIndex: number) => void;
  currentTab?: number;
}

/**
 * Project Tabs Component
 * Tab-Navigation für Projekt-Details mit festen Labels
 * Der Content wird in den jeweiligen Seiten verwaltet
 */
const ProjectTabs: React.FC<ProjectTabsProps> = ({ onTabChange, currentTab = 0 }) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  const tabLabels = ['Windpark', 'Gutachten', 'Tarife', 'Kosten', 'GuV', 'Investition'];

  return (
    <Box sx={{ pb: 0, pt: 0, px: 4 }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{ 
          '& .MuiTab-root': {
            fontWeight: 600,
            fontSize: '1rem',
          }
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProjectTabs; 