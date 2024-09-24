import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      minHeight={"100vh"}
      alignItems={"center"}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>
            Personal Library Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        m={2}
        display="flex"
        flexGrow={1}
        maxWidth="md"
        width="100%"
        sx={{
          background: "#fafafa",
        }}
      >
        <Outlet />
      </Box>
      <Box>
        <Typography p={3}>Coded by Robert</Typography>
      </Box>
    </Box>
  );
}
