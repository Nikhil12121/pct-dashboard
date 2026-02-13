import React, { useState } from 'react';
import { Box, Typography, Button, ButtonGroup, IconButton, LinearProgress } from '@pankod/refine-mui';
import { ArrowBack, Schedule, AttachMoney, People, Shield } from '@mui/icons-material';
import PCTProjectsTimeline from 'components/pct/PCTProjectsTimeline';
import ReactApexChart from 'react-apexcharts';

const PCT_COLORS = {
  orange: '#E85C0A',
  grey: '#6b7280',
  border: '#e5e7eb',
  red: '#E53935',
  green: '#43A047',
  yellow: '#FFB300',
  blue: '#1E88E5',
};

const Project = () => {
  const [mainTab, setMainTab] = useState<'timeline' | 'milestones' | 'kips'>('milestones');
  const [costTab, setCostTab] = useState<'cost' | 'epe' | 'ipe'>('cost');

  const lineChartOptions = {
    chart: { type: 'line' as const },
    stroke: { curve: 'smooth' as const },
    colors: [PCT_COLORS.blue, PCT_COLORS.orange],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    legend: { position: 'bottom' as const },
  };
  const lineChartSeries = [
    { name: 'Selected Row', data: [1, 2, 1.5, 3, 2.5, 4, 3.5, 4, 3, 2.5, 2, 1.5] },
    { name: 'Selected Item', data: [0.5, 1, 1.5, 2, 2.5, 2, 2.5, 3, 2.5, 2, 1.5, 1] },
  ];
  const barChartOptions = {
    chart: { type: 'bar' as const },
    plotOptions: { bar: { horizontal: false, columnWidth: '60%' } },
    colors: [PCT_COLORS.blue, PCT_COLORS.orange],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    legend: { position: 'bottom' as const },
  };
  const barChartSeries = [
    { name: 'Selected Row', data: [2, 3, 2, 4, 3, 5, 4, 5, 4, 3, 2, 3] },
    { name: 'Selected Item', data: [1, 2, 2, 3, 2, 4, 3, 4, 3, 2, 1, 2] },
  ];

  return (
    <Box sx={{ color: '#1f2937' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <IconButton size="small" sx={{ p: 0, color: '#1f2937', '& .MuiSvgIcon-root': { color: '#1f2937' } }}>
          <ArrowBack />
        </IconButton>
        <Typography sx={{ fontSize: 16, color: PCT_COLORS.grey }}>12345</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 600, flex: 1 }}>Project Full Name</Typography>
        <Box sx={{ bgcolor: '#f3f4f6', px: 1.5, py: 0.5, borderRadius: 1 }}>
          <Typography variant="caption">Priority</Typography>
        </Box>
      </Box>

      {/* Project Health Cards */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        {[
          { label: 'Overall Project Health', status: 'Amber', color: PCT_COLORS.yellow, icon: null },
          { label: 'Timeline', status: 'On Track / 1 Month Del.', color: PCT_COLORS.green, icon: <Schedule sx={{ fontSize: 18 }} /> },
          { label: 'Cost', status: 'Red', color: PCT_COLORS.red, icon: <AttachMoney sx={{ fontSize: 18 }} /> },
          { label: 'FTE', status: 'Resource Gaps, No Action Taken', color: PCT_COLORS.yellow, icon: <People sx={{ fontSize: 18 }} /> },
          { label: 'Risks', status: 'Amber', color: PCT_COLORS.yellow, icon: <Shield sx={{ fontSize: 18 }} /> },
        ].map((card) => (
          <Box
            key={card.label}
            sx={{
              flex: 1,
              minWidth: 150,
              p: 2,
              bgcolor: '#fff',
              borderRadius: 1,
              border: `1px solid ${PCT_COLORS.border}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              {card.icon}
              <Typography variant="body2" color={PCT_COLORS.grey}>{card.label}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: card.color, borderRadius: '50%' }} />
              <Typography variant="body2" fontWeight={600}>{card.status}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Project Details + Description */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 200, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Project Details</Typography>
          <Typography variant="body2" sx={{ display: 'block' }}>BwelBebat (GSK23330672)</Typography>
          <Typography variant="body2" color={PCT_COLORS.grey}>Respiratory, Immunology and...</Typography>
          <Typography variant="body2" sx={{ display: 'block', mt: 1 }}>Registration & Launch</Typography>
          <Typography variant="body2" color={PCT_COLORS.grey}>Ann Knockaert</Typography>
        </Box>
        <Box sx={{ flex: 2, minWidth: 300, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Project Description</Typography>
          <Typography variant="body2" color={PCT_COLORS.grey} sx={{ maxHeight: 120, overflow: 'auto' }}>
            FDA mid-cycle meeting on 17 September 2025. FDA stated that no safety concerns had been identified to date and highlighted 2 clinical pharmacology significant issues. Regulatory findings, informational requests, and potential clinical objections.
          </Typography>
        </Box>
      </Box>

      {/* Project Timeline */}
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>Project Timeline</Typography>
      <PCTProjectsTimeline />

      {/* Timeline (Alt) | Milestones | KIPs */}
      <Box sx={{ mt: 4 }}>
        <ButtonGroup size="small" sx={{ mb: 2 }}>
          <Button variant={mainTab === 'timeline' ? 'contained' : 'outlined'} onClick={() => setMainTab('timeline')} sx={mainTab === 'timeline' ? { bgcolor: PCT_COLORS.orange } : {}}>
            Timeline (Alt)
          </Button>
          <Button variant={mainTab === 'milestones' ? 'contained' : 'outlined'} onClick={() => setMainTab('milestones')} sx={mainTab === 'milestones' ? { bgcolor: PCT_COLORS.orange } : {}}>
            Milestones
            <Box component="span" sx={{ ml: 1, px: 1, py: 0.25, bgcolor: PCT_COLORS.green, color: '#fff', borderRadius: 1, fontSize: 10 }}>On Track</Box>
          </Button>
          <Button variant={mainTab === 'kips' ? 'contained' : 'outlined'} onClick={() => setMainTab('kips')} sx={mainTab === 'kips' ? { bgcolor: PCT_COLORS.orange } : {}}>
            KIPs
          </Button>
        </ButtonGroup>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
              {[
                { name: 'Milestone or KIP Name', date: '15 Feb', var: '+1', varColor: PCT_COLORS.red },
                { name: 'Milestone or KIP Name', date: '15 Jan 16 Jan', var: '-100', varColor: PCT_COLORS.green },
              ].map((m, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1, borderBottom: i < 1 ? `1px solid ${PCT_COLORS.border}` : 'none' }}>
                  <Box sx={{ width: 10, height: 10, bgcolor: PCT_COLORS.green, borderRadius: '50%' }} />
                  <Typography variant="body2" sx={{ flex: 1 }}>{m.name}</Typography>
                  <Typography variant="caption">{m.date}</Typography>
                  <Typography variant="caption" sx={{ color: m.varColor, fontWeight: 600 }}>{m.var}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                {['Not Achieved', 'Accelerated', 'On Track', 'Slightly Delayed', 'Delayed'].map((l, i) => (
                  <Box key={l} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: [PCT_COLORS.grey, PCT_COLORS.green, PCT_COLORS.green, PCT_COLORS.yellow, PCT_COLORS.red][i] }} />
                    <Typography variant="caption">{l}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>PTRS Unlock</Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Current PTRS</Typography>
                  <Typography variant="caption">Phase PTRS to Unlock</Typography>
                  <Typography variant="caption">Remaining PTRS</Typography>
                </Box>
                <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 1, bgcolor: '#e5e7eb', '& .MuiLinearProgress-bar': { bgcolor: PCT_COLORS.orange } }} />
              </Box>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Studies in Critical Path for Next Commit: Next Commit Name</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                <Box sx={{ width: 10, height: 10, bgcolor: PCT_COLORS.green, borderRadius: '50%' }} />
                <Typography variant="body2" sx={{ flex: 1 }}>Study Milestone Name</Typography>
                <Typography variant="caption">15 Feb</Typography>
                <Typography variant="caption" sx={{ color: PCT_COLORS.red, fontWeight: 600 }}>+1</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Cost ($M) | EPE | IPE */}
      <Box sx={{ mt: 4 }}>
        <ButtonGroup size="small" sx={{ mb: 2 }}>
          <Button variant={costTab === 'cost' ? 'contained' : 'outlined'} onClick={() => setCostTab('cost')} sx={costTab === 'cost' ? { bgcolor: PCT_COLORS.orange } : {}}>
            Cost ($M)
            <Box component="span" sx={{ ml: 1, px: 1, py: 0.25, bgcolor: PCT_COLORS.red, color: '#fff', borderRadius: 1, fontSize: 10 }}>Red</Box>
          </Button>
          <Button variant={costTab === 'epe' ? 'contained' : 'outlined'} onClick={() => setCostTab('epe')} sx={costTab === 'epe' ? { bgcolor: PCT_COLORS.orange } : {}}>EPE</Button>
          <Button variant={costTab === 'ipe' ? 'contained' : 'outlined'} onClick={() => setCostTab('ipe')} sx={costTab === 'ipe' ? { bgcolor: PCT_COLORS.orange } : {}}>IPE</Button>
        </ButtonGroup>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color={PCT_COLORS.grey}>Jul 2025 - Dec 2025</Typography>
          <Typography variant="body2" color={PCT_COLORS.grey}>Multiple Selection ▾</Typography>
        </Box>
        <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
          <Box sx={{ height: 260 }}>
            <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" height={240} />
          </Box>
        </Box>
      </Box>

      {/* FTE */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" fontWeight={600}>FTE</Typography>
          <Box sx={{ px: 1, py: 0.25, bgcolor: PCT_COLORS.yellow, color: '#fff', borderRadius: 1 }}>
            <Typography variant="caption">Resource Gaps, No Action Taken</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color={PCT_COLORS.grey}>Jul 2025 - Dec 2025</Typography>
          <Typography variant="body2" color={PCT_COLORS.grey}>Multiple Selection ▾</Typography>
        </Box>
        <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
          <Box sx={{ height: 260 }}>
            <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={240} />
          </Box>
        </Box>
      </Box>

      {/* Risks */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" fontWeight={600}>Risks (showing only key risks)</Typography>
          <Box sx={{ px: 1, py: 0.25, bgcolor: PCT_COLORS.yellow, color: '#fff', borderRadius: 1 }}>
            <Typography variant="caption">Amber</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 300, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
            <Typography variant="caption" fontWeight={600} sx={{ display: 'block', mb: 1 }}>Description</Typography>
            {[15, 12, 25, 15, 11].map((n, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                <Typography variant="caption" sx={{ minWidth: 20 }}>{n}</Typography>
                <Box sx={{ width: 8, height: 8, bgcolor: PCT_COLORS.red, borderRadius: '50%', mt: 0.5, flexShrink: 0 }} />
                <Typography variant="caption" color={PCT_COLORS.grey}>
                  Risk description and another longer line that takes up more space. Risk description and another longer line that takes up more space.
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: 1, minWidth: 300, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
            <Typography variant="caption" fontWeight={600} sx={{ display: 'block', mb: 1 }}>Mitigation Plan</Typography>
            {['Risk accepted.', 'Mitigation Plan description and another longer line.', 'Risk accepted.', 'Mitigation Plan description.', 'Risk accepted.'].map((t, i) => (
              <Typography key={i} variant="caption" color={PCT_COLORS.grey} sx={{ display: 'block', mb: 1.5 }}>{t}</Typography>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 2, flexWrap: 'wrap' }}>
          {[
            { color: PCT_COLORS.green, label: 'Low (1-4)' },
            { color: PCT_COLORS.yellow, label: 'Medium (5-9)' },
            { color: PCT_COLORS.orange, label: 'High (10-20)' },
            { color: PCT_COLORS.red, label: 'Very High (20-25)' },
          ].map((c) => (
            <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: c.color, borderRadius: '50%' }} />
              <Typography variant="caption">{c.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Project;
