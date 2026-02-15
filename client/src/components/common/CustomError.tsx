import React from "react";
import { Box, Typography, Button } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";

export const CustomError: React.FC = () => {
  const { push } = useNavigation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          color: "#FF6200",
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "3rem" },
          mb: 3,
          textAlign: "center",
          px: 2,
        }}
      >
        Welcome to PCT Dashboard
      </Typography>
      
      <Button
        variant="contained"
        onClick={() => push("/")}
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          bgcolor: "#FF6200",
          color: "#fff",
          textTransform: "none",
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "#e55800",
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};
