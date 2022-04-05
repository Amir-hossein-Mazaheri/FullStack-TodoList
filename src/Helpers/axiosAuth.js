import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
  timeout: 2000,
});

export default axiosAuth;
