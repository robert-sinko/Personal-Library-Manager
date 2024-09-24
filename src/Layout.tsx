import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>
            Personal Library Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        flexGrow={1}
        height={1}
        sx={{ background: "#fafafa" }}
      >
        <Box
          height={1}
          sx={{
            padding: "0 3rem 3rem 3rem",
          }}
        >
          <Grid container maxWidth="md" marginX={"auto"} paddingTop={2}>
            <Outlet />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
