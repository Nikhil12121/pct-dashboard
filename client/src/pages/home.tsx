import React from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import {
  Schedule,
  AttachMoney,
  People,
  Warning,
} from '@mui/icons-material';
import { useGetIdentity } from '@pankod/refine-core';

import PCTKPICard from 'components/pct/PCTKPICard';
import PCTProgressBar from 'components/pct/PCTProgressBar';
import PCTProjectsTimeline from 'components/pct/PCTProjectsTimeline';
import { PCT_COLORS } from '../theme/pctTheme';

const Home = () => {
  const { data: user } = useGetIdentity();
  const userName = user?.name || 'Nikhil';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Box sx={{ minHeight: '100%', bgcolor: PCT_COLORS.greyBg }}>
      {/* Greeting */}
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 700,
          color: PCT_COLORS.reddishBrown,
          mb: 3,
        }}
      >
        {getGreeting()}, {userName}!
      </Typography>

      {/* KPI Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <PCTKPICard title="Overall Pipeline Health" value="60 projects" />
        <PCTKPICard
          title="Timeline"
          value="13"
          icon={<Schedule sx={{ fontSize: 20 }} />}
        />
        <PCTKPICard
          title="Cost"
          value="12"
          icon={<AttachMoney sx={{ fontSize: 20 }} />}
        />
        <PCTKPICard
          title="FTE"
          value="13"
          icon={<People sx={{ fontSize: 20 }} />}
        />
        <PCTKPICard
          title="Risks"
          value="12"
          icon={<Warning sx={{ fontSize: 20 }} />}
        />
      </Box>

      {/* Pipeline Breakdown - Two columns */}
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 3 }}>
        {/* Pipeline Stages */}
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            bgcolor: '#fff',
            borderRadius: '8px',
            p: 2,
            border: `1px solid ${PCT_COLORS.border}`,
          }}
        >
          <Typography variant="body2" fontWeight={600} color={PCT_COLORS.grey} sx={{ mb: 2, fontSize: 13 }}>
            Pipeline Stages
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PCTProgressBar label="Registration" value={5} max={20} />
            <PCTProgressBar label="Phase I" value={15} max={20} />
            <PCTProgressBar label="Phase II" value={12} max={20} />
            <PCTProgressBar label="Phase III" value={5} max={20} />
            <PCTProgressBar label="Pre-Clinical" value={12} max={20} />
          </Box>
        </Box>

        {/* Cost EPE IPE & FTE */}
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            bgcolor: '#fff',
            borderRadius: '8px',
            p: 2,
            border: `1px solid ${PCT_COLORS.border}`,
          }}
        >
          <Typography variant="body2" fontWeight={600} color={PCT_COLORS.grey} sx={{ mb: 2, fontSize: 13 }}>
            Cost EPE IPE & FTE
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PCTProgressBar label="Actual YTD" value={20} max={100} color={PCT_COLORS.red} />
            <PCTProgressBar label="Forecast YTD" value={40} max={100} color={PCT_COLORS.orange} />
            <PCTProgressBar label="FY Forecast" value={60} max={100} color={PCT_COLORS.grey} />
          </Box>
          <Typography variant="caption" color={PCT_COLORS.grey} sx={{ mt: 1, display: 'block' }}>
            Cost: £0.1M / £0.2M / £0.3M
          </Typography>
          <Typography variant="caption" color={PCT_COLORS.grey} sx={{ display: 'block' }}>
            FTE: 20 / 40 / 60
          </Typography>
        </Box>
      </Box>

      {/* Selected Project Details link */}
      <Typography variant="body2" color={PCT_COLORS.blue} sx={{ mb: 2, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
        Selected Project Details →
      </Typography>

      {/* Projects Timeline */}
      <PCTProjectsTimeline />

      {/* Legend - matching screenshot */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3, fontSize: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.grey, borderRadius: 1, transform: 'rotate(45deg)' }} />
          <span style={{ color: PCT_COLORS.grey }}>Stacked milestones</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.blue, borderRadius: '50%' }} />
          <span style={{ color: PCT_COLORS.grey }}>C2</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.red, borderRadius: 1, transform: 'rotate(45deg)' }} />
          <span style={{ color: PCT_COLORS.grey }}>Key Results</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: '#0d47a1', borderRadius: 1, transform: 'rotate(45deg)' }} />
          <span style={{ color: PCT_COLORS.grey }}>Phase 1, 2 & 3 Start</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.purple, borderRadius: 1, transform: 'rotate(45deg)' }} />
          <span style={{ color: PCT_COLORS.grey }}>Regulatory Submission, Approval & Launch</span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.grey, borderRadius: 1, transform: 'rotate(45deg)' }} />
          <span style={{ color: PCT_COLORS.grey }}>Study</span>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
