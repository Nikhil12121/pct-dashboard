import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@pankod/refine-mui';
import ReactApexChart from 'react-apexcharts';

const PCT_COLORS = {
  orange: '#E85C0A',
  grey: '#6b7280',
  border: '#e5e7eb',
};

const TERMINATED_DATA = [
  {
    portfolio: 'Onco',
    ta: 'Oncology',
    id: '53759',
    desc: 'Jemperli + chemotherapy - dMMR/MSI-H gastric cancer. Terminated due to strategic portfolio prioritization.',
    pm: 'Sarah Chen',
    ppmCommentary: 'Decision aligned with focus on first-line indications. Resources reallocated to Jemperli monotherapy program.',
    decisionDate: '23-May-2025',
    completedDate: '09-Jul-2025',
    highlight: false,
  },
  {
    portfolio: 'Onco',
    ta: 'Oncology',
    id: '53812',
    desc: 'PARP inhibitor combo - BRCA-mutated ovarian cancer. Failed futility analysis at interim.',
    pm: 'Michael Torres',
    ppmCommentary: 'Primary endpoint not met. Data supports single-agent PARP strategy. No further development planned.',
    decisionDate: '23-May-2025',
    completedDate: '08-Jul-2025',
    highlight: true,
  },
  {
    portfolio: 'SPC',
    ta: 'Specialty Care',
    id: '61422',
    desc: 'IL-5 inhibitor - Severe asthma. Discontinued after competitor approval and market shift.',
    pm: 'Emma Watson',
    ppmCommentary: 'Commercial viability reduced. Team transitioned to next-generation biologic program.',
    decisionDate: '15-Jun-2025',
    completedDate: '20-Jul-2025',
    highlight: false,
  },
  {
    portfolio: 'Vaccine',
    ta: 'Vaccines',
    id: '61501',
    desc: 'Meningococcal B vaccine - Adolescent booster. Manufacturing scale-up challenges.',
    pm: 'James Park',
    ppmCommentary: 'CMC timeline extended beyond strategic window. Alternative sourcing under evaluation for future.',
    decisionDate: '01-Jul-2025',
    completedDate: '25-Jul-2025',
    highlight: false,
  },
  {
    portfolio: 'Viiv',
    ta: 'HIV',
    id: '61288',
    desc: 'Long-acting injectable - Treatment-experienced HIV. PK profile did not meet target.',
    pm: 'Lisa Okonkwo',
    ppmCommentary: 'Formulation optimization would require 18+ month delay. Oral regimen remains priority.',
    decisionDate: '10-May-2025',
    completedDate: '05-Jul-2025',
    highlight: false,
  },
];

const chartOptions = (yTitle: string) => ({
  chart: { type: 'bar' as const },
  plotOptions: { bar: { horizontal: false, columnWidth: '60%' } },
  colors: [PCT_COLORS.orange],
  xaxis: { categories: ['Onco', 'SPC', 'Vaccine', 'Viiv', 'Global Health'] },
  yaxis: { title: { text: yTitle } },
  legend: { show: false },
  dataLabels: { enabled: true },
});

const Terminated = () => (
  <Box>
    <Typography sx={{ fontSize: 24, fontWeight: 700, color: PCT_COLORS.orange, mb: 3 }}>
      Terminated
    </Typography>

    {/* KPI Cards */}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      {[
        { label: 'FTE (Current Qtr.) Top 5', value: '158.96', change: '+68%', badge: 'Top 5', color: '#dc2626' },
        { label: 'FTE Overall', value: '200', change: '-3%', badge: 'Overall', color: '#dc2626' },
        { label: 'ETE Top 5', value: '158.96 mln', change: '+68%', badge: 'Top 5', color: '#dc2626' },
        { label: 'ETE Overall', value: '25%', change: '-3%', badge: 'Overall', color: '#dc2626' },
      ].map((card) => (
        <Box
          key={card.label}
          sx={{
            flex: 1,
            minWidth: 180,
            p: 2,
            bgcolor: '#fff',
            borderRadius: 1,
            border: `1px solid ${PCT_COLORS.border}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="body2" color={PCT_COLORS.grey}>{card.label}</Typography>
            <Typography variant="caption" sx={{ bgcolor: card.badge === 'Top 5' ? PCT_COLORS.orange : PCT_COLORS.grey, color: '#fff', px: 1, borderRadius: 1 }}>
              {card.badge}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{card.value}</Typography>
          <Typography variant="caption" sx={{ color: card.color }}>{card.change}</Typography>
        </Box>
      ))}
    </Box>

    {/* Data Table */}
    <Box sx={{ bgcolor: '#fff', borderRadius: 1, border: `1px solid ${PCT_COLORS.border}`, overflow: 'hidden', mb: 3, '& .MuiTableCell-root': { color: '#1f2937' } }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f9fafb' }}>
            <TableCell sx={{ fontWeight: 600 }}>Portfolio</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>TA</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Project ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>PM</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>PPM Commentary</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Termination Decision Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Terminated Completed Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TERMINATED_DATA.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.portfolio}</TableCell>
              <TableCell>{row.ta}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell sx={{ maxWidth: 280 }}>{row.desc}</TableCell>
              <TableCell>{row.pm}</TableCell>
              <TableCell sx={{ maxWidth: 220 }}>{row.ppmCommentary}</TableCell>
              <TableCell>{row.decisionDate}</TableCell>
              <TableCell sx={row.highlight ? { bgcolor: '#e8f5e9' } : {}}>{row.completedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    {/* Three Bar Charts */}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Box sx={{ flex: 1, minWidth: 280, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>Terminated Projects by Portfolio (63)</Typography>
        <Box sx={{ height: 220 }}>
          <ReactApexChart
            options={chartOptions('No. of terminated projects')}
            series={[{ name: 'Terminated', data: [20, 9, 17, 14, 3] }]}
            type="bar"
            height={200}
          />
        </Box>
      </Box>
      <Box sx={{ flex: 1, minWidth: 280, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>FTE Analysis (Current Qtr)</Typography>
        <Box sx={{ height: 220 }}>
          <ReactApexChart
            options={chartOptions('Avg. FTE')}
            series={[{ name: 'FTE', data: [63, 20, 90, 37, 54] }]}
            type="bar"
            height={200}
          />
        </Box>
      </Box>
      <Box sx={{ flex: 1, minWidth: 280, bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>EPE Analysis (All Qtr)</Typography>
        <Box sx={{ height: 220 }}>
          <ReactApexChart
            options={chartOptions('£ (million)')}
            series={[{ name: 'EPE', data: [6.7, 3.5, 10, 7.4, -1.2] }]}
            type="bar"
            height={200}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Terminated;
