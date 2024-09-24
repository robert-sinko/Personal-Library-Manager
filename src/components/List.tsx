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
import { addBook, deleteBook, getBooks } from "../api";
import { TableLoading } from "./TableLoading";
import { Book } from "../types/Book";
import { useState } from "react";
import { EditModalState } from "../types/EditModal";
import EditModal from "./EditModal";

function List() {
  const { data, isLoading, mutate } = useSWR("books", getBooks);
  const [editModal, setEditModal] = useState<EditModalState>({
    book: {
      author: "",
      description: "",
      genre: "",
      id: null,
      title: "",
    },
    opened: false,
  });

  const deleteItem = async (id?: null | number) => {
    const book = data && data.find((book: Book) => book.id === id);
    if (!book) {
      alert("Book not found");
      return;
    }
    if (confirm("Are you sure you want to delete " + book.title + "?")) {
      await deleteBook(book.id);
      mutate(data.filter((item: Book) => item.id !== book.id));
    }
  };

  const handleSubmit = async (input: Book) => {
    if (!data) return;
    const newBook = { ...input };
    if (input.id === null) {
      newBook.id = Date.now();
      data.push(newBook);
      await addBook(newBook);
      mutate(data);
    }
    setEditModal({ ...editModal, opened: false });
  };

  return (
    <Box width={1}>
      <Box display={"flex"} alignItems={"center"}>
        <Typography flexGrow={1}>All Books</Typography>
        <Button
          variant="outlined"
          onClick={() => setEditModal({ ...editModal, opened: true })}
        >
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
            {isLoading || !data ? (
              <TableLoading />
            ) : !data.length ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography textAlign={"center"}>no books</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
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
      {editModal.opened && (
        <EditModal
          handleClose={() => setEditModal({ ...editModal, opened: false })}
          handleSubmit={handleSubmit}
        />
      )}
    </Box>
  );
}

export default List;
