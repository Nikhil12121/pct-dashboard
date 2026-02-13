import React from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { PCT_COLORS } from '../../theme/pctTheme';

interface PCTKPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const PCTKPICard: React.FC<PCTKPICardProps> = ({ title, value, icon }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 120,
      bgcolor: '#fff',
      borderRadius: '8px',
      p: 2,
      border: `1px solid ${PCT_COLORS.border}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 0.5,
    }}
  >
    <Typography variant="body2" color={PCT_COLORS.grey} fontSize={12}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon && <Box sx={{ color: PCT_COLORS.red }}>{icon}</Box>}
      <Typography fontWeight={700} fontSize={18} color="#111827">
        {value}
      </Typography>
    </Box>
  </Box>
);

export default PCTKPICard;
