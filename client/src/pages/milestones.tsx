import React from 'react';
import { Box, Typography, Button, ButtonGroup } from '@pankod/refine-mui';

const PCT_COLORS = {
  red: '#E53935',
  orange: '#FFB300',
  green: '#43A047',
  blue: '#1E88E5',
  teal: '#00897B',
  lightGreen: '#81C784',
  grey: '#6b7280',
  border: '#e5e7eb',
  accent: '#E85C0A',
};

const MILESTONE_LABELS = ['1stINDsub', 'FDIH', 'FirstPHIIDose', 'PoC', 'EOPNIMtg'];

const Milestones = () => (
  <Box>
    {/* Header with View selector */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
      <Typography sx={{ fontSize: 22, fontWeight: 700, color: PCT_COLORS.accent }}>
        Milestones Slippage
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color={PCT_COLORS.grey}>View:</Typography>
        <ButtonGroup size="small">
          <Button variant="contained" sx={{ bgcolor: PCT_COLORS.accent, '&:hover': { bgcolor: '#d14d08' } }}>
            Milestone
          </Button>
          <Button variant="outlined" sx={{ borderColor: PCT_COLORS.border }}>Year</Button>
          <Button variant="outlined" sx={{ borderColor: PCT_COLORS.border }}>Table</Button>
        </ButtonGroup>
      </Box>
    </Box>

    {/* Summary Cards - with colored status badges */}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
      {[
        { label: 'Delayed', sub: '3+ month slippage', bg: '#ffebee', border: PCT_COLORS.red, projects: 69, milestones: 422 },
        { label: 'Slight delay', sub: '1-3 month slippage', bg: '#fff8e1', border: PCT_COLORS.orange, projects: 69, milestones: 422 },
        { label: 'On track', sub: 'On time, <1 month delay', bg: '#e8f5e9', border: PCT_COLORS.green, projects: 69, milestones: 422 },
        { label: 'Accelerated', sub: '30+ days faster', bg: '#e3f2fd', border: PCT_COLORS.blue, projects: 69, milestones: 422 },
      ].map((card) => (
        <Box
          key={card.label}
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            bgcolor: '#fff',
            borderRadius: 1,
            border: `1px solid ${PCT_COLORS.border}`,
            borderTop: `4px solid ${card.border}`,
          }}
        >
          <Box sx={{ 
            display: 'inline-block', 
            px: 1.5, 
            py: 0.5, 
            borderRadius: 1, 
            bgcolor: card.bg, 
            mb: 1,
            border: `1px solid ${card.border}`,
          }}>
            <Typography variant="caption" sx={{ color: card.border, fontWeight: 600 }}>{card.label}</Typography>
          </Box>
          <Typography variant="body2" color={PCT_COLORS.grey} sx={{ display: 'block', mb: 0.5 }}>{card.sub}</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#111827' }}>{card.projects} projects</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#111827' }}>{card.milestones} milestones</Typography>
        </Box>
      ))}
    </Box>

    {/* Stacked bar charts by year */}
    {[2024, 2025, 2026, 2027, 2028].map((year) => (
      <Box key={year} sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#374151', mb: 2 }}>{year}</Typography>
        <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
          {MILESTONE_LABELS.map((label, i) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Typography sx={{ width: 120, fontSize: 12, color: PCT_COLORS.grey }}>{label}</Typography>
              <Box sx={{ flex: 1, display: 'flex', height: 24, borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ width: '15%', bgcolor: PCT_COLORS.red }} />
                <Box sx={{ width: '25%', bgcolor: PCT_COLORS.orange }} />
                <Box sx={{ width: '40%', bgcolor: PCT_COLORS.teal }} />
                <Box sx={{ width: '20%', bgcolor: PCT_COLORS.lightGreen }} />
              </Box>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
            {[0, 5, 10, 15, 20, 25, 30].map((n) => (
              <Typography key={n} variant="caption" color={PCT_COLORS.grey}>{n}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
    ))}

    {/* Legend */}
    <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{ width: 14, height: 14, bgcolor: PCT_COLORS.red, borderRadius: 1 }} />
        <Typography variant="body2">Delayed</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{ width: 14, height: 14, bgcolor: PCT_COLORS.orange, borderRadius: 1 }} />
        <Typography variant="body2">Slightly Delayed</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{ width: 14, height: 14, bgcolor: PCT_COLORS.teal, borderRadius: 1 }} />
        <Typography variant="body2">On track</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{ width: 14, height: 14, bgcolor: PCT_COLORS.lightGreen, borderRadius: 1 }} />
        <Typography variant="body2">Accelerated</Typography>
      </Box>
    </Box>
  </Box>
);

export default Milestones;
