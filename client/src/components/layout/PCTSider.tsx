import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@pankod/refine-mui';
import {
  Home,
  Folder,
  Schedule,
  Assessment,
  Flag,
  AttachMoney,
  Warning,
  Block,
  MenuRounded,
  Logout,
  ExpandMore,
} from '@mui/icons-material';
import { useRouterContext, useLogout, useGetIdentity } from '@pankod/refine-core';
import { useLocation } from 'react-router-dom';

import { gskLogo } from '../../assets';

// Light theme from screenshots - filter panel uses light grey, not black
const PCT_COLORS = {
  sidebarBg: '#F5F5F5',
  sidebarLight: '#EEEEEE',
  filterInputBg: '#FFFFFF',
  orange: '#E85C0A',
  orangeLight: '#f4a261',
  text: '#374151',
  textMuted: '#6b7280',
  border: '#e5e7eb',
};

const NAV_ITEMS = [
  { route: '/', label: 'Home', icon: <Home /> },
  { route: '/project', label: 'Project', icon: <Folder /> },
  { route: '/timeline', label: 'Timeline', icon: <Schedule /> },
  { route: '/kips', label: 'KIPs', icon: <Assessment /> },
  { route: '/milestones', label: 'Milestones', icon: <Flag /> },
  { route: '/cost-fte', label: 'Cost/FTE', icon: <AttachMoney /> },
  { route: '/risks', label: 'Risks', icon: <Warning /> },
  { route: '/terminated', label: 'Terminated', icon: <Block /> },
];

const FILTER_LABELS = [
  'PPM Responsibility',
  'TA Portfolio',
  'Asset/Program',
  'Priority',
  'Project Status',
  'Project Phase',
  'Disease/Indication',
];

export const PCTSider: React.FC = () => {
  const [liveData, setLiveData] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { Link } = useRouterContext();
  const location = useLocation();
  const { mutate: mutateLogout } = useLogout();
  const { data: user } = useGetIdentity();

  const drawerWidth = 320;

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: PCT_COLORS.sidebarBg,
        color: PCT_COLORS.text,
      }}
    >
      {/* GSK Logo & Branding */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${PCT_COLORS.border}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img src={gskLogo} alt="GSK" width={40} height={40} />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 18, color: PCT_COLORS.orange }}>
              GSK
            </Typography>
            <Typography sx={{ fontSize: 12, color: PCT_COLORS.textMuted }}>
              Pipeline Control Tower
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${PCT_COLORS.border}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: PCT_COLORS.text }}>
            Filters
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography component="span" sx={{ fontSize: 12, color: PCT_COLORS.orange, fontWeight: 600 }}>10</Typography>
            <Button size="small" sx={{ color: PCT_COLORS.textMuted, fontSize: 12, minWidth: 0 }}>
              Clear
            </Button>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, display: 'block', mb: 1 }}>
          Live/Snapshot Data
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={liveData}
              onChange={(e) => setLiveData(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: PCT_COLORS.orange },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: PCT_COLORS.orange,
                },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: 13, color: liveData ? PCT_COLORS.orange : PCT_COLORS.textMuted }}>
              Live
            </Typography>
          }
        />
        {FILTER_LABELS.map((label) => (
          <Box key={label} sx={{ mt: 1.5 }}>
            <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>
              {label}
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                px: 1.5,
                py: 1,
                bgcolor: PCT_COLORS.filterInputBg,
                border: `1px solid ${PCT_COLORS.border}`,
                borderRadius: 1,
                fontSize: 12,
                color: PCT_COLORS.textMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Select
              <ExpandMore sx={{ fontSize: 18, color: PCT_COLORS.textMuted }} />
            </Box>
          </Box>
        ))}
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${PCT_COLORS.border}` }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontWeight: 600 }}>
              More
            </Typography>
            <Typography component="span" sx={{ fontSize: 11, color: PCT_COLORS.orange, fontWeight: 600 }}>10</Typography>
            <Button size="small" sx={{ color: PCT_COLORS.textMuted, fontSize: 11, minWidth: 0, ml: 'auto' }}>Clear</Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>
              Project Name
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                px: 1.5,
                py: 1,
                bgcolor: PCT_COLORS.filterInputBg,
                border: `1px solid ${PCT_COLORS.border}`,
                borderRadius: 1,
                fontSize: 12,
                color: PCT_COLORS.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              12345
              <ExpandMore sx={{ fontSize: 18, color: PCT_COLORS.textMuted }} />
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>
              PM
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                px: 1.5,
                py: 1,
                bgcolor: PCT_COLORS.filterInputBg,
                border: `1px solid ${PCT_COLORS.border}`,
                borderRadius: 1,
                fontSize: 12,
                color: PCT_COLORS.textMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Select
              <ExpandMore sx={{ fontSize: 18, color: PCT_COLORS.textMuted }} />
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>
              Launch Strategy
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                px: 1.5,
                py: 1,
                bgcolor: PCT_COLORS.filterInputBg,
                border: `1px solid ${PCT_COLORS.border}`,
                borderRadius: 1,
                fontSize: 12,
                color: PCT_COLORS.textMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Select
              <ExpandMore sx={{ fontSize: 18, color: PCT_COLORS.textMuted }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Page Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isSelected = location.pathname === item.route || (item.route === '/' && location.pathname === '/');
          return (
            <ListItemButton
              key={item.route}
              component={Link}
              to={item.route}
              selected={isSelected}
              onClick={() => setMobileOpen(false)}
              sx={{
                py: 1.5,
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                color: isSelected ? '#fff' : PCT_COLORS.text,
                '&.Mui-selected': {
                  bgcolor: PCT_COLORS.orange,
                  color: '#fff',
                  '&:hover': { bgcolor: PCT_COLORS.orangeLight },
                  '& .MuiListItemIcon-root': { color: '#fff' },
                },
                '&:hover': {
                  bgcolor: isSelected ? PCT_COLORS.orangeLight : PCT_COLORS.sidebarLight,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isSelected ? '#fff' : PCT_COLORS.textMuted }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: isSelected ? 600 : 400 }} />
            </ListItemButton>
          );
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${PCT_COLORS.border}` }}>
        <Typography variant="caption" sx={{ color: PCT_COLORS.textMuted, fontSize: 11 }}>
          GSK PCT LT 1.0
        </Typography>
        {user?.name && (
          <Typography variant="caption" sx={{ color: PCT_COLORS.text, display: 'block', mt: 0.5, fontSize: 12 }}>
            {user.name}
          </Typography>
        )}
        <ListItemButton onClick={() => mutateLogout()} sx={{ mt: 1, color: PCT_COLORS.textMuted, borderRadius: 1 }}>
          <ListItemIcon sx={{ minWidth: 36, color: PCT_COLORS.textMuted }}><Logout fontSize="small" /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 12 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ width: { md: drawerWidth }, flexShrink: 0, display: { xs: 'none', md: 'block' } }} />
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: 0,
            borderRight: `1px solid ${PCT_COLORS.border}`,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <IconButton
        sx={{
          display: { md: 'none' },
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300,
          bgcolor: PCT_COLORS.orange,
          color: 'white',
          '&:hover': { bgcolor: PCT_COLORS.orangeLight },
        }}
        onClick={() => setMobileOpen(true)}
      >
        <MenuRounded />
      </IconButton>
    </>
  );
};
