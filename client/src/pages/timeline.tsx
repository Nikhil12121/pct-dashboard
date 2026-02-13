import React from 'react';
import { Box, Typography, Slider, Table, TableBody, TableCell, TableHead, TableRow } from '@pankod/refine-mui';
import PCTProjectsTimeline from 'components/pct/PCTProjectsTimeline';

const PCT_COLORS = {
  orange: '#E85C0A',
  grey: '#6b7280',
  border: '#e5e7eb',
};

const Timeline = () => (
  <Box>
    <Typography sx={{ fontSize: 24, fontWeight: 700, color: PCT_COLORS.orange, mb: 1 }}>
      Timeline
    </Typography>
    <Typography variant="body2" color={PCT_COLORS.grey} sx={{ mb: 3 }}>
      Projects with milestone dates before 2021 and no key milestones in the Active plan are not shown in the Gantt chart.
    </Typography>

    <PCTProjectsTimeline />

    {/* Date Slider */}
    <Box sx={{ mt: 3, px: 2 }}>
      <Typography variant="caption" color={PCT_COLORS.grey} sx={{ display: 'block', mb: 1 }}>Date range</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="caption">21 Jan 2024</Typography>
        <Slider
          defaultValue={[25, 75]}
          sx={{ flex: 1, color: PCT_COLORS.orange, '& .MuiSlider-thumb': { width: 16, height: 16 } }}
          valueLabelDisplay="off"
        />
        <Typography variant="caption">21 Jan 2025</Typography>
      </Box>
    </Box>

    {/* Data Table */}
    <Box sx={{ mt: 3, bgcolor: '#fff', borderRadius: 1, border: `1px solid ${PCT_COLORS.border}`, overflow: 'hidden', '& .MuiTableCell-root': { color: '#1f2937' } }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f9fafb' }}>
            <TableCell sx={{ fontWeight: 600 }}>Asset</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Project/Study</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Milestones</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Approved Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Current Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Variance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { variance: -10, color: '#e8f5e9' },
            { variance: 10, color: '#ffebee' },
            { variance: -10, color: '#e8f5e9' },
            { variance: 10, color: '#ffebee' },
          ].map((row, i) => (
            <TableRow key={i}>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>01 Jan 2025</TableCell>
              <TableCell>01 Jan 2025</TableCell>
              <TableCell sx={{ bgcolor: row.color, fontWeight: 600 }}>{row.variance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Box>
);

export default Timeline;
