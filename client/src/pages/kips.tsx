import React from 'react';
import { Box, Typography, Button, IconButton } from '@pankod/refine-mui';
import { ChevronLeft, ChevronRight, Edit } from '@mui/icons-material';

const PCT_COLORS = {
  orange: '#E85C0A',
  grey: '#6b7280',
  border: '#e5e7eb',
};

const KIP_ITEMS = [
  { code: 'C2FL', desc: 'cobolimob+dostor+d' },
  { code: 'C2FTIH', desc: 'iv - NSCLC' },
  { code: 'C2PHA', desc: 'Cob LA Newborn pro' },
  { code: 'C2PHA', desc: 'in - HIV' },
  { code: 'P4kb', desc: 'inhaled - HRV' },
];

const KIPs = () => (
  <Box>
    {/* Header */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
      <Typography sx={{ fontSize: 22, fontWeight: 700, color: PCT_COLORS.orange }}>
        Key Inflection Points (KIPs)
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small"><ChevronLeft /></IconButton>
          <Typography variant="body2" sx={{ minWidth: 140, textAlign: 'center' }}>Jul 2025 - Dec 2025</Typography>
          <IconButton size="small"><ChevronRight /></IconButton>
        </Box>
        <Button variant="outlined" size="small" startIcon={<Edit sx={{ fontSize: 16 }} />} sx={{ borderColor: PCT_COLORS.border }}>
          Edit KIPs Milestones
        </Button>
      </Box>
    </Box>

    {/* Monthly columns */}
    <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 1, border: `1px solid ${PCT_COLORS.border}` }}>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {['July 2025', 'August 2025', 'September 2025', 'October 2025', 'November 2025', 'December 2025'].map((month, mi) => (
          <Box key={month} sx={{ minWidth: 200, flex: 1 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 2, color: '#374151' }}>{month}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {KIP_ITEMS.map((item, i) => (
                <Box key={`${month}-${i}`} sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: '#fafafa',
                  borderLeft: `3px solid ${['#FFB300', '#00ACC1', '#7B1FA2', '#E85C0A', '#212121'][i % 5]}`,
                }}>
                  <Box sx={{ 
                    width: 10, 
                    height: 10, 
                    borderRadius: '50%', 
                    bgcolor: i % 2 === 0 ? '#43A047' : PCT_COLORS.grey,
                    mt: 0.5,
                    flexShrink: 0,
                  }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>{item.code}</Typography>
                    <Typography variant="caption" color={PCT_COLORS.grey}>{item.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 4, mt: 3, flexWrap: 'wrap', pt: 2, borderTop: `1px solid ${PCT_COLORS.border}` }}>
        <Box>
          <Typography variant="caption" color={PCT_COLORS.grey} sx={{ display: 'block', mb: 1 }}>Status</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: '#43A047', borderRadius: '50%' }} />
              <Typography variant="caption">Achieved</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: PCT_COLORS.grey, borderRadius: '50%' }} />
              <Typography variant="caption">Not Achieved</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color={PCT_COLORS.grey} sx={{ display: 'block', mb: 1 }}>Category</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { color: '#FFB300', label: 'C2 Milestones' },
              { color: '#00ACC1', label: 'Phase 1,2 & start' },
              { color: '#7B1FA2', label: 'Regulatory Submission' },
              { color: '#E85C0A', label: 'Key Results' },
              { color: '#212121', label: 'External News' },
            ].map((c) => (
              <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: c.color, borderRadius: 0.5 }} />
                <Typography variant="caption">{c.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default KIPs;
