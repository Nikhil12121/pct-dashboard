import React from 'react';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
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
  ChevronLeft,
  ChevronRight,
  Logout,
} from '@mui/icons-material';
import { useRouterContext, useLogout, useGetIdentity } from '@pankod/refine-core';
import { useLocation } from 'react-router-dom';
import { usePaneContext } from '../../contexts/PaneContext';

import { gskLogo } from '../../assets';

const PCT_COLORS = {
  bg: '#F5F5F5',
  border: '#e5e7eb',
  orange: '#E85C0A',
  orangeLight: '#f4a261',
  text: '#374151',
  textMuted: '#6b7280',
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

export const PCTNavPane: React.FC = () => {
  const { Link } = useRouterContext();
  const location = useLocation();
  const { mutate: mutateLogout } = useLogout();
  const { data: user } = useGetIdentity();
  const { navCollapsed, setNavCollapsed } = usePaneContext();

  const width = navCollapsed ? 64 : 220;

  return (
    <Box
      sx={{
        width,
        flexShrink: 0,
        bgcolor: PCT_COLORS.bg,
        borderRight: `1px solid ${PCT_COLORS.border}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo & Branding */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${PCT_COLORS.border}`, display: 'flex', alignItems: 'center', gap: navCollapsed ? 0 : 1.5 }}>
        <img src={gskLogo} alt="GSK" width={36} height={36} />
        {!navCollapsed && (
          <Box>
            <Box sx={{ fontWeight: 700, fontSize: 16, color: PCT_COLORS.orange }}>GSK</Box>
            <Box sx={{ fontSize: 11, color: PCT_COLORS.textMuted }}>Pipeline Control Tower</Box>
          </Box>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isSelected = location.pathname === item.route || (item.route === '/' && location.pathname === '/');
          const btn = (
            <ListItemButton
              key={item.route}
              component={Link}
              to={item.route}
              selected={isSelected}
              sx={{
                py: 1.5,
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                justifyContent: navCollapsed ? 'center' : 'flex-start',
                color: isSelected ? '#fff' : PCT_COLORS.text,
                '&.Mui-selected': {
                  bgcolor: PCT_COLORS.orange,
                  color: '#fff',
                  '&:hover': { bgcolor: PCT_COLORS.orangeLight },
                  '& .MuiListItemIcon-root': { color: '#fff' },
                },
                '&:hover': {
                  bgcolor: isSelected ? PCT_COLORS.orangeLight : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: navCollapsed ? 0 : 36, color: isSelected ? '#fff' : PCT_COLORS.textMuted }}>
                {item.icon}
              </ListItemIcon>
              {!navCollapsed && (
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: isSelected ? 600 : 400 }} />
              )}
            </ListItemButton>
          );
          return navCollapsed ? (
            <Tooltip key={item.route} title={item.label} placement="right" arrow>
              <Box component="span" sx={{ display: 'block' }}>{btn}</Box>
            </Tooltip>
          ) : (
            <React.Fragment key={item.route}>{btn}</React.Fragment>
          );
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 1, borderTop: `1px solid ${PCT_COLORS.border}` }}>
        {!navCollapsed && user?.name && (
          <Box sx={{ px: 2, py: 0.5, fontSize: 12, color: PCT_COLORS.textMuted }}>{user.name}</Box>
        )}
        <ListItemButton onClick={() => mutateLogout()} sx={{ borderRadius: 1, justifyContent: navCollapsed ? 'center' : 'flex-start' }}>
          <ListItemIcon sx={{ minWidth: navCollapsed ? 0 : 36, color: PCT_COLORS.textMuted }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          {!navCollapsed && <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: 12 }} />}
        </ListItemButton>
        <IconButton
          onClick={() => setNavCollapsed(!navCollapsed)}
          sx={{
            width: '100%',
            borderRadius: 0,
            color: PCT_COLORS.textMuted,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', color: PCT_COLORS.orange },
          }}
        >
          {navCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
    </Box>
  );
};
