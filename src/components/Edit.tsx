import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Edit() {
  return (
    <Box width={1}>
      <Box display={"flex"}>
        <Typography flexGrow={1}>Create / Edit</Typography>
        <Button component={Link} to="/" variant="outlined">
          back to list
        </Button>
      </Box>
      <Box pt={3}>
        <Typography textAlign={"center"}>form goes here</Typography>
      </Box>
    </Box>
  );
}

export default Edit;
