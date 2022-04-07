import axios from "axios";
import Auth from "./Auth";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 2000,
  headers: {
    Authorization: "Auth " + Auth.getToken("access"),
  },
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (err) => {
    const config = err.config;
    if (err.response.status === 401) {
      try {
        const access = await Auth.getNewAccessToken();
        Auth.setAccessToken(access);
        config.headers["Authorization"] = "Auth " + access;
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
      return axiosInstance(config);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
