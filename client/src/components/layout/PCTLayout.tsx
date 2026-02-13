import React from "react";
import { LayoutProps } from "@pankod/refine-core";
import { Box } from "@pankod/refine-mui";
import { useLocation } from "react-router-dom";
import { PCTNavPane } from "./PCTNavPane";
import { Header } from "./header";
import { PageWithFilters } from "../pct/PageWithFilters";

export const PCTLayout: React.FC<LayoutProps> = ({
  Header: HeaderProp,
  children,
}) => {
  const HeaderToRender = HeaderProp ?? Header;
  const location = useLocation();

  return (
    <Box display="flex" flexDirection="row" sx={{ minHeight: '100vh' }}>
      {/* Extreme left: Page Navigation (collapsible) */}
      <PCTNavPane />

      {/* Main area: Header + (Filter pane + Content) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
          minWidth: 0,
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            bgcolor: '#f5f5f5',
          }}
        >
          <PageWithFilters pathname={location.pathname}>
            {children}
          </PageWithFilters>
        </Box>
      </Box>
    </Box>
  );
};
