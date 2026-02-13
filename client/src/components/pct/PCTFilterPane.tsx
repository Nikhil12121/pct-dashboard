import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
} from '@pankod/refine-mui';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { usePaneContext } from '../../contexts/PaneContext';

const PCT_COLORS = {
  bg: '#F5F5F5',
  border: '#e5e7eb',
  orange: '#E85C0A',
  text: '#374151',
  textMuted: '#6b7280',
  filterInputBg: '#FFFFFF',
};

export type FilterField = {
  label: string;
  value?: string;
};

type PCTFilterPaneProps = {
  title?: string;
  fields: FilterField[];
  moreFields?: FilterField[];
  showLiveToggle?: boolean;
};

export const PCTFilterPane: React.FC<PCTFilterPaneProps> = ({
  title = 'Filters',
  fields,
  moreFields = [],
  showLiveToggle = true,
}) => {
  const [liveData, setLiveData] = useState(true);
  const { filterCollapsed, setFilterCollapsed } = usePaneContext();

  return (
    <Box
      sx={{
        width: filterCollapsed ? 48 : 280,
        flexShrink: 0,
        bgcolor: PCT_COLORS.bg,
        borderRight: `1px solid ${PCT_COLORS.border}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      {/* Header - always visible */}
      <Box
        sx={{
          p: 1.5,
          borderBottom: `1px solid ${PCT_COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: filterCollapsed ? 'center' : 'space-between',
        }}
      >
        {!filterCollapsed && (
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: PCT_COLORS.text }}>
            {title}
          </Typography>
        )}
        <IconButton
          size="small"
          onClick={() => setFilterCollapsed(!filterCollapsed)}
          sx={{ color: PCT_COLORS.textMuted, ml: filterCollapsed ? 0 : 'auto' }}
          title={filterCollapsed ? 'Expand filters' : 'Collapse filters'}
        >
          {filterCollapsed ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeft />}
        </IconButton>
      </Box>

      {!filterCollapsed && (
        <Box sx={{ p: 2, overflow: 'auto', flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontSize: 12, color: PCT_COLORS.orange, fontWeight: 600 }}>10</Typography>
            <Button size="small" sx={{ color: PCT_COLORS.textMuted, fontSize: 11, minWidth: 0 }}>Clear</Button>
          </Box>

          {showLiveToggle && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, display: 'block', mb: 0.5 }}>
                Live/Snapshot Data
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={liveData}
                    onChange={(e) => setLiveData(e.target.checked)}
                    size="small"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: PCT_COLORS.orange },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: PCT_COLORS.orange },
                    }}
                  />
                }
                label={<Typography sx={{ fontSize: 12, color: liveData ? PCT_COLORS.orange : PCT_COLORS.textMuted }}>Live</Typography>}
              />
            </Box>
          )}

          {fields.map((f) => (
            <Box key={f.label} sx={{ mt: 1.5 }}>
              <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>{f.label}</Typography>
              <Box
                sx={{
                  mt: 0.5,
                  px: 1.5,
                  py: 1,
                  bgcolor: PCT_COLORS.filterInputBg,
                  border: `1px solid ${PCT_COLORS.border}`,
                  borderRadius: 1,
                  fontSize: 12,
                  color: f.value ? PCT_COLORS.text : PCT_COLORS.textMuted,
                }}
              >
                {f.value || 'Select'}
              </Box>
            </Box>
          ))}

          {moreFields.length > 0 && (
            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${PCT_COLORS.border}` }}>
              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontWeight: 600 }}>More</Typography>
                <Typography component="span" sx={{ fontSize: 11, color: PCT_COLORS.orange }}>10</Typography>
                <Button size="small" sx={{ color: PCT_COLORS.textMuted, fontSize: 11, minWidth: 0, ml: 'auto' }}>Clear</Button>
              </Box>
              {moreFields.map((f) => (
                <Box key={f.label} sx={{ mt: 1 }}>
                  <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>{f.label}</Typography>
                  <Box
                    sx={{
                      mt: 0.5,
                      px: 1.5,
                      py: 1,
                      bgcolor: PCT_COLORS.filterInputBg,
                      border: `1px solid ${PCT_COLORS.border}`,
                      borderRadius: 1,
                      fontSize: 12,
                      color: f.value ? PCT_COLORS.text : PCT_COLORS.textMuted,
                    }}
                  >
                    {f.value || 'Select'}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
