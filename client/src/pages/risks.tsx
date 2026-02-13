import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@pankod/refine-mui';

const PCT_COLORS = {
  orange: '#E85C0A',
  grey: '#6b7280',
  border: '#e5e7eb',
  red: '#E53935',
  green: '#43A047',
  yellow: '#FFB300',
  textDark: '#1f2937',
};

const RISK_DATA = [
  {
    id: '61449',
    desc: 'PRJ/61449/VAC; Due to delayed CMC data package submission, there is a risk that FDA may defer the BLA filing timeline. Additional stability data required for primary packaging.',
    category: 'Clinical - Safety',
    currentSeverity: 'VL = L(H) x I(H)',
    currentBg: '#c8e6c9',
    strategy: 'Mitigate',
    mitigation: 'Expedited CMC team assigned. Weekly sync with regulatory. Contingency filing date Q2 2026.',
    mitigatedSeverity: 'L = L(M) x I(L)',
    mitigatedBg: '#e8f5e9',
  },
  {
    id: '18019',
    desc: 'PRJ/18019/ONC; Because of recruitment shortfall in EU sites, there is a risk that Phase III enrollment may slip by 2 quarters. Competing trials in same indication.',
    category: 'Clinical - Operations',
    currentSeverity: 'H = L(M) x I(H)',
    currentBg: '#ffcdd2',
    strategy: 'Mitigate',
    mitigation: 'Site expansion in APAC. Patient referral program launched. CRO performance review scheduled.',
    mitigatedSeverity: 'M = L(M) x I(M)',
    mitigatedBg: '#fff9c4',
  },
  {
    id: '61782',
    desc: 'PRJ/61782/IMM; Risk of supply disruption for comparator drug. Single supplier for active ingredient. Lead time 6 months.',
    category: 'Supply Chain',
    currentSeverity: 'M = L(M) x I(M)',
    currentBg: '#fff9c4',
    strategy: 'Mitigate',
    mitigation: 'Dual sourcing qualification initiated. Safety stock increased to 9 months. Supplier audit completed.',
    mitigatedSeverity: 'L = L(L) x I(M)',
    mitigatedBg: '#e8f5e9',
  },
  {
    id: '61450',
    desc: 'PRJ/61450/VAC; Regulatory authority may request additional pediatric sub-study data. Precedent from similar vaccine class.',
    category: 'Regulatory',
    currentSeverity: 'H = L(M) x I(H)',
    currentBg: '#ffcdd2',
    strategy: 'Accept',
    mitigation: 'Risk accepted. Pediatric protocol on standby. Budget reserve allocated.',
    mitigatedSeverity: 'H = L(M) x I(H)',
    mitigatedBg: '#ffcdd2',
  },
  {
    id: '53759',
    desc: 'PRJ/53759/RES; Key opinion leader availability for advisory board may impact protocol finalization. Multiple competing commitments.',
    category: 'Clinical - Operations',
    currentSeverity: 'L = L(L) x I(M)',
    currentBg: '#e8f5e9',
    strategy: 'Mitigate',
    mitigation: 'Backup KOLs identified. Virtual format option. Timeline buffer of 4 weeks built in.',
    mitigatedSeverity: 'L = L(L) x I(L)',
    mitigatedBg: '#e8f5e9',
  },
];

const Risks = () => (
  <Box>
    <Typography sx={{ fontSize: 24, fontWeight: 700, color: PCT_COLORS.orange, mb: 3 }}>
      Risks
    </Typography>

    <Box sx={{ bgcolor: '#fff', borderRadius: 1, border: `1px solid ${PCT_COLORS.border}`, overflow: 'hidden', '& .MuiTableCell-root': { color: '#1f2937' } }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f9fafb' }}>
            <TableCell sx={{ fontWeight: 600 }}>Project ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Risk Category</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Current Risk Severity</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Risk Response Strategy</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Mitigation Plan</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Mitigated Risk Severity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {RISK_DATA.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell sx={{ maxWidth: 340 }}>{row.desc}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell sx={{ bgcolor: row.currentBg, color: PCT_COLORS.textDark, fontWeight: 500 }}>
                {row.currentSeverity}
              </TableCell>
              <TableCell>{row.strategy}</TableCell>
              <TableCell>{row.mitigation}</TableCell>
              <TableCell sx={{ bgcolor: row.mitigatedBg, color: PCT_COLORS.textDark, fontWeight: 500 }}>
                {row.mitigatedSeverity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    {/* Risk Index Legend */}
    <Box sx={{ mt: 3, p: 2, bgcolor: '#fafafa', borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>Risk Index</Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: PCT_COLORS.green, borderRadius: '50%' }} />
          <Typography variant="body2">1-4: Low</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: PCT_COLORS.yellow, borderRadius: '50%' }} />
          <Typography variant="body2">5-9: Medium</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: PCT_COLORS.orange, borderRadius: '50%' }} />
          <Typography variant="body2">10-12: High</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: PCT_COLORS.red, borderRadius: '50%' }} />
          <Typography variant="body2">15-25: Very High</Typography>
        </Box>
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Likelihood (L) & Impact (I)</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="caption">1: Very Low</Typography>
        <Typography variant="caption">2: Low</Typography>
        <Typography variant="caption">3: Medium</Typography>
        <Typography variant="caption">4: High</Typography>
        <Typography variant="caption">5: Very High</Typography>
      </Box>
    </Box>
  </Box>
);

export default Risks;
