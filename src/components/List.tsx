import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function List() {
  return (
    <Box width={1}>
      <Box display={"flex"}>
        <Typography flexGrow={1}>Create / Edit</Typography>
        <Button component={Link} to="/create" variant="outlined">
          add
        </Button>
      </Box>
      <Box pt={3}>
        <Typography textAlign={"center"}>book list goes here</Typography>
      </Box>
    </Box>
  );
}

export default List;
