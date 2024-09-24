import {
  Box,
  Button,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../fetcher";
import { TableLoading } from "./TableLoading";
import { Book } from "../types/Book";

function List() {
  const { data, isLoading } = useSWR("books", fetcher);

  const deleteItem = (id: string) => {
    const book = data.find((book: Book) => book.id === id);
    if (!book) {
      alert("Book not found");
      return;
    }
    confirm("Are you sure you want to delete " + book.title + "?");
  };

  return (
    <Box width={1}>
      <Box display={"flex"} alignItems={"center"}>
        <Typography flexGrow={1}>All Books</Typography>
        <Button component={Link} to="/create" variant="outlined">
          add
        </Button>
      </Box>
      <Box pt={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Description</TableCell>
                <TableCell
                  sx={{
                    width: "64px",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableLoading />
            ) : !data.length ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography textAlign={"center"}>no books</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TableBody>
                {data.map((row: Book) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <MuiLink component={Link} to={"/edit/" + row.id}>
                        {row.title}
                      </MuiLink>
                    </TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.genre}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => deleteItem(row.id)}>
                        🗑️
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>{" "}
      </Box>
    </Box>
  );
}

export default List;
