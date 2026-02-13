import React from 'react';
import { Box, Typography, Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@pankod/refine-mui';
import ReactApexChart from 'react-apexcharts';

const PCT_COLORS = {
  orange: '#E85C0A',
  purple: '#673ab7',
  grey: '#6b7280',
  border: '#e5e7eb',
};

const TABLE_DATA = [
  { id: '61449', ta: 'Vaccine', desc: 'RSV maternal vaccine Phase III trial - Respiratory Syncytial Virus prevention in infants', forecast: 12.5, actual: 10.2 },
  { id: '18019', ta: 'Oncology', desc: 'Dostarlimab combination therapy - PD-1 inhibitor for solid tumors', forecast: 8.7, actual: 9.1 },
  { id: '61782', ta: 'Immunology', desc: 'Benralizumab long-term safety study - Severe eosinophilic asthma', forecast: 5.2, actual: 4.8 },
  { id: '61450', ta: 'Vaccine', desc: 'Shingles vaccine lifecycle management - Zoster vaccine booster program', forecast: 15.3, actual: 18.2 },
  { id: '18020', ta: 'Oncology', desc: 'Jemperli expansion study - dMMR endometrial cancer indications', forecast: 6.8, actual: 6.2 },
  { id: '53759', ta: 'Respiratory', desc: 'Trelegy Ellipta COPD maintenance - Triple therapy inhaler', forecast: 22.1, actual: 21.5 },
  { id: '61451', ta: 'Global Health', desc: 'Malaria vaccine RTS,S - Pediatric immunization program', forecast: 3.4, actual: 3.9 },
  { id: '18021', ta: 'Non-R&D Units', desc: 'Manufacturing capacity expansion - New facility build-out', forecast: 9.0, actual: 8.2 },
];

const CostFTE = () => {
  const chartOptions = {
    chart: { type: 'bar' as const },
    plotOptions: { bar: { horizontal: false, columnWidth: '60%' } },
    colors: [PCT_COLORS.purple, '#ffa726'],
    xaxis: { categories: TABLE_DATA.map((r) => r.id) },
    yaxis: { max: 20 },
    legend: { position: 'bottom' as const },
    dataLabels: { enabled: true },
  };
  const chartSeries = [
    { name: 'Forecast', data: TABLE_DATA.map((r) => r.forecast) },
    { name: 'Actual', data: TABLE_DATA.map((r) => r.actual) },
  ];

  return (
    <Box>
      {/* Tabs */}
      <ButtonGroup size="small" sx={{ mb: 2 }}>
        <Button variant="contained" sx={{ bgcolor: PCT_COLORS.orange, textTransform: 'none' }}>Cost/FTE</Button>
        <Button variant="outlined" sx={{ borderColor: PCT_COLORS.border, textTransform: 'none' }}>IPE</Button>
        <Button variant="outlined" sx={{ borderColor: PCT_COLORS.border, textTransform: 'none' }}>EPE</Button>
        <Button variant="outlined" sx={{ borderColor: PCT_COLORS.border, textTransform: 'none' }}>FTE</Button>
      </ButtonGroup>

      <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#374151', mb: 0.5 }}>
        Internal Project Expenditure 15 Top by Variance
      </Typography>
      <Typography variant="body2" color={PCT_COLORS.grey} sx={{ mb: 2 }}>
        Default forecast shown in the table is up to Dec 2031.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color={PCT_COLORS.grey}>View:</Typography>
          <ButtonGroup size="small">
            <Button variant="contained" sx={{ bgcolor: PCT_COLORS.orange, borderColor: PCT_COLORS.orange }}>Variance</Button>
            <Button variant="outlined" sx={{ borderColor: PCT_COLORS.border }}>Forecast</Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Data Table */}
      <Box sx={{ bgcolor: '#fff', borderRadius: 1, border: `1px solid ${PCT_COLORS.border}`, overflow: 'hidden', mb: 3, '& .MuiTableCell-root': { color: '#1f2937' } }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f9fafb' }}>
              <TableCell sx={{ fontWeight: 600 }}>Project ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>TA</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Forecast [mln]</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actuals [mln]</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Variance [mln]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TABLE_DATA.map((row) => {
              const variance = row.actual - row.forecast;
              return (
                <TableRow key={row.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ maxWidth: 320 }}>{row.desc}</TableCell>
                  <TableCell>{row.ta}</TableCell>
                  <TableCell>{row.forecast.toFixed(1)}</TableCell>
                  <TableCell>{row.actual.toFixed(1)}</TableCell>
                  <TableCell sx={{ color: variance < 0 ? '#059669' : variance > 0 ? '#dc2626' : '#374151', fontWeight: 600 }}>
                    {variance > 0 ? '+' : ''}{variance.toFixed(1)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      {/* Bar Chart */}
      <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>Portfolio TA</Typography>
        <Box sx={{ height: 280 }}>
          <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={260} />
        </Box>
      </Box>
    </Box>
  );
};

export default CostFTE;
