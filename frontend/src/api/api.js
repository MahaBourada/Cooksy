import axios from "axios";
const BASE_URL =
  "http://localhost:80/cooksy-api" ||
  "http://localhost:443/cooksy-api" ||
  "http://localhost/cooksy-api";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
