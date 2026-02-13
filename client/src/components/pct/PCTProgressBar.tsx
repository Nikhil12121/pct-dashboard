import React from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { PCT_COLORS } from '../../theme/pctTheme';

interface PCTProgressBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

const PCTProgressBar: React.FC<PCTProgressBarProps> = ({
  label,
  value,
  max = 100,
  color = PCT_COLORS.red,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <Stack spacing={0.5}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color={PCT_COLORS.grey} fontSize={12}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} color={PCT_COLORS.red} fontSize={13}>
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 8,
          bgcolor: PCT_COLORS.greyBg,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${percentage}%`,
            bgcolor: color,
            borderRadius: 4,
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
    </Stack>
  );
};

export default PCTProgressBar;
