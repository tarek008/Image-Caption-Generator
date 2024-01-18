import React from "react";
import { AppBar, Box, Toolbar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item> </Grid>

            <Grid item xs>
              {" "}
              <Box display="flex" justifyContent="center">
                <img
                  src="eseo_logo.png"
                  alt="Your Logo"
                  style={{ maxHeight: "80px" }}
                />
              </Box>
            </Grid>

            <Grid item>
              {" "}
              {/* Right side, for buttons or other elements */}
              <Box display="flex" gap={2}></Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar }} />
    </Box>
  );
};

export default Navbar;
