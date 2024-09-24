import axios from "axios";
import { Book } from "./types/Book";

const baseUrl = "http://localhost:3001";
export const getBooks = () =>
  axios.get(baseUrl + "/books").then((res) => res.data);
export const addBook = (book: Book) =>
  axios.post(baseUrl + "/books", book).then((res) => res.data);
export const updateBook = (book: Book) =>
  axios.put(baseUrl + "/books/" + book.id, book).then((res) => res.data);
export const deleteBook = (id: number) =>
  axios.delete(baseUrl + "/books/" + id).then((res) => res.data);
