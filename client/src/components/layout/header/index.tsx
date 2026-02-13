import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pr: 3,
        bgcolor: '#f5f5f5',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {user?.name && (
        <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
          {user.name}
        </Typography>
      )}
    </Box>
  );
};
