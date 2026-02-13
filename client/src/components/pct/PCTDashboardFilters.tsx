import React, { useState } from 'react';
import { Box, Typography, Button, Switch, FormControlLabel } from '@pankod/refine-mui';
import {
  Home,
  Folder,
  Schedule,
  Assessment,
  AttachMoney,
  Warning,
  Block,
} from '@mui/icons-material';
import { PCT_COLORS } from '../../theme/pctTheme';

const FILTER_SECTIONS = [
  { label: 'Home', icon: <Home /> },
  { label: 'PPM Responsibility', icon: null },
  { label: 'Project', sublabel: 'TA Portfolio', icon: <Folder /> },
  { label: 'Timeline', sublabel: 'Asset/Program', icon: <Schedule /> },
  { label: 'KPIs', sublabel: 'Priority', icon: <Assessment /> },
  { label: 'Milestones', sublabel: 'Priority', icon: null },
  { label: 'Cost/FTE', sublabel: 'Project Status', icon: <AttachMoney /> },
  { label: 'Risks', sublabel: 'Project Phase', icon: <Warning /> },
  { label: 'Terminated', sublabel: 'Disease/Indication', icon: <Block /> },
];

const PCTDashboardFilters: React.FC = () => {
  const [liveData, setLiveData] = useState(true);

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        bgcolor: '#fff',
        borderRight: `1px solid ${PCT_COLORS.border}`,
        p: 2,
        height: 'fit-content',
      }}
    >
      {/* PCT Branding */}
      <Box sx={{ mb: 3 }}>
        <Typography
          component="span"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: PCT_COLORS.red,
          }}
        >
          PCT
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: 14,
            color: PCT_COLORS.grey,
            ml: 0.5,
          }}
        >
          Pipeline Control Tower
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: PCT_COLORS.border,
            color: PCT_COLORS.grey,
            fontSize: 12,
          }}
        >
          Filters 10
        </Button>
        <Button
          variant="text"
          size="small"
          sx={{
            color: PCT_COLORS.grey,
            fontSize: 12,
          }}
        >
          Clear
        </Button>
      </Box>

      {/* Live/Snapshot Toggle */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color={PCT_COLORS.grey} sx={{ mb: 1, fontSize: 12 }}>
          Live/Snapshot Data
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={liveData}
              onChange={(e) => setLiveData(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: PCT_COLORS.green,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: PCT_COLORS.green,
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: liveData ? PCT_COLORS.green : PCT_COLORS.grey,
              }}
            >
              Live
            </Typography>
          }
        />
      </Box>

      {/* Filter sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {FILTER_SECTIONS.map((section) => (
          <Box key={section.label} sx={{ borderBottom: `1px solid ${PCT_COLORS.border}` }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1.5,
                cursor: 'pointer',
                '&:hover': { bgcolor: PCT_COLORS.greyBg },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {section.icon && (
                  <Box sx={{ color: PCT_COLORS.grey, fontSize: 18 }}>{section.icon}</Box>
                )}
                <Typography variant="body2" fontSize={13} color="#374151">
                  {section.label}
                </Typography>
              </Box>
              <Typography variant="caption" color={PCT_COLORS.grey} fontSize={11}>
                Select
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 3,
          color: PCT_COLORS.greyLight,
          fontSize: 11,
        }}
      >
        PCT
      </Typography>
    </Box>
  );
};

export default PCTDashboardFilters;
