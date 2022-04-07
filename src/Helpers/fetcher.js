import axios from "./axiosInstance";

const fetcher = (url) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log("fetcher error response : \n", err.response));

export default fetcher;
