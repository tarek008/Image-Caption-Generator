import React from "react";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        bgcolor: "#6396C4",
        color: "white",
        bottom: 0,
        left: 0,
        textAlign: "center",
      }}
    >
      &copy; 2024 Eseo
    </Box>
  );
};

export default Footer;
