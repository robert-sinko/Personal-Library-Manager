import axios from "axios";

const baseUrl = "http://localhost:3001";
const fetcher = (url: string) =>
  axios.get(baseUrl + "/" + url).then((res) => res.data);

export default fetcher;
